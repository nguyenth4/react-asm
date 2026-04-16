import React, { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast-container">
      <div className="toast">
        <div className="toast__icon">
          <i className="bi bi-check-lg"></i>
        </div>
        <div className="toast__msg">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
