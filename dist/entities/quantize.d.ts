import { CurrencyAmount, TokenAmount, Token } from '@uniswap/sdk-core';
export declare enum QuantizeType {
    QUANTIZE = 0,
    QUANTIZE_ETH = 1,
    DEQUANTIZE = 2
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export declare class Quantize {
    /**
     * The route of the trade, i.e. which pairs the trade goes through.
     */
    readonly token: Token | undefined;
    /**
     * The type of the quantization, quantize, dequantize, quantizeEth, dequantizeWithEth
     */
    readonly quantizeType: QuantizeType;
    /**
     * The input amount for the trade assuming no slippage.
     */
    readonly amount: CurrencyAmount | TokenAmount;
    /**
     * Constructs a quantize op given a token and an amount
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static quantize(amountIn: TokenAmount): Quantize;
    /**
     * Constructs a quantize op given a token and an amount
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static quantizeEth(amountIn: CurrencyAmount): Quantize;
    /**
     * Constructs a dequantize op given a token and an amount
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static dequantize(amountIn: TokenAmount): Quantize;
    constructor(amount: TokenAmount | CurrencyAmount, qType: QuantizeType);
}
