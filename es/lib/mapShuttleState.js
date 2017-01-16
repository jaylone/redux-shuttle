(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'src/util/helper', 'src/util/validator', 'ramda'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('src/util/helper'), require('src/util/validator'), require('ramda'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.helper, global.validator, global.ramda);
    global.mapShuttleState = mod.exports;
  }
})(this, function (module, exports, _helper, _validator, _ramda) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var recursion = function recursion(state, reducerKey) {
    if ((0, _validator.isObject)(state)) {
      var _ret = function () {
        var hitReducer = {};
        if (state[_helper.REDUCER_KEY] === reducerKey) {
          hitReducer = state;
          return {
            v: hitReducer
          };
        }

        var stateKeys = (0, _ramda.keys)(state);
        var hit = stateKeys.some(function (key) {
          hitReducer = recursion(state[key], reducerKey);
          return Boolean(hitReducer);
        });

        return {
          v: hit ? hitReducer : false
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  };

  exports.default = function (config) {
    if (!(0, _validator.isObject)(config)) {
      throw new Error('mapShuttleState required \'shuttle\' or \'object\'');
    }

    return function (state) {
      if ((0, _helper.isShuttle)(config)) {
        return recursion(state, config[_helper.SHUTTLE_KEY]);
      }

      return (0, _ramda.mapObjIndexed)(function (shuttle) {
        return recursion(state, shuttle[_helper.SHUTTLE_KEY]);
      }, config);
    };
  };

  module.exports = exports['default'];
});