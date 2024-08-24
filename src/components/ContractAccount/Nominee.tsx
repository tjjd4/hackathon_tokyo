import { useEffect, useState } from 'react';
import { BaseError, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address, isAddress } from 'viem';
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
    if (!isConfigLoading && config) {
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
      <label className="block text-2xl font-bold text-gray-700">Nominee Settings</label>
      
      {/* Display Current Nominee Address */}
      <p>Nominee Address: {currentNominee ? currentNominee : 'Not set'}</p>

      {/* Input Field for Nominee Address */}
      <input
        type="text"
        value={nomineeInput}
        onChange={(e) => setNomineeInput(e.target.value)}
        disabled={isPending || isConfirming}
        placeholder="Enter nominee address"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      {/* ENS or Address Input Field */}
      {/* <EnsOrAddressInput
        value={nomineeInput}
        onChange={setNomineeInput}
        disabled={isPending || isConfirming}
      /> */}

      {/* Add Nominee Button */}
      <button
        onClick={handleAddNominee}
        className="mt-3 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200"
        disabled={isPending || isConfirming}
      >
        Add Nominee
      </button>

      {/* Show error message if nomineeInput is empty or invalid */}
      {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
      
      {/* Show transaction information */}
      {error && (
        <div className="text-red-500 text-sm mt-1">Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
    </div>
  );
};
