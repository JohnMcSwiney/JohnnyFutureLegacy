import React, { useState } from "react";

function FL_DragDrop() {
    const [images, setImages] = useState([]); // Initialize as an empty array
    const [uploadResponse, setUploadResponse] = useState(""); // State to store the server response

    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
      setImages(selectedFiles);
      console.log(selectedFiles);
    };

    function handleFileUpload(e) {
      console.log("handle upload");
      e.preventDefault();
      if (images) {
        const formData = new FormData();
        formData.append("image", images[0]);
  
        fetch("http://localhost:5000/uploadimage", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text()) // Convert the response to text
          .then((data) => {
            setUploadResponse(data); // Set the server response in the state
            console.log(data); // Log the response to the console
          })
          .catch((error) => {
            // Handle any errors
            console.error("Error:", error);
          });
      }
      
      // event.preventDefault();
      // const formData = new FormData();
      // formData.append("image", event.target.image.files[0]);
    
      // fetch("http://localhost:5000/api/uploadimage", {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((response) => response.text()) // Convert the response to text
      //   .then((data) => {
      //     setUploadResponse(data); // Set the server response in the state
      //     console.log(data); // Log the response to the console
      //   })
      //   .catch((error) => {
      //     // Handle any errors
      //     console.log(error);
      //     console.error("Error:", error);
      //   });
    }
    

  
    return (
      <div>
        <form encType="multipart/form-data" onSubmit={handleFileUpload}>
        <input type="file" multiple onChange={handleFileChange} />
        <div className="image-preview">
            <div className="uploaded--image--scrollable">
            {images.map((image, index) => (
            <div className="uploaded--image" key={index}>
              <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
            </div>
          ))}
            </div>
            
            <button type="submit">Upload</button>
          
          
        </div>
        </form>
      </div>
    );
  }

export default FL_DragDrop;
