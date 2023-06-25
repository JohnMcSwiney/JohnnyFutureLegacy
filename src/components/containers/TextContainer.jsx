import React, { useState } from 'react'
import './TextContainer.css'

const TextContainer = ({ text }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleText = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={`parent-container ${expanded ? 'expanded' : 'unexpanded'}`}>
      {!expanded && (
        <div className='text'>
          {text.substring(0, 100)}...
          <button className='show-more-button' onClick={toggleText}>
            Show More
          </button>
        </div>
      )}
      {expanded && (
        <div className='text'>
          {text}
          <button className='show-less-button' onClick={toggleText}>
            Show Less
          </button>
        </div>
      )}
    </div>
  )
}

export default TextContainer
