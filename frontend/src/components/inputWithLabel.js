import React from 'react';

function InputWithLabel({ label, value, onChange, type = "text", ...props }) {
  return (
    <div>
      <label>
        {label}
        <input
          style={{ padding: "2px", background: "rgba(58, 92, 241, 0.20)", border: "none", outline: "none", borderRadius: "5px ", display: "block", margin: "4px 0", padding: "6px" }}
          type="text"
          value={value}
          onChange={onChange}
          {...props}
        />
      </label>
    </div>
  );
}

export default InputWithLabel;
