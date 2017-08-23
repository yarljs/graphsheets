import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsRemoveEdge(vertex, from) {
  return {
    type: this.type,
    vertex,
    from
  };
}

export default compose(
  Reducable((state, action) => {
    const s = dotProp.get(state, `yarljs.graphsheets.verts.${action.vertex}.edges`);
    return dotProp.set(state, `yarljs.graphsheets.verts.${action.vertex}.edges`,
      s.splice(s.indexOf(action.from)));
  })
)(graphsheetsRemoveEdge)
