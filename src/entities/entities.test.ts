import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import { ChainId, WETH9 as _WETH9, Token } from '@uniswap/sdk-core'

const ADDRESSES = [
  '0x0000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000001',
  '0x0000000000000000000000000000000000000002',
  '0x0000000000000000000000000000000000000003'
]
const CHAIN_ID = ChainId.RINKEBY
const WETH9 = _WETH9[ChainId.RINKEBY]
const DECIMAL_PERMUTATIONS: [number, number, number][] = [
  [0, 0, 0],
  [0, 9, 18],
  [18, 18, 18]
]

function decimalize(amount: number, decimals: number): JSBI {
  return JSBI.multiply(JSBI.BigInt(amount), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals)))
}
