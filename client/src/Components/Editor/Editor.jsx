import React, { useState } from 'react';
import './Editor.css';
import EditorPanel from './EditorPanel/EditorPanel';
import ViewerPanel from './ViewerPanel/ViewerPanel';

const Editor = () => {
    const [sizes, setSizes] = useState({ editor: 50, viewer: 50 });

    const handleDrag = (e) => {
      const newEditorSize = (e.clientX / window.innerWidth) * 100;
      setSizes({ editor: newEditorSize, viewer: 100 - newEditorSize });
    };
  
    const handleDragEnd = (e) => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  
    const handleDragStart = (e) => {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
    };



    const [files, setFiles] = useState([
        { filename: "index.html", text: "<h1>Hello, World!</h1>" },
        { filename: "style.css", text: "h1 { color: blue; }" },
        { filename: "script.js", text: "console.log('Hello, World!');" }
      ]);
  
      const handleFileChange = (filename, value) => {
        const updatedFiles = files.map(file =>
          file.filename === filename ? { ...file, text: value } : file
        );
        setFiles(updatedFiles);
      };

      const handleAddFile = (newFilename) => {
        if (!files.some(file => file.filename === newFilename)) {
          setFiles([...files, { filename: newFilename, text: '' }]);
        }
      };



  
    return (
      <div className="editor-container">
        <EditorPanel 
            size={sizes.editor} 
            onCodeChange={handleFileChange} 
            files={files}
            onAddFile={handleAddFile}
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