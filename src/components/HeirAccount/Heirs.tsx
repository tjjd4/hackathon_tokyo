import { useEffect, useState } from 'react';
import { 
  BaseError,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { Address, isAddress } from 'viem';
import { heirAccountAbi } from '@/services/abi/heirAccountAbi';

interface HeirsProps {
  userAddress: Address; // Ensures that the address is in a valid format
  heirAccountAddress: Address;
}

export const Heirs = ({ userAddress, heirAccountAddress }: HeirsProps) => {
  const [currentHeirsAddresses, setCurrentHeirsAddresses] = useState<Address[] | null>(null);
  const [selectedHeir, setSelectedHeir] = useState<Address | null>(null); // For the dropdown
  const [newAddress, setNewAddress] = useState<string>(''); // For the input field
  const [inputError, setInputError] = useState<string | null>(null); // For input validation

  const { 
    data: hash,
    isPending,
    error: adjustHeirError,
    writeContract
  } = useWriteContract();

  const { 
    data, 
    isLoading: isHeirsAddressesLoading, 
    error: heirsAddressesError, 
    refetch: refetchHeirsAddress
  } = useReadContract({
    abi: heirAccountAbi,
    address: heirAccountAddress,
    functionName: 'getSigners',
    args: [],
  });

  useEffect(() => {
    if (data && !isHeirsAddressesLoading && data.length > 0) {
      setCurrentHeirsAddresses([...data]);
    }
    if (heirsAddressesError) {
      console.log("Error fetching Heirs Addresses:", heirsAddressesError.message);
      setCurrentHeirsAddresses(null);
    }
  }, [data, isHeirsAddressesLoading, heirsAddressesError]);

  const handleAjustHeir = () => {
    if (!selectedHeir || !isAddress(newAddress)) {
      setInputError('Invalid Ethereum address');
      return;
    }

    setInputError(null); // Clear the error if everything is valid

    // Call the contract function with selectedHeir and newAddress
    writeContract({
      abi: heirAccountAbi,
      address: heirAccountAddress,
      functionName: 'adjustSigner',
      args: [selectedHeir, newAddress],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      refetchHeirsAddress();
      setNewAddress(''); // Clear the input
    }
  }, [isConfirming, isConfirmed])

  return (
    <div className="text-white">
      <h3 className="mt-4 text-xl font-semibold">Heir Addresses</h3>
      {!isHeirsAddressesLoading && currentHeirsAddresses && currentHeirsAddresses.length > 0 ? (
        <ul className="mt-2 list-disc list-inside">
          {currentHeirsAddresses.map((address: Address, index: number) => (
            <li key={index} className="text-gray-300">{address}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">{isHeirsAddressesLoading ? 'Loading heir addresses...' : 'No heir addresses found'}</p>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium">Select Heir to Adjust</label>
        <select
          className="mt-2 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
          value={selectedHeir || ''}
          onChange={(e) => setSelectedHeir(e.target.value as Address)}
        >
          {currentHeirsAddresses?.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">New Heir Address</label>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter new heir address"
          className={`mt-1 block w-full p-2 bg-gray-700 border ${
            inputError ? 'border-red-500' : 'border-gray-600'
          } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white`}
        />
        {inputError && (
          <p className="text-red-400 text-sm mt-1">{inputError}</p>
        )}
      </div>

      <div className="mt-4">
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleAjustHeir}
          disabled={isPending || !selectedHeir || newAddress.trim() === ''}
        >
          {isPending ? 'Adjusting...' : 'Adjust Heir'}
        </button>
      </div>

      {isConfirming && <div className="text-blue-300 mt-2">Waiting for confirmation...</div>}
      {isConfirmed && <div className="text-green-300 mt-2">Transaction confirmed.</div>}

      {heirsAddressesError && (
        <div className="text-red-400 text-sm mt-1">Error: {heirsAddressesError.message}</div>
      )}
      {adjustHeirError && (
        <div className="text-red-400 text-sm mt-1">Error: {(adjustHeirError as BaseError).shortMessage || adjustHeirError.message}</div>
      )}
    </div>
  );
};