import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsSetVertexMarkdown(vertex, result) {
  return {
    type: this.type,
    vertex,
    result
  };
}

export default compose(
  Reducable((state, action) => {
    return dotProp.set(state,
      `yarljs.graphsheets.results.${action.vertex}`, action.result);
  })
)(graphsheetsSetVertexMarkdown)
