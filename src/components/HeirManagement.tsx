"use client"; // Ensure this is treated as a Client Component

import { useState } from 'react';

import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { Address, isAddress } from 'viem';

import { contractAccountAbi } from '../services/abi/contractAccountAbi';

// import { getContractAccount } from '../services/contractAccountFactoryService';

interface HeirManagementProps {
  userAddress: Address; // Ensures that the address is in a valid format
  contractAccountAddress: Address;
}

export const HeirManagement = ({userAddress, contractAccountAddress}: HeirManagementProps) => {
  const [heir, setHeir] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { 
    data: hash, 
    isPending,
    writeContract 
  } = useWriteContract() 

  // Handle Add Heir logic
  const handleAddHeir = () => {
    if (!heir.trim()) {
      setError('Heir address cannot be empty');
      return;
    }

    if (!isAddress(heir)) {
      setError('Invalid Ethereum address');
      return;
    }

    console.log('Heir Address:', heir);
    setError(null);
    console.log("Contract Account Address:", contractAccountAddress);
    
    writeContract({
      abi: contractAccountAbi,
      address: contractAccountAddress,
      functionName: 'setNominee',
      args: [heir]
    })

    setHeir(''); // Clear input after adding heir (optional)
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Heir Settings</label>
      
      {/* Input Field for Heir Address */}
      <input
        type="text"
        value={heir}
        onChange={(e) => setHeir(e.target.value)}
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
    </div>
  );
};