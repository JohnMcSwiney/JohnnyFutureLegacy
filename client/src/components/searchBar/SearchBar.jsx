import React, { useState, useEffect, useContext } from 'react'
import './SearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
// import FLContext from '../../context/FLContext'
import {useMyContext} from "../../context/FLContext";
import sanitizeHtml from 'sanitize-html';


const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);

  const { searchValue, setSearchValue} = useMyContext();
  //     set search query to empty string
  const [q, setQ] = useState("");
  //     set search parameters
  // const [searchParam] = useState(["AssetName", "AssetID", "UserID", "UserName"]);
  //Param1 (optional): search item
  const redirectSearch = () => {
    if (currentPage){
      
      navigate(`/search/${q}`)
      setSearchValue(q)
    }
  };
  useEffect(() => {

    // Grabs Current page for page specific searching
    const { pathname } = location;
    // console.log("Current location: " + pathname)
    
  }, [q]);

  // Used to enable the text & position on the home screen
  const getPageClass = () => {
    const { pathname } = location;
    // Add logic to determine the class based on the current pathname
    if(currentPage !== pathname){
      setCurrentPage(pathname);
    }
    if (pathname === '/') {
      return 'search--home--cont';
    }
    else if(pathname.includes('search')){
    }
    // Default class when no matching path is found
    return 'search--cont';
  };
  const divClass = getPageClass();
  const isHomePage = location.pathname === '/'; // Check if it's the home page

  const handleSubmit = () => {
    redirectSearch();
  }

  return (
    <form
      className={`search--cont ${isHomePage ? 'centered' : ''}`}
      onSubmit={handleSubmit}
    >
        <input
          type='search'
          placeholder='What do you want to see today?'
          value={q}
          className='search--input'
          /*
          // set the value of our useState q
          //  anytime the user types in the search box
          */
          onChange={(e) => setQ(sanitizeHtml(e.target.value))}
        />
        <button type='submit' className='search--button'><BiSearchAlt2 /></button>
      <h2 className={`${isHomePage ? 'centered--text' : 'hidden'}`} >WHAT DO YOU WANT TO SEE TODAY?</h2>
    </form>
  )
}

export default SearchBar
