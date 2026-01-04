import { Position } from 'reactflow';

import { FIELD_TYPES } from '../enums/fieldTypes';
import { HANDLE_TYPES } from '../enums/handleTypes';
import { createNode } from '../shared/components/nodeFactory';

export const JSONNode = createNode({
  title: 'JSON',
  description: 'Parse/transform JSON',
  fields: [
    {
      name: 'mode',
      label: 'Mode',
      default: 'parse',
      options: ['Parse', 'Stringify', 'Extract'],
      type: FIELD_TYPES.SELECT,
    },
    {
      default: '',
      name: 'path',
      label: 'Path',
      type: FIELD_TYPES.TEXT,
    },
  ],
  handles: [
    { id: 'input', type: HANDLE_TYPES.TARGET, position: Position.Left },
    { id: 'output', type: HANDLE_TYPES.SOURCE, position: Position.Right },
  ],
});
