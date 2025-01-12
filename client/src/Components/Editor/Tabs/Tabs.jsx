import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ files, activeFileIndex, setActiveFileIndex, addFile, openViewerInNewTab }) => {
    const [newFileName, setNewFileName] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleAddFile = () => {
        const fileType = newFileName.split('.').pop();
        if (['html', 'css', 'js'].includes(fileType)) {
            addFile(newFileName, fileType);
            setNewFileName('');
            setShowInput(false);
        } else {
            alert('Invalid file type. Use .html, .css, or .js');
        }
    };

    return (
        <div className="tabs">
            <div className="tab-list">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className={`tab ${index === activeFileIndex ? 'active' : ''}`}
                        onClick={() => setActiveFileIndex(index)}
                    >
                        {file.name}
                    </div>
                ))}
                {showInput && (
                    <div className="new-file">
                        <input
                            type="text"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="Enter file name (e.g., style.css)"
                        />
                        <button onClick={handleAddFile}>Create</button>
                    </div>
                )}
                <button className="add-file-button" onClick={() => setShowInput(!showInput)}>
                    {showInput ? 'Cancel' : 'Add File'}
                </button>
                <button className="open-viewer-button" onClick={openViewerInNewTab}>
                    Open Viewer
                </button>
            </div>
        </div>
    );
};

export default Tabs;