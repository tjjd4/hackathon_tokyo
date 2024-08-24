import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useReadContract } from 'wagmi';
import { Address, isAddress, zeroAddress } from 'viem';
import CreateContractAccount from '@/components/ContractAccount/CreateContractAccount';
import { Nominee } from '@/components/ContractAccount/Nominee';
import { Timeout } from "@/components/ContractAccount/Timeout";
import { Info } from "@/components/ContractAccount/Info";
import { contractAccountFactoryConfig } from '@/services/contractAccountFactoryService';

function ContractAccount() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [contractAccountAddress, setContractAccountAddress] = useState<Address | null>(null);
  const [hasContractAccount, setHasContractAccount] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  const { data, error, isLoading, refetch } = useReadContract({
    ...contractAccountFactoryConfig,
    functionName: 'deployedContracts',
    args: [address!],
  });

  useEffect(() => {
    if (data && data !== zeroAddress && isAddress(data)) {
      setHasContractAccount(true);
      setContractAccountAddress(data);
    } else {
      setHasContractAccount(false);
      setContractAccountAddress(null);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <span className="ml-4 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Inheritance Settings</h1>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Smart Contract Account Address:</h2>
          <p className="text-blue-600 break-all mb-6">
            {(contractAccountAddress && contractAccountAddress !== zeroAddress)
              ? contractAccountAddress.toString()
              : 'No Account Found'}
          </p>

          {hasContractAccount ? (
            <div className="space-y-6">
              <div className="bg-gray-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Account Information</h3>
                <Info
                  userAddress={address as Address}
                  contractAccountAddress={contractAccountAddress as Address}
                />
              </div>
              <div className="bg-gray-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Nominee Settings</h3>
                <Nominee
                  userAddress={address as Address}
                  contractAccountAddress={contractAccountAddress as Address}
                />
              </div>
              <div className="bg-gray-200 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Timeout Settings</h3>
                <Timeout
                  userAddress={address as Address}
                  contractAccountAddress={contractAccountAddress as Address}
                />
              </div>
            </div>
          ) : (
            <CreateContractAccount
              userAddress={address as Address}
              contractAccountAddress={contractAccountAddress as Address}
              refetch={refetch}
            />
          )}

          <div className="mt-8 flex justify-end">
            <Link
              to="/"
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractAccount;