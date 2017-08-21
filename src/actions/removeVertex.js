import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsRemoveEdgeVertex(label) {
  return {
    type: this.type,
    label,

  };
}

export default compose(
  Reducable((state, action) => {
    return state
  })
)(graphsheetsRemoveEdgeVertex)
