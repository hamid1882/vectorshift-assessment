import React from "react";

function Label({ title = "Input", style = {}, ...props }) {
  return (
    <div style={{ margin: "4px 0" }}>
      <label style={{ fontWeight: 500, color: "indigo", ...style }} {...props}>
        {title}
      </label>
    </div>
  );
}

export default Label;
