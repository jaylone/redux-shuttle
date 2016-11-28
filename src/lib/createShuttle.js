import { pipe, keys, isEmpty, map, reduce, filter, mapObjIndexed, zipObj, merge } from 'ramda';
import createReducer from 'src/lib/createReducer';
import { upperSnakeCase } from 'src/util/underscored';
import { isNull, isUndefined, isFunction, isObject, isArray, isString } from 'src/util/validator';
import keyMirror from 'src/util/keyMirror';

const REDUCER_KEY = '@@redux-shuttle/REDUCER';

const addNamespace = (namespace, type) => {
  if ( isNull(namespace) || isUndefined(namespace) ) return type;

  const prefix = namespace.substr(namespace.length-1) === '/' ? namespace : `${namespace}/`;
  return prefix + upperSnakeCase(type);
}

const createTypes = (namespace, config) => {
  const names = keys(config);
  const values = map((type)=>addNamespace(namespace, type))(names);
  return zipObj(names, values);
}

const createActionsAndReducer = (actions, handlers, state, config, namespace) => mapObjIndexed((item, key) => {
  const type = addNamespace(namespace, key);

  if (isArray(item)) {
    const params = filter((value) => isString(value), item);
    actions[key] = (...args) => merge({ type }, zipObj(params, args));

    const reducers = filter((value) => isFunction(value), item);
    if (reducers.length > 0) handlers[type] = reducers[0];
  } else if (isNull(item) || isUndefined(item)) {
    actions[key] = () => { return { type } };
  } else if (isFunction(item)) {
    actions[key] = () => { return { type } };
    handlers[type] = item;
  } else {
    throw new Error(`Type of '${ key }' should be array, function, null or undefined.`);
  }
}, config);

export default (namespace, state, config) => {
  if (arguments.length < 2) {
    throw new Error('Initial state and config is required for shuttle.');
  }

  if (!isString(namespace)) {
    config = state;
    state = namespace;
    namespace = undefined;
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
  const types = createTypes(namespace, config);

  createActionsAndReducer(actions, handlers, state, config, namespace);

  return {
    types,
    actions,
    handlers,
    reducer: createReducer(state, handlers, REDUCER_KEY)
  }
}
