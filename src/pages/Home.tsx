import { Link } from 'react-router-dom';

import { useAccount } from 'wagmi';

function Home() {
  const account = useAccount();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Details</h2>

          <div className="text-left text-gray-600">
            <p className="mb-2">
              <span className="font-bold">Status:</span> {account.status}
            </p>
            <p className="mb-2">
              <span className="font-bold">Addresses: </span> 
              {account.addresses && account.addresses[0]
                ? `${account.addresses[0].slice(0, 4)}...${account.addresses[0].slice(-4)}`
                : 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-bold">Chain ID:</span> {account.chainId}
            </p>
          </div>
        </div>

        <div>
          {account.status === 'connected' ? (
            <>
              <Link
                to="/heir"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Go to Heir Page
              </Link>
            </>
          ) : (
            <p className="text-gray-600">Please connect your wallet to create your contract account and set up inheritance.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
