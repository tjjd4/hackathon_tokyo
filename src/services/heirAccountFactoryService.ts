import { heirAccountFactoryAbi } from "./abi/heirAccountFactoryAbi"

export const heirAccountFactoryAddress = '0xB2D987C2EECe708C88b90c526277130e4931a0a2';

export const contractAccountFactoryConfig = {
  address: heirAccountFactoryAddress, // Replace with your contract's address
  abi: heirAccountFactoryAbi, // ABI of your contract
} as const