import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsAddEdge(vertex, from) {
  return {
    type: this.type,
    vertex,
    from
  };
}

export default compose(
  Reducable((state, action) => {
    return dotProp.merge(state, `yarljs.graphsheets.verts.${action.vertex}.edges`, from);
  })
)(graphsheetsAddEdge)
