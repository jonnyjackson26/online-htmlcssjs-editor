import React, { useState } from 'react';
import './TabRow.css';

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
        <button
          key={tab}
          className={`tab ${tab === activeTab ? 'active' : ''}`}
          onClick={() => onSwitchTab(tab)}
        >
          {tab}
        </button>
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
