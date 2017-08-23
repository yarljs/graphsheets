import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsSetVertexMarkdown(vertex, markdown) {
  return {
    type: this.type,
    vertex,
    markdown
  };
}

export default compose(
  Reducable((state, action) => {
    return dotProp.set(state,
      `yarljs.graphsheets.verts.${action.vertex}.markdown`, action.markdown);
  })
)(graphsheetsSetVertexMarkdown)
