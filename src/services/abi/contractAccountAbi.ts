export const contractAccountAbi = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [
      { internalType: 'address', name: '_owner', type: 'address' }
    ]
  },
  {
    type: 'event',
    name: 'NomineeSet',
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'address', name: 'nominee', type: 'address' }
    ]
  },
  {
    type: 'event',
    name: 'PreHookExecuted',
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: false, internalType: 'string', name: 'message', type: 'string' }
    ]
  },
  {
    type: 'event',
    name: 'SendExecuted',
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
    ]
  },
  {
    type: 'event',
    name: 'TimeoutSet',
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint48', name: 'timeout', type: 'uint48' }
    ]
  },
  {
    type: 'event',
    name: 'requestEcecuted',
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint48', name: 'requestTime', type: 'uint48' }
    ]
  },
  {
    type: 'fallback',
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'config',
    stateMutability: 'view',
    outputs: [
      { internalType: 'uint48', name: 'lastAccess', type: 'uint48' },
      { internalType: 'uint48', name: 'timeout', type: 'uint48' },
      { internalType: 'uint48', name: 'lastRequest', type: 'uint48' },
      { internalType: 'address', name: 'nominee', type: 'address' }
    ]
  },
  {
    type: 'function',
    name: 'executeTransaction',
    stateMutability: 'nonpayable',
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    outputs: [
      { internalType: 'bytes', name: '', type: 'bytes' }
    ]
  },
  {
    type: 'function',
    name: 'isWithdrawable',
    stateMutability: 'view',
    outputs: [
      { internalType: 'bool', name: '', type: 'bool' }
    ]
  },
  {
    type: 'function',
    name: 'owner',
    stateMutability: 'view',
    outputs: [
      { internalType: 'address', name: '', type: 'address' }
    ]
  },
  {
    type: 'function',
    name: 'requestInactiveAccount',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'sendEther',
    stateMutability: 'nonpayable',
    inputs: [
      { internalType: 'address payable', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'setNominee',
    stateMutability: 'nonpayable',
    inputs: [
      { internalType: 'address', name: 'nominee', type: 'address' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'setTimeout',
    stateMutability: 'nonpayable',
    inputs: [
      { internalType: 'uint48', name: 'timeout', type: 'uint48' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'withdrawAllToNominee',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'receive',
    stateMutability: 'payable'
  }
] as const;