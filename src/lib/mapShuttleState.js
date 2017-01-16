import { keys, mapObjIndexed } from 'ramda';
import { REDUCER_KEY, SHUTTLE_KEY, isShuttle } from '../util/helper';
import { isObject, isString } from '../util/validator';

const recursion = (state, reducerKey) => {
  if (isObject(state)) {
    let hitReducer = {};
    if (state[REDUCER_KEY] === reducerKey) {
      hitReducer = state;
      return hitReducer;
    }

    const stateKeys = keys(state);
    const hit = stateKeys.some((key) => {
      hitReducer = recursion(state[key], reducerKey)
      return Boolean(hitReducer);
    });

    return hit ? hitReducer : false;
  }
}

export default (config) => {
  if (!isObject(config)) {
    throw new Error('mapShuttleState required \'shuttle\' or \'object\'');
  }

  return (state) => {
    if (isShuttle(config)) {
      return recursion(state, config[SHUTTLE_KEY]);
    }

    return mapObjIndexed((shuttle) => {
      return recursion(state, shuttle[SHUTTLE_KEY])
    }, config);
  }
}
