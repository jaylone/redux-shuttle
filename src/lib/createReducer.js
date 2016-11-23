export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    const handler = (action && action.type) ? handlers[action.type] : undefined;

    if (!handler) {
      return state;
    }

    state = handler(state, action);
    return state;
  };
}
