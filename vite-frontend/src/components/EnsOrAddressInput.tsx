import { useState, useEffect } from 'react';
import { useEnsAddress } from 'wagmi';
import { isAddress } from 'viem';

interface EnsOrAddressInputProps {
  value: string;
  onChange: (resolvedAddress: string) => void;
  disabled: boolean;
}

export const EnsOrAddressInput = ({ value, onChange, disabled }: EnsOrAddressInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);

  const isEnsName = inputValue.endsWith('.eth') && !isAddress(inputValue);

  // We only use the useEnsAddress hook if the input is an ENS name
  const { data: ensAddress, isLoading: isResolvingEns } = isEnsName
    ? useEnsAddress({
        name: inputValue,
      })
    : { data: null, isLoading: false };

  useEffect(() => {
    if (isAddress(inputValue)) {
      setError(null);
      setResolvedAddress(inputValue); // Direct address
      onChange(inputValue);
    } else if (ensAddress) {
      setError(null);
      setResolvedAddress(ensAddress); // Resolved ENS
      onChange(ensAddress);
    } else if (isEnsName && !ensAddress && !isResolvingEns) {
      setError('Could not resolve ENS name.');
    } else if (!isAddress(inputValue) && !isEnsName) {
      setError('Invalid Ethereum address or ENS name.');
    } else {
      setError(null);
    }
  }, [inputValue, ensAddress, isResolvingEns, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setResolvedAddress(null);
    setError(null); // Reset the error when the input changes
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        disabled={disabled}
        placeholder="Enter ENS name or address"
        className={`mt-1 block w-full p-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {isResolvingEns && <p className="text-gray-500 text-sm mt-1">Resolving ENS...</p>}
    </div>
  );
};
