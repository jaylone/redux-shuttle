(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'src/util/helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('src/util/helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.helper);
    global.helper = mod.exports;
  }
})(this, function (exports, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _helper2 = _interopRequireDefault(_helper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  exports.default = _extends({}, _helper2.default);
});