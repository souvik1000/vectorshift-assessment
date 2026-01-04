import { Position } from 'reactflow';

import { createNode } from '../shared/components/nodeFactory';

export const OutputNodeCopy = createNode({
  title: 'Output',
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      default: ''
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'Image'],
      default: 'text',
    }
  ],
  handles: [
    {
      id: 'value',
      type: 'target',
      position: Position.Left
    }
  ]
});