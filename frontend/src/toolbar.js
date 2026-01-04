import { SubmitButton } from './submit';
import { DraggableNode } from './draggableNode';
import { Tabs } from './shared/components/Tabs';

import Styles from "./app.module.scss";

export const PipelineToolbar = () => {
    const coreNodes = [
        { type: 'customInput', label: 'Input' },
        { type: 'llm', label: 'LLM' },
        { type: 'customOutput', label: 'Output' },
        { type: 'text', label: 'Text - Clone' },
    ];

    const abstractionNodes = [
        { type: 'math', label: 'Math' },
        { type: 'json', label: 'JSON' },
        { type: 'delay', label: 'Delay' },
        { type: 'cache', label: 'Cache' },
        { type: 'filter', label: 'Filter' },
        { type: 'myOutput', label: 'Output Clone' },
    ];

    const tabs = [
        { label: 'Given Nodes', content: coreNodes },
        { label: 'Abstraction Nodes', content: abstractionNodes },
    ];

    const renderNode = (node) => (
        <DraggableNode type={node.type} label={node.label} />
    );

    return (
        <div className={Styles.headerContainer}>
            <div className={Styles.toolbarContainer}>
                <Tabs
                    tabs={tabs}
                    allowSearch={true}
                    renderItem={renderNode}
                    searchPlaceholder="Search nodes..."
                />
            </div>
            <SubmitButton className='button-green' />
        </div>
    );
};
