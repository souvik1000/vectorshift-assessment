import { Position } from 'reactflow';

import { FIELD_TYPES } from '../enums/fieldTypes';
import { HANDLE_TYPES } from '../enums/handleTypes';
import { createNode } from '../shared/components/nodeFactory';

export const CacheNode = createNode({
  title: 'Cache',
  description: 'Cache data',
  fields: [
    {
      name: 'key',
      label: 'Cache Key',
      default: 'cache_data',
      type: FIELD_TYPES.TEXT,
    },
    {
      name: 'ttl',
      default: '3600',
      label: 'TTL (seconds)',
      type: FIELD_TYPES.NUMBER,
    },
  ],
  handles: [
    { id: 'input', type: HANDLE_TYPES.TARGET, position: Position.Left },
    { id: 'output', type: HANDLE_TYPES.SOURCE, position: Position.Right },
    { id: 'cached', type: HANDLE_TYPES.SOURCE, position: Position.Right },
  ],
});
