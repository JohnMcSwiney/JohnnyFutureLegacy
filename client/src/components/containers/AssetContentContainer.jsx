import React from 'react'
import './style.css';
import FL_footer from '../../components/FL_Footer/FL_footer';
function AssetPageContentContainer({ children }) {
  
    return (
      <div className='asset--content--container'
      >
        {children}
        
   
      </div>
    );
  }
export default AssetPageContentContainer