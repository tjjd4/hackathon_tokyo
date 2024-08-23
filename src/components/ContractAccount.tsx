import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { contractAccountFactoryConfig } from '../services/contractAccountFactoryService';
import { contractAccountFactoryAbi } from '../services/abi/contractAccountFactoryAbi';
import { contractAccountFactoryAddress } from '../services/contractAccountFactoryService';
import { useAccount } from 'wagmi';
import { Address, zeroAddress } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

interface ContractAccountProps {
  userAddress: Address; // Ensures that the address is in a valid format
  setContractAccountAddress: (address: Address | null) => void;
}

function ContractAccount({ userAddress, setContractAccountAddress }: ContractAccountProps) {
  const [creating, setCreating] = useState(false);

  const { 
    data: hash,
    isPending,
    error: creatingError,
    writeContract
  } = useWriteContract()

  const {
    data: contractAccountAddress,
    error,
    isLoading,
  } = useReadContract({
    ...contractAccountFactoryConfig,
    functionName: 'deployedContracts',
    args: [userAddress],
  });

  

  const handleCreateContractAccount = async () => {
    setCreating(true);
    
    if (!isLoading && contractAccountAddress == zeroAddress) {
      writeContract({
        abi: contractAccountFactoryAbi,
        address: contractAccountFactoryAddress,
        functionName: 'createContractAccount',
        args: [],
      })
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  })


  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  if (isConfirmed || creatingError) {
    setCreating(false);
  }

  setContractAccountAddress(contractAccountAddress!);

  return (
    <div className="bg-white rounded-lg p-8 text-center">
      <h2 className="text-l font-bold text-gray-800 mb-4">Smart Contract Account Address:</h2>
      <p className="text-l font-semibold text-blue-600">
        {contractAccountAddress && contractAccountAddress != zeroAddress ? `${contractAccountAddress.toString()}` : 'No Account Found'}
      </p>
      {contractAccountAddress === zeroAddress && (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleCreateContractAccount}
          disabled={creating || isLoading}
        >
          {creating ? 'Creating...' : 'Create Contract Account'}
        </button>
      )}
      {isConfirming && <div className='text-gray-800'>Waiting for confirmation...</div>}
      {isConfirmed && <div className='text-gray-800'>Account created.</div>} 
      {creatingError && <div className='text-gray-800'>Account creation failed.</div>}
    </div>
  );
}

export default ContractAccount;