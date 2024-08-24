import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function Navbar() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-lg font-bold hover:text-gray-300">
            Home
          </Link>
          <Link to="/contractaccount" className="ml-4 text-lg font-bold hover:text-gray-300">
            Contract Account
          </Link>
          <Link to="/heiraccount" className="ml-4 text-lg font-bold hover:text-gray-300">
            Inheiritee MultiSig Account
          </Link>
        </div>

        <div className="flex items-center">
          {account.status === 'connected' ? (
            <div className="flex items-center space-x-4">
              <div>
                <span>Connected: {account.addresses[0]}</span>
              </div>
              <button
                onClick={() => disconnect()}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div>
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                >
                  Connect {connector.name}
                </button>
              ))}
              <div>{status}</div>
              <div className="text-red-500">{error?.message}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;