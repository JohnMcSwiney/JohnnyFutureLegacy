import React, { createContext, useState, useContext, useEffect } from 'react';

const FLContext = createContext();

const ContextProvider = ({ children }) => {

    const [searchValue, setSearchValue] = useState('');
    const [searchPage, setSearchPage] = useState("Initial Empty Search Page")


    // const contextValue = {
    //     searchValue,
    //     setSearchValue,
    //     searchPage,
    //     setSearchPage        
    // };
    // Load the searchValue from localStorage on component mount
    useEffect(() => {
        const savedValue = localStorage.getItem('searchValue');
        if (savedValue) {
            setSearchValue(savedValue);
        }
    }, []);

    // Save the searchValue to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('searchValue', searchValue);
    }, [searchValue]);

    return (
        <FLContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </FLContext.Provider>
    );
};

const useMyContext = () => {
    return useContext(FLContext);
};

export { ContextProvider, useMyContext };