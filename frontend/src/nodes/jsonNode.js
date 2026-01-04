import { Position } from 'reactflow';

import { createNode } from '../shared/components/nodeFactory';

export const JSONNode = createNode({
  title: 'JSON',
  description: 'Parse/transform JSON',
  fields: [
    {
      name: 'mode',
      label: 'Mode',
      type: 'select',
      options: ['Parse', 'Stringify', 'Extract'],
      default: 'parse',
    },
    {
      name: 'path',
      label: 'Path',
      type: 'text',
      default: '',
    },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ],
});
