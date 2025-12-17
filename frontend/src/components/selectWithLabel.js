import React from 'react';

function SelectWithLabel({ label = "Type", value, onChange, options = [], ...props }) {
  return (
    <div>
      <label>
        {label}
        <select
          style={{ display: "block", width: "100%", padding: "6px", margin: "4px 0", borderColor: "indigo" }} value={value}
          onChange={onChange}>
          {
            options && options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))
          }
        </select>
      </label>
    </div >
  );
}

export default SelectWithLabel;
