import { useEffect, useState } from 'react';
import { 
  BaseError,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { Address, isAddress, zeroAddress } from 'viem';

import { contractAccountAbi } from '@/services/abi/contractAccountAbi';
import { heirAccountAbi } from '@/services/abi/heirAccountAbi';

interface RequestProps {
  userAddress: Address; // Ensures that the address is in a valid format
  selfHeirAccountAddress: Address;
}

export const Request = ({ userAddress, selfHeirAccountAddress }: RequestProps) => {
  const [currentPredecessorAddress, setCurrentPredecessorAddress] = useState<Address | null>(null);
  const [isRequestable, setIsRequestable] = useState(false);
  const [isWithdrawable, setIsWithdrawable] = useState(false);
  const [lastAccess, setLastAccess] = useState<number | null>(null);
  const [lastRequest, setLastRequest] = useState<number | null>(null);

  const { 
    data: hash,
    isPending,
    error,
    writeContract
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Get the predecessor address
  const { data: predecessorAddress, isLoading: isPredecessorAddressLoading, error: predecessorAddressError } = useReadContract({
    abi: heirAccountAbi,
    address: selfHeirAccountAddress,
    functionName: 'predecessorCA',
    args: [],
  });

  useEffect(() => {
    if (predecessorAddress && isAddress(predecessorAddress) && predecessorAddress != zeroAddress) {
      const fetchContractAccountData = async () => {
        const { data: config, error: configError } = useReadContract({
          abi: contractAccountAbi,
          address: predecessorAddress,
          functionName: 'config',
          args: [],
        });
      
        // Fetch the withdrawable status from the predecessor contract
        const { data: withdrawable, error: withdrawableError } = useReadContract({
          abi: contractAccountAbi,
          address: predecessorAddress,
          functionName: 'isWithdrawable',
          args: [],
        });

        if (config && !configError) {
          setLastAccess(config[0]);
          setLastRequest(config[2]);
        }
        if (configError) {
          console.error('Error fetching config:', configError.message);
        }

        if (withdrawable !== undefined && !withdrawableError) {
          setIsWithdrawable(withdrawable);
        }
        if (configError) {
          console.error('Error fetching config:', configError.message);
        }
      }
      fetchContractAccountData()
    }
  }, [predecessorAddress, isConfirmed]);


  // Set the config data after fetching it
  useEffect(() => {
    if (isWithdrawable === false && lastAccess && lastRequest && lastAccess > lastRequest) {
      setIsRequestable(true);
      return
    }
    if (lastAccess && !lastRequest) {
      setIsRequestable(true);
      return
    }

    if (isWithdrawable === true || (!lastAccess && lastRequest)) {
      setIsRequestable(false);
      return
    }
    if (lastAccess && lastRequest && lastAccess < lastRequest) {
      setIsRequestable(false)
    }
  }, [isWithdrawable, lastAccess, lastRequest]);

  const handleRequest = async () => {
    writeContract({
      abi: heirAccountAbi,
      address: selfHeirAccountAddress,
      functionName: 'callPredecessorCA',
      args: [0],
    });
  };

  return (
    <div className="text-white">
      {/* Display lastAccess and lastRequest times */}
      {lastAccess && (
        <div>
          <strong>Predecessor's Last Access:</strong> {new Date(lastAccess).toLocaleString()}
        </div>
      )}
      {lastRequest && (
        <div>
          <strong>Vault's Last Request Time:</strong> {new Date(lastRequest).toLocaleString()}
        </div>
      )}
      
      {/* Send Request Button */}
      <button
        onClick={handleRequest}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        disabled={isPending || isConfirming || !isRequestable}
      >
        {isConfirming || isPending ? 'Processing...' : 'Send Request'}
      </button>
      
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div className="text-green-500 mt-2">Transaction confirmed!</div>}
      
      {/* Show transaction information */}
      {error && (
        <div className="text-red-500 mt-2">
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
      {hash && <div className="text-green-500 mt-2">Transaction Hash: {hash}</div>}
    </div>
  );
};