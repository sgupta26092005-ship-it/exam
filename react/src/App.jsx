import React, { useState, useRef, useEffect } from 'react';
import './Code.css';
import { codeSnippets } from './data';

const CodeItem = ({ snippet, isOpen, onToggle }) => {
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef(null);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className={`code-item ${isOpen ? 'active' : ''}`}>
      <div className="code-header" onClick={onToggle}>
        <span>{snippet.title}</span>
        <div>
          <button 
            className={`copy-btn ${isCopied ? 'copied' : ''}`} 
            onClick={handleCopy}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
          <span className="icon">+</span>
        </div>
      </div>
      <div 
        className="code-content" 
        ref={contentRef}
        style={{ 
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' 
        }}
      >
        <pre>
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
};

const CodeRepository = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleItem = (id) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const filteredSnippets = codeSnippets.filter(snippet => {
    const term = searchTerm.toLowerCase();
    return (
      snippet.title.toLowerCase().includes(term) || 
      snippet.code.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container">
      <h1>Code Library</h1>

      <div className="search-wrapper">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search codes (e.g., 'React', 'XML', 'Function')..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div id="codeList">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map(snippet => (
            <CodeItem 
              key={snippet.id} 
              snippet={snippet} 
              isOpen={expandedIds.includes(snippet.id)}
              onToggle={() => toggleItem(snippet.id)}
            />
          ))
        ) : (
          <div className="no-results">No matching codes found.</div>
        )}
      </div>
    </div>
  );
};

export default CodeRepository;
