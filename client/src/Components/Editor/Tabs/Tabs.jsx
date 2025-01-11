import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ files, activeFileIndex, setActiveFileIndex, addFile }) => {
    const [newFileName, setNewFileName] = useState('');

    const handleAddFile = () => {
        const fileType = newFileName.split('.').pop();
        if (['html', 'css', 'js'].includes(fileType)) {
            addFile(newFileName, fileType);
            setNewFileName('');
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
            </div>
            <div className="new-file">
                <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="Enter file name (e.g., style.css)"
                />
                <button onClick={handleAddFile}>Add File</button>
            </div>
        </div>
    );
};

export default Tabs;
