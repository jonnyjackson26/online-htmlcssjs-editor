import React, { useState } from 'react';
import './TabRow.css';
import Tab from './Tab/Tab';

const TabRow = ({ tabs, activeTab, onAddTab, onSwitchTab }) => {
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState('');

  const handleAddTab = () => {
    if (newTabName.trim()) {
      onAddTab(newTabName.trim());
      setNewTabName('');
      setIsAddingTab(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTab();
    } else if (e.key === 'Escape') {
      setIsAddingTab(false);
      setNewTabName('');
    }
  };

  return (
    <div className="tab-row">
      {tabs.map((tab) => (
        <Tab
          key={tab}
          tab={tab}
          activeTab={activeTab}
          onSwitchTab={onSwitchTab}
        />
      ))}
      {isAddingTab ? (
        <input
          type="text"
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
          onBlur={handleAddTab}
          onKeyDown={handleKeyPress}
          placeholder="New file name"
          autoFocus
        />
      ) : (
        <button className="add-tab" onClick={() => setIsAddingTab(true)}>
          +
        </button>
      )}
    </div>
  );
};

export default TabRow;
