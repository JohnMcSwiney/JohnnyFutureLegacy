// ToastContainer.js
import React from 'react';
import Toast from './Toast.jsx';
import { useToastContext } from '../../context/ToastContext';
import './style.css';

function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

export default ToastContainer;
