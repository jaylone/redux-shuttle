import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';

import { bindShuttle, createShuttleTree } from 'dist/index';
import { helper } from 'dist/helper';
import shuttle from './shuttle';

console.log(helper);

const reducers = createShuttleTree({ shuttle });

@bindShuttle(shuttle)
class App extends Component {
  setList() {
    const props = this.props;

    props.actions.setList(['Winter', 'is', 'coming.']);
  }

  render() {
    const props = this.props;

    console.log(props);

    return (
      <div>
        <p>Hello world.</p>
        <p>{ props.list.join(' ') }</p>
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
