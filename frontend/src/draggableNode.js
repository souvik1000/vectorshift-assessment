import clsx from "clsx";

import Styles from "./draggableNode.module.scss"

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      // If the drag started from a child element (e.g. input/select/button),
      // cancel the drag so the user can interact with that control.
      if (event.target !== event.currentTarget) {
        return;
      }

      const appData = { nodeType };
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        draggable
        className={clsx(type, Styles.nodeWrapper)}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      >
        <span className={Styles.nodelabel}>{label}</span>
      </div>
    );
  };
  