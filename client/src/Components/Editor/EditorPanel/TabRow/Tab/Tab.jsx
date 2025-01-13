import React, { useState, useRef, useEffect } from 'react';
import './Tab.css';
import TabContextMenu from './TabContextMenu/TabContextMenu';

const Tab = ({ tab, activeTab, onSwitchTab, onDeleteTab, onRenameTab }) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(tab);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleRename = () => {
    setIsRenaming(true);
    setContextMenuVisible(false);
  };

  const handleRenameSubmit = () => {
    if (newName.trim() && newName !== tab) {
      onRenameTab(tab, newName.trim());
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      setIsRenaming(false);
      setNewName(tab);
    }
  };

  return (
    <>
      {isRenaming ? (
        <input
          ref={inputRef}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRenameSubmit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onSwitchTab(tab)}
          onContextMenu={handleRightClick}
        >
          {tab}
        </button>
      )}

      <TabContextMenu
        tab={tab}
        isVisible={contextMenuVisible}
        position={contextMenuPosition}
        onDeleteTab={onDeleteTab}
        onRenameTab={handleRename}
        onClose={handleCloseContextMenu}
      />
    </>
  );
};

export default Tab;
