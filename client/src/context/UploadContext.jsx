import React, { createContext, useState, useContext, useEffect } from 'react';

const UploadContext = createContext();

const UploadContextProvider = ({ children }) => {

  const [uploadValue, setUploadValue] = useState(localStorage.getItem('uploadValue') || '');
  const [uploadData, setUploadData] = useState(
    localStorage.getItem('uploadData') || null
  );
  const [uploadStarted, setUploadStarted] =useState(
    localStorage.getItem('uploadStarted') || false
  );
  const [uploadCompleted, setUploadCompleted] = useState(
    localStorage.getItem('uploadCompleted') || false
  );
  
  const clearUploadData = () =>{
    setUploadValue('');
    localStorage.setItem('uploadValue', '');

    setUploadData(null);
    localStorage.setItem('uploadData', null);

    setUploadStarted(false);
    localStorage.setItem('uploadStarted', true );

    setUploadCompleted(false);
    localStorage.setItem('uploadCompleted', false);
  }
  const startUploadProcess = (value) =>{
    console.log("start upload Upload value:",value)
    if(value == 'COLLECTION' || value == 'SINGLE ASSET'){
      setUploadValue(value);
      localStorage.setItem('uploadValue', value);
  
      setUploadData(null);
      localStorage.setItem('uploadData', null);
  
      setUploadStarted(true);
      localStorage.setItem('uploadStarted', true );
  
      setUploadCompleted(false);
      localStorage.setItem('uploadCompleted', false);
    }
    
  }

  useEffect(() => {
    
    localStorage.setItem('uploadValue', uploadValue);
  }, [uploadValue]);

  useEffect(() => {
    // console.log("setting upload val: " + uploadData);
    localStorage.setItem('uploadData', uploadData);
  }, [uploadData]);

  useEffect(() => {
    localStorage.setItem('uploadCompleted', uploadCompleted);
  }, [uploadCompleted]);

  return (
    <UploadContext.Provider
      value={{
        uploadValue,
        setUploadValue,
        uploadData,
        setUploadData,
        clearUploadData,
        uploadCompleted,
        setUploadCompleted,
        uploadStarted,
        setUploadStarted,
        startUploadProcess
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
