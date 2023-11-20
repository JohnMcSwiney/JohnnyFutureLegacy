import React from 'react';
import './style.css';

function CollectionPageContainer({ children }) {
    
    return (
      <div className='collection--page--container--component'>
        {children}
      </div>
    );
  }

export default CollectionPageContainer