import React, { useEffect, useRef } from 'react';
import './TabContextMenu.css';

const TabContextMenu = ({ tab, onDeleteTab, onRenameTab, isVisible, position, onClose }) => {
  const contextMenuRef = useRef(null);

  // Close the context menu if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        onClose(); // Close the menu if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleRename = () => {
    onRenameTab(tab);
    onClose();  // Close the menu after action
  };

  const handleDelete = () => {
    onDeleteTab(tab);
    onClose();  // Close the menu after action
  };

  return (
    isVisible && (
      <div className="context-menu" style={{ top: position.y, left: position.x }} ref={contextMenuRef}>
        <button className="context-menu-item" onClick={handleRename}>Rename</button>
        <button className="context-menu-item" onClick={handleDelete}>Delete</button>
      </div>
    )
  );
};

export default TabContextMenu;
