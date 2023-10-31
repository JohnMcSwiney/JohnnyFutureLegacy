import React, { createContext, useState, useContext, useEffect } from 'react';

const UploadContext = createContext();

const UploadContextProvider = ({ children }) => {

  const [uploadValue, setUploadValue] = useState(localStorage.getItem('uploadValue') || '');
  const [uploadData, setUploadData] = useState(
    localStorage.getItem('uploadData') || ''
  );
  
  const clearUploadData = () =>{
    setUploadValue('');
    localStorage.setItem('uploadValue', '');
    setUploadData('');
    localStorage.setItem('uploadData', '');
  }

  useEffect(() => {
    console.log("setting upload val: " + uploadValue);
    localStorage.setItem('uploadValue', uploadValue);
  }, [uploadValue]);

  useEffect(() => {
    localStorage.setItem('uploadData', uploadData);
  }, [uploadData]);

  return (
    <UploadContext.Provider
      value={{
        uploadValue,
        setUploadValue,
        uploadData,
        setUploadData,
        clearUploadData
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

const useUploadContext = () => {
  return useContext(UploadContext);
};

export { UploadContextProvider, useUploadContext };
