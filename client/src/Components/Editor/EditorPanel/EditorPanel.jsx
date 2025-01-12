import React from 'react';
import './EditorPanel.css';
import TabRow from './TabRow/TabRow';
import TextArea from './TextArea/TextArea';

const EditorPanel = ({ size, onCodeChange, files }) => {
  const [activeTab, setActiveTab] = React.useState('index.html');

  const handleTextChange = (filename, value) => {
    onCodeChange(filename, value);
  };

  const activeFile = files.find(file => file.filename === activeTab) || { text: '' };

  return (
    <div className="editor-panel" style={{ flexBasis: `${size}%` }}>
      <TabRow
        tabs={files.map(file => file.filename)}
        activeTab={activeTab}
        onAddTab={(tab) => {/* Implement add tab functionality */}}
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
