import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeContainer } from './nodeContainer';

/**
 * Factory function to create node components with a standardized abstraction.
 * This reduces code duplication and makes it easy to create new nodes.
 * 
 * @param {Object} config - Configuration object for the node
 * @param {string} config.title - Node title
 * @param {string} config.description - Node description
 * @param {Array} config.fields - Array of field configurations
 * @param {Array} config.handles - Array of handle configurations
 * @param {number} config.width - Node width (default: 200)
 * @param {number} config.height - Node height (default: 100)
 * @param {Function} config.renderContent - Optional custom render function
 * @param {string} config.bgColor - Background color (default: white)
 * @returns {Function} A React component for the node
 */

export const createNode = (config) => {
  const {
    title,
    width = 200,
    height = 100,
    fields = [],
    handles = [],
    description = '',
    bgColor = 'white',
    renderContent = null,
  } = config;

  return ({ id, data }) => {
    // Initialize state for all fields
    const [fieldValues, setFieldValues] = useState(
      fields.reduce((acc, field) => {
        acc[field.name] = data?.[field.name] || field.default || '';
        return acc;
      }, {})
    );

    const handleFieldChange = (fieldName, value) => {
      setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
    };

    // Organize handles by type
    const targetHandles = handles.filter((h) => h.type === 'target');
    const sourceHandles = handles.filter((h) => h.type === 'source');

    return (
      <NodeContainer width={width} height={height} bgColor={bgColor}>
        {/* Header */}
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
          <span>{title}</span>
        </div>

        {/* Description */}
        {description && (
          <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
            <span>{description}</span>
          </div>
        )}

        {/* Input Handles */}
        {targetHandles.map((h) => (
          <Handle
            key={h.id}
            type="target"
            position={h.position || Position.Left}
            id={`${id}-${h.id}`}
            style={h.style || {}}
          />
        ))}

        {/* Content Area */}
        {renderContent ? (
          renderContent(fieldValues, handleFieldChange)
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {fields.map((field) => (
              <div key={field.name} style={{ marginBottom: '4px' }}>
                <label style={{ display: 'block', marginBottom: '2px' }}>
                  <strong>{field.label}:</strong>
                </label>
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '4px',
                      boxSizing: 'border-box',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                )}
                {field.type === 'number' && (
                  <input
                    type="number"
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '4px',
                      boxSizing: 'border-box',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                )}
                {field.type === 'select' && (
                  <select
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '4px',
                      boxSizing: 'border-box',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Output Handles */}
        {sourceHandles.map((h) => (
          <Handle
            key={h.id}
            type="source"
            position={h.position || Position.Right}
            id={`${id}-${h.id}`}
            style={h.style || {}}
          />
        ))}
      </NodeContainer>
    );
  };
};
