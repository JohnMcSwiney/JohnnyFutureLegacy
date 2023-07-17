import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
// pages
import {
  About,
  Apply,
  Artifact,
  Browse,
  IndividualCollection,
  CreateIndividualCollection,
  InstituteCollection,
  CreateInstituteCollection,
  Home,
  Search,
  Login,
  SignUp,
  Subscribe,
  Upload,
  Landing
} from './pages'

import SearchBar from './components/searchBar/SearchBar'
import FL_Logo from './components/FL_Logo/FL_Logo'
import HamburgerMenu from './components/hamburgerMenu/HamburgerMenu'

function App () {
  const handleSearch = searchTerm => {
    // Perform search logic with the searchTerm
    console.log('Searching for:', searchTerm)
  }


  
  return (
    <BrowserRouter>
      <div className='FL--App--Cont'>
        <HamburgerMenu />
        {/* <div className='FL--Search--Cont'>
          
        </div> */}
        <div className="gradient-cont header--height">
          <div className='FL--Logo--Cont header--height '>
          <FL_Logo />
          </div>
          
           <div className='FL--Search--Cont header--height'>
          <SearchBar onSearch={handleSearch} />
        </div>

        </div>
        
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/landing' element={<Landing />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/search' element={<Search />}></Route>

          <Route path='/apply' element={<Apply />}></Route>
          <Route path='/artifact/:id/:parentId' element={<Artifact />}></Route>
          
          <Route path='/browse' element={<Browse />}></Route>

          <Route path='/indiv_collection/:individ/:id' element={<IndividualCollection />}></Route>
          
          {/* <Route path='/insti_collection/:id' element={<InstituteCollection />}></Route> */}
          <Route path='/insti_collection/:param1/:param2?' element={<InstituteCollection />}></Route>
          
          <Route path='/create_indiv_collection' element={<CreateIndividualCollection />}></Route>
          <Route path='/create_insti_collection' element={<CreateInstituteCollection />}></Route>


          <Route path='/login' element={<Login />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>

          <Route path='/subscribe' element={<Subscribe />}></Route>

          <Route path='/upload' element={<Upload />}></Route>

        </Routes>
        
      </div>
    </BrowserRouter>
  )
}

export default App
