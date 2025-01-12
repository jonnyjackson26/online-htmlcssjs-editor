import React from 'react';
import './TabRow.css';

const TabRow = ({ tabs, activeTab, onAddTab, onSwitchTab }) => {
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
      <button className="add-tab" onClick={() => onAddTab(`file${tabs.length + 1}`)}>
        +
      </button>
    </div>
  );
};

export default TabRow;