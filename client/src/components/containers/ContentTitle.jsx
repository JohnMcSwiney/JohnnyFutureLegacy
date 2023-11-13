import React from 'react'
import './style.css';
function ContentTitle({ children }) {
  
    return (
      //h1 = large size: font-size:30px;
      //h2 = base style size: font-size: 25px;
      //h3 = smaller size: font-size: 20px;
      <div className='content--title--cont'
      //{sidebarOpen ? 'app--page--wrapper wrapOpenSidebar' : 'app--page--wrapper wrapClosedSidebar'}
      >
        {children}
      </div>
    );
  }
export default ContentTitle