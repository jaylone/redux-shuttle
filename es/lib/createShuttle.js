(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'ramda', './createReducer', '../util/underscored', '../util/validator', '../util/helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('ramda'), require('./createReducer'), require('../util/underscored'), require('../util/validator'), require('../util/helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.ramda, global.createReducer, global.underscored, global.validator, global.helper);
    global.createShuttle = mod.exports;
  }
})(this, function (module, exports, _ramda, _createReducer2, _underscored, _validator, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createReducer3 = _interopRequireDefault(_createReducer2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _arguments = arguments;


  var typeStringify = function typeStringify(types) {
    return (0, _ramda.pipe)(_ramda.keys, (0, _ramda.reduce)(function (pre, type) {
      return (0, _ramda.concat)(pre, [types[type]]);
    }, []), function (list) {
      return list.join(',');
    })(types);
  };

  var addNamespace = function addNamespace(namespace, type) {
    if ((0, _validator.isNull)(namespace) || (0, _validator.isUndefined)(namespace)) return type;

    var prefix = namespace.substr(namespace.length - 1) === '/' ? namespace : namespace + '/';
    return prefix + (0, _underscored.upperSnakeCase)(type);
  };

  var createTypes = function createTypes(namespace, config) {
    var names = (0, _ramda.keys)(config);
    var values = (0, _ramda.map)(function (type) {
      return addNamespace(namespace, type);
    })(names);
    return (0, _ramda.zipObj)(names, values);
  };

  var createActionsAndReducer = function createActionsAndReducer(actions, handlers, state, config, namespace) {
    return (0, _ramda.mapObjIndexed)(function (item, key) {
      var type = addNamespace(namespace, key);

      if ((0, _validator.isArray)(item)) {
        (function () {
          var params = (0, _ramda.filter)(function (value) {
            return (0, _validator.isString)(value);
          }, item);
          actions[key] = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return (0, _ramda.merge)({ type: type }, (0, _ramda.zipObj)(params, args));
          };

          var reducers = (0, _ramda.filter)(function (value) {
            return (0, _validator.isFunction)(value);
          }, item);
          if (reducers.length > 0) handlers[type] = reducers[0];
        })();
      } else if ((0, _validator.isNull)(item) || (0, _validator.isUndefined)(item)) {
        actions[key] = function () {
          return { type: type };
        };
      } else if ((0, _validator.isFunction)(item)) {
        actions[key] = function () {
          return { type: type };
        };
        handlers[type] = item;
      } else {
        throw new Error('Type of \'' + key + '\' should be array, function, null or undefined.');
      }
    }, config);
  };

  exports.default = function (namespace, state, config) {
    if (_arguments.length < 2) {
      throw new Error('Initial state and config is required for shuttle.');
    }

    if (!(0, _validator.isString)(namespace)) {
      config = state;
      state = namespace;
      namespace = undefined;
    }

    if ((0, _validator.isNull)(state) || (0, _validator.isUndefined)(state)) {
      throw new Error('Initial state is required from shuttle.');
    }

    if (!(0, _validator.isObject)(config)) {
      throw new Error('Config is required for an object.');
    }

    if ((0, _ramda.isEmpty)(config)) {
      throw new Error('Config should not be an empty object.');
    }

    var actions = {};
    var handlers = {};
    var types = createTypes(namespace, config);

    createActionsAndReducer(actions, handlers, state, config, namespace);

    var gid = (0, _helper.genKey)(_helper.SHUTTLE_KEY);
    return (0, _helper.defineProperty)({
      types: types,
      actions: actions,
      handlers: handlers,
      reducer: (0, _createReducer3.default)(state, handlers, _defineProperty({}, _helper.REDUCER_KEY, gid)),
      namespace: namespace
    }, _helper.SHUTTLE_KEY, gid);
  };

  module.exports = exports['default'];
});