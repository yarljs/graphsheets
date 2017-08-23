import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsRemoveVertex(label) {
  return {
    type: this.type,
    label,
  };
}

export default compose(
  Reducable((state, action) => {
    let index = dotProp.get(`yarljs.graphsheets.vertCache.${action.label}`);
    if(index === undefined)
    {
      return dotProp.set(state, 'yarljs.graphsheets.error', `No Such Vertex ${action.label}`);
    }

    // Remove edges to this node
    let verts = dotProp.get(`yarljs.graphsheets.verts`);
    verts = Object.keys(verts).filter((e, i) => {
      return e !== action.label
    })
    .map((e, i) => {
      return {
        ...e,
        edges: verts[e].edges.filter((e, i) => {
          return e != index;
        })
      }
    });
    //let res = dotProp.delete(state, });
    let res = dotProp.delete(state, )
    return dotProp.delete(res, `yarljs.graphsheets.verts.${action.label}`);
  })
)(graphsheetsRemoveVertex)
