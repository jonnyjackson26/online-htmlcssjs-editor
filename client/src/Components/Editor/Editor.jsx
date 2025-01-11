import React, { useState } from 'react';
import Tabs from './Tabs/Tabs';
import Viewer from './Viewer/Viewer';
import './Editor.css';

const Editor = () => {
    const [files, setFiles] = useState([{ name: 'index.html', content: '', type: 'html' }]);
    const [activeFileIndex, setActiveFileIndex] = useState(0);

    const handleFileChange = (index, newContent) => {
        const updatedFiles = [...files];
        updatedFiles[index].content = newContent;
        setFiles(updatedFiles);
    };

    const addFile = (name, type) => {
        setFiles([...files, { name, content: '', type }]);
    };

    return (
        <div className="editor">
            <Tabs
                files={files}
                activeFileIndex={activeFileIndex}
                setActiveFileIndex={setActiveFileIndex}
                addFile={addFile}
            />
            <textarea
                className="code-editor"
                value={files[activeFileIndex].content}
                onChange={(e) => handleFileChange(activeFileIndex, e.target.value)}
            />
            <Viewer files={files} />
        </div>
    );
};

export default Editor;