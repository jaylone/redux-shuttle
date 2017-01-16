(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './validator'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./validator'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.validator);
    global.helper = mod.exports;
  }
})(this, function (module, exports, _validator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var SHUTTLE_KEY = '@@redux-shuttle/SHUTTLE_KEY';
  var REDUCER_KEY = '@@redux-shuttle/REDUCER_KEY';

  var genKey = function genKey(string) {
    return Symbol(string);
  };

  var isGenerator = function isGenerator(genFun) {
    var ctor = typeof genFun === "function" ? genFun.constructor : false;
    return ctor ? (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  var isShuttle = function isShuttle(obj) {
    return (0, _validator.isObject)(obj) && Boolean(obj[SHUTTLE_KEY]);
  };

  var defineProperty = function defineProperty(obj, key, value) {
    return Object.defineProperty(obj, key, { value: value });
  };

  var keyMirror = function keyMirror(arr) {
    var ret = {};

    if (!Array.isArray(arr)) {
      return ret;
    }

    arr.forEach(function (val) {
      ret[val] = val;
    });

    return ret;
  };

  exports.default = {
    SHUTTLE_KEY: SHUTTLE_KEY,
    REDUCER_KEY: REDUCER_KEY,
    genKey: genKey,
    defineProperty: defineProperty,
    isGenerator: isGenerator,
    isShuttle: isShuttle,
    keyMirror: keyMirror
  };
  module.exports = exports['default'];
});