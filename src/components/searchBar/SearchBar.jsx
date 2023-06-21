import React, { useState } from 'react'
import './SearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation();
  const showtext = 'hidden';
  
  const getPageClass = () => {
    const { pathname } = location;

    // Add logic to determine the class based on the current pathname
    if (pathname === '/') {
      
      return 'search--home--cont';
    } 

    // Default class when no matching path is found
    return 'search--cont';
  };

  const divClass = getPageClass();

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  const isHomePage = location.pathname === '/'; // Check if it's the home page


  return (
      <form 
      className={`search--cont ${isHomePage ? 'centered' : ''}`} 
      onSubmit={handleSubmit}>
        
        <input
          type='text'
          placeholder='What do you want to see today?'
          value={searchTerm}
          onChange={handleChange}
          className='search--input'
        />
        <button type='submit' className='search--button'><BiSearchAlt2/></button>
        <h2 className={`${isHomePage ? 'centered--text' : 'hidden'}`} >WHAT DO YOU WANT TO SEE TODAY?</h2>
      </form>
  )
}

export default SearchBar
