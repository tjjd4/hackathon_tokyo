import { useEffect, useState } from 'react';
import { 
  BaseError,
  useBalance,
  useReadContract,
  useWatchContractEvent,
} from 'wagmi';
import { Address } from 'viem';
import { heirAccountAbi } from '@/services/abi/heirAccountAbi';

interface InfoProps {
  userAddress: Address; // Ensures that the address is in a valid format
  heirAccountAddress: Address;
}

export const Info = ({ userAddress, heirAccountAddress }: InfoProps) => {
  const [currentBalance, setCurrentBalance] = useState<string | null>(null);
  const [currentLastAccess, setCurrentLastAccess] = useState<string | null>(null);
  const [currentLastRequest, setCurrentLastRequest] = useState<string | null>(null);

  // Fetch the contract config
  const { data: heirsAddresses, isLoading: isHeirsAddressesLoading, error: heirsAddressesError, refetch: refetchConfig } = useReadContract({
    abi: heirAccountAbi,
    address: heirAccountAddress,
    functionName: 'getOwners',
    args: [],
  });

  // Fetch the balance of the contract account
  const { data: balanceData, error: balanceError, isLoading: isBalanceLoading, refetch: refetchBalance } = useBalance({
    address: heirAccountAddress,
  });

  // useWatchContractEvent({
  //   address: contractAccountAddress,
  //   abi: heirAccountAbi,
  //   eventName: 'PreHookExecuted',
  //   onLogs(_) {
  //     console.log("refetching info")
  //     refetchConfig()
  //     refetchBalance()
  //   },
  // })

  // Effect to set balance and contract config details once fetched
  // useEffect(() => {
  //   if (!isConfigLoading && config) {
  //     if (config[0] == 0) {
  //       setCurrentLastAccess('No Activity yet');
  //     } else {
  //       const lastAccessDate = new Date(config[0] * 1000);
  //       setCurrentLastAccess(lastAccessDate.toLocaleString());
  //     }

  //     if (config[2] == 0) {
  //       setCurrentLastRequest("No request yet");
  //     } else {
  //       const lastRequestDate = new Date(config[2] * 1000);
  //       setCurrentLastRequest(lastRequestDate.toLocaleString());
  //     }
  //   }

  //   if (configError) {
  //     console.log("Error fetching config:", configError);
  //   }
  // }, [config, configError]);

  useEffect(() => {
    if (!isBalanceLoading && balanceData) {
      console.log("balance data", balanceData)
      setCurrentBalance(`${balanceData.formatted} ${balanceData.symbol}`);
    }

    if (balanceError) {
      console.log("Error fetching balance:", balanceError.message);
    }
  }, [, balanceData, balanceError])

  return (
    <>
      <label className="block text-2xl font-bold text-gray-700">Account Information</label>

      {/* Display Current Balance */}
      <p>Current Balance: {currentBalance !== null ? currentBalance : 'Loading...'}</p>

      {/* Display Heirs Addresses */}
      <h3 className="mt-4 text-xl font-semibold text-gray-700">Heir Addresses</h3>
      {!isHeirsAddressesLoading && heirsAddresses && heirsAddresses.length > 0 ? (
        <ul className="mt-2 list-disc list-inside">
          {heirsAddresses.map((address: Address, index: number) => (
            <li key={index} className="text-gray-800">{address}</li>
          ))}
        </ul>
      ) : (
        <p>{isHeirsAddressesLoading ? 'Loading heir addresses...' : 'No heir addresses found'}</p>
      )}

      {/* Handle errors */}
      {heirsAddressesError && (
        <div className="text-red-500 text-sm mt-1">Error: {heirsAddressesError.message}</div>
      )}
      {balanceError && (
        <div className="text-red-500 text-sm mt-1">Error: {(balanceError as BaseError).shortMessage || balanceError.message}</div>
      )}
    </>
  );
};
