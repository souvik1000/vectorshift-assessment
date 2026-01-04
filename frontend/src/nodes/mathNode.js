import { Position } from 'reactflow';

import { createNode } from '../shared/components/nodeFactory';

export const MathNode = createNode({
  title: 'Math',
  description: 'Perform arithmetic',
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      options: ['Add', 'Subtract', 'Multiply', 'Divide'],
      default: 'add',
    },
  ],
  handles: [
    { id: 'valueA', type: 'target', position: Position.Left },
    { id: 'valueB', type: 'target', position: Position.Left },
    { id: 'result', type: 'source', position: Position.Right },
  ],
});
