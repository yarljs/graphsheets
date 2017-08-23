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
    let cache = dotProp.get(state, `yarljs.graphsheets.vertCache`);
    let index = cache.count;
    cache.lookup[action.label] = index;
    cache.reverse[index] = action.label;
    cache.count += 1;

    let res = dotProp.set(state, `yarljs.graphsheets.vertCache`, cache);
    res = dotProp.set(state, `yarljs.graphsheets.results.${index}`, null);
    return dotProp.set(res, `yarljs.graphsheets.verts.${action.label}`, action.vertex);
  })
)(graphsheetsAddVertex)
