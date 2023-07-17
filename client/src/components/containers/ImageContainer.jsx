import React from 'react';
import './ImageContainer.css';

const ImageContainer = ({ imageUrl, aspectRatio }) => {
  const containerStyle = {
    paddingTop: `${(1 / aspectRatio) * 100}%`
  };

  return (
    <div className="image-container" style={containerStyle}>
      <img src={imageUrl} alt="Image" className="image" />
    </div>
  );
};

export default ImageContainer;