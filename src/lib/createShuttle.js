import { pipe, keys, isEmpty, map, reduce, filter, mapObjIndexed, zipObj, merge } from 'ramda';
import createReducer from 'src/lib/createReducer';
import { upperSnakeCase } from 'src/util/underscored';
import { isNull, isUndefined, isFunction, isObject, isArray, isString } from 'src/util/validator';
import keyMirror from 'src/util/keyMirror';

const createTypes = pipe(keys, map(upperSnakeCase), keyMirror);

const createActionsAndReducer = (actions, units, state, config) => mapObjIndexed((item, key) => {
  const type = upperSnakeCase(key);

  if (isArray(item)) {
    const params = filter((value) => isString(value), item);
    actions[key] = (...args) => merge({ type }, zipObj(params, args));

    const reducers = filter((value) => isFunction(value), item);
    if (reducers.length > 0) units[type] = reducers[0];
  } else if (isNull(item) || isUndefined(item)) {
    actions[key] = () => type;
  } else if (isFunction(item)) {
    actions[key] = () => type;
    units[type] = item;
  } else {
    throw new Error(`Type of '${ key }' should be array, function, null or undefined.`);
  }
}, config);

export default (state, config) => {
  if (arguments.length < 2) {
    throw new Error('Initial state and config is required for shuttle.');
  }

  if (isNull(state) || isUndefined(state)) {
    throw new Error('Initial state is required from shuttle.');
  }

  if (!isObject(config)) {
    throw new Error('Config is required for an object.');
  }

  if (isEmpty(config)) {
    throw new Error('Config should not be an empty object.')
  }

  const actions = {};
  const handlers = {};

  createActionsAndReducer(actions, handlers, state, config);

  return {
    Types: createTypes(config),
    actions: actions,
    handlers: handlers,
    reducer: createReducer(state, handlers)
  }
}
