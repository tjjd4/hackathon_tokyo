import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // For routing
import { useAccount } from 'wagmi';
import { Address, zeroAddress } from 'viem';
import { useReadContract } from 'wagmi';

import { heirAccountFactoryConfig } from "@/services/heirAccountFactoryService";

import { Info } from "@/components/HeirAccount/Info";
import { Heirs } from "@/components/HeirAccount/Heirs";
import CreateHeirAccount from "@/components/HeirAccount/CreateHeirAccount";

function HeirAccount() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [heirAccountAddress, setHeirAccountAddress] = useState<Address | null>(null);
  const [hasHeirAccount, setHasHeirAccount] = useState(false);
  
  // Redirect to connect wallet page if the wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  const {
    data,
    error,
    isLoading,
  } = useReadContract({
    ...heirAccountFactoryConfig,
    functionName: 'predecessorToVault',
    args: [address!],
  });

  useEffect(() => {
    console.log(data)
    if (data && data != zeroAddress) {
      setHasHeirAccount(true)
      setHeirAccountAddress(data);
    } else {
      console.log("Set `Has account` false");
      setHasHeirAccount(false);
      setHeirAccountAddress(null);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Heir Account Settings</h1>

        <h2 className="text-l font-bold text-gray-800 mb-4">Heir Smart Contract Account Address:</h2>
        <p className="text-l font-semibold text-blue-600">
          {(heirAccountAddress && heirAccountAddress != zeroAddress) ? `${heirAccountAddress.toString()}` : 'No Account Found'}
        </p>
          {hasHeirAccount ? (
            <>
              <Info
                userAddress={address as Address} 
                heirAccountAddress={heirAccountAddress as Address}
              />
              <Heirs
                userAddress={address as Address} 
                heirAccountAddress={heirAccountAddress as Address} 
              />
            </>
          ) : (
            <CreateHeirAccount 
              userAddress={address as Address} 
              heirAccountAddress={heirAccountAddress as Address}
            />
          )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          {/* Link for Cancel using react-router-dom */}
          <Link
            to="/"
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeirAccount;