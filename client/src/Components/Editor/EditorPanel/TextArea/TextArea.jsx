import React from 'react';
import './TextArea.css';

const TextArea = ({ activeTab, value, onChange }) => {
  return (
    <textarea
      className="text-area"
      placeholder={`Editing ${activeTab}`}
      value={value}
      onChange={(e) => onChange(activeTab, e.target.value)}
    />
  );
};

export default TextArea;
