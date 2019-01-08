// Must be the same a as 0x-launch-kit
export const NETWORK_ID = 42;
// @TODO: https://github.com/0xProject/0x-monorepo/blob/4b95e3d684/packages/contract-addresses/src/index.ts
// For NETWORK_ID = 42 (Kovan)
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const EXCHANGE_ADDRESS = '0x35dd2932454449b14cee11a94d3674a936d5d7b2';

// @TODO: fetch the token names from the corresponding contracts
export const ERC20TokenNames: { [index: string]: string } = {
  // https://kovan.etherscan.io/tokens?q=0x2002d3812f58e35f0ea1ffbf80a75a38c32175fa
  '0x2002d3812f58e35f0ea1ffbf80a75a38c32175fa': 'ZRX',
  // https://kovan.etherscan.io/tokens?q=0xd0a1e359811322d97991e03f863a0c30c2cf029c
  '0xd0a1e359811322d97991e03f863a0c30c2cf029c': 'WETH',
};

export const getTokenAddressBySymbol = (symbol: string): string => {
  const addresses = Object.keys(ERC20TokenNames)
  return addresses.find(addr => ERC20TokenNames[addr] === symbol) || ''
};
