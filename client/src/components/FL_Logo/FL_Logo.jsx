import React from 'react'
import { Navigate, useNavigate, Link } from "react-router-dom";
import './Logo.css';

export default function FL_Logo() {
    const navigate = useNavigate();
    const redirectAbout = () => {
      navigate(`/`);

    };

  return (
    
        <div className="logo-cont" onClick={redirectAbout}>
            <img src="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_Assets%2FGroup%201253.png?alt=media&token=d96e2f7e-960b-457d-bb26-a92735380d4d"/>
        </div>
    
  )
}
