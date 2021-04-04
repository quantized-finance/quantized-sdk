  
import JSBI from 'jsbi'

export const QUANTIZED_ADDRESS = '0x8c1f3365F11cf2E401340CD2425dDBcefa300040'
export const FACTORY_ADDRESS = '0xEf27F45DB678Fa3FC35d73E86D239E12f8e26FD7'
export const MULTITOKEN_ADDRESS = '0xf377E4CDd42C3Acf37D01dB69Fe8E669c7Afb11B'
export const FEETRACKER_ADDRESS = '0xea6EC95E6FdeD7B30c147979c8CC76B729ac3d16'
export const QUANTA_ADDRESS = '0x7017453C48d67f8C63e0335d6781CB49089b26cF'

export const QUANTIZED_ERC20_INIT_CODE_HASH = '0xcd4902b65e1285dd3266dd5a6212b18ff94b962e082ca6cd0a3c4538738b4a96'

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

export enum QuantizeType {
    QUANTIZE = 0,
    QUANTIZE_ETH = 1,
    DEQUANTIZE = 2
}

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _999 = JSBI.BigInt(999)
export const _1000 = JSBI.BigInt(1000)