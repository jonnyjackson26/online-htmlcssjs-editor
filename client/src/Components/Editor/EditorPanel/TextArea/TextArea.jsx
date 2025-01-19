import React, { useState, useRef, useEffect } from 'react';
import './TextArea.css';
import './syntaxHighlighting.css';
import applyHighlighting from './syntaxHighlight';

const TextArea = ({ activeTab, value, onChange }) => {
  const [text, setText] = useState(value || '');
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    syncScroll();
  }, [text]);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleInput = (e) => {
    const newText = e.target.value;
    setText(newText);
    onChange(activeTab, newText);
  };

  const syncScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newText = text.substring(0, start) + '    ' + text.substring(end);
      setText(newText);
      // Set timeout to ensure the text is updated before setting the selection
      setTimeout(() => {
        e.target.setSelectionRange(start + 4, start + 4);
      }, 0);
      // Trigger onChange to update parent component
      onChange(activeTab, newText);
    }
  };
  

  return (
    <div className="editor-container">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInput}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck="false"
      />
      <pre ref={preRef} className="editable">
        <code dangerouslySetInnerHTML={{ __html: applyHighlighting(text, activeTab) }} />
      </pre>
    </div>
  );
  
  
};

export default TextArea;
