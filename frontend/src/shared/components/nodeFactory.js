import clsx from 'clsx';
import { useState } from 'react';
import { Handle, Position } from 'reactflow';

import Suggestion from './Suggestion';
import { useStore } from '../../store';
import { NodeContainer } from './nodeContainer';
import AutoGrowTextarea from './AutoGrowTextArea';
import { FIELD_TYPES } from '../../enums/fieldTypes';
import { HANDLE_TYPES } from '../../enums/handleTypes';

import Styles from "./node.module.scss";

const { SOURCE, TARGET } = HANDLE_TYPES;
const { NUMBER, SELECT, TEXT, TEXTAREA } = FIELD_TYPES;

export const createNode = ({ 
    title, width, height, bgColor, fields = [],
    handles = [], description = '', renderContent = null
  }) => ({ id, data }) => {
    const nodesList = useStore((s) => s.nodes);
    const [fieldValues, setFieldValues] = useState(
      fields.reduce((acc, field) => {
        acc[field.name] = data?.[field.name] ?? field.default ?? '';
        return acc;
      }, {})
    );
    const [suggestions, setSuggestions] = useState([]);
    const [suggestField, setSuggestField] = useState(null);
    const { updateNodeField, onConnect } = useStore.getState();

    const handleFieldChange = (fieldName, value) => {
      setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
      updateNodeField?.(id, fieldName, value);
    };

    const openSuggestionsFor = (fieldName, filter = '') => {
      const candidates = (nodesList || [])
        .filter((n) => n.id !== id)
        .map((n) => ({ id: n.id, label: n.data?.outputName || n.data?.name || n.id }))
        .filter((c) => c.label.toLowerCase().includes(filter.toLowerCase()));

      setSuggestions(candidates);
      setSuggestField(fieldName);
    };

    const closeSuggestions = () => {
      setSuggestField(null);
      setSuggestions([]);
    };

    const selectSuggestion = (candidate) => {
      if (!suggestField) return;

      const varName = candidate.label.replace(/[^A-Za-z0-9_$]/g, '_');
      const token = `{{${varName}}}`;
      const currInput = fieldValues[suggestField];
      const lastSlash = currInput.lastIndexOf('{{');
      const restInput = lastSlash > -1 ? currInput.slice(0, lastSlash) : '';

      const connection = {
        target: id,
        source: candidate.id,
        targetHandle: `${id}-${varName}`,
        sourceHandle: `${candidate.id}-output`,
      };

      handleFieldChange(suggestField, `${restInput}${token}`);
      onConnect?.(connection);

      closeSuggestions();
    };

    const suggestionClickHandler = (sugg) => selectSuggestion(sugg);

    const onTextHandler = (e, field) => {
      const v = e.target.value;
      handleFieldChange(field.name, v);
      
      if (v.includes('{{')) {
        openSuggestionsFor(field.name, '');
      } else {
        closeSuggestions();
      }
    }

    const targetHandles = handles.filter((handle) => handle.type === TARGET);
    const sourceHandles = handles.filter((handle) => handle.type === SOURCE);

    return (
      <NodeContainer className={Styles.nodeWrapper} width={width} height={height} bgColor={bgColor}>
        <div className={Styles.title}><span>{title}</span></div>

        {description && <div className={Styles.description}><span>{description}</span></div>}

        {targetHandles.map((handle) => (
          <Handle
            type={TARGET}
            key={handle.id}
            id={`${id}-${handle.id}`}
            style={handle.style || {}}
            position={handle.position || Position.Left}
          />
        ))}

        {renderContent ? (
          renderContent(fieldValues, handleFieldChange, { id, data })
        ) : (
          <div className={Styles.fieldWrapper}>
            {fields.map((field) => (
              <div key={field.name} className={Styles.fieldContainer}>
                <label className={Styles.label}><strong>{field.label}:</strong></label>
                {field.type === TEXTAREA && (
                  <div className={Styles.fieldText}>
                    <AutoGrowTextarea 
                      value={fieldValues[field.name]}
                      clasName={clsx(Styles.field, Styles.fieldTextArea)}
                      onChange={(e) => onTextHandler(e, field)}
                    />
                    <Suggestion 
                      suggestions={suggestions}
                      open={suggestions.length > 0}
                      onClick={suggestionClickHandler}
                    />
                  </div>
                )}
                {(field.type === NUMBER || field.type === TEXT) && (
                  <input
                    type={field.type}
                    className={Styles.field}
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                )}
                {field.type === SELECT && (
                  <select
                    className={Styles.field}
                    value={fieldValues[field.name]}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        )}

        {sourceHandles.map((handle) => (
          <Handle
            type={SOURCE}
            key={handle.id}
            id={`${id}-${handle.id}`}
            style={handle.style || {}}
            position={handle.position || Position.Right}
          />
        ))}
      </NodeContainer>
    );
  };
