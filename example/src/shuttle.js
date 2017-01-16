import { createShuttle, createReducer } from 'es/index';
import { combineReducers } from 'redux';

const initState = {
  list: ['King\'s', 'Landing.'],
  name: '',
  visible: false
}

export default createShuttle('App',initState, {
  setList: ['list',  (state, action) => { console.log(action)
    return Object.assign({}, state, {list: action.list});
  }],
  setName: ['name', (state, action) => {
    return Object.assign({}, state, {list: action.name});
  }],
  toggleModal: (state, action) => {
    return Object.assign({}, state, {visible: !state.visible});
  },
  fetchList: ['param'],
  recieveList: ['data', (state, actions) => {
    return Object.assign({}, state, data)
  }],
  fetchAll: null
});
