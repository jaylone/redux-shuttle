import { isObject, isString } from 'src/util/validator';

const defineProperty = Object.defineProperty;

const wrapState = (uniqKey, propKey, state) => {
  uniqKey && defineProperty(state, propKey, {value: uniqKey});
  return state;
}

export default function createReducer(initialState, handlers, REDUCER_KEY) {
  if (arguments.length < 2) {
    throw new Error('Initial state and handlers is required.');
  }

  if (!isObject(handlers)) {
    throw new Error('Handlers needed a plain object.');
  }

  const uniqKey = isString(REDUCER_KEY) ? Symbol() : '';

  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlers[action.type] : undefined;

    if (!handler) {
      return wrapState(uniqKey, REDUCER_KEY, state);
    }

    const nextState = wrapState(uniqKey, REDUCER_KEY, handler(state, action));

    console.log('initialState', nextState[REDUCER_KEY] === state[REDUCER_KEY]);

    return nextState;
  };
}
