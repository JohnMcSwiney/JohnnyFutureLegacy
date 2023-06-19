import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
// pages
import {
  About,
  Apply,
  Artifact,
  IndividualCollection,
  CreateIndividualCollection,
  InstituteCollection,
  CreateInstituteCollection,
  Home,
  Search,
  SignIn,
  SignUp,
  Subscribe,
  Upload
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
        <div className='FL--Search--Cont'>
          <SearchBar onSearch={handleSearch} />
        </div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/search' element={<Search />}></Route>

          <Route path='/apply' element={<Apply />}></Route>
          <Route path='/artifact' element={<Artifact />}></Route>
          <Route path='/indiv_collection' element={<IndividualCollection />}></Route>
          <Route path='/insti_collection' element={<InstituteCollection />}></Route>
          
          <Route path='/create_indiv_collection' element={<CreateIndividualCollection />}></Route>
          <Route path='/create_insti_collection' element={<CreateInstituteCollection />}></Route>


          <Route path='/signIn' element={<SignIn />}></Route>
          <Route path='/signUp' element={<SignUp />}></Route>

          <Route path='/subscribe' element={<Subscribe />}></Route>

          <Route path='/upload' element={<Upload />}></Route>

        </Routes>
        <FL_Logo />
      </div>
    </BrowserRouter>
  )
}

export default App
