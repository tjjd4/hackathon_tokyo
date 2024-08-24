"use client"; // Ensure this is treated as a Client Component

import { useEffect, useState } from 'react';
import { BaseError, useBalance, useReadContract } from 'wagmi';
import { Address } from 'viem';
import { contractAccountAbi } from '../services/abi/contractAccountAbi';

interface InfoProps {
  userAddress: Address; // Ensures that the address is in a valid format
  contractAccountAddress: Address;
}

export const Info = ({ userAddress, contractAccountAddress }: InfoProps) => {
  const [currentBalance, setCurrentBalance] = useState<string | null>(null);
  const [currentLastAccess, setCurrentLastAccess] = useState<string | null>(null);
  const [currentLastRequest, setCurrentLastRequest] = useState<string | null>(null);

  // Fetch the contract config
  const { data: config, isLoading: isConfigLoading, error: configError, refetch: refetchConfig } = useReadContract({
    abi: contractAccountAbi,
    address: contractAccountAddress,
    functionName: 'config',
    args: [],
  });

  // Fetch the balance of the contract account
  const { data: balanceData, error: balanceError, isLoading: isBalanceLoading } = useBalance({
    address: contractAccountAddress,
  });

  // Effect to set balance and contract config details once fetched
  useEffect(() => {
    if (!isConfigLoading && config) {
      if (config[0] == 0) {
        setCurrentLastAccess('No Activity yet');
      } else {
        const lastAccessDate = new Date(config[0] * 1000);
        setCurrentLastAccess(lastAccessDate.toLocaleString());
      }

      if (config[2] == 0) {
        setCurrentLastRequest("No request yet");
      } else {
        const lastRequestDate = new Date(config[2] * 1000);
        setCurrentLastRequest(lastRequestDate.toLocaleString());
      }
    }

    if (configError) {
      console.log("Error fetching config:", configError);
    }
  }, [config, configError]);

  useEffect(() => {
    if (!isBalanceLoading && balanceData) {
      setCurrentBalance(`${balanceData.decimals} ${balanceData.symbol}`);
    }

    if (balanceError) {
      console.log("Error fetching balance:", balanceError.message);
    }
  }, [, balanceData, balanceError])

  return (
    <div className="mb-4">
      <label className="block text-2xl font-bold text-gray-700">Account Information</label>

      {/* Display Current Balance */}
      <p>Current Balance: {currentBalance !== null ? currentBalance : 'Loading...'}</p>

      {/* Display Last Access */}
      <p>Last Access: {currentLastAccess !== null ? currentLastAccess : 'Not set'}</p>

      {/* Display Last Request */}
      <p>Last Request: {currentLastRequest !== null ? currentLastRequest : 'Not set'}</p>

      {/* Handle errors */}
      {configError && (
        <div className="text-red-500 text-sm mt-1">Error: {configError.message}</div>
      )}
      {balanceError && (
        <div className="text-red-500 text-sm mt-1">Error: {(balanceError as BaseError).shortMessage || balanceError.message}</div>
      )}
    </div>
  );
};
