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
    let index = dotProp.get(state, `yarljs.graphsheets.vertCache.lookup.${action.from}`);
    if(index === undefined)
    {
      return dotProp.set(state, 'yarljs.graphsheets.error', `No Such Vertex ${action.label}`);
    }

    return dotProp.merge(state,
      `yarljs.graphsheets.verts.${action.vertex}.edges`, index);
  })
)(graphsheetsAddEdge)
