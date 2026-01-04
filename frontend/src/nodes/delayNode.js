import { Position } from 'reactflow';

import { FIELD_TYPES } from '../enums/fieldTypes';
import { HANDLE_TYPES } from '../enums/handleTypes';
import { createNode } from '../shared/components/nodeFactory';

export const DelayNode = createNode({
  title: 'Delay',
  description: 'Add delay',
  fields: [
    {
      default: '1000',
      name: 'duration',
      label: 'Duration (ms)',
      type: FIELD_TYPES.NUMBER,
    },
  ],
  handles: [
    { id: 'input', type: HANDLE_TYPES.TARGET, position: Position.Left },
    { id: 'output', type: HANDLE_TYPES.SOURCE, position: Position.Right },
  ],
});
