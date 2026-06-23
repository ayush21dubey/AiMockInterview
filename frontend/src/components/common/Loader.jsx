import React from 'react';
import './Loader.css';

export const Loader = ({
  size = 'md',
  message = 'Processing...'
}) => {
  return (
    <div className="loader-container">
      <div className={`loader-spinner loader-${size}`}>
        <div className="loader-inner-circle"></div>
        <div className="loader-scanner-line"></div>
      </div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;
