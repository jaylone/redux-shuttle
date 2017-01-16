(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'ramda', '../util/validator', '../util/helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('ramda'), require('../util/validator'), require('../util/helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.ramda, global.validator, global.helper);
    global.createReducer = mod.exports;
  }
})(this, function (module, exports, _ramda, _validator, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createReducer;


  var wrapState = function wrapState(state, attach) {

    if (!(0, _validator.isObject)(state) || !(0, _validator.isObject)(attach)) {
      return state;
    }

    var propKey = (0, _ramda.keys)(attach)[0];

    if ((0, _validator.isNull)(propKey) || (0, _validator.isUndefined)(propKey)) {
      return state;
    }

    (0, _helper.defineProperty)(state, propKey, attach[propKey]);
    return state;
  };

  function createReducer(initialState, handlers, attach) {
    if (arguments.length < 2) {
      throw new Error('Initial state and handlers is required.');
    }

    if (!(0, _validator.isObject)(handlers)) {
      throw new Error('Handlers needed a plain object.');
    }

    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments[1];

      var handler = action && action.type ? handlers[action.type] : undefined;

      if (!handler) {
        return wrapState(state, attach);
      }

      var nextState = wrapState(handler(state, action), attach);

      return nextState;
    };
  }
  module.exports = exports['default'];
});