'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var FACTORY_ADDRESS = '0x1da48ae241B984C8BA795677616DCc13b93e4d60';
var INIT_CODE_HASH = '0xfae899166b643caca96e31150882fba4e4f9081412d03b8c39cc844124b91e22';

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
  function Quantize(token, amount, qType) {
    this.token = token;
    this.quantizeType = qType;
    this.amount = amount;
  }
  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Quantize.quantize = function quantize(token, amountIn) {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE);
  }
  /**
   * Constructs a quantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  ;

  Quantize.quantizeEth = function quantizeEth(token, amountIn) {
    return new Quantize(token, amountIn, QuantizeType.QUANTIZE_ETH);
  }
  /**
   * Constructs a dequantize op given a token and an amount
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  ;

  Quantize.dequantize = function dequantize(token, amountIn) {
    return new Quantize(token, amountIn, QuantizeType.DEQUANTIZE);
  }
  /**
   * Constructs a dequantize op given a token and an amount and uses ETH to pay for quanta
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  ;

  Quantize.dequantizeWithEth = function dequantizeWithEth(token, amountIn) {
    return new Quantize(token, amountIn, QuantizeType.DEQUANTIZE_WITH_ETH);
  };

  return Quantize;
}();

exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientQuantaAvailableError = InsufficientQuantaAvailableError;
exports.Quantize = Quantize;
//# sourceMappingURL=sdk.cjs.development.js.map
