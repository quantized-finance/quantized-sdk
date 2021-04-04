import { TokenAmount, Token, ChainId, validateAndParseAddress } from '@uniswap/sdk-core';
import invariant from 'tiny-invariant';
import { keccak256, pack } from '@ethersproject/solidity';
import { getCreate2Address } from '@ethersproject/address';

var QUANTIZED_ADDRESS = '0x8c1f3365F11cf2E401340CD2425dDBcefa300040';
var FACTORY_ADDRESS = '0xEf27F45DB678Fa3FC35d73E86D239E12f8e26FD7';
var MULTITOKEN_ADDRESS = '0xf377E4CDd42C3Acf37D01dB69Fe8E669c7Afb11B';
var FEETRACKER_ADDRESS = '0xea6EC95E6FdeD7B30c147979c8CC76B729ac3d16';
var QUANTA_ADDRESS = '0x7017453C48d67f8C63e0335d6781CB49089b26cF';
var QUANTIZED_ERC20_INIT_CODE_HASH = '0xcd4902b65e1285dd3266dd5a6212b18ff94b962e082ca6cd0a3c4538738b4a96';

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

/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */

var Quantize = /*#__PURE__*/function () {
  function Quantize(amount, qType) {
    this.token = amount instanceof TokenAmount ? amount.token : undefined;
    this.quantizeType = qType;
    this.amount = amount;
  }
  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Quantize.quantize = function quantize(amountIn) {
    return new Quantize(amountIn, QuantizeType.QUANTIZE);
  }
  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  ;

  Quantize.quantizeEth = function quantizeEth(amountIn) {
    return new Quantize(amountIn, QuantizeType.QUANTIZE_ETH);
  }
  /**
   * Constructs a dequantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  ;

  Quantize.dequantize = function dequantize(amountIn) {
    return new Quantize(amountIn, QuantizeType.DEQUANTIZE);
  };

  return Quantize;
}();

var _QUANTA;
var computeQuantizedAddress = function computeQuantizedAddress(_ref) {
  var tokenAddress = _ref.tokenAddress;
  return getCreate2Address(FACTORY_ADDRESS, keccak256(['bytes', 'bytes', 'bytes'], [pack(['address'], [QUANTIZED_ADDRESS]), pack(['address'], [MULTITOKEN_ADDRESS]), pack(['address'], [tokenAddress])]), QUANTIZED_ERC20_INIT_CODE_HASH);
};
var QuantizedToken = /*#__PURE__*/function (_Token) {
  _inheritsLoose(QuantizedToken, _Token);

  function QuantizedToken(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _Token.call(this, chainId, validateAndParseAddress(computeQuantizedAddress({
      tokenAddress: address
    })), decimals, "^" + symbol, "Quantized " + name) || this;
    _this.token = new Token(chainId, address, decimals, symbol, name);
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
    !(this.chainId === other.chainId) ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;
    !(this.address !== other.address) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ADDRESSES') : invariant(false) : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return QuantizedToken;
}(Token);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var QUANTA = (_QUANTA = {}, _QUANTA[ChainId.MAINNET] = /*#__PURE__*/new QuantizedToken(ChainId.MAINNET, QUANTA_ADDRESS, 18, 'QUANTA', 'Quanta'), _QUANTA[ChainId.ROPSTEN] = /*#__PURE__*/new QuantizedToken(ChainId.ROPSTEN, QUANTA_ADDRESS, 18, 'QUANTA', 'Quanta'), _QUANTA[ChainId.RINKEBY] = /*#__PURE__*/new QuantizedToken(ChainId.RINKEBY, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped Ether'), _QUANTA[ChainId.GÖRLI] = /*#__PURE__*/new QuantizedToken(ChainId.GÖRLI, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped QUANTA'), _QUANTA[ChainId.KOVAN] = /*#__PURE__*/new QuantizedToken(ChainId.KOVAN, QUANTA_ADDRESS, 18, 'QUANTA', 'Wrapped QUANTA'), _QUANTA);

export { FACTORY_ADDRESS, FEETRACKER_ADDRESS, InsufficientQuantaAvailableError, MULTITOKEN_ADDRESS, QUANTA, QUANTIZED_ADDRESS, QUANTIZED_ERC20_INIT_CODE_HASH, Quantize, QuantizedToken, computeQuantizedAddress, currencyEquals };
//# sourceMappingURL=sdk.esm.js.map
