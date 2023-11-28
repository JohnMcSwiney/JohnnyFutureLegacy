import { useEffect } from "react";
import React from 'react';
import { useMyContext } from "../../context/FLContext";
import './style.css';

function PageContainer({ children }) {
    
    return (
      <div className='page--container'>
        {children}
        
      </div>
    );
  }

export default PageContainer