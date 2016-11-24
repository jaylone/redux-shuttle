import { createShuttle, keyMirror } from 'dist/index';

const initState = {
  list: [],
  name: '',
  visible: false
}

// const shuttle = createShuttle(initState, {
//   setList: ['list', (state, action) => {
//     return Object.assign({}, state, {list: action.list});
//   }],
//   setName: ['name', (state, action) => {
//     return Object.assign({}, state, {list: action.name});
//   }],
//   toggleModal: (state, action) => {
//     return Object.assign({}, state, {visible: !state.visible});
//   }
// });
//
// console.log(shuttle);

console.log(createShuttle);
