// No runtime React types needed here; remove unused import

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

export const NodeContainer = ({ children, width = 200, height = 100, bgColor = 'white' }) => {
    return (
      <div
        style={{
          width,
          height,
          border: '1px solid #333',
          borderRadius: '8px',
          backgroundColor: bgColor,
          padding: '8px',
          display: 'flex',
          fontSize: '12px',
          boxSizing: 'border-box',
          flexDirection: 'column',
          fontFamily: 'Arial, sans-serif',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </div>
    );
};
