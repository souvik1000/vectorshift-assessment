import { Position } from 'reactflow';

import { FIELD_TYPES } from '../enums/fieldTypes';
import { HANDLE_TYPES } from '../enums/handleTypes';
import { createNode } from '../shared/components/nodeFactory';

export const TextNodeCopy = createNode({
  title: 'Text',
  fields: [
    {
      default: '',
      name: 'text',
      label: 'Text',
      createHandles: true,
      type: FIELD_TYPES.TEXTAREA,
    },
  ],
  handles: [
    { id: 'input', type: HANDLE_TYPES.TARGET, position: Position.Left },
    { id: 'output', type: HANDLE_TYPES.SOURCE, position: Position.Right }
  ],
});
