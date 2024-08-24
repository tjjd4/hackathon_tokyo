import { useEffect, useState } from 'react';
import { BaseError, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address, isAddress, zeroAddress } from 'viem';
import { contractAccountAbi } from '@/services/abi/contractAccountAbi';

import { EnsOrAddressInput } from '@/components/EnsOrAddressInput';

interface NomineeProps {
  userAddress: Address; // Ensures that the address is in a valid format
  contractAccountAddress: Address;
}

export const Nominee = ({ userAddress, contractAccountAddress }: NomineeProps) => {
  const [nomineeInput, setNomineeInput] = useState('');
  const [currentNominee, setCurrentNominee] = useState<Address | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const { 
    data: hash,
    isPending,
    error,
    writeContract
  } = useWriteContract();

  const {
    data: config,
    isLoading: isConfigLoading,
    error: configError,
    refetch: refetchConfig,
  } = useReadContract({
    abi: contractAccountAbi,
    address: contractAccountAddress,
    functionName: 'config',
    args: [],
  });

  // Effect to set the current nominee once the contract config is fetched
  useEffect(() => {
    if (!isConfigLoading && config && isAddress(config[3]) && config[3] != zeroAddress) {
      setCurrentNominee(config[3]); // Set the current nominee from config[3]
    }
    if (configError) {
      console.log("Error fetching config:", configError);
      setCurrentNominee(null);
    }
  }, [config, isConfigLoading, configError]);

  // Handle Add Nominee logic
  const handleAddNominee = () => {
    if (!nomineeInput.trim()) {
      setInputError('Nominee address cannot be empty');
      return;
    }

    if (!isAddress(nomineeInput)) {
      setInputError('Invalid Ethereum address');
      return;
    }

    setInputError(null);

    writeContract({
      abi: contractAccountAbi,
      address: contractAccountAddress,
      functionName: 'setNominee',
      args: [nomineeInput],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Update the current nominee after transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      refetchConfig();
      setNomineeInput(''); // Clear the input
    }
  }, [isConfirmed, isConfirming]);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Nominee Settings</h3>
      
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Nominee Address:</span> {currentNominee ? currentNominee : 'Not set'}
      </p>

      <input
        type="text"
        value={nomineeInput}
        onChange={(e) => setNomineeInput(e.target.value)}
        disabled={isPending || isConfirming}
        placeholder="Enter nominee address"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      />

      <button
        onClick={handleAddNominee}
        className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
        disabled={isPending || isConfirming}
      >
        {isPending || isConfirming ? 'Processing...' : 'Add Nominee'}
      </button>

      {inputError && <p className="text-red-600 text-sm mt-1">{inputError}</p>}
      
      {error && (
        <div className="text-red-600 text-sm mt-2">Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
      {hash && <div className="text-gray-600 text-sm mt-2">Transaction Hash: {hash}</div>}
      {isConfirming && <div className="text-blue-600 text-sm mt-2">Waiting for confirmation...</div>}
      {isConfirmed && <div className="text-green-600 text-sm mt-2">Transaction confirmed.</div>}
    </div>
  );
};