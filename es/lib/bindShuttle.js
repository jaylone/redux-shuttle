(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react-redux', '../util/validator', '../util/helper', './mapShuttleState', './mapShuttleDispatch'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react-redux'), require('../util/validator'), require('../util/helper'), require('./mapShuttleState'), require('./mapShuttleDispatch'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.reactRedux, global.validator, global.helper, global.mapShuttleState, global.mapShuttleDispatch);
    global.bindShuttle = mod.exports;
  }
})(this, function (module, exports, _reactRedux, _validator, _helper, _mapShuttleState, _mapShuttleDispatch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _mapShuttleState2 = _interopRequireDefault(_mapShuttleState);

  var _mapShuttleDispatch2 = _interopRequireDefault(_mapShuttleDispatch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = function (shuttles, mergeProps) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var mapStateToProps = void 0,
        mapDispatchToProps = void 0;

    if (!(0, _validator.isObject)(shuttles)) {
      throw new Error('bindShuttle required \'shuttle\' or  \'object\'');
    }

    return (0, _reactRedux.connect)((0, _mapShuttleState2.default)((0, _helper.isShuttle)(shuttles) ? { shuttle: shuttles } : shuttles), (0, _mapShuttleDispatch2.default)(shuttles), mergeProps, options = {});
  };

  module.exports = exports['default'];
});