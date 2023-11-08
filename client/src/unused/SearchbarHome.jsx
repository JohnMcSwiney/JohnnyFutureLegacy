import React, { useState, useEffect, useContext } from 'react'
// import './SearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
// import FLContext from '../../context/FLContext'
import { useSearchContext } from "../context/SearchContext";
import sanitizeHtml from 'sanitize-html';
import { useToastContext } from '../context/ToastContext';

const SearchBarHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToastContext();
  const { clearSearchData, setSearchValue, setSearchData } = useSearchContext();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState([]);

  const [modelName, setModelName] = useState('All');
  const [results, setResults] = useState([]);
  const [q, setQ] = useState("");
  const redirectResults = () => { navigate(`/search_results/${q}`) };
  const getPageClass = () => {
    const { pathname } = location;
    // Add logic to determine the class based on the current pathname
    if (currentPage !== pathname) {
      setCurrentPage(pathname);
    }
    if (pathname === '/') {
      return 'search--home--cont';
    }
    else if (pathname.includes('search')) {
    }
    // Default class when no matching path is found
    return 'search--cont';
  };
  const divClass = getPageClass();
  const isHomePage = location.pathname === '/'; // Check if it's the home page

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    let searchURL = 'http://localhost:5000/api/search';
    clearSearchData();
    setSearchValue(q);
    // console.log(q)
    if (modelName) {
      searchURL += `/${modelName}`;
    }

    try {
      console.log(`${searchURL}?q=${q}`)
      const response = await fetch(`${searchURL}?q=${q}`);
      if (response.ok) {
        const data = await response.json();
        setSearchData(data);
        // console.log(data)
        redirectResults();
      } else {
        console.error('Search request failed.');
        addToast("Search request failed")
        redirectResults();
      }
    } catch (error) {
      console.error('An error occurred:', error);
      addToast('An error occurred: ' + error);
    }

  };

  return (
    <form
      className={`search--cont `}
      onSubmit={handleSearch}
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
    </form>
  )
}

export default SearchBarHome
