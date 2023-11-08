import React, { createContext, useState, useContext, useEffect } from 'react';

const FLContext = createContext();

const ContextProvider = ({ children }) => {
  const hardcodedUser = '650ca3a3cf7964c5cb70782c';

  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const [currentCollection, setCurrentCollection] = useState(
    JSON.parse(localStorage.getItem('storedCollection')) || null
  );
  const [userData, setUserData] = useState(null);
  const [collectionUserName, setCollectionUserName] = useState('');
  const [collectionUserId, setCollectionUserId] = useState('');
  const [collectionIsInstit, setCollectionIsInstit] = useState(false);
  const [collectionUserPfp, setCollectionUserPfp] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(
    localStorage.getItem('sideBarState') || true
  );
  useEffect(() => {
    localStorage.setItem('sideBarState', sidebarOpen);
  }, [sidebarOpen]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`http://localhost:5000/api/user/${hardcodedUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
          },
        });

        if (userResponse.ok) {
          const userJson = await userResponse.json();
          setUserData(userJson);
          setCollectionUserName(`${userJson.firstName} ${userJson.lastName}`);
          setCollectionUserId(userJson._id);
          setCollectionIsInstit(userJson.isInstit);
          setCollectionUserPfp(userJson.profilePicture);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`http://localhost:5000/api/user/${currentCollection.ownerName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
          },
        });

        if (userResponse.ok) {
          const userJson = await userResponse.json();
          setCollectionUserName(`${userJson.firstName} ${userJson.lastName}`);
          setCollectionUserId(userJson._id);
          setCollectionIsInstit(userJson.isInstit);
          setCollectionUserPfp(userJson.profilePicture);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchUser();
  }, [currentCollection]);


  // setCollectionUserName(`${userJson.firstName} ${userJson.lastName}`);
  //         setCollectionUserId(userJson._id);
  //         setCollectionIsInstit(userJson.isInstit);
  //         setCollectionUserPfp(userJson.profilePicture);
  const setFetchedCollection = (object) => {
    setCurrentCollection(object);
    localStorage.setItem('storedCollection', JSON.stringify(object));
  };
  const clearCachedCollectionData = () =>{
    setCurrentCollection('');
    localStorage.setItem('storedCollection', JSON.stringify(null));
    setCollectionUserName('');
    setCollectionUserId('');
    setCollectionIsInstit('');
    setCollectionUserPfp('');
  }

  useEffect(() => {
    localStorage.setItem('searchValue', searchValue);
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem('storedUser', JSON.stringify(userData));
  }, [userData]);

  return (
    <FLContext.Provider
      value={{
        searchValue,
        setSearchValue,
        userData,
        currentCollection,
        setFetchedCollection,
        collectionUserName,
        collectionUserId,
        collectionIsInstit,
        collectionUserPfp,
        clearCachedCollectionData,
        sidebarOpen, setSidebarOpen
      }}
    >
      {children}
    </FLContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(FLContext);
};

export { ContextProvider, useMyContext };
