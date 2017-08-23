import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

import {reduce, Actions} from '@yarljs/reduce';
import {actions, Components, defaultState} from '../src';


const store = createStore(
  reduce,
  defaultState,
  //applyMiddleware(yarlFetch.middleware)
);


class Root extends React.Component {
  render() {
    return (
      <div>This is like Excel but it will blow your fking mind</div>
    )
  }
}

window.$d = store.dispatch;
window.$a = Actions;
window.$s = store.getState;


ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>
  , document.getElementById('react-root'));
