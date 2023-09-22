import React, { createContext, useState, useContext, useEffect } from 'react';

const FLContext = createContext();

const ContextProvider = ({ children }) => {

    const [searchValue, setSearchValue] = useState('');
    const [searchPage, setSearchPage] = useState("Initial Empty Search Page")
    const [userData, setUserData] = useState(null);
    const hardcodedUser = '650ca3a3cf7964c5cb70782c';
    // Load the searchValue from localStorage on component mount
    useEffect(() => {
        const savedValue = localStorage.getItem('searchValue');
        if (savedValue) {
            setSearchValue(savedValue);
        }
    }, []);

    useEffect(()=> {
        // http://localhost:3000/profile
        const fetchUser = async () => {
          const userResponse = await fetch(`http://localhost:5000/api/user/${hardcodedUser}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': 'true' }
          })
          const userJson = await userResponse.json()
          if (userResponse.ok) {
            setUserData(userJson)
            // console.log(userJson);
          } else {
            // setDone(false);
          }
        }
    
        fetchUser()
       
      }, []); 


    // Save the searchValue to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('searchValue', searchValue);
    }, [searchValue]);

    useEffect(() => {
        localStorage.setItem('storedUser', userData);
    }, [userData]);
    

    return (
        <FLContext.Provider value={{ searchValue, setSearchValue,userData }}>
            {children}
        </FLContext.Provider>
    );
};

const useMyContext = () => {
    return useContext(FLContext);
};

export { ContextProvider, useMyContext };