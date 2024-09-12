import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useReadContract } from 'wagmi';
import { Address, zeroAddress, isAddress } from 'viem';

import { heirAccountFactoryConfig } from "@/services/heirAccountFactoryService";
import { contractAccountFactoryConfig } from "@/services/contractAccountFactoryService";

import { Info } from "@/components/HeirAccount/Info";
import { Heirs } from "@/components/HeirAccount/Heirs";
import CreateHeirAccount from "@/components/HeirAccount/CreateHeirAccount";
import { Will } from "@/components/HeirAccount/Will";

function HeirAccount() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [heirAccountAddress, setHeirAccountAddress] = useState<Address | null>(null);
  const [hasHeirAccount, setHasHeirAccount] = useState(false);
  const [contractAccountAddress, setContractAccountAddress] = useState<Address | null>(null);
  const [hasContractAccount, setHasContractAccount] = useState(false);
  
  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  const {
    data: CAAddress,
    error: CAAddressError,
    isLoading: isCAAddressLoading,
  } = useReadContract({
    ...contractAccountFactoryConfig,
    functionName: 'deployedContracts',
    args: [address!],
  });

  useEffect(() => {
    if (CAAddress && CAAddress != zeroAddress && isAddress(CAAddress)) {
      setHasContractAccount(true);
      setContractAccountAddress(CAAddress);
    } 
    if (CAAddressError || (!isCAAddressLoading && CAAddress == zeroAddress)) {
      setHasContractAccount(false);
      setContractAccountAddress(null);
    }
  }, [CAAddress, isCAAddressLoading, CAAddressError]);

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    ...heirAccountFactoryConfig,
    functionName: 'predecessorToVault',
    args: [address!],
  });

  useEffect(() => {
    if (data && data != zeroAddress) {
      setHasHeirAccount(true);
      setHeirAccountAddress(data);
    }
    if (error || (!isLoading && data == zeroAddress)) {
      setHasHeirAccount(false);
      setHeirAccountAddress(null);
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-lg font-semibold text-white">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-700 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Heir Account Settings</h1>
        </div>
        <div className="p-6">
          {(!isCAAddressLoading && !hasContractAccount && !contractAccountAddress) ? (
            <div className="text-center">
              <p className="text-gray-300 mb-4">You need to create a Contract Account before you can use the Vault feature.</p>
              <Link
                to="/contractAccount"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 inline-block"
              >
                Create Contract Account
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2 text-white">Heir Smart Contract Account Address:</h2>
              <p className="text-blue-400 break-all mb-6">
                {(heirAccountAddress && heirAccountAddress != zeroAddress) ? heirAccountAddress.toString() : 'No Account Found'}
              </p>

              {hasHeirAccount ? (
                <div className="space-y-6">
                  <Info
                    userAddress={address as Address} 
                    heirAccountAddress={heirAccountAddress as Address}
                  />
                  <Heirs
                    userAddress={address as Address} 
                    heirAccountAddress={heirAccountAddress as Address} 
                  />
                  {/* <Will
                    userAddress={address as Address} 
                    heirAccountAddress={heirAccountAddress as Address} 
                  /> */}
                </div>
              ) : (
                <CreateHeirAccount 
                  userAddress={address as Address} 
                  contractAccountAddress={contractAccountAddress as Address}
                  heirAccountAddress={heirAccountAddress as Address}
                  refetch={refetch}
                />
              )}

              <div className="mt-8 flex justify-end">
                <Link
                  to="/"
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeirAccount;