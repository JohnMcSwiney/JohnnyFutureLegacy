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

          <div className='text'>{text.substring(0, 100)}...</div>

      )}
      {expanded && (

          <div className='text'>{text}</div>
          

      )}
      <button className='show-button' onClick={toggleText}>
            {expanded && ('show less')}
            {!expanded && ('show more')}
      </button>
    </div>
  )
}

export default TextContainer
