import React, { useState, useRef, useEffect } from 'react';
import './TabRow.css';
import Tab from './Tab/Tab';

const TabRow = ({ tabs, activeTab, onAddTab, onSwitchTab, onDeleteTab, onRenameTab }) => {
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState('');
  const inputRef = useRef(null);

  // Close the input if clicked outside when it's empty
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target) && !newTabName.trim()) {
        setIsAddingTab(false); // Close input if clicked outside and it's empty
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [newTabName]);

  const handleAddTab = () => {
    if (!newTabName.trim()) return;

    if (tabs.includes(newTabName.trim())) {
      setIsAddingTab(false);
      setNewTabName('');
      alert('A file with this name already exists. Please choose a different name.');
      return;
    }

    onAddTab(newTabName.trim());
    setNewTabName('');
    setIsAddingTab(false);
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
          onDeleteTab={onDeleteTab}
          onRenameTab={onRenameTab}
        />
      ))}
      {isAddingTab ? (
        <input
          ref={inputRef}
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
