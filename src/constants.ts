  
import JSBI from 'jsbi'

// Quantized address:0x50b407513bDEe1af8A53464684ccD0F2Fd4ad976
// Quantized governor address:0x88189471A8A7A4814242d5225A1522b804eaA98b
// Quantized multitoken address:0x3f36eB809b128Fea3a29DEA77a5E7f752985f2d0
// Quantized factory address:0x8F0Ed57EDd365CFf2016E1781369dF2271786936
// Quantized fees tracker address:0xE2319980812ebDeBc8557342C0009Fb9d380922b
// Quanta erc20 address:0xb8d722d359a7A7899c529F9b1f398076503dB878
// Govern erc20 address:0xb6a93a208C987B4e07E8B5fDBeA85D8BAd4fB84a
// QuantizedERC20 contract init code hash:0x2b842cac6ae2fc9916b8d04c0beefc3b3b4271b20c787da634019ba3847c4181

export const QUANTIZED_ADDRESS = '0x50b407513bDEe1af8A53464684ccD0F2Fd4ad976'
export const FACTORY_ADDRESS = '0x8F0Ed57EDd365CFf2016E1781369dF2271786936'
export const GOVERNOR_ADDRESS = '0x88189471A8A7A4814242d5225A1522b804eaA98b'
export const MULTITOKEN_ADDRESS = '0x3f36eB809b128Fea3a29DEA77a5E7f752985f2d0'
export const FEETRACKER_ADDRESS = '0xE2319980812ebDeBc8557342C0009Fb9d380922b'

export const QUANTA_ADDRESS = '0xb8d722d359a7A7899c529F9b1f398076503dB878'
export const GOVTOKEN_ADDRESS = '0xb6a93a208C987B4e07E8B5fDBeA85D8BAd4fB84a'


export const QUANTIZED_ERC20_INIT_CODE_HASH = '0x2b842cac6ae2fc9916b8d04c0beefc3b3b4271b20c787da634019ba3847c4181'

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