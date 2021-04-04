import { ChainId, Currency, CurrencyAmount, Token, TokenAmount } from '@uniswap/sdk-core';
import { QuantizedToken } from '../entities/token';
import { QuantizeType } from '../constants';
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH9 token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */
export declare function quantizedAmount(currencyAmount: CurrencyAmount, chainId: ChainId): TokenAmount;
export declare function quantizedCurrency(currency: Currency, chainId: ChainId): Token;
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export declare class Quantize {
    /**
     * The token or currency
     */
    readonly token: Token | QuantizedToken | Currency;
    /**
     * The type of the quantize op
     */
    readonly tradeType: QuantizeType;
    /**
     * The input amount for the quantize
     */
    readonly inputAmount: CurrencyAmount;
    /**
     * The output amount for the quantize after fees
     */
    readonly outputAmount: CurrencyAmount;
    /**
     * Constructs an exact in trade with the given amount in and route
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static quantize(token: Token, amountIn: CurrencyAmount): Quantize;
    /**
     * Constructs an exact in trade with the given amount in and route
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static quantizeEth(token: Currency, amountIn: CurrencyAmount): Quantize;
    /**
     * Constructs an exact in trade with the given amount in and route
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static dequantize(token: QuantizedToken, amountIn: CurrencyAmount): Quantize;
    constructor(token: Token | QuantizedToken | Currency, amount: CurrencyAmount, quantizeType: QuantizeType);
}
