export const heirAccountAbi = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address[]',
        name: '_signers',
        type: 'address[]'
      },
      {
        internalType: 'address',
        name: '_predecessorCA',
        type: 'address'
      }
    ]
  },
  {
    type: 'event',
    anonymous: false,
    name: 'ConfirmTransaction',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
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
    anonymous: false,
    name: 'Deposit',
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
    anonymous: false,
    name: 'ExecuteTransaction',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
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
    anonymous: false,
    name: 'RevokeConfirmation',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
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
    anonymous: false,
    name: 'SignerAdjusted',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldSigner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newSigner',
        type: 'address'
      }
    ]
  },
  {
    type: 'event',
    anonymous: false,
    name: 'SubmitConsensus',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
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
    anonymous: false,
    name: 'SubmitTransaction',
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
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
    name: 'MakeAWill',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'address[]',
        name: '_recipient',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_portion',
        type: 'uint256[]'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'alreadyWithdrawnWill',
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
    name: 'callPredecessorCA',
    stateMutability: 'nonpayable',
    inputs: [
      {
        internalType: 'enum Vault_v6.CAAction',
        name: 'action',
        type: 'uint8'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'confirmTransaction',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'executeTransaction',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'getConfirmList',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        internalType: 'address[]',
        name: '_confirmedList',
        type: 'address[]'
      },
      {
        internalType: 'address[]',
        name: '_unconfirmedList',
        type: 'address[]'
      }
    ]
  },
  {
    type: 'function',
    name: 'getSigners',
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
    inputs: [],
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
    name: 'isSigner',
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
    name: 'predecessorCA',
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
    name: 'predecessorMakeAWill',
    stateMutability: 'view',
    inputs: [],
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
    name: 'revokeConfirmation',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'signers',
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
    name: 'submitConsensus',
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
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
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
    type: 'function',
    name: 'willAmount',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'willPortions',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'withdrawWillPortions',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'receive',
    stateMutability: 'payable'
  }
]  as const