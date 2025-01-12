import React, { useMemo, useEffect } from 'react';
import './Viewer.css';

const Viewer = ({ files, setDocumentTitle }) => {
  const generateContent = useMemo(() => {
    const htmlFile = files.find(file => file.filename === 'index.html');
    if (!htmlFile) return '';


    /*
    <link rel="stylesheet"     href="style.css"> works but <link rel="stylesheet"     href="style.css "> doesnt (notice the space after .css in the second example)
    idk if this is how it should be or not

    */


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

    return `
      <!DOCTYPE html>
      <html>
        ${processedHtml}
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
