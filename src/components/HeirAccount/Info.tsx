import { useEffect, useState } from 'react';
import { 
  BaseError,
  useBalance,
  useReadContract,
  useWatchContractEvent,
} from 'wagmi';
import { Address, isAddress } from 'viem';
import { heirAccountAbi } from '@/services/abi/heirAccountAbi';

interface InfoProps {
  userAddress: Address; // Ensures that the address is in a valid format
  heirAccountAddress: Address;
}

export const Info = ({ userAddress, heirAccountAddress }: InfoProps) => {
  const [currentPredecessorAddress, setCurrentPredecessorAddress] = useState<Address | null>(null);
  const [currentBalance, setCurrentBalance] = useState<string | null>(null);

  // Fetch the contract config
  const { data: predecessorAddress, isLoading: isPredecessorAddressLoading, error: predecessorAddressError } = useReadContract({
    abi: heirAccountAbi,
    address: heirAccountAddress,
    functionName: 'predecessorCA',
    args: [],
  });

  // Fetch the balance of the contract account
  const { data: balanceData, error: balanceError, isLoading: isBalanceLoading, refetch: refetchBalance } = useBalance({
    address: heirAccountAddress,
  });

  useWatchContractEvent({
    address: heirAccountAddress,
    abi: heirAccountAbi,
    eventName: 'ExecuteTransaction',
    onLogs(_) {
      console.log("refetching info")
      refetchBalance()
    },
  })

  useEffect(() => {
    if (!isPredecessorAddressLoading && predecessorAddress && isAddress(predecessorAddress)) {
      console.log("Predecessor Address", predecessorAddress)
      setCurrentPredecessorAddress(predecessorAddress);
    }

    if (predecessorAddressError) {
      console.log("Error fetching predecessor Address:", predecessorAddressError.message);
      setCurrentPredecessorAddress(null);
    }
  }, [balanceData, balanceError])

  useEffect(() => {
    if (!isBalanceLoading && balanceData) {
      console.log("balance data", balanceData)
      setCurrentBalance(`${balanceData.formatted} ${balanceData.symbol}`);
    }

    if (balanceError) {
      console.log("Error fetching balance:", balanceError.message);
      setCurrentBalance(null);
    }
  }, [balanceData, balanceError])

  return (
    <>
      <label className="block text-2xl font-bold text-gray-700">Account Information</label>

      {/* Display Current Balance */}
      <p>Predecessor Address: {(currentPredecessorAddress && !predecessorAddressError) && currentPredecessorAddress}</p>
      <p>Current Balance: {(currentBalance && !balanceError) && currentBalance}</p>

      {/* Handle errors */}
      {predecessorAddressError && (
        <div className="text-red-500 text-sm mt-1">Error: {predecessorAddressError.message}</div>
      )}
      {balanceError && (
        <div className="text-red-500 text-sm mt-1">Error: {(balanceError as BaseError).shortMessage || balanceError.message}</div>
      )}
    </>
  );
};
