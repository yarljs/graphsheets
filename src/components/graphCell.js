import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';

import {render} from '@yarljs/soggy-markdown';

class GraphCell extends React.Component {

  constructor(props) {
    super(props);

    this.invoke = this.invoke.bind(this);
    this.getMd = this.getMd.bind(this);
  }

  invoke() {
    return this.props.target.transducer(this.props.result);
  }

  componentDidMount() {
    $d($a('graphsheetsSetVertexResult')(
      this.props.target.markdown,
      this.invoke()));
  }

  componentDidUpdate() {
    $d($a('graphsheetsSetVertexResult')(this.props.value, this.invoke()));
  }

  getMd() {
    return { __html: render(this.props.markdown.target, this.props) };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.getMd()}>FFF</div>
    );
  }
}

export default connect((state, ownProps) => {
  const target = dotProp.get(`yarljs.graphsheets.verts.${ownProps.vertex}`);
  const vertCache = dotProp.get(state,
    `yarljs.graphsheets.vertCache`);


  let results = dotProp.get(state, `yarljs.graphsheets.results`)

  return {
    vertex: ownProps.vertex,
    target,
    value: results[vertCache[target]],
    results: Object.keys(results).filter((e) => {
      return target.edges.includes(e);
    }).reduce((acc, val) => {
      acc[e] = results[e];
      return acc;
    }, {})
  };
})(GraphCell)
