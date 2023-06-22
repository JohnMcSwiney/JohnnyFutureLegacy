import React, { useState } from 'react';

const TextContainer = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`parent-container ${expanded ? 'expanded' : ''}`}>
      <div className="text-container">
        <p className={`full-text ${expanded ? 'visible' : ''}`}>{text}</p>
        {!expanded && (
          <>
            <p className="preview-text">{text.substring(0, 100)}...</p>
            <button className="show-more-button" onClick={toggleText}>
              Show More
            </button>
          </>
        )}
        {expanded && (
        <>
        <p className="preview-text">{text}</p>
          <button className="show-less-button" onClick={toggleText}>
            Show Less
          </button>
        </>
        )}
      </div>
    </div>
  );
};

export default TextContainer;
