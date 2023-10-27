import React, { useState } from "react";

function FL_DragDrop() {
    const [images, setImages] = useState([]); // Initialize as an empty array

    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
      setImages(selectedFiles);
    };
  
    return (
      <div>
        <input type="file" multiple onChange={handleFileChange} />
        <div className="image-preview">
            <div className="uploaded--image--scrollable">
            {images.map((image, index) => (
            <div className="uploaded--image" key={index}>
              <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
            </div>
          ))}
            </div>
          
        </div>
      </div>
    );
  }

export default FL_DragDrop;
