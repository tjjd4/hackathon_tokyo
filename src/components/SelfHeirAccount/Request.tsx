import { useEffect, useState } from 'react';
import { 
  BaseError,
  useBalance,
  useReadContract,
  useWatchContractEvent,
} from 'wagmi';
import { Address, isAddress } from 'viem';
import { heirAccountAbi } from '@/services/abi/heirAccountAbi';

interface RequestProps {
  userAddress: Address; // Ensures that the address is in a valid format
  selfHeirAccountAddress: Address;
}

export const Request = ({ userAddress, selfHeirAccountAddress }: RequestProps) => {
  const [currentPredecessorAddress, setCurrentPredecessorAddress] = useState<Address | null>(null);

  const { data: predecessorAddress, isLoading: isPredecessorAddressLoading, error: predecessorAddressError } = useReadContract({
    abi: heirAccountAbi,
    address: selfHeirAccountAddress,
    functionName: 'predecessorCA',
    args: [],
  });

  useEffect(() => {
    if (!isPredecessorAddressLoading && predecessorAddress && isAddress(predecessorAddress)) {
      setCurrentPredecessorAddress(predecessorAddress);
    }

    if (predecessorAddressError) {
      console.log("Error fetching predecessor Address:", predecessorAddressError.message);
      setCurrentPredecessorAddress(null);
    }
  }, [predecessorAddress, isPredecessorAddressLoading, predecessorAddressError])

  
}