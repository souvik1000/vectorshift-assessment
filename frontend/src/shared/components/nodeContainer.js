import clsx from "clsx";

import Styles from "./node.module.scss";

/**
 * Factory function to create node components with a standardized abstraction.
 * This reduces code duplication and makes it easy to create new nodes.
 * 
 * @param {ReactNode} children - Configuration object for the node
 * @param {number} width - Node width (default: 200)
 * @param {number} height - Node height (default: 100)
 * @param {Function} renderContent - Optional custom render function
 * @param {string} bgColor - Background color (default: white)
 * @returns {Function} A React component for the node
 */

export const NodeContainer = ({ children, className, width = 200, height, bgColor = 'white' }) => {
    return (
      <div
        className={clsx(Styles.nodeContainer, className)}
        style={{ width, height, backgroundColor: bgColor }}
      >
        {children}
      </div>
    );
};
