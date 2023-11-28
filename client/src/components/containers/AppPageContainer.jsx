import { useEffect, useRef } from "react";
import React from 'react';
import { useMyContext } from "../../context/FLContext";
import './style.css';

function AppPageContainer({ children }) {
  const { sidebarOpen } = useMyContext();


  return (
    <div className={sidebarOpen ? 'app--page--container openSidebar' : 'app--page--container closedSidebar'}>
      {children}
      
    </div>
  );
}

export default AppPageContainer;
