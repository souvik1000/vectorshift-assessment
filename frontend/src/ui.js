import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';
import { TextNodeCopy } from './nodes/textNodeCopy';
import { MathNode } from './nodes/mathNode';
import { JSONNode } from './nodes/jsonNode';
import { CacheNode } from './nodes/cacheNode';
import { DelayNode } from './nodes/delayNode';
import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { OutputNodeCopy } from './nodes/outputNodeCopy';
import { FilterNode } from './nodes/filterNode';

import 'reactflow/dist/style.css';
import Styles from "./app.module.scss";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  llm: LLMNode,
  text: TextNodeCopy,
  customInput: InputNode,
  customOutput: OutputNode,
  myOutput: OutputNodeCopy,
  math: MathNode,
  json: JSONNode,
  delay: DelayNode,
  cache: CacheNode,
  filter: FilterNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} className={Styles.flowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                className={Styles.flowContainer}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
