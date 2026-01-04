import { Position } from 'reactflow';

import { FIELD_TYPES } from '../enums/fieldTypes';
import { HANDLE_TYPES } from '../enums/handleTypes';
import { createNode } from '../shared/components/nodeFactory';

export const FilterNode = createNode({
  title: 'Filter',
  description: 'Filter data by criteria',
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      default: 'contains',
      type: FIELD_TYPES.SELECT,
      options: ['Contains', 'StartsWith', 'EndsWith', 'Equals'],
    },
    {
      default: '',
      name: 'value',
      label: 'Value',
      type: FIELD_TYPES.TEXT,
    },
  ],
  handles: [
    { id: 'input', type: HANDLE_TYPES.TARGET, position: Position.Left },
    { id: 'match', type: HANDLE_TYPES.SOURCE, position: Position.Right },
    { id: 'nomatch', type: HANDLE_TYPES.SOURCE, position: Position.Right },
  ],
});
