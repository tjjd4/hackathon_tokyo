export const heirAccountFactoryAbi = [
  {
    type: "event",
    anonymous: false,
    name: "VaultCreated",
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vault",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "owners",
        type: "address[]"
      }
    ]
  },
  {
    type: "function",
    name: "createVault",
    stateMutability: "nonpayable",
    inputs: [
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]"
      },
      {
        internalType: "address",
        name: "_predecessor",
        type: "address"
      }
    ],
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
    name: "getVaultCount",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ]
  },
  {
    type: "function",
    name: "getVaults",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        internalType: "contract Vault_v6[]",
        name: "",
        type: "address[]"
      }
    ]
  },
  {
    type: "function",
    name: "heirToVault",
    stateMutability: "view",
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
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
    name: "predecessorToVault",
    stateMutability: "view",
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
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
    name: "vaults",
    stateMutability: "view",
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    outputs: [
      {
        internalType: "contract Vault_v6",
        name: "",
        type: "address"
      }
    ]
  }
] as const
