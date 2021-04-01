import { CurrencyAmount } from '@uniswap/sdk-core';
import { QuantizedToken } from '@quantized/sdk-core';
export declare enum QuantizeType {
    QUANTIZE = 0,
    QUANTIZE_ETH = 1,
    DEQUANTIZE = 2,
    DEQUANTIZE_WITH_ETH = 3
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export declare class Quantize {
    /**
     * The route of the trade, i.e. which pairs the trade goes through.
     */
    readonly token: QuantizedToken;
    /**
     * The type of the quantization, quantize, dequantize, quantizeEth, dequantizeWithEth
     */
    readonly quantizeType: QuantizeType;
    /**
     * The input amount for the trade assuming no slippage.
     */
    readonly amount: CurrencyAmount;
    /**
     * Constructs a quantize op given a token and an amount
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static quantize(token: QuantizedToken, amountIn: CurrencyAmount): Quantize;
    /**
     * Constructs a quantize op given a token and an amount
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static quantizeEth(token: QuantizedToken, amountIn: CurrencyAmount): Quantize;
    /**
     * Constructs a dequantize op given a token and an amount
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static dequantize(token: QuantizedToken, amountIn: CurrencyAmount): Quantize;
    /**
     * Constructs a dequantize op given a token and an amount and uses ETH to pay for quanta
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static dequantizeWithEth(token: QuantizedToken, amountIn: CurrencyAmount): Quantize;
    constructor(token: QuantizedToken, amount: CurrencyAmount, qType: QuantizeType);
}
