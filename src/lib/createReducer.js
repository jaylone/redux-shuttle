import { isObject } from 'src/util/validator';

export default function createReducer(initialState, handlers) {
  if (arguments.length < 2) {
    throw new Error('Initial state and handlers is required.');
  }

  if (!isObject(handlers)) {
    throw new Error('Handlers needed a plain object.');
  }

  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlers[action.type] : undefined;

    if (!handler) {
      return state;
    }

    state = handler(state, action);
    return state;
  };
}
