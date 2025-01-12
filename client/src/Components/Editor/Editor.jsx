import React, { useState, useRef } from 'react';
import Tabs from './Tabs/Tabs';
import Viewer from './Viewer/Viewer';
import './Editor.css';
import boilerplate from '../../assets/boilerplate';

const Editor = ({ addBoilerPlate }) => {

    console.log('addBoilerPlate:', addBoilerPlate);
    

    const initialFiles = addBoilerPlate
        ? [
              { name: 'index.html', content: boilerplate.html, type: 'html' },
              { name: 'style.css', content: boilerplate.css, type: 'css' },
              { name: 'script.js', content: boilerplate.js, type: 'js' },
          ]
        : [{ name: 'index.html', content: '', type: 'html' }];

    const [files, setFiles] = useState(initialFiles);
    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const viewerTabRef = useRef(null);

    const handleFileChange = (index, newContent) => {
        const updatedFiles = [...files];
        updatedFiles[index].content = newContent;
        setFiles(updatedFiles);
        updateViewerTab();
    };

    const addFile = (name, type) => {
        const newFileIndex = files.length;
        setFiles([...files, { name, content: '', type }]);
        setActiveFileIndex(newFileIndex);
        updateViewerTab();
    };

    const openViewerInNewTab = () => {
        const htmlFile = files.find(file => file.type === 'html')?.content || '';
        const cssCode = files.filter(file => file.type === 'css').map(file => file.content).join('\n');
        const jsCode = files.filter(file => file.type === 'js').map(file => file.content).join('\n');

        const styleTag = `<style>${cssCode}</style>`;
        const scriptTag = `<script>${jsCode}</script>`;
        const combinedCode = `${htmlFile}\n${styleTag}\n${scriptTag}`;

        const newTab = window.open();
        newTab.document.open();
        newTab.document.write(combinedCode);
        newTab.document.close();
        viewerTabRef.current = newTab;
    };

    const updateViewerTab = () => {
        if (viewerTabRef.current && !viewerTabRef.current.closed) {
            const htmlFile = files.find(file => file.type === 'html')?.content || '';
            const cssCode = files.filter(file => file.type === 'css').map(file => file.content).join('\n');
            const jsCode = files.filter(file => file.type === 'js').map(file => file.content).join('\n');

            const styleTag = `<style>${cssCode}</style>`;
            const scriptTag = `<script>${jsCode}</script>`;
            const combinedCode = `${htmlFile}\n${styleTag}\n${scriptTag}`;

            viewerTabRef.current.document.open();
            viewerTabRef.current.document.write(combinedCode);
            viewerTabRef.current.document.close();
        }
    };

    return (
        <div className="editor">
            <Tabs
                files={files}
                activeFileIndex={activeFileIndex}
                setActiveFileIndex={setActiveFileIndex}
                addFile={addFile}
                openViewerInNewTab={openViewerInNewTab}
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