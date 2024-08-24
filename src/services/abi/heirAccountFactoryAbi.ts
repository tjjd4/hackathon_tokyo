export const heirAccountFactoryAbi = [
  {
    type: 'event',
    name: 'WalletCreated',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'wallet',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'owners',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'numConfirmationsRequired',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'createWallet',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address[]',
        name: '_owners',
        type: 'address[]'
      },
      {
        internalType: 'uint256',
        name: '_numConfirmationsRequired',
        type: 'uint256'
      }
    ],
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ]
  },
  {
    type: 'function',
    name: 'getDeployedWallet',
    stateMutability: 'view',
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      }
    ],
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ]
  },
  {
    type: 'function',
    name: 'getWalletCount',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'getWallets',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        internalType: 'contract MultiSigWallet_v3[]',
        name: '',
        type: 'address[]'
      }
    ]
  },
  {
    type: 'function',
    name: 'ownedContracts',
    stateMutability: 'view',
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ]
  },
  {
    type: 'function',
    name: 'wallets',
    stateMutability: 'view',
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    outputs: [
      {
        internalType: 'contract MultiSigWallet_v3',
        name: '',
        type: 'address'
      }
    ]
  }
] as const