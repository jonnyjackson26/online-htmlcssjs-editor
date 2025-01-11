import React from 'react';
import './Viewer.css';

const Viewer = ({ files }) => {
    const getCombinedCode = () => {
        const htmlFile = files.find(file => file.type === 'html')?.content || '';
        const cssCode = files.filter(file => file.type === 'css').map(file => file.content).join('\n');
        const jsCode = files.filter(file => file.type === 'js').map(file => file.content).join('\n');

        const styleTag = `<style>${cssCode}</style>`;
        const scriptTag = `<script>${jsCode}</script>`;

        return `${htmlFile}\n${styleTag}\n${scriptTag}`;
    };

    return (
        <iframe
            className="viewer"
            title="Code Viewer"
            srcDoc={getCombinedCode()}
        />
    );
};

export default Viewer;