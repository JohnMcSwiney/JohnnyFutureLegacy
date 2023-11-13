import { useEffect } from "react";
import React from 'react';
import { useMyContext } from "../../context/FLContext";
import './style.css';
function PageTitle({ children }) {
    const { sidebarOpen } = useMyContext();

    // useEffect(() => {
    //   console.log('styleChanging');
    // }, [sidebarOpen]);
  
    return (
      //h1 = large size: font-size: 45px;
      //h2 = base style size: font-size: 35px;
      //h3 = smaller size: font-size: 25px;
      <div className='app--title--cont'
      //{sidebarOpen ? 'app--page--wrapper wrapOpenSidebar' : 'app--page--wrapper wrapClosedSidebar'}
      >
        {children}
      </div>
    );
  }
  
export default PageTitle