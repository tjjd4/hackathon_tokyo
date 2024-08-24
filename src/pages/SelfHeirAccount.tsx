import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // For routing
import { useAccount } from 'wagmi';
import { Address, zeroAddress } from 'viem';
import { useReadContract } from 'wagmi';

import { heirAccountFactoryConfig } from "@/services/heirAccountFactoryService";

import { Info } from "@/components/SelfHeirAccount/Info";

function SelfHeirAccount() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [selfHeirAccountAddress, setSelfHeirAccountAddress] = useState<Address | null>(null);
  const [hasSelfHeirAccount, setHasSelfHeirAccount] = useState(false);
  
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
    functionName: 'heirToVault',
    args: [address!],
  });

  useEffect(() => {
    if (data && data != zeroAddress) {
      setHasSelfHeirAccount(true)
      setSelfHeirAccountAddress(data);
    } else {
      console.log("Set `Has account` false");
      setHasSelfHeirAccount(false);
      setSelfHeirAccountAddress(null);
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
          {(selfHeirAccountAddress && selfHeirAccountAddress != zeroAddress) ? `${selfHeirAccountAddress.toString()}` : 'No Account Found'}
        </p>
          {hasSelfHeirAccount ? (
            <>
              <Info
                userAddress={address as Address} 
                selfHeirAccountAddress={selfHeirAccountAddress as Address}
              />
              {/* <Heirs
                userAddress={address as Address} 
                heirAccountAddress={heirAccountAddress as Address} 
              /> */}
            </>
          ) : (
            <p className="text-center text-lg font-semibold text-red-500">
              Please notify the inheritor to create a Vault for you in order to proceed operation.
            </p>
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

export default SelfHeirAccount;