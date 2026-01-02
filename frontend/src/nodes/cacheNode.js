import { createNode } from '../shared/components/nodeFactory';
import { Position } from 'reactflow';

/**
 * Cache Node - Caches/stores data for reuse
 */
export const CacheNode = createNode({
  title: 'Cache',
  description: 'Cache data',
  fields: [
    {
      name: 'key',
      label: 'Cache Key',
      type: 'text',
      default: 'cache_data',
    },
    {
      name: 'ttl',
      label: 'TTL (seconds)',
      type: 'number',
      default: '3600',
    },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
    { id: 'cached', type: 'source', position: Position.Right },
  ],
  width: 180,
  height: 140,
  bgColor: '#ede7f6',
});
