import { useEffect, useState } from 'react';
import { 
  BaseError,
  useBalance,
  useReadContract,
  useWatchContractEvent,
} from 'wagmi';
import { Address } from 'viem';
import { contractAccountAbi } from '@/services/abi/contractAccountAbi';

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
  const { data: balanceData, error: balanceError, isLoading: isBalanceLoading, refetch: refetchBalance } = useBalance({
    address: contractAccountAddress,
  });

  useWatchContractEvent({
    address: contractAccountAddress,
    abi: contractAccountAbi,
    eventName: 'PreHookExecuted',
    onLogs(_) {
      console.log("refetching info")
      refetchConfig()
      refetchBalance()
    },
  })

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
      setCurrentBalance(`${balanceData.formatted} ${balanceData.symbol}`);
    }

    if (balanceError) {
      console.log("Error fetching balance:", balanceError.message);
      setCurrentBalance(null);
    }
  }, [balanceData, isBalanceLoading, balanceError])

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Account Information</h3>

      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">Current Balance:</span> {currentBalance && !balanceError ? currentBalance : 'N/A'}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Last Access:</span> {currentLastAccess && !configError ? currentLastAccess : 'N/A'}
        </p>

        <p className="text-gray-700">
          <span className="font-medium">Last Request:</span> {currentLastRequest && !configError ? currentLastRequest : 'N/A'}
        </p>
      </div>

      {configError && (
        <div className="text-red-600 text-sm mt-2">Error: {configError.message}</div>
      )}
      {balanceError && (
        <div className="text-red-600 text-sm mt-2">Error: {(balanceError as BaseError).shortMessage || balanceError.message}</div>
      )}
    </div>
  );
};