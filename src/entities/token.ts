import invariant from 'tiny-invariant'
import {validateAndParseAddress } from '@uniswap/sdk-core'
import { ChainId, Currency, Token } from '@uniswap/sdk-core'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

import { FACTORY_ADDRESS, QUANTIZED_ADDRESS, MULTITOKEN_ADDRESS,  QUANTIZED_ERC20_INIT_CODE_HASH, QUANTA_ADDRESS } from '../constants'

export const computeQuantizedAddress = ({
  tokenAddress
}: {
  tokenAddress: string
}): string => {
  return getCreate2Address(
    FACTORY_ADDRESS,
    keccak256(['bytes','bytes','bytes'], [pack(['address'], [QUANTIZED_ADDRESS]),pack(['address'], [MULTITOKEN_ADDRESS]),pack(['address'], [tokenAddress])]),
    QUANTIZED_ERC20_INIT_CODE_HASH
  )
}

export class QuantizedToken extends Token {

  public readonly token: Token;

  public constructor(chainId: ChainId | number, address: string, decimals: number, symbol?: string, name?: string) {
    super(chainId, validateAndParseAddress(computeQuantizedAddress({tokenAddress:address})), decimals, `^${symbol}`, `Quantized ${name}`)
    this.token = new Token(chainId, address, decimals, symbol, name);
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: QuantizedToken): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address && this.token === other.token
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}


export const QUANTA: { [chainId in ChainId]: QuantizedToken } = {
  [ChainId.MAINNET]: new QuantizedToken(
    ChainId.MAINNET,
    QUANTA_ADDRESS,
    18,
    'QUANTA',
    'Quanta'
  ),
  [ChainId.ROPSTEN]: new QuantizedToken(
    ChainId.ROPSTEN,
    QUANTA_ADDRESS,
    18,
    'QUANTA',
    'Quanta'
  ),
  [ChainId.RINKEBY]: new QuantizedToken(
    ChainId.RINKEBY,
    QUANTA_ADDRESS,
    18,
    'QUANTA',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new QuantizedToken(ChainId.GÖRLI, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped QUANTA'),
  [ChainId.KOVAN]: new QuantizedToken(ChainId.KOVAN, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped QUANTA')
}
