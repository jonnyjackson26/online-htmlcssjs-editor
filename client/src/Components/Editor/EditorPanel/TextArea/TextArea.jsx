import React, { useEffect, useRef } from 'react';
import './TextArea.css';

const TextArea = ({ activeTab, value, onChange }) => {
  const editableRef = useRef(null);

  

  const applyHighlighting = (text) => {
    // Step 1: Escape special characters
    const escapedText = text
      .replace(/&/g, '&amp;')  // Escape ampersands
      .replace(/</g, '&lt;')   // Escape less-than
      .replace(/>/g, '&gt;');  // Escape greater-than
  
    // Step 2: Wrap all tags (including self-closing tags) in <tag>...</tag>
    const withTags = escapedText.replace(
      /(&lt;\/?[a-z0-9-]+(?:\s+[^&gt;]*)?\/?&gt;)/gi,  // Matches both self-closing and non self-closing tags
      '<tag>$1</tag>'
    );
  
    // Step 3: Temporarily wrap strings in <string>...</string>
    const withStrings = withTags.replace(
      /("[^"]*"|'[^']*')/g,  // Strings in quotes
      '<string>$1</string>'
    );
  
    // Step 4: Wrap comments in <comment>...</comment>
    const withComments = withStrings.replace(
      /(&lt;!--[\s\S]*?--&gt;)/g,  // Matches HTML comments
      '<comment>$1</comment>'
    );
  
    // Step 5: Replace <tag>, <string>, and <comment> placeholders with <span> elements
    const highlightedText = withComments
      .replace(/<tag>/g, '<span class="tag">')
      .replace(/<\/tag>/g, '</span>')
      .replace(/<string>/g, '<span class="string">')
      .replace(/<\/string>/g, '</span>')
      .replace(/<comment>/g, '<span class="comment">')
      .replace(/<\/comment>/g, '</span>');
  
    return highlightedText;
  };
  
  
  
  
  
  
  
  
  

  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editableRef.current);
    preCaretRange.setEnd(range.startContainer, range.startOffset);

    const start = preCaretRange.toString().length;
    return { start };
  };

  const restoreSelection = (savedSelection) => {
    if (!savedSelection || !editableRef.current) return;

    const { start } = savedSelection;
    const range = document.createRange();
    const selection = window.getSelection();

    let charCount = 0;

    const setRange = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const nodeLength = node.textContent.length;
        if (charCount + nodeLength >= start) {
          range.setStart(node, start - charCount);
          range.collapse(true);
          return true;
        }
        charCount += nodeLength;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const child of node.childNodes) {
          if (setRange(child)) return true;
        }
      }
      return false;
    };

    setRange(editableRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleInput = () => {
    if (editableRef.current) {
      const text = editableRef.current.innerText.replace(/\r?\n/g, '\n'); // Normalize newlines
      onChange(activeTab, text);
    }
  };

  useEffect(() => {
    const savedSelection = saveSelection();

    if (editableRef.current) {
      editableRef.current.innerHTML = applyHighlighting(value || '').replace(/\n/g, '<br>');
    }

    restoreSelection(savedSelection);
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const savedSelection = saveSelection();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);

      range.setStartAfter(br);
      range.setEndAfter(br);

      selection.removeAllRanges();
      selection.addRange(range);

      // Add 1 to the saved selection position to account for the new line
      const newSavedSelection = { start: savedSelection.start + 1 };

      handleInput();

      // Restore the cursor position after adjusting for the new line
      setTimeout(() => restoreSelection(newSavedSelection), 0);
    }
  };

  return (
    <div
      className="editable"
      contentEditable="true"
      ref={editableRef}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      spellCheck="false"
    />
  );
};

export default TextArea;
