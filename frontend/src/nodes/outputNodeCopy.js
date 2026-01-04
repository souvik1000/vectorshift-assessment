import { Position } from 'reactflow';

import { FIELD_TYPES } from '../enums/fieldTypes';
import { HANDLE_TYPES } from '../enums/handleTypes';
import { createNode } from '../shared/components/nodeFactory';

export const OutputNodeCopy = createNode({
  title: 'Output',
  fields: [
    {
      default: '',
      label: 'Name',
      name: 'outputName',
      type: FIELD_TYPES.TEXT,
    },
    {
      label: 'Type',
      default: 'text',
      name: 'outputType',
      type: FIELD_TYPES.SELECT,
      options: ['Text', 'Image'],
    }
  ],
  handles: [
    {
      id: 'value',
      type: HANDLE_TYPES.TARGET,
      position: Position.Left
    }
  ]
});