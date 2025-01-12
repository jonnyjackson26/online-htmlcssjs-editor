import React from 'react';
import './WindowRow.css';

const WindowRow = ({ documentTitle, openInNewTab }) => {
  return (
    <div className="window-row">
      <span>{documentTitle}</span>
      <button onClick={openInNewTab}>Open in new tab</button>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default WindowRow;
