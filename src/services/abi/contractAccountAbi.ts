export const contractAccountAbi = [
  {
    type: "constructor",
    name: null, // Constructor doesn't have a name
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    outputs: []
  },
  {
    type: "event",
    name: "NomineeSet",
    stateMutability: null, // Events don't have stateMutability
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "nominee",
        type: "address"
      }
    ],
    outputs: []
  },
  {
    type: "event",
    name: "PreHookExecuted",
    stateMutability: null,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string"
      }
    ],
    outputs: []
  },
  {
    type: "event",
    name: "SendExecuted",
    stateMutability: null,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "event",
    name: "TimeoutSet",
    stateMutability: null,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "timeout",
        type: "uint48"
      }
    ],
    outputs: []
  },
  {
    type: "event",
    name: "requestExecuted",
    stateMutability: null,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string"
      }
    ],
    outputs: []
  },
  {
    type: "fallback",
    name: null, // Fallback doesn't have a name
    stateMutability: "payable",
    inputs: [],
    outputs: []
  },
  {
    type: "function",
    name: "config",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        internalType: "uint48",
        name: "lastAccess",
        type: "uint48"
      },
      {
        internalType: "uint48",
        name: "timeout",
        type: "uint48"
      },
      {
        internalType: "uint48",
        name: "lastRequest",
        type: "uint48"
      },
      {
        internalType: "address",
        name: "nominee",
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "executeTransaction",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ]
  },
  {
    type: "function",
    name: "isWithdrawable",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ]
  },
  {
    type: "function",
    name: "requestInactiveAccount",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    type: "function",
    name: "sendEther",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "setNominee",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "address",
        name: "nominee",
        type: "address"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "setTimeout",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "uint48",
        name: "timeout",
        type: "uint48"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "withdrawAllToNominee",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  },
  {
    type: "receive",
    name: null, // Receive function doesn't have a name
    stateMutability: "payable",
    inputs: [],
    outputs: []
  }
] as const;