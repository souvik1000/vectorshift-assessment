import { Position } from 'reactflow';

import { createNode } from '../shared/components/nodeFactory';

export const FilterNode = createNode({
  title: 'Filter',
  description: 'Filter data by criteria',
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      options: ['Contains', 'StartsWith', 'EndsWith', 'Equals'],
      default: 'contains',
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
});
