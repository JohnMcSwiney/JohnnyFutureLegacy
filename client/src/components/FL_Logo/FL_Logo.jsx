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
            <img src="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_Assets%2FFL_logo_white.png?alt=media&token=e23d1965-e13f-4594-babb-9937afc3707e"/>
        </div>
    
  )
}
