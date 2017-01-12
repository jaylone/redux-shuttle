(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'ramda'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('ramda'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ramda);
    global.underscored = mod.exports;
  }
})(this, function (exports, _ramda) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var underscored = function underscored(str) {
    return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/([A-Z\d])([A-Z\d][a-z])/g, '$1_$2').replace(/[-\s]+/g, '_');
  };

  var upperSnakeCase = (0, _ramda.pipe)(underscored, _ramda.toUpper);

  var lowerSnakeCase = (0, _ramda.pipe)(underscored, _ramda.toLower);

  exports.default = {
    underscored: underscored,
    upperSnakeCase: upperSnakeCase,
    lowerSnakeCase: lowerSnakeCase
  };
});