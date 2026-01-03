import { createNode } from '../shared/components/nodeFactory';
import { Position } from 'reactflow';

export const OutputNodeCopy = createNode({
  title: 'Output',
  width: 180,
  height: 140,
  bgColor: '#ede7f6',
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