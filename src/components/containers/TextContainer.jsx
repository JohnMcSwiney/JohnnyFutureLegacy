import React, { useState } from 'react';

const TextContainer = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const firstSentence = text.match(/^.*?[.!?]/)[0];

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`parent-container ${expanded ? 'expanded' : ''}`}>
      <div className="text-container">
        <p className="full-text">{text}</p>
        <p className="preview-text">{firstSentence}...</p>
        <button className="show-more-button" onClick={toggleText}>
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default TextContainer;