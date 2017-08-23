import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsSetVertexTransducer(vertex, transducer) {
  return {
    type: this.type,
    vertex,
    transducer
  };
}

export default compose(
  Reducable((state, action) => {
    return dotProp.set(
      state,
      `yarljs.graphsheets.verts.${action.vertex}.transducer`,
      action.transducer);
  })
)(graphsheetsSetVertexTransducer)
