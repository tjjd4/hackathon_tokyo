import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { validConnectorNames } from '@/wagmi';

function Navbar() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">

        {/* Left side - Main Links */}
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-bold hover:text-gray-300">
            Home
          </Link>
          <Link to="/contractaccount" className="text-lg font-bold hover:text-gray-300">
            Contract Account
          </Link>
          <Link to="/heiraccount" className="text-lg font-bold hover:text-gray-300">
            Vault Management
          </Link>
          <div className="ml-8 border-l border-gray-400 pl-4">
            <Link to="/selfheiraccount" className="text-lg font-bold hover:text-gray-300">
              Inheirtee's Vault
            </Link>
          </div>
        </div>

        {/* Right side - Connect/Disconnect Section */}
        <div className="flex items-center space-x-4">
          {account.status === 'connected' ? (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="font-semibold">Connected</span>
                <span className="text-sm text-gray-300">{account.addresses[0]}</span>
              </div>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {connectors
                .filter((connector) => validConnectorNames.includes(connector.name))
                .map((connector) => (
                  <div key={connector.uid} className="flex items-center space-x-2">
                    <button
                      onClick={() => connect({ connector })}
                      className="text-sm font-medium hover:text-gray-300 px-4 py-2 rounded-md border border-gray-400"
                    >
                      Connect {connector.name}
                    </button>
                  </div>
              ))}
              <div className="ml-6 text-sm text-gray-400">
                <span className="font-medium">Status:</span> {status}
              </div>
              {error && (
                <div className="text-sm text-red-500">{error.message}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;