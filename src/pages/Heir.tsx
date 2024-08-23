import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For routing
// import { AddHeir } from '@/components/addHeir'; // Adjust path accordingly
// import { SendTx } from './components/sendTx'; // Adjust path accordingly
import { useAccount } from 'wagmi'; // Ensure wagmi is set up correctly in Vite

function Heir() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  // Redirect to connect wallet page if the wallet is not connected
  useEffect(() => {
    if (!isConnected) {
      navigate('/'); // Replace with your actual connect wallet route
    }
  }, [isConnected, navigate]);

  console.log(isConnected);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2">Inheritance Settings</h1>
          <p className="text-gray-600 mb-6">
            Connect your decentralized wallet and manage your inheritance.
          </p>

          {/* Decentralized Wallet */}
          <div className="mb-4">
            <label
              htmlFor="wallet"
              className="block text-sm font-medium text-gray-700"
            >
              Decentralized Wallet
            </label>
            <input
              type="text"
              id="wallet"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your wallet address"
            />
            <button className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Connect Wallet
            </button>
          </div>

          {/* Inheritance Type */}
          <div className="mb-4">
            <label
              htmlFor="inheritance-type"
              className="block text-sm font-medium text-gray-700"
            >
              Inheritance Type
            </label>
            <select
              id="inheritance-type"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Immediate</option>
              <option>Delayed</option>
              <option>Scheduled</option>
            </select>
          </div>

          {/* Heir Settings */}
          {/* <AddHeir /> */}

          {/* Uncomment when SendTx is ready */}
          {/* <SendTx /> */}

          {/* Action Buttons */}
          <div className="flex justify-between">
            {/* Link for Cancel using react-router-dom */}
            <Link
              to="/"
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              Cancel
            </Link>

            {/* Save Settings Button */}
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Heir;
