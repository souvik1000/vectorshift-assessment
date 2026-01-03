import { DraggableNode } from './draggableNode';

import Styles from "./app.module.scss";

export const PipelineToolbar = () => {

    return (
        <div className={Styles.toolbarContainer}>
            <div>
                <h3>Core Nodes</h3>
                <div className={Styles.toolbarItems}>
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                </div>
            </div>
            <div>
                <h3>First 5 Abstraction Nodes</h3>
                <div className={Styles.toolbarItems}>
                    <DraggableNode type='math' label='Math' />
                    <DraggableNode type='filter' label='Filter' />
                    <DraggableNode type='json' label='JSON' />
                    <DraggableNode type='delay' label='Delay' />
                    <DraggableNode type='cache' label='Cache' />
                    <DraggableNode type='myOutput' label='Custom Output' />
                </div>
            </div>
        </div>
    );
};
