import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';

import {parse} from '@yarljs/soggy-markdown';

class GraphCell extends React.PureComponent {

  constructor(props) {
    super(props);

    this.invoke = this.invoke.bind(this);
    this.getMd = this.getMd.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
      // This is where we stop infinite recursion hopefully
      if(this.props.value !== nextProps.value) {
        return true;
      }
      if(nextProps.vertex !== this.props.vertex) {
        return true;
      }
      if(nextProps.target.markdown !== this.props.target.markdown)
      {
        return true;
      }
      if(nextProps.target.transducer !== this.props.target.transducer) {
        return true;
      }
      if(nextProps.target.edges.filter(
        (e, i) => {
          return !this.props.target.edges.includes(e)
        }).length
      )
      {
        return true;
      }

      return false;
  }

  invoke() {
    return this.props.target.transducer(this.props.results);
  }

  componentDidMount() {
    $d($a.graphsheetsSetVertexResult(
      this.props.vertex,
      this.invoke()));
  }

  componentDidUpdate() {
    const inv = this.invoke();
    if(inv !== this.props.value) {
      $d($a.graphsheetsSetVertexResult(
        this.props.vertex,
        inv));
    }

  }

  getMd() {
    return { __html: parse(this.props.target.markdown, this.props) };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.getMd()}></div>
    );
  }
}

export default connect((state, ownProps) => {
  const target = dotProp.get(state, `yarljs.graphsheets.verts.${ownProps.vertex}`);
  const vertCache = dotProp.get(state,
    `yarljs.graphsheets.vertCache`);


  let results = dotProp.get(state, `yarljs.graphsheets.results`)

  return {
    vertex: ownProps.vertex,
    target,
    value: results[vertCache.lookup[ownProps.vertex]],
    results: Object.keys(results).filter((e) => {
      return target.edges.includes(parseInt(e));
    }).reduce((acc, val) => {
      acc[vertCache.inverse[val]] = results[val];
      return acc;
    }, {})
  };
})(GraphCell)
