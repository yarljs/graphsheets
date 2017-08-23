import React from 'react';
import GraphCell from '../components/graphCell';

function* graphCellGenerator(verts) {
  let count = 0;
  for (let i in verts)
  {
    yield (<GraphCell key={count} vertex={verts[i]} />);
    count += 1;
  }
  return;
}

export default graphCellGenerator;
