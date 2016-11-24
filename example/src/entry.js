import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

import { actions, reducer as author } from './shuttle';

const reducers = combineReducers({ author });

@connect(state => state, dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  }
})
class App extends Component {
  setList() {
    const props = this.props;

    props.actions.setList(['Winter', 'is', 'coming.']);
  }

  render() {
    const props = this.props;

    console.log(props)

    return (
      <div>
        <p>Hello world.</p>
        <p>{ props.author.list.join(' ') }</p>
        <button onClick={::this.setList}>Set List</button>
      </div>
    )
  }
};

ReactDom.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
