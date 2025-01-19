import React, { useState, useRef, useEffect } from 'react';
import './TextArea.css';
import './syntaxHighlighting.css';
import applyHighlighting from './syntaxHighlight';

const TextArea = ({ activeTab, value, onChange }) => {
  const [text, setText] = useState(value || '');
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    syncScroll();
    adjustContainerSize();
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

  const adjustContainerSize = () => {
    if (containerRef.current && textareaRef.current) {
      containerRef.current.style.width = `${textareaRef.current.scrollWidth}px`;
      containerRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newText = text.substring(0, start) + '    ' + text.substring(end);
      setText(newText);
      setTimeout(() => {
        e.target.setSelectionRange(start + 4, start + 4);
      }, 0);
      onChange(activeTab, newText);
    }
  };

  return (
    <div className="editor-scroll-container">
      <div className="editor-content" ref={containerRef}>
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
    </div>
  );
};

export default TextArea;
