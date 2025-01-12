import React, { useState } from 'react';
import './Editor.css';
import EditorPanel from './EditorPanel/EditorPanel';
import ViewerPanel from './ViewerPanel/ViewerPanel';
import boilerplate from '../../assets/boilerplate'

const Editor = ({useBoilerPlate}) => {
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



    const initialFiles = useBoilerPlate
      ? [
          { filename: "index.html", text: boilerplate.html },
          { filename: "style.css", text: boilerplate.css },
          { filename: "script.js", text: boilerplate.js }
        ]
      : [
          { filename: "index.html", text: "" },
          { filename: "style.css", text: "" },
          { filename: "script.js", text: "" }
        ];

    const [files, setFiles] = useState(initialFiles);
  
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