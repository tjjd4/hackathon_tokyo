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

  const { 
    data: hash,
    isPending,
    error,
    writeContract
  } = useWriteContract();

  const { data: predecessorAddress, isLoading: isPredecessorAddressLoading, error: predecessorAddressError } = useReadContract({
    abi: heirAccountAbi,
    address: selfHeirAccountAddress,
    functionName: 'predecessorCA',
    args: [],
  });

  useEffect(() => {
    if (!isPredecessorAddressLoading && predecessorAddress && isAddress(predecessorAddress)) {
      setCurrentPredecessorAddress(predecessorAddress);
    }

    if (predecessorAddressError) {
      console.log("Error fetching predecessor Address:", predecessorAddressError.message);
      setCurrentPredecessorAddress(null);
    }
  }, [predecessorAddress, isPredecessorAddressLoading, predecessorAddressError])


  useEffect(() => {
    if (currentPredecessorAddress) {
      const fetch = async () => {
        const { data: config, error: configError } = await useReadContract({
          abi: contractAccountAbi,
          address: currentPredecessorAddress,
          functionName: 'config',
          args: [],
        });

        const {data: withdrawable, error: withdrawableError } = await useReadContract({
          abi: contractAccountAbi,
          address: currentPredecessorAddress,
          functionName: 'isWithdrawable',
          args: [],
        });

        if (withdrawable == false && config[0] > config[2]) {
          setIsRequestable(true);
        } else {
          setIsRequestable(false);
        }
        if (configError) {
          console.error('Error fetching config:', configError.message);
        }
        
        if (withdrawableError) {
          console.error('Error fetching config:', withdrawableError.message);
        }
      };

      fetch();
    }
  }, [currentPredecessorAddress, isConfirmed]);

  const handleRequest = async () => {
    if (!currentPredecessorAddress) {
      alert('No predecessor address found!');
      return;
    }

    writeContract({
      abi: contractAccountAbi,
      address: currentPredecessorAddress,
      functionName: 'requestInactiveAccount',
      args: [],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <>
      <button
        onClick={handleRequest}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        disabled={isPending || isConfirming}
      >
        {isConfirming || isPending ? 'Processing...' : 'Send Request'}
      </button>
      {isConfirmed && <div className="text-green-500 mt-2">Transaction confirmed!</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}

      {/* Show transaction information */}
      {error && (
        <div className="text-red-500 mt-2">
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
      {hash && <div className="text-green-500 mt-2">Transaction Hash: {hash}</div>}
    </>
  );
}