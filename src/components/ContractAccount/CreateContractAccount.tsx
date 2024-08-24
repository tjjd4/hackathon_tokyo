import { contractAccountFactoryAbi } from '../../services/abi/contractAccountFactoryAbi';
import { contractAccountFactoryAddress } from '../../services/contractAccountFactoryService';
import { Address, zeroAddress } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

interface CreateContractAccountProps {
  userAddress: Address; // Ensures that the address is in a valid format
  contractAccountAddress: Address;
}

function CreateContractAccount({ userAddress, contractAccountAddress }: CreateContractAccountProps) {
  console.log("Contract Address",contractAccountAddress);
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

  return (
    <>
      {(!contractAccountAddress || contractAccountAddress == zeroAddress) && (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleCreateContractAccount}
          disabled={isConfirming || isPending}
        >
          {(isConfirming || isPending) ? 'Creating...' : 'Create Contract Account'}
        </button>
      )}

      {isConfirming && <div className='text-gray-800'>Waiting for confirmation...</div>}
      {isConfirmed && <div className='text-gray-800'>Account created.</div>} 
      {creatingError && <div className='text-gray-800'>Account creation failed.</div>}
    </>
  );
}

export default CreateContractAccount;