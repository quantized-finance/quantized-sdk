import { ChainId, Token, TokenAmount, WETH9, Price } from '@uniswap/sdk-core'
import { InsufficientInputAmountError } from '../errors'
import { computeQuantizedAddress, QuantizedToken } from './token'

describe('computeQuantizedAddress', () => {
  it('should correctly compute the quantized address', () => {
    const token = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'USDC', 'USD Coin')
    const result = computeQuantizedAddress({
      factoryAddress: '0x1111111111111111111111111111111111111111',
      token
    })
    expect(result).toEqual('0xb50b5182D6a47EC53a469395AF44e371d7C76ed4')
  })
})

describe('QuantizedToken', () => {
  const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'USDC', 'USD Coin')

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(QuantizedToken.getAddress(USDC)).toEqual('0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5')
    })
  })

})
