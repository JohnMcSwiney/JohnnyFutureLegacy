import React from 'react';
import './style.css'

const ProgressBar = ({ progress }) => {
  return (
    <div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {/* {`${progress}%`} */}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
