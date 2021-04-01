import {
  CurrencyAmount,
} from '@uniswap/sdk-core'

import { QuantizedToken } from './token'

export declare enum QuantizeType {
  QUANTIZE = 0,
  QUANTIZE_ETH = 2,
  DEQUANTIZE = 3,
  DEQUANTIZE_WITH_ETH = 4
}

/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export class Quantize {
  /**
   * The route of the trade, i.e. which pairs the trade goes through.
   */
  public readonly token: QuantizedToken
  /**
   * The type of the quantization, quantize, dequantize, quantizeEth, dequantizeWithEth
   */
  public readonly quantizeType: QuantizeType
  /**
   * The input amount for the trade assuming no slippage.
   */
  public readonly amount: CurrencyAmount
  
  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static quantize(token: QuantizedToken, amountIn: CurrencyAmount): Quantize {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE)
  }

  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static quantizeEth(token: QuantizedToken, amountIn: CurrencyAmount): Quantize {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE_ETH)
  }

  /**
   * Constructs a dequantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static dequantize(token: QuantizedToken, amountIn: CurrencyAmount): Quantize {
    return new Quantize(token, amountIn, QuantizeType.DEQUANTIZE)
  }

  /**
   * Constructs a dequantize op given a token and an amount and uses ETH to pay for quanta
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static dequantizeWithEth(token: QuantizedToken, amountIn: CurrencyAmount): Quantize {
    return new Quantize(token, amountIn, QuantizeType.DEQUANTIZE_WITH_ETH)
  }

  public constructor(token: QuantizedToken, amount: CurrencyAmount, qType: QuantizeType) {
    this.token = token
    this.quantizeType = qType
    this.amount = amount
  }

}
