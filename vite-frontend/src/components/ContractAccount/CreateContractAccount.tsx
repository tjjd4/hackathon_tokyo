import { useEffect } from 'react';

import { contractAccountFactoryAbi } from '@/services/abi/contractAccountFactoryAbi';
import { contractAccountFactoryAddress } from '@/services/contractAccountFactoryService';
import { Address, zeroAddress } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

interface CreateContractAccountProps {
  userAddress: Address; // Ensures that the address is in a valid format
  contractAccountAddress: Address;
  refetch: () => void;
}

function CreateContractAccount({ userAddress, contractAccountAddress, refetch }: CreateContractAccountProps) {
  const { 
    data: hash,
    isPending,
    error: creatingError,
    writeContract
  } = useWriteContract()

  const handleCreateContractAccount = async () => {
    writeContract({
      abi: contractAccountFactoryAbi,
      address: contractAccountFactoryAddress,
      functionName: 'createContractAccount',
      args: [],
    })
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, isConfirming]);

  return (
    <div className="mb-4">
      {(!contractAccountAddress || contractAccountAddress == zeroAddress) && (
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
          onClick={handleCreateContractAccount}
          disabled={isConfirming || isPending}
        >
          {(isConfirming || isPending) ? 'Creating...' : 'Create Contract Account'}
        </button>
      )}

      {isConfirming && <div className='text-blue-600 text-sm mt-2'>Waiting for confirmation...</div>}
      {isConfirmed && <div className='text-green-600 text-sm mt-2'>Account created successfully.</div>} 
      {creatingError && <div className='text-red-600 text-sm mt-2'>Account creation failed. Please try again.</div>}
    </div>
  );
}

export default CreateContractAccount;