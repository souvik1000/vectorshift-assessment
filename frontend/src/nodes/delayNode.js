import { Position } from 'reactflow';

import { createNode } from '../shared/components/nodeFactory';

export const DelayNode = createNode({
  title: 'Delay',
  description: 'Add delay',
  fields: [
    {
      name: 'duration',
      label: 'Duration (ms)',
      type: 'number',
      default: '1000',
    },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ],
});
