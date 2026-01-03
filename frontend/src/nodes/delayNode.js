import { createNode } from '../shared/components/nodeFactory';
import { Position } from 'reactflow';

/**
 * Delay Node - Adds a delay/pause to the pipeline
 */
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
  width: 180,
  bgColor: '#e0f2f1',
});
