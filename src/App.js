import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
// pages
import {
  Home,
  About
} from "./pages"

import SearchBar from './components/searchBar/SearchBar';
import FL_Logo from "./components/FL_Logo/FL_Logo";
import HamburgerMenu from "./components/hamburgerMenu/HamburgerMenu";


function App() {
  const handleSearch = (searchTerm) => {
    // Perform search logic with the searchTerm
    console.log('Searching for:', searchTerm);
  };

  return (
    <BrowserRouter>
    <div className="FL--App--Cont">
      
      {/* <div className="FL--Menu--Cont"> 
      <HamburgerMenu />
      </div> */}
      <HamburgerMenu />
      {/* <div className="FL--Search--Cont">
        <SearchBar onSearch={handleSearch} />
      </div> */}
      
      
    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
      </Routes>
    <FL_Logo/>
    </div>
    </BrowserRouter>
  );
}

export default App;
