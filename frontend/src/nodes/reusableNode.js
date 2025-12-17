import React from 'react';
import { useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import InputWithLabel from '../components/inputWithLabel';
import SelectWithLabel from '../components/selectWithLabel';
import Label from '../components/label';

const cardStyle = {
  width: 220,
  padding: 8,
  borderRadius: 8,
  border: '1px solid indigo',
  background: '#fff',
  color: 'black',
  boxShadow: '0 4px 10px rgba(58, 91, 241, 0.25)',
};

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = new Set();
  let match;
  while ((match = VARIABLE_REGEX.exec(text)) !== null) {
    vars.add(match[1]); // match[1] is the variable name
  }
  return Array.from(vars);
};

export const ReusableNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);
  const handleTextChange = (e) => setCurrText(e.target.value);

  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const variables =
    data.nodeType === 'text' ? extractVariables(currText) : [];

  React.useEffect(() => {
    if (data.nodeType === 'text') {
      updateNodeInternals(id);
    }
  }, [id, data.nodeType, variables.length, updateNodeInternals]);


  const renderContent = () => {

    switch (data.nodeType) {
      case 'customInput':
        return (
          <>
            <Label title="Input" />
            <div>
              <InputWithLabel
                type="text"
                value={currName}
                onChange={handleNameChange}
              />
              <SelectWithLabel
                onChange={handleTypeChange}
                value={inputType}
                label="Type"
                options={[
                  { value: 'text', label: 'Text' },
                  { value: 'file', label: 'File' },
                ]}
              />
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-value`}
            />
          </>
        );

      case 'llm':
        return (
          <>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-system`}
              style={{ top: `${100 / 3}%` }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-prompt`}
              style={{ top: `${200 / 3}%` }}
            />
            <Label title="LLM" />
            <div>
              <span>This is a LLM.</span>
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-response`}
            />
          </>
        );

      case 'text':
        return (
          <>
            {variables.map((variableName, index) => (
              <Handle
                key={variableName}
                type="target"
                position={Position.Left}
                id={`${id}-${variableName}`}
                style={{
                  top: `${((index + 1) * 100) / (variables.length + 1)}%`,
                }}
              />
            ))}

            <Label title="Text" />
            <div>
              <label>
                Text:
                <textarea
                  ref={textareaRef}
                  value={currText}
                  onChange={handleTextChange}
                  style={{
                    width: '100%',
                    minWidth: '150px',
                    minHeight: '40px',
                    resize: 'none',
                    overflow: 'hidden',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    padding: '4px',
                    boxSizing: 'border-box',
                    border: "1px solid indigo"
                  }}
                />
              </label>
            </div>
            <Handle type="source" position={Position.Right} id={`${id}-output`} />
          </>
        );

      case 'customOutput':
        return (
          <>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-value`}
            />
            <Label title="Output" />
            <div>
              <InputWithLabel
                type="text"
                value={currName}
                onChange={handleNameChange}
              />
              <SelectWithLabel
                onChange={handleTypeChange}
                value={inputType}
                label="Type"
                options={[
                  { value: 'text', label: 'Text' },
                  { value: 'file', label: 'File' },
                ]}
              />
            </div>
          </>
        );

      case 'transform':
        return (
          <>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-value`}
            />
            <Label title="Transform" />
            <div>
              <SelectWithLabel
                onChange={handleTypeChange}
                value={inputType}
                label="Type"
                options={[
                  { value: 'binary', label: 'Binary' },
                  { value: 'json', label: 'JSON' },
                ]}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <div style={cardStyle}>{renderContent()}</div>;
};