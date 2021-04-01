import { QuantizedToken } from './token'
import { Quantize } from './quantize'
import JSBI from 'jsbi'
import { ChainId, ETHER, CurrencyAmount, Percent, Token, TokenAmount, TradeType, WETH9 } from '@uniswap/sdk-core'

describe('Trade', () => {
  const token0 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000002', 18, 't1')
  const token2 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000003', 18, 't2')
  const token3 = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000004', 18, 't3')

})
