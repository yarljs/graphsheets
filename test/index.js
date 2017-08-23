import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

import {reduce, Actions} from '@yarljs/reduce';
import {actions, libs, Components, defaultState} from '../src';


const store = createStore(
  reduce,
  defaultState,
  //applyMiddleware(yarlFetch.middleware)
);



function testData() {
  $d($a.graphsheetsAddVertex("root"))
  $d($a.graphsheetsSetVertexMarkdown("root", `
# Why Hello There!
This Node Computes a Value: {{value}}
  `))
  $d($a.graphsheetsSetVertexTransducer("root", (results) => {
    return 10;
  }))


  $d($a.graphsheetsAddVertex("two"))
  $d($a.graphsheetsSetVertexMarkdown("two", `
# I'm Root Two!
This Node Computes a Value From Root: {{value}}
  `))
  $d($a.graphsheetsAddEdge("two", "root"))
  $d($a.graphsheetsSetVertexTransducer("two", (results) => {
    return (results.root) ? results.root + 1 : 1
  }))
}


class CellContainer extends React.Component {

  constructor(props) {
    super(props);

    this.getBody = this.getBody.bind(this);
  }

  getBody() {
    let res = [];
    let gen = libs.graphCellGenerator(this.props.verts);
    for (let n of gen) {
      res.push(n)
    }
    return res;
  }

  render() {
    const res = this.getBody();
    return (
      <div>
        {res}
      </div>
    )
  }
}

const Root = connect((state)=> {
  let res = Object.keys(state.yarljs.graphsheets.verts).map((e) => {return e});
  return {
    verts: res
  }
})(CellContainer)

window.$d = store.dispatch;
window.$a = Actions;
window.$s = store.getState;


testData();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>
  , document.getElementById('react-root'));
