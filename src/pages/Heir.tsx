import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // For routing
import { useAccount } from 'wagmi'; // Ensure wagmi is set up correctly in Vite

import ContractAccount from '../components/ContractAccount';
import { HeirManagement } from '../components/HeirManagement';
import { Address } from 'viem';

function Heir() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const [contractAccountAddress, setContractAccountAddress] = useState<Address | null>(null);
  
  // Redirect to connect wallet page if the wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/'); // Replace with your actual connect wallet route
    }
  }, [isConnected, navigate]);

  // Log whenever contractAccountAddress changes
  useEffect(() => {
    console.log("Updated contractAccountAddress:", contractAccountAddress);
  }, [contractAccountAddress]);

  return (
    <>
      <div className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Inheritance Settings</h1>
        
        {address ? (
          <>
            {/* Pass the setContractAccountAddress function to ContractAccount */}
            <ContractAccount 
              userAddress={address as Address} 
              setContractAccountAddress={setContractAccountAddress} 
            />

            {/* Only render HeirManagement if contractAccountAddress is set */}
            {contractAccountAddress ? (
              <HeirManagement 
                userAddress={address as Address} 
                contractAccountAddress={contractAccountAddress} 
              />
            ) : (
              <p className="text-center text-gray-500">Loading contract account details...</p>
            )}
          </>
        ) : (
          <p className="text-center text-red-500">No Wallet Address Connected</p>
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

export default Heir;
