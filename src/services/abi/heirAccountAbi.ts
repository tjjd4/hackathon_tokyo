export const heirAccountAbi = [
  {
    type: 'constructor',
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
    ]
  },
  {
    type: 'event',
    name: 'ConfirmTransaction',
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'txIndex',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'event',
    name: 'Deposit',
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'event',
    name: 'ExecuteTransaction',
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'txIndex',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'event',
    name: 'OwnerAdjusted',
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ]
  },
  {
    type: 'event',
    name: 'RevokeConfirmation',
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'txIndex',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'event',
    name: 'SubmitBatchWithdrawal',
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'txIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'recipients',
        type: 'address[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'portions',
        type: 'uint256[]'
      }
    ]
  },
  {
    type: 'event',
    name: 'SubmitTransaction',
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'txIndex',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ]
  },
  {
    type: 'function',
    name: 'adjustOwner',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'confirmTransaction',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'uint256',
        name: '_txIndex',
        type: 'uint256'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'deployer',
    stateMutability: 'view',
    inputs: [],
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
    name: 'executeTransaction',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'uint256',
        name: '_txIndex',
        type: 'uint256'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'getOwners',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]'
      }
    ]
  },
  {
    type: 'function',
    name: 'getTransaction',
    stateMutability: 'view',
    inputs: [
      {
        internalType: 'uint256',
        name: '_txIndex',
        type: 'uint256'
      }
    ],
    outputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        internalType: 'bool',
        name: 'executed',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'numConfirmations',
        type: 'uint256'
      },
      {
        internalType: 'address[]',
        name: 'recipients',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'portions',
        type: 'uint256[]'
      },
      {
        internalType: 'bool',
        name: 'isBatchWithdrawal',
        type: 'bool'
      }
    ]
  },
  {
    type: 'function',
    name: 'getTransactionCount',
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
    name: 'isConfirmed',
    stateMutability: 'view',
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ]
  },
  {
    type: 'function',
    name: 'isOwner',
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
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ]
  },
  {
    type: 'function',
    name: 'numConfirmationsRequired',
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
    name: 'owners',
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
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ]
  },
  {
    type: 'function',
    name: 'revokeConfirmation',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'uint256',
        name: '_txIndex',
        type: 'uint256'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'submitBatchWithdrawal',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address[]',
        name: '_recipients',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_portions',
        type: 'uint256[]'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'submitRequestInactiveAccount',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address',
        name: '_deadmanSwitchAddress',
        type: 'address'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'submitTransaction',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'submitWithdrawAllToNominee',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address',
        name: '_deadmanSwitchAddress',
        type: 'address'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'transactions',
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
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        internalType: 'bool',
        name: 'executed',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'numConfirmations',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isBatchWithdrawal',
        type: 'bool'
      }
    ]
  },
  {
    type: 'receive',
    stateMutability: 'payable'
  }
] as const