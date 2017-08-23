import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsSetVertexResult(vertex, result) {
  return {
    type: this.type,
    vertex,
    result
  };
}

export default compose(
  Reducable((state, action) => {
    let index = dotProp.get(state, `yarljs.graphsheets.vertCache.lookup.${action.vertex}`);
    if(index === undefined)
    {
      return dotProp.set(state, 'yarljs.graphsheets.error', `No Such Vertex ${action.vertex}`);
    }

    return dotProp.set(state,
      `yarljs.graphsheets.results.${index}`, action.result);
  })
)(graphsheetsSetVertexResult)
