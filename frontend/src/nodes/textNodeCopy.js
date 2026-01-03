import { Position } from 'reactflow';

import { createNode } from '../shared/components/nodeFactory';

export const TextNodeCopy = createNode({
  title: 'Text',
  defaultHeight: false,
  fields: [
    {
      default: '',
      name: 'text',
      label: 'Text',
      type: 'textarea',
      createHandles: true,
    },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right }
  ],
});
