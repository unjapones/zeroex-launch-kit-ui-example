// Must be the same a as 0x-launch-kit
export const NETWORK_ID = 42;

// @TODO: fetch the token names from the corresponding contracts
export const ERC20TokenNames: { [index:string]: string } = {
    // https://kovan.etherscan.io/tokens?q=0x2002d3812f58e35f0ea1ffbf80a75a38c32175fa
    '0x2002d3812f58e35f0ea1ffbf80a75a38c32175fa': 'ZRX',
    // https://kovan.etherscan.io/tokens?q=0xd0a1e359811322d97991e03f863a0c30c2cf029c
    '0xd0a1e359811322d97991e03f863a0c30c2cf029c': 'WETH',
}
