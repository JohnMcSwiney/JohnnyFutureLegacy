// Toast.js
import React, { useEffect } from 'react';
import './style.css';

const Toast = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000); // Automatically close the toast after 3 seconds
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div className="toast">
      <button onClick={() => onRemove(toast.id)}>&times;</button>
      {toast.message}
    </div>
  );
};

export default Toast;
