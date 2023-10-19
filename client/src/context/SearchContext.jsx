import React, { createContext, useState, useContext, useEffect } from 'react';

const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {

  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const [searchData, setSearchData] = useState(
    localStorage.getItem('searchData') || ''
  );
  
  const clearSearchData = () =>{
    setSearchValue('');
    localStorage.setItem('searchValue', '');
    setSearchData('');
    localStorage.setItem('searchData', '');
  }

  useEffect(() => {
    console.log("setting search val: " + searchValue);
    localStorage.setItem('searchValue', searchValue);
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem('searchData', searchData);
  }, [searchData]);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchData,
        setSearchData,
        clearSearchData
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  return useContext(SearchContext);
};

export { SearchContextProvider, useSearchContext };
