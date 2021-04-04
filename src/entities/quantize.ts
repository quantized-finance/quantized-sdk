import {
  CurrencyAmount,
  TokenAmount,
  Token
} from '@uniswap/sdk-core'

export declare enum QuantizeType {
  QUANTIZE = 0,
  QUANTIZE_ETH = 1,
  DEQUANTIZE = 2,
}

/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export class Quantize {
  /**
   * The route of the trade, i.e. which pairs the trade goes through.
   */
  public readonly token: Token | undefined
  /**
   * The type of the quantization, quantize, dequantize, quantizeEth, dequantizeWithEth
   */
  public readonly quantizeType: QuantizeType
  
  /**
   * The input amount for the trade assuming no slippage.
   */
  public readonly amount: CurrencyAmount | TokenAmount
  
  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static quantize(amountIn: TokenAmount): Quantize {
    return new Quantize(amountIn, QuantizeType.QUANTIZE)
  }

  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static quantizeEth(amountIn: CurrencyAmount): Quantize {
    return new Quantize(amountIn, QuantizeType.QUANTIZE_ETH)
  }

  /**
   * Constructs a dequantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static dequantize(amountIn: TokenAmount): Quantize {
    return new Quantize(amountIn, QuantizeType.DEQUANTIZE)
  }

  public constructor(amount: TokenAmount | CurrencyAmount, qType: QuantizeType) {
    this.token = amount instanceof TokenAmount ? amount.token : undefined
    this.quantizeType = qType
    this.amount = amount
  }

}
