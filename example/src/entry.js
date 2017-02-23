import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';

import { bindShuttle, createShuttleTree } from 'es/index';
import helper from 'es/underscored';
import shuttle from './shuttle';

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
        <p>{ props.shuttle.list.join(' ') }</p>
        <button onClick={::this.setList}>Set List</button>
      </div>
    )
  }
};

ReactDom.render(
  <Provider store={createStore(reducers)}>
    <App wrapperName="jaylone"/>
  </Provider>,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept();
}
