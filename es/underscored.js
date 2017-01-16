(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './util/underscored.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./util/underscored.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.underscored);
    global.underscored = mod.exports;
  }
})(this, function (module, exports, _underscored) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _underscored2 = _interopRequireDefault(_underscored);

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

  exports.default = _extends({}, _underscored2.default);
  module.exports = exports['default'];
});