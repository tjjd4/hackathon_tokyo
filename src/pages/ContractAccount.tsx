import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // For routing
import { useAccount } from 'wagmi'; // Ensure wagmi is set up correctly in Vite

import CreateContractAccount from '../components/CreateContractAccount';
import { Nominee } from '../components/Nominee';
import { Address, isAddress, zeroAddress } from 'viem';

import { useReadContract } from 'wagmi';
import { contractAccountFactoryConfig } from '../services/contractAccountFactoryService';
import { Timeout } from "../components/Timeout"
import { Info } from "../components/Info";

function ContractAccount() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [contractAccountAddress, setContractAccountAddress] = useState<Address | null>(null);
  const [hasContractAccount, setHasContractAccount] = useState(false);
  
  // Redirect to connect wallet page if the wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/'); // Replace with your actual connect wallet route
    }
  }, [isConnected, navigate]);

  const {
    data,
    error,
    isLoading,
  } = useReadContract({
    ...contractAccountFactoryConfig,
    functionName: 'deployedContracts',
    args: [address!],
  });

  useEffect(() => {
    console.log("Data", data)
    if (data && data != zeroAddress && isAddress(data)) {
      setHasContractAccount(true);
      setContractAccountAddress(data);
    } else {
      console.log("set false")
      setHasContractAccount(false);
    }
  }, [data])

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
        <h1 className="text-2xl font-bold mb-2 text-center">Inheritance Settings</h1>

        <h2 className="text-l font-bold text-gray-800 mb-4">Smart Contract Account Address:</h2>
        <p className="text-l font-semibold text-blue-600">
          {(contractAccountAddress && contractAccountAddress != zeroAddress) ? `${contractAccountAddress.toString()}` : 'No Account Found'}
        </p>
          {hasContractAccount ? (
            <>
              <Info
                userAddress={address as Address} 
                contractAccountAddress={contractAccountAddress as Address}
              />
              <Nominee
                userAddress={address as Address} 
                contractAccountAddress={contractAccountAddress as Address} 
              />
              <Timeout
                userAddress={address as Address} 
                contractAccountAddress={contractAccountAddress as Address} 
              />
            </>
          ) : (
            <CreateContractAccount
              userAddress={address as Address}
              contractAccountAddress={contractAccountAddress as Address}
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

export default ContractAccount;
