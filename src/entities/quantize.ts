import {
  ChainId,
  Currency,
  CurrencyAmount,
  ETHER,
  Token,
  TokenAmount
} from '@uniswap/sdk-core'

import { QUANTA, QuantizedToken } from '../entities/token'

import { QuantizeType } from '../constants'

import invariant from 'tiny-invariant'

/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH9 token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */
export function quantizedAmount(currencyAmount: CurrencyAmount, chainId: ChainId): TokenAmount {
  if (currencyAmount instanceof TokenAmount) return currencyAmount
  if (currencyAmount.currency === ETHER) return new TokenAmount(QUANTA[chainId], currencyAmount.raw)
  invariant(false, 'CURRENCY')
}

export function quantizedCurrency(currency: Currency, chainId: ChainId): Token {
  if (currency instanceof Token) return currency
  if (currency === ETHER) return QUANTA[chainId]
  invariant(false, 'CURRENCY')
}

/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export class Quantize {
  /**
   * The token or currency 
   */
  public readonly token: Token | QuantizedToken | Currency
  /**
   * The type of the quantize op
   */
  public readonly tradeType: QuantizeType
  /**
   * The input amount for the quantize
   */
  public readonly inputAmount: CurrencyAmount
  /**
   * The output amount for the quantize after fees
   */
  public readonly outputAmount: CurrencyAmount

  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static quantize(token: Token, amountIn: CurrencyAmount): Quantize {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE)
  }

  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static quantizeEth(token: Currency, amountIn: CurrencyAmount): Quantize {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE_ETH)
  }

  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
    public static dequantize(token: QuantizedToken, amountIn: CurrencyAmount): Quantize {
    return new Quantize(token, amountIn, QuantizeType.DEQUANTIZE)
  }


  public constructor(token: Token | QuantizedToken | Currency, amount: CurrencyAmount, quantizeType: QuantizeType) {

    this.token = token
    this.tradeType = quantizeType
    this.inputAmount =
    quantizeType === QuantizeType.QUANTIZE || QuantizeType.DEQUANTIZE
        ? amount
        : CurrencyAmount.ether(amount.raw)
    this.outputAmount =
    quantizeType === QuantizeType.QUANTIZE || QuantizeType.DEQUANTIZE
        ? amount
        : CurrencyAmount.ether(amount.raw)

  }

}