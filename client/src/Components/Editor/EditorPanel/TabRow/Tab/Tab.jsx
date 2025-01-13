import React, { useState } from 'react';
import './Tab.css';
import TabContextMenu from './TabContextMenu/TabContextMenu';

const Tab = ({ tab, activeTab, onSwitchTab, onDeleteTab, onRenameTab }) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  return (
    <>
      <button
        className={`tab ${tab === activeTab ? 'active' : ''}`}
        onClick={() => onSwitchTab(tab)}
        onContextMenu={handleRightClick}
      >
        {tab}
      </button>

      <TabContextMenu
        tab={tab}
        isVisible={contextMenuVisible}
        position={contextMenuPosition}
        onDeleteTab={onDeleteTab}
        onRenameTab={onRenameTab}
        onClose={handleCloseContextMenu}
      />
    </>
  );
};

export default Tab;
