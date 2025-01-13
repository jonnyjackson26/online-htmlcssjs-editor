import React, { useState } from 'react';
import './EditorPanel.css';
import TabRow from './TabRow/TabRow';
import TextArea from './TextArea/TextArea';

const EditorPanel = ({ size, onCodeChange, files, onAddFile }) => {
  const [activeTab, setActiveTab] = useState('index.html');

  // Handle the addition of a new file and set it as the active tab
  const handleAddFile = (filename) => {
    onAddFile(filename); // Add the new file
    setActiveTab(filename); // Make the newly added file the active tab
  };

  const handleTextChange = (filename, value) => {
    onCodeChange(filename, value);
  };

  const activeFile = files.find(file => file.filename === activeTab) || { text: '' };

  return (
    <div className="editor-panel" style={{ flexBasis: `${size}%` }}>
      <TabRow
        tabs={files.map(file => file.filename)}
        activeTab={activeTab}
        onAddTab={handleAddFile} // Pass the modified handleAddFile to TabRow
        onSwitchTab={setActiveTab}
      />
      <TextArea
        activeTab={activeTab}
        value={activeFile.text}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default EditorPanel;
