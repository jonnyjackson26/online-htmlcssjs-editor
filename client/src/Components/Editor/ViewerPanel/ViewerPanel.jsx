import React, { useState, useCallback } from 'react';
import './ViewerPanel.css';
import Viewer from './Viewer/Viewer';
import WindowRow from './WindowRow/WindowRow';

const ViewerPanel = ({ size, files }) => {
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');

  const openInNewTab = useCallback(() => {
    const htmlFile = files.find(file => file.filename === 'index.html');
    if (!htmlFile) {
      alert('No "index.html" file found to render.');
      return;
    }

    const processedHtml = htmlFile.text.replace(
      /<link\s+rel="stylesheet"\s+href="(.+?)"\s*\/?>/g,
      (match, href) => {
        const cssFile = files.find(file => file.filename === href);
        return cssFile ? `<style>${cssFile.text}</style>` : match;
      }
    ).replace(
      /<script\s+src="(.+?)"><\/script>/g,
      (match, src) => {
        const jsFile = files.find(file => file.filename === src);
        return jsFile ? `<script>${jsFile.text}</script>` : match;
      }
    );

    const completeHtml = `
      <!DOCTYPE html>
      <html>
        ${processedHtml}
      </html>
    `;

    const blob = new Blob([completeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }, [files]);

  return (
    <div className="viewer-panel" style={{ flexBasis: `${size}%` }}>
      <WindowRow documentTitle={documentTitle} openInNewTab={openInNewTab} />
      <Viewer files={files} setDocumentTitle={setDocumentTitle} />
    </div>
  );
};

export default ViewerPanel;
