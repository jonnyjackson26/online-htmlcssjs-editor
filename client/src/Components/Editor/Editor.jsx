import React, { useState } from 'react';
import './Editor.css';
import EditorPanel from './EditorPanel/EditorPanel';
import ViewerPanel from './ViewerPanel/ViewerPanel';
import boilerplate from '../../assets/boilerplate';

const Editor = ({ useBoilerPlate }) => {
  const [sizes, setSizes] = useState({ editor: 50, viewer: 50 });
  const [isResizing, setIsResizing] = useState(false);

  const handleDrag = (e) => {
    const newEditorSize = (e.clientX / window.innerWidth) * 100;
    setSizes({ editor: newEditorSize, viewer: 100 - newEditorSize });
  };

  const handleDragStart = () => {
  setIsResizing(true);
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', handleDragEnd);
};

const handleDragEnd = () => {
  setIsResizing(false);
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', handleDragEnd);
};

  const initialFiles = useBoilerPlate
    ? [
        { filename: "index.html", text: boilerplate.html },
        { filename: "styles.css", text: boilerplate.css },
        { filename: "script.js", text: boilerplate.js }
      ]
    : [
        { filename: "index.html", text: "" },
        { filename: "styles.css", text: "" },
        { filename: "script.js", text: "" }
      ];

  const [files, setFiles] = useState(initialFiles);
  const [activeTab, setActiveTab] = useState('index.html');

  const handleFileChange = (filename, value) => {
    const updatedFiles = files.map(file =>
      file.filename === filename ? { ...file, text: value } : file
    );
    setFiles(updatedFiles);
  };

  const handleAddFile = (newFilename) => {
    if (!files.some(file => file.filename === newFilename)) {
      setFiles([...files, { filename: newFilename, text: '' }]);
      setActiveTab(newFilename); // Make the new tab active
    }
  };

  const handleDeleteFile = (filename) => {
    setFiles(files.filter(file => file.filename !== filename));
    if (activeTab === filename) {
      const remainingTabs = files.filter(file => file.filename !== filename);
      setActiveTab(remainingTabs.length > 0 ? remainingTabs[0].filename : ''); // Switch to first tab or reset if no tabs left
    }
  };

  const handleRenameFile = (oldFilename, newFilename) => {
    if (!files.some(file => file.filename === newFilename)) {
      const updatedFiles = files.map(file =>
        file.filename === oldFilename ? { ...file, filename: newFilename } : file
      );
      setFiles(updatedFiles);
      if (activeTab === oldFilename) {
        setActiveTab(newFilename);
      }
    }
  };

  return (
    <div className="editor-container">
      {isResizing && <div className="resize-overlay" />}
      <EditorPanel
        size={sizes.editor}
        onCodeChange={handleFileChange}
        files={files}
        onAddFile={handleAddFile}
        onDeleteFile={handleDeleteFile}
        onRenameFile={handleRenameFile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div
        className="resize-handle"
        onMouseDown={handleDragStart}
      />
      <ViewerPanel
        size={sizes.viewer}
        files={files}
      />
    </div>
  );
};

export default Editor;
