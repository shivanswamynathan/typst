// src/components/TypstEditor.jsx
import React from 'react';

const TypstEditor = ({ value, onChange }) => {
  return (
    <div className="typst-editor">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your Typst code here..."
        className="typst-editor-textarea"
      />
    </div>
  );
};

export default TypstEditor;