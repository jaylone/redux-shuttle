import { keys } from 'ramda';
import { isObject, isString, isUndefined, isNull } from '../util/validator';
import { defineProperty } from '../util/helper';

const wrapState = (state, attach) => {

  if (!isObject(state) || !isObject(attach)) {
    return state;
  }

  const propKey = keys(attach)[0];

  if (isNull(propKey) || isUndefined(propKey)) {
    return state;
  }

  defineProperty(state, propKey, attach[propKey]);
  return state;
}

export default function createReducer(initialState, handlers, attach) {
  if (arguments.length < 2) {
    throw new Error('Initial state and handlers is required.');
  }

  if (!isObject(handlers)) {
    throw new Error('Handlers needed a plain object.');
  }

  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlers[action.type] : undefined;

    if (!handler) {
      return wrapState(state, attach);
    }

    const nextState = wrapState(handler(state, action), attach);

    return nextState;
  };
}
