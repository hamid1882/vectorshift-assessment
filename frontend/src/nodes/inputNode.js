// inputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div
      style={{
        width: 220,
        padding: 8,
        borderRadius: 8,
        border: '1px solid indigo',
        background: '#fff',
        color: 'black',
        boxShadow: '0 4px 10px rgba(58, 91, 241, 0.25)',
      }}
    >
      <div style={{ margin: "6px 0" }}>
        <span style={{ fontWeight: 500 }}>Input</span>
      </div>
      <div>
        <div>
          <label>
            Name:
            <input
              style={{ padding: "2px", background: "rgba(58, 92, 241, 0.20)", border: "none", outline: "none", borderRadius: "5px ", display: "block", margin: "4px 0", padding: "6px" }}
              type="text"
              value={currName}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Type:
            <select style={{ display: "block", width: "100%", padding: "6px", margin: "4px 0" }} value={inputType} onChange={handleTypeChange}>
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </div>
  );
}
