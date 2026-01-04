import { Position } from 'reactflow';

import { FIELD_TYPES } from '../enums/fieldTypes';
import { HANDLE_TYPES } from '../enums/handleTypes';
import { createNode } from '../shared/components/nodeFactory';

export const MathNode = createNode({
  title: 'Math',
  description: 'Perform arithmetic',
  fields: [
    {
      default: 'add',
      name: 'operation',
      label: 'Operation',
      type: FIELD_TYPES.SELECT,
      options: ['Add', 'Subtract', 'Multiply', 'Divide'],
    },
  ],
  handles: [
    { id: 'valueA', type: HANDLE_TYPES.TARGET, position: Position.Left },
    { id: 'valueB', type: HANDLE_TYPES.TARGET, position: Position.Left },
    { id: 'result', type: HANDLE_TYPES.SOURCE, position: Position.Right },
  ],
});
