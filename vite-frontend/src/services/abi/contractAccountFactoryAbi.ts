export const contractAccountFactoryAbi = [
  {
    type: 'error',
    name: 'AccountAlreadyExists',
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'contractAccount', type: 'address' }
    ]
  },
  {
    type: 'event',
    name: 'ContractAccountCreated',
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: false, internalType: 'address', name: 'contractAccount', type: 'address' }
    ],
    anonymous: false
  },
  {
    type: 'function',
    name: 'createContractAccount',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'deployedContracts',
    stateMutability: 'view',
    inputs: [
      { internalType: 'address', name: '', type: 'address' }
    ],
    outputs: [
      { internalType: 'address', name: '', type: 'address' }
    ]
  },
  {
    type: 'function',
    name: 'getDeployedContract',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { internalType: 'address', name: '', type: 'address' }
    ]
  }
] as const
