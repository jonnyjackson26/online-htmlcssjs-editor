import React from 'react';
import './EditorPanel.css';
import TabRow from './TabRow/TabRow';
import TextArea from './TextArea/TextArea';

const EditorPanel = ({ size, onCodeChange, files, onAddFile, onDeleteFile, activeTab, setActiveTab }) => {
  const handleTextChange = (filename, value) => {
    onCodeChange(filename, value);
  };

  const activeFile = files.find(file => file.filename === activeTab) || { text: '' };

  return (
    <div className="editor-panel" style={{ flexBasis: `${size}%` }}>
      <TabRow
        tabs={files.map(file => file.filename)}
        activeTab={activeTab}
        onAddTab={onAddFile}
        onSwitchTab={setActiveTab} // Pass setActiveTab here
        onDeleteTab={onDeleteFile} // Pass delete handler
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
