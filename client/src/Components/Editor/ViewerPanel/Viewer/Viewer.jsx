import React, { useMemo, useEffect } from 'react';
import './Viewer.css';

const Viewer = ({ files, setDocumentTitle }) => {
  const generateContent = useMemo(() => {
    const htmlFile = files.find(file => file.filename === 'index.html');
    const cssFile = files.find(file => file.filename === 'style.css');
    const jsFile = files.find(file => file.filename === 'script.js');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssFile ? cssFile.text : ''}</style>
        </head>
        <body>
          ${htmlFile ? htmlFile.text : ''}
          <script>${jsFile ? jsFile.text : ''}</script>
        </body>
      </html>
    `;
  }, [files]);

  useEffect(() => {
    const htmlFile = files.find(file => file.filename === 'index.html');
    if (htmlFile) {
      const titleMatch = htmlFile.text.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'Untitled Document';
      setDocumentTitle(title);
    }
  }, [files, setDocumentTitle]);

  return (
    <div className="viewer" id="viewer">
      <iframe
        className="viewer-iframe"
        srcDoc={generateContent}
        title="Code Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Viewer;
