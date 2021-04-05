'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('jsbi');
var sdkCore = require('@uniswap/sdk-core');
var invariant = _interopDefault(require('tiny-invariant'));
var solidity = require('@ethersproject/solidity');
var address = require('@ethersproject/address');

// Quantized governor address:0x88189471A8A7A4814242d5225A1522b804eaA98b
// Quantized multitoken address:0x3f36eB809b128Fea3a29DEA77a5E7f752985f2d0
// Quantized factory address:0x8F0Ed57EDd365CFf2016E1781369dF2271786936
// Quantized fees tracker address:0xE2319980812ebDeBc8557342C0009Fb9d380922b
// Quanta erc20 address:0xb8d722d359a7A7899c529F9b1f398076503dB878
// Govern erc20 address:0xb6a93a208C987B4e07E8B5fDBeA85D8BAd4fB84a
// QuantizedERC20 contract init code hash:0x2b842cac6ae2fc9916b8d04c0beefc3b3b4271b20c787da634019ba3847c4181

var QUANTIZED_ADDRESS = '0x50b407513bDEe1af8A53464684ccD0F2Fd4ad976';
var FACTORY_ADDRESS = '0x8F0Ed57EDd365CFf2016E1781369dF2271786936';
var MULTITOKEN_ADDRESS = '0x3f36eB809b128Fea3a29DEA77a5E7f752985f2d0';
var FEETRACKER_ADDRESS = '0xE2319980812ebDeBc8557342C0009Fb9d380922b';
var QUANTA_ADDRESS = '0xb8d722d359a7A7899c529F9b1f398076503dB878';
var QUANTIZED_ERC20_INIT_CODE_HASH = '0x2b842cac6ae2fc9916b8d04c0beefc3b3b4271b20c787da634019ba3847c4181';
var QuantizeType;

(function (QuantizeType) {
  QuantizeType[QuantizeType["QUANTIZE"] = 0] = "QUANTIZE";
  QuantizeType[QuantizeType["QUANTIZE_ETH"] = 1] = "QUANTIZE_ETH";
  QuantizeType[QuantizeType["DEQUANTIZE"] = 2] = "DEQUANTIZE";
})(QuantizeType || (QuantizeType = {})); // exports for internal consumption

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientQuantaAvailableError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientQuantaAvailableError, _Error);

  function InsufficientQuantaAvailableError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientQuantaAvailableError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientQuantaAvailableError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientQuantaAvailableError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var _QUANTA;
var computeQuantizedAddress = function computeQuantizedAddress(_ref) {
  var tokenAddress = _ref.tokenAddress;
  return address.getCreate2Address(FACTORY_ADDRESS, solidity.keccak256(['bytes', 'bytes', 'bytes'], [solidity.pack(['address'], [QUANTIZED_ADDRESS]), solidity.pack(['address'], [MULTITOKEN_ADDRESS]), solidity.pack(['address'], [tokenAddress])]), QUANTIZED_ERC20_INIT_CODE_HASH);
};
var QuantizedToken = /*#__PURE__*/function (_Token) {
  _inheritsLoose(QuantizedToken, _Token);

  function QuantizedToken(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _Token.call(this, chainId, sdkCore.validateAndParseAddress(computeQuantizedAddress({
      tokenAddress: address
    })), decimals, "^" + symbol, "Quantized " + name) || this;
    _this.token = new sdkCore.Token(chainId, address, decimals, symbol, name);
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = QuantizedToken.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address && this.token === other.token;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address !== other.address) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return QuantizedToken;
}(sdkCore.Token);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof sdkCore.Token && currencyB instanceof sdkCore.Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof sdkCore.Token) {
    return false;
  } else if (currencyB instanceof sdkCore.Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var QUANTA = (_QUANTA = {}, _QUANTA[sdkCore.ChainId.MAINNET] = /*#__PURE__*/new QuantizedToken(sdkCore.ChainId.MAINNET, QUANTA_ADDRESS, 18, 'QUANTA', 'Quanta'), _QUANTA[sdkCore.ChainId.ROPSTEN] = /*#__PURE__*/new QuantizedToken(sdkCore.ChainId.ROPSTEN, QUANTA_ADDRESS, 18, 'QUANTA', 'Quanta'), _QUANTA[sdkCore.ChainId.RINKEBY] = /*#__PURE__*/new QuantizedToken(sdkCore.ChainId.RINKEBY, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped Ether'), _QUANTA[sdkCore.ChainId.GÖRLI] = /*#__PURE__*/new QuantizedToken(sdkCore.ChainId.GÖRLI, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped QUANTA'), _QUANTA[sdkCore.ChainId.KOVAN] = /*#__PURE__*/new QuantizedToken(sdkCore.ChainId.KOVAN, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped QUANTA'), _QUANTA);

/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH9 token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function quantizedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof sdkCore.TokenAmount) return currencyAmount;
  if (currencyAmount.currency === sdkCore.ETHER) return new sdkCore.TokenAmount(QUANTA[chainId], currencyAmount.raw);
    invariant(false, 'CURRENCY')  ;
}
function quantizedCurrency(currency, chainId) {
  if (currency instanceof sdkCore.Token) return currency;
  if (currency === sdkCore.ETHER) return QUANTA[chainId];
    invariant(false, 'CURRENCY')  ;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */

var Quantize = /*#__PURE__*/function () {
  function Quantize(token, amount, quantizeType) {
    this.token = token;
    this.tradeType = quantizeType;
    this.inputAmount = quantizeType === QuantizeType.QUANTIZE || QuantizeType.DEQUANTIZE ? amount : sdkCore.CurrencyAmount.ether(amount.raw);
    this.outputAmount = quantizeType === QuantizeType.QUANTIZE || QuantizeType.DEQUANTIZE ? amount : sdkCore.CurrencyAmount.ether(amount.raw);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Quantize.quantize = function quantize(token, amountIn) {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  ;

  Quantize.quantizeEth = function quantizeEth(token, amountIn) {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE_ETH);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  ;

  Quantize.dequantize = function dequantize(token, amountIn) {
    return new Quantize(token, amountIn, QuantizeType.DEQUANTIZE);
  };

  return Quantize;
}();

exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.FEETRACKER_ADDRESS = FEETRACKER_ADDRESS;
exports.InsufficientQuantaAvailableError = InsufficientQuantaAvailableError;
exports.MULTITOKEN_ADDRESS = MULTITOKEN_ADDRESS;
exports.QUANTA = QUANTA;
exports.QUANTIZED_ADDRESS = QUANTIZED_ADDRESS;
exports.QUANTIZED_ERC20_INIT_CODE_HASH = QUANTIZED_ERC20_INIT_CODE_HASH;
exports.Quantize = Quantize;
exports.QuantizedToken = QuantizedToken;
exports.computeQuantizedAddress = computeQuantizedAddress;
exports.currencyEquals = currencyEquals;
exports.quantizedAmount = quantizedAmount;
exports.quantizedCurrency = quantizedCurrency;
//# sourceMappingURL=sdk.cjs.development.js.map
