import { useEffect, useState } from 'react';
import { 
  BaseError,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContracts
} from 'wagmi';
import { Address } from 'viem';
import { heirAccountAbi } from '@/services/abi/heirAccountAbi';

interface WillProps {
  userAddress: Address; // Ensures that the address is in a valid format
  heirAccountAddress: Address;
}

export const Will = ({ userAddress, heirAccountAddress }: WillProps) => {
  const [signers, setSigners] = useState<`0x${string}`[] | null>(null);
  const [willPortions, setWillPortions] = useState<bigint[]>([]);
  const [isWillSet, setIsWillSet] = useState<boolean>(false);
  const [newPortions, setNewPortions] = useState<bigint[]>([]);
  const [inputErrors, setInputErrors] = useState<string | null>(null);

  // Check if the will is set
  const { 
    data: isWillSetData,
    isLoading: isWillSetLoading,
    error: willSetError,
  } = useReadContract({
    abi: heirAccountAbi,
    address: heirAccountAddress,
    functionName: 'predecessorMakeAWill',
    args: [],
  });

  // Fetch the signers
  const { 
    data: signersData,
    isLoading: isSignersLoading,
    error: signersError,
  } = useReadContract({
    abi: heirAccountAbi,
    address: heirAccountAddress,
    functionName: 'getSigners',
    args: [],
  });

  // Effect to update the state when data is fetched
  useEffect(() => {
    if (isWillSetData !== undefined && !isWillSetLoading) {
      setIsWillSet(isWillSetData);
    }

    if (signersData && !isSignersLoading && signersData.length > 0) {
      setSigners([...signersData]);
    }

    if (signersError) {
      setSigners(null);
    }
  }, [isWillSetData, isWillSetLoading, signersData, isSignersLoading, signersError]);

  // Fetch willPortions for each signer after signers are set
  const contracts = signers?.map((signer) => ({
    abi: heirAccountAbi,
    address: heirAccountAddress,
    functionName: 'willPortions',
    args: [signer],
  }));

  const {
    data: portionsData,
    error: portionsError
  } = useReadContracts({
    contracts: contracts || [],
  });

  useEffect(() => {
    if (portionsData && !portionsError) {
      setWillPortions(portionsData.map((portion: any) => BigInt(portion)));
      setNewPortions(portionsData.map((portion: any) => BigInt(portion))); // Initialize newPortions
    }

    if (portionsError) {
      console.error('Error fetching will portions:', portionsError);
    }
  }, [portionsData, portionsError]);

  const { 
    data: hash,
    isPending,
    error: willError,
    writeContract
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMakeAWill = () => {
    // Validate newPortions input
    if (newPortions.some(portion => portion <= 0n)) {
      setInputErrors('All portions must be positive numbers');
      return;
    }

    setInputErrors(null);

    // Ensure signers and newPortions are not null before calling the contract function
    if (signers && newPortions.length === signers.length) {
      // Call contract's MakeAWill function with newPortions
      writeContract({
        abi: heirAccountAbi,
        address: heirAccountAddress,
        functionName: 'MakeAWill',
        args: [signers, newPortions],
      });
    }
  };

  return (
    <div className="text-white">
      <h3 className="mt-4 text-xl font-semibold">Will Settings</h3>

      {/* Display Will Status */}
      {!isWillSetLoading && (
        <p className="text-gray-300">Will is {isWillSet ? 'set' : 'not set'}</p>
      )}

      {/* Display Signers and Will Portions */}
      {signers && signers.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Signers and Will Portions</h4>
          <ul className="mt-2 space-y-2">
            {signers.map((signer, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{signer}</span>
                <input
                  type="number"
                  value={newPortions[index]?.toString() || ''}
                  onChange={(e) => {
                    const updatedPortions = [...newPortions];
                    updatedPortions[index] = BigInt(e.target.value);
                    setNewPortions(updatedPortions);
                  }}
                  className="w-20 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Handling */}
      {inputErrors && (
        <p className="text-red-400 text-sm mt-2">{inputErrors}</p>
      )}

      {/* Make a Will Button */}
      <div className="mt-4">
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleMakeAWill}
          disabled={isPending || isConfirming || !signers || signers.length === 0}
        >
          {isPending || isConfirming ? 'Making Will...' : 'Make A Will'}
        </button>
      </div>

      {/* Transaction Status */}
      {isConfirming && <div className="text-blue-300 mt-2">Waiting for confirmation...</div>}
      {isConfirmed && <div className="text-green-300 mt-2">Will has been updated.</div>}
      {willError && <div className="text-red-400 text-sm mt-2">Error: {(willError as BaseError).shortMessage || willError.message}</div>}
    </div>
  );
};
