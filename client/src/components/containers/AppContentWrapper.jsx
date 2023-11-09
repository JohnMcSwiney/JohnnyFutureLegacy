import { useEffect } from "react";
import React from 'react';
import { useMyContext } from "../../context/FLContext";
import './style.css';
function AppContentWrapper({ children }) {
    const { sidebarOpen } = useMyContext();

    useEffect(() => {
      console.log('styleChanging');
    }, [sidebarOpen]);
  
    return (
      <div className={sidebarOpen ? 'app--page--wrapper wrapOpenSidebar' : 'app--page--wrapper wrapClosedSidebar'}>
        {children}
      </div>
    );
  }
  
export default AppContentWrapper