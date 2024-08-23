"use client"; // Ensure this is treated as a Client Component

import { useEffect, useState } from 'react';

import { useReadContract } from 'wagmi';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { Address, isAddress, zeroAddress } from 'viem';

import { contractAccountAbi } from '../services/abi/contractAccountAbi';

// import { getContractAccount } from '../services/contractAccountFactoryService';

interface HeirManagementProps {
  userAddress: Address; // Ensures that the address is in a valid format
  contractAccountAddress: Address;
}

export const HeirManagement = ({userAddress, contractAccountAddress}: HeirManagementProps) => {
  const [heir, setHeir] = useState('');
  const [nominee, setNominee] = useState('')
  const [pending, setPending] = useState(false)
  const [inputError, setInputError] = useState<string | null>(null);

  const { 
    data: hash,
    error,
    writeContract
  } = useWriteContract()

  const {
    data: config,
    isLoading: isConfigLoading,
    error: configError,
  } = useReadContract({
    abi: contractAccountAbi,
    address: contractAccountAddress,
    functionName: 'config',
    args: [],
  });

  // Effect to set the nominee once the contract config is fetched
  useEffect(() => {
    console.log("checking")
    if (!isConfigLoading && config) {
      console.log('Config Data:', config);
      setNominee(config[3]); // Set the nominee from config[3]
    }
    if (configError) {
      console.log("error")
    }
    console.log("end")
  }, [config, isConfigLoading, configError]);

  // Handle Add Heir logic
  const handleAddHeir = () => {
    if (!heir.trim()) {
      setInputError('Heir address cannot be empty');
      return;
    }

    if (!isAddress(heir)) {
      setInputError('Invalid Ethereum address');
      return;
    }

    console.log('Heir Address:', heir);
    setInputError(null);
    console.log("Contract Account Address:", contractAccountAddress);
    
    writeContract({
      abi: contractAccountAbi,
      address: contractAccountAddress,
      functionName: 'setNominee',
      args: [heir]
    })
    setPending(true);
    setHeir(''); // Clear input after adding heir (optional)
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  if (isConfirmed) {
    setNominee(heir);
    setHeir('');
  }

  if (error) {
    setPending(false);
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Heir Settings</label>
      {/* Input Field for Heir Address */}
      <p>Nominee Address: {nominee != '' ? nominee : 'Not set'}</p>
      <input
        type="text"
        value={heir}
        onChange={(e) => setHeir(e.target.value)}
        disabled={pending}
        placeholder="Enter heir address"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Add Heir Button */}
      <button
        onClick={handleAddHeir}
        className="mt-3 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200"
      >
        Add Heir
      </button>
      {/* Show error message if heir is empty or invalid */}
      {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
    </div>
  );
};