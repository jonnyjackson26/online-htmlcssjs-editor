import React from 'react';
import './ViewerPanel.css';
import Viewer from './Viewer/Viewer';
import WindowRow from './WindowRow/WindowRow';
import { useState } from 'react';

const ViewerPanel = ({ size, files }) => {
    const [documentTitle, setDocumentTitle] = useState('Untitled Document');

  return (
    <div className="viewer-panel" style={{ flexBasis: `${size}%` }}>
      <WindowRow documentTitle={documentTitle} />
      <Viewer files={files} setDocumentTitle={setDocumentTitle} />
    </div>
  );
};

export default ViewerPanel;
