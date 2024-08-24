import { useEffect, useState } from 'react';
import { heirAccountFactoryAbi } from '@/services/abi/heirAccountFactoryAbi';
import { heirAccountFactoryAddress } from '@/services/heirAccountFactoryService';
import { Address, isAddress, zeroAddress } from 'viem';
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

interface CreateHeirAccountProps {
  userAddress: Address;
  contractAccountAddress: Address;
  heirAccountAddress: Address;
  refetch: () => void;
}

function CreateHeirAccount({ userAddress, contractAccountAddress, heirAccountAddress, refetch }: CreateHeirAccountProps) {
  const [addresses, setAddresses] = useState<string[]>(['']); // Start with one input field
  const [inputErrors, setInputErrors] = useState<string[]>([]); // Track errors for each input

  const { 
    data: hash,
    isPending,
    error: creatingError,
    writeContract
  } = useWriteContract();

  const handleCreateHeirAccount = async () => {
    const newInputErrors = addresses.map((address) => {
      if (address.trim() === '') {
        return 'This field is required';
      }
      if (!isAddress(address)) {
        return 'Invalid Ethereum address';
      }
      return ''; // No error
    });

    // Set errors in state
    setInputErrors(newInputErrors);

    // Check if there are any errors
    const hasErrors = newInputErrors.some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    // Ensure all inputs are filled and valid before writing to the contract
    const validAddresses: Address[] = addresses.map((address) => address as Address);
    if (validAddresses.length != addresses.length) {
      return;
    }

    // Write to the contract with the list of addresses
    writeContract({
      abi: heirAccountFactoryAbi,
      address: heirAccountFactoryAddress,
      functionName: 'createVault',
      args: [validAddresses, contractAccountAddress],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
  useWaitForTransactionReceipt({
    hash,
  });
  
  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, isConfirming]);

  // Add a new input field
  const handleAddAddress = () => {
    setAddresses([...addresses, '']);
    setInputErrors([...inputErrors, '']); // Add corresponding error field
  };

  // Remove an input field by index
  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    const updatedErrors = inputErrors.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    setInputErrors(updatedErrors);
  };

  // Update an address in the list
  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? value : address
    );
    setAddresses(updatedAddresses);

    // Clear the error as soon as the user modifies the field
    const updatedErrors = inputErrors.map((error, i) =>
      i === index ? '' : error
    );
    setInputErrors(updatedErrors);
  };

  return (
    <div>
      {(!heirAccountAddress || heirAccountAddress === zeroAddress) && (
        <div>
          <h2 className="text-l font-bold mb-2">Add Wallet Owners</h2>

          {addresses.map((address, index) => (
            <div key={index} className="mb-4 flex items-start space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                  placeholder={`Enter address ${index + 1}`}
                  className={`mt-1 block w-full p-2 border ${
                    inputErrors[index] ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
                {inputErrors[index] && (
                  <p className="text-red-500 text-sm mt-1">{inputErrors[index]}</p>
                )}
              </div>
              {addresses.length > 1 && index > 0 && (
                <button
                  type="button"
                  className="mt-1 text-red-500"
                  onClick={() => handleRemoveAddress(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddAddress}
            className="mt-3 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Add Another Address
          </button>

          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleCreateHeirAccount}
            disabled={isConfirming || isPending}
          >
            {(isConfirming || isPending) ? 'Creating...' : 'Create Contract Account'}
          </button>

          {isConfirming && <div className='text-gray-800'>Waiting for confirmation...</div>}
          {isConfirmed && <div className='text-gray-800'>Account created.</div>}
          {creatingError && <div className='text-red-500'>Account creation failed: {(creatingError as BaseError).shortMessage || creatingError.message}</div>}
        </div>
      )}
    </div>
  );
}

export default CreateHeirAccount;
