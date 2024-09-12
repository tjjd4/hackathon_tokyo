import { useEffect, useState } from 'react';
import { BaseError, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address } from 'viem';
import { contractAccountAbi } from '@/services/abi/contractAccountAbi';

interface TimeoutProps {
  userAddress: Address; // Ensures that the address is in a valid format
  contractAccountAddress: Address;
}

export const Timeout = ({ userAddress, contractAccountAddress }: TimeoutProps) => {
  const [timeoutInput, setTimeoutInput] = useState('');
  const [currentTimeout, setCurrentTimeout] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  // Fetch the contract config (including the timeout)
  const { data: config, isLoading: isConfigLoading, error: configError, refetch: refetchConfig } = useReadContract({
    abi: contractAccountAbi,
    address: contractAccountAddress,
    functionName: 'config',
    args: [],
  });

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  // Effect to set the timeout once the contract config is fetched
  useEffect(() => {
    if (!isConfigLoading && config) {
      setCurrentTimeout(config[1]?.toString()); // Set the timeout from config[1]
    }

    if (configError) {
      console.log("Error fetching config:", configError);
      setCurrentTimeout(null);
    }
  }, [config, isConfigLoading, configError]);

  // Handle setting new timeout logic
  const handleSetTimeout = () => {

    const timeoutValue = Number(timeoutInput);

    // Validate the input
    if (isNaN(timeoutValue) || timeoutValue < 0 || timeoutValue > 281474976710655) {
      setInputError('Timeout must be a valid number within the uint48 range (0 to 281474976710655)');
      return;
    }

    setInputError(null);

    // Write to the contract
    writeContract({
      abi: contractAccountAbi,
      address: contractAccountAddress,
      functionName: 'setTimeout',
      args: [timeoutValue], // Convert timeout to BigInt for contract interaction
    });
  };

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Refetch contract data after transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      refetchConfig(); // Refetch the contract config to get the updated timeout value
      setTimeoutInput(''); // Clear the input
    }
  }, [isConfirmed, isConfirming]);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Timeout Settings</h3>

      <p className="text-gray-700 mb-2">
        <span className="font-medium">Current Timeout:</span> {currentTimeout && currentTimeout !== '0' ? `${currentTimeout} seconds` : 'Not set'}
      </p>

      <input
        type="text"
        value={timeoutInput}
        onChange={(e) => setTimeoutInput(e.target.value)}
        disabled={isPending || isConfirming}
        placeholder="Enter timeout (in seconds)"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      />

      <button
        onClick={handleSetTimeout}
        className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
        disabled={isPending || isConfirming}
      >
        {isPending || isConfirming ? 'Processing...' : 'Set Timeout'}
      </button>

      {inputError && <p className="text-red-600 text-sm mt-1">{inputError}</p>}

      {hash && <div className="text-gray-600 text-sm mt-2">Transaction Hash: {hash}</div>}
      {isConfirming && <div className="text-blue-600 text-sm mt-2">Waiting for confirmation...</div>}
      {isConfirmed && <div className="text-green-600 text-sm mt-2">Transaction confirmed.</div>}

      {error && (
        <div className="text-red-600 text-sm mt-2">Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
      {configError && (
        <div className="text-red-600 text-sm mt-2">Error: {configError.message}</div>
      )}
    </div>
  );
};