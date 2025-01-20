import React, { useState, useRef, useEffect } from 'react';
import './TextArea.css';
import './syntaxHighlighting.css';
import applyHighlighting from './syntaxHighlight';

const TextArea = ({ activeTab, value, onChange }) => {
  const [text, setText] = useState(value || '');
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    syncScroll();
    updateLineNumbers();
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
    if (textareaRef.current && preRef.current && lineNumbersRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const updateLineNumbers = () => {
    if (lineNumbersRef.current) {
      const lineCount = text.split('\n').length;
      const lineNumbers = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join('');
      lineNumbersRef.current.innerHTML = lineNumbers;
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
      <div className="line-numbers" ref={lineNumbersRef}></div>
      <pre ref={preRef} className="editable">
        <code dangerouslySetInnerHTML={{ __html: applyHighlighting(text, activeTab) }} />
      </pre>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll} // Add scroll synchronization
        spellCheck="false"
      />
    </div>
  );
};

export default TextArea;
