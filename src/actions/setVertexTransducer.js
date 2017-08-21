import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsSetVertexTransducer(vertex, from) {
  return {
    type: this.type,
    vertex,
    from
  };
}

export default compose(
  Reducable((state, action) => {
    return state
  })
)(graphsheetsSetVertexTransducer)
