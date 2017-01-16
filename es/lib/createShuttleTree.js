(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'ramda', 'redux', '../util/validator', '../util/helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('ramda'), require('redux'), require('../util/validator'), require('../util/helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.ramda, global.redux, global.validator, global.helper);
    global.createShuttleTree = mod.exports;
  }
})(this, function (module, exports, _ramda, _redux, _validator, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var reducer = 'reducer';

  var recursionReducer = function recursionReducer(treeNode) {

    if ((0, _helper.isShuttle)(treeNode)) {
      return treeNode[reducer];
    } else if ((0, _validator.isObject)(treeNode)) {
      return (0, _redux.combineReducers)((0, _ramda.mapObjIndexed)(function (node) {
        return recursionReducer(node);
      }, treeNode));
    } else {
      throw new Error('shuttle tree node should be a shuttle.');
    }
  };

  exports.default = function (tree) {
    if ((0, _validator.isObject)(tree) && !(0, _helper.isShuttle)(tree)) {
      return recursionReducer(tree);
    } else {
      throw new Error('entire shuttle tree required a object.');
    }
  };

  module.exports = exports['default'];
});