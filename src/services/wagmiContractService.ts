import { wagmiAbi } from './abi/wagmiAbi';

const wagmiContractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'

export const wagmiContractConfig = {
  address: wagmiContractAddress, // Replace with your contract's address
  abi: wagmiAbi, // ABI of your contract
} as const