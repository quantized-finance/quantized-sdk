import { ChainId, Token, TokenAmount } from '@uniswap/sdk-core'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../constants'

export const computeQuantizedAddress = ({
  factoryAddress,
  token
}: {
  factoryAddress: string
  token: Token
}): string => {
  return getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address'], [token.address])]),
    INIT_CODE_HASH
  )
}

export class QuantizedToken {
  public readonly quantizedToken: Token
  public readonly tokenAmount: TokenAmount

  public static getAddress(token: Token): string {
    return computeQuantizedAddress({ factoryAddress: FACTORY_ADDRESS, token })
  }

  public constructor(token: Token, tokenAmount: TokenAmount) {
    this.quantizedToken = new Token(
      tokenAmount.token.chainId,
      QuantizedToken.getAddress(token),
      token.decimals,
      token.symbol,
      token.name
    )
    this.tokenAmount = tokenAmount
  }

  /**
   * Returns the chain ID of the tokens in the pair.
   */
  public get chainId(): ChainId | number {
    return this.token.chainId
  }

  public get token(): Token {
    return this.tokenAmount.token
  }

}
