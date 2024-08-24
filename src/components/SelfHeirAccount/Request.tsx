import { useEffect, useState } from 'react';
import { 
  BaseError,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { Address, isAddress } from 'viem';

import { contractAccountAbi } from '@/services/abi/contractAccountAbi';
import { heirAccountAbi } from '@/services/abi/heirAccountAbi';

interface RequestProps {
  userAddress: Address; // Ensures that the address is in a valid format
  selfHeirAccountAddress: Address;
}

export const Request = ({ userAddress, selfHeirAccountAddress }: RequestProps) => {
  const [currentPredecessorAddress, setCurrentPredecessorAddress] = useState<Address | null>(null);

  const { 
    data: hash,
    isPending,
    error,
    writeContract
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

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

  if (currentPredecessorAddress && isAddress(currentPredecessorAddress)) {
    const {
      data: config,
      isLoading: isConfigLoading,
      error: configError,
      refetch: refetchConfig,
    } = useReadContract({
      abi: contractAccountAbi,
      address: currentPredecessorAddress,
      functionName: 'config',
      args: [],
    });
  }

  const handleRequest = async () => {
    if (!currentPredecessorAddress) {
      alert('No predecessor address found!');
      return;
    }

    writeContract({
      abi: contractAccountAbi,
      address: currentPredecessorAddress,
      functionName: 'requestInactiveAccount',
      args: [], // Adjust the args based on the smart contract function signature
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      refetchConfig();
    }
    if (!isConfirming && !isConfirmed) {
      console.log("Error: ", );
    }
  }, [isConfirming, isConfirmed])

  return (
    <>
    </>
  );
}