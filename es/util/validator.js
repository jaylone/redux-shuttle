(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.validator = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var toString = Object.prototype.toString;

  var typeOf = function typeOf(val) {
    if (typeof val === 'undefined') {
      return 'undefined';
    }
    if (val === null) {
      return 'null';
    }
    if (val === true || val === false || val instanceof Boolean) {
      return 'boolean';
    }
    if (typeof val === 'string' || val instanceof String) {
      return 'string';
    }
    if (typeof val === 'number' || val instanceof Number) {
      return 'number';
    }

    // functions
    if (typeof val === 'function' || val instanceof Function) {
      return 'function';
    }

    // array
    if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
      return 'array';
    }

    // check for instances of RegExp and Date before calling `toString`
    if (val instanceof RegExp) {
      return 'regexp';
    }
    if (val instanceof Date) {
      return 'date';
    }

    // other objects
    var type = toString.call(val);

    if (type === '[object RegExp]') {
      return 'regexp';
    }
    if (type === '[object Date]') {
      return 'date';
    }
    if (type === '[object Arguments]') {
      return 'arguments';
    }

    // es6: Map, WeakMap, Set, WeakSet
    if (type === '[object Set]') {
      return 'set';
    }
    if (type === '[object WeakSet]') {
      return 'weakset';
    }
    if (type === '[object Map]') {
      return 'map';
    }
    if (type === '[object WeakMap]') {
      return 'weakmap';
    }
    if (type === '[object Symbol]') {
      return 'symbol';
    }

    // typed arrays
    if (type === '[object Int8Array]') {
      return 'int8array';
    }
    if (type === '[object Uint8Array]') {
      return 'uint8array';
    }
    if (type === '[object Uint8ClampedArray]') {
      return 'uint8clampedarray';
    }
    if (type === '[object Int16Array]') {
      return 'int16array';
    }
    if (type === '[object Uint16Array]') {
      return 'uint16array';
    }
    if (type === '[object Int32Array]') {
      return 'int32array';
    }
    if (type === '[object Uint32Array]') {
      return 'uint32array';
    }
    if (type === '[object Float32Array]') {
      return 'float32array';
    }
    if (type === '[object Float64Array]') {
      return 'float64array';
    }

    // must be a plain object
    return 'object';
  };

  var isObject = function isObject(obj) {
    return typeOf(obj) === 'object';
  };

  var isArray = function isArray(arr) {
    return typeOf(arr) === 'array';
  };

  var isFunction = function isFunction(fun) {
    return typeOf(fun) === 'function';
  };

  var isNull = function isNull(nll) {
    return typeOf(nll) === 'null';
  };

  var isUndefined = function isUndefined(undfd) {
    return typeOf(undfd) === 'undefined';
  };

  var isNumber = function isNumber(num) {
    var type = typeOf(num);
    if (type !== 'number' && type !== 'string') {
      return false;
    }
    var n = +num;
    return n - n + 1 >= 0 && num !== '';
  };

  var isString = function isString(str) {
    return typeOf(str) === 'string';
  };

  exports.default = {
    typeOf: typeOf,
    isArray: isArray,
    isObject: isObject,
    isNull: isNull,
    isUndefined: isUndefined,
    isFunction: isFunction,
    isNumber: isNumber,
    isString: isString
  };
});