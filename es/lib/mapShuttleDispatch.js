(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'ramda', 'redux', 'src/util/validator', 'src/util/helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('ramda'), require('redux'), require('src/util/validator'), require('src/util/helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.ramda, global.redux, global.validator, global.helper);
    global.mapShuttleDispatch = mod.exports;
  }
})(this, function (module, exports, _ramda, _redux, _validator, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Actions = 'actions';

  exports.default = function (config) {
    if (!(0, _validator.isObject)(config)) {
      throw new Error('mapShuttleDispatch required \'shuttle\' or \'object\'');
    }
    return function (dispatch) {
      if ((0, _helper.isShuttle)(config)) {
        return {
          actions: (0, _redux.bindActionCreators)(config[Actions], dispatch),
          dispatch: dispatch
        };
      }

      var actionKeys = (0, _ramda.pipe)(_ramda.keys, (0, _ramda.map)(function (key) {
        return key + 'Actions';
      }))(config);
      var actions = (0, _ramda.pipe)(_ramda.keys, (0, _ramda.map)(function (key) {
        return (0, _redux.bindActionCreators)(config[key][Actions], dispatch);
      }))(config);

      return (0, _ramda.merge)((0, _ramda.zipObj)(actionKeys, actions), { dispatch: dispatch });
    };
  };

  module.exports = exports['default'];
});