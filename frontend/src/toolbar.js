// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <h3>Core Nodes</h3>
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
            <h3 style={{ marginTop: '20px' }}>First 5 Abstraction Nodes</h3>
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='json' label='JSON' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='cache' label='Cache' />
                <DraggableNode type='output' label='Output' />
            </div>
        </div>
    );
};
