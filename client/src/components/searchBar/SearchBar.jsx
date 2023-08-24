import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const location = useLocation();
  const showtext = 'hidden';

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  //     set search query to empty string
  const [q, setQ] = useState("");
  //     set search parameters
  // const [searchParam] = useState(["AssetName", "AssetID", "UserID", "UserName"]);

  useEffect(() => {
    // our fetch codes
  }, []);
  useEffect(() => {

    console.log(q);
    const { pathname } = location;
    console.log("Current location: " + pathname)
    // Grabs Current page for page specific searching
  }, [q]);

  // Used to enable the text & position on the home screen
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
  const isHomePage = location.pathname === '/'; // Check if it's the home page


  return (
    <form
      className={`search--cont ${isHomePage ? 'centered' : ''}`}
    // onSubmit={handleSubmit}
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
          onChange={(e) => setQ(e.target.value)}
        />
        <button type='submit' className='search--button'><BiSearchAlt2 /></button>
      <h2 className={`${isHomePage ? 'centered--text' : 'hidden'}`} >WHAT DO YOU WANT TO SEE TODAY?</h2>
    </form>
  )
}

export default SearchBar
