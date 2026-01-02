import { createNode } from '../shared/components/nodeFactory';
import { Position } from 'reactflow';

/**
 * Filter Node - Filters data based on conditions
 */
export const FilterNode = createNode({
  title: 'Filter',
  description: 'Filter data by criteria',
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      options: ['Contains', 'StartsWith', 'EndsWith', 'Equals'],
      default: 'Contains',
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      default: '',
    },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'match', type: 'source', position: Position.Right },
    { id: 'nomatch', type: 'source', position: Position.Right },
  ],
  width: 180,
  height: 140,
  bgColor: '#fff3e0',
});
