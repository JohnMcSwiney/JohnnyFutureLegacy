// ToastContext.js
import React, { createContext, useContext, useReducer } from 'react';

const ToastContext = createContext();

const initialState = {
  toasts: [],
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return { toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { toasts: state.toasts.filter((toast) => toast.id !== action.payload.id) };
    default:
      return state;
  }
};

const ToastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (message) => {
    const newToast = {
      id: Date.now(),
      message,
      
    };
    console.log(newToast.message);
    dispatch({ type: 'ADD_TOAST', payload: newToast });
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: { id } });
  };

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastContextProvider');
  }
  return context;
};

export { ToastContextProvider, useToastContext };
