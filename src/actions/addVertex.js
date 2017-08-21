import {Reducable} from '@yarljs/reduce';
import {compose} from 'redux';
import dotProp from 'dot-prop-immutable';

function graphsheetsAddVertex(label) {
  return {
    type: this.type,
    label,
    vertex: {
      edges: [

      ],
      markdown: `# ${label}`,
      transducer: (sources) => {return null}
    }
  };
}

export default compose(
  Reducable((state, action) => {
    return state
  })
)(graphsheetsAddVertex)
