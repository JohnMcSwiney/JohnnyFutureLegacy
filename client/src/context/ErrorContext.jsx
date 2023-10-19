// ErrorContext.js
import React, { createContext, useContext, useReducer } from 'react';


const ErrorContext = createContext();

const initialState = {
  error: null,
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { error: action.payload };
    case 'CLEAR_ERROR':
      return { error: null };
    default:
      return state;
  }
};

const ErrorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  const setError = (message) => {
    dispatch({ type: 'SET_ERROR', payload: message });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <ErrorContext.Provider value={{ error: state.error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorContextProvider');
  }
  return context;
};

export { ErrorContextProvider, useErrorContext };
