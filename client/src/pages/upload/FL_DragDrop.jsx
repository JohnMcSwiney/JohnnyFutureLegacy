import React, { useState, useEffect } from "react";

function FL_DragDrop() {


  
  const [files, setFiles] = useState([]);
  const [uploadResponses, setUploadResponses] = useState([]); // Store responses for each file



  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setFiles(selectedFiles);
    console.log(selectedFiles);
  };


  const handleUpload = () => {
    const promises = [];

    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      const promise = fetch('http://localhost:5000/uploadimage?userId=650ca3a3cf7964c5cb70782c', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return `Error: ${error}`;
        });

      promises.push(promise);
    });

    // Wait for all requests to finish
    Promise.all(promises)
      .then((responses) => {
        setUploadResponses(responses);
      });

      
  };
  useEffect(() => {
    if(uploadResponses.length === files.length && uploadResponses.length !== 0 && files.length !== 0){
      console.log("lists are the same length!")
    }
  },[uploadResponses,files]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>

      <div>
        {uploadResponses.map((response, index) => (
          <div key={index}>Response {index + 1}: {response}</div>
        ))}
      </div>
    </div>


    // uploads one file -- working Oct 30 2023 
    //
    // const [files, setFiles] = useState([]);
    // const [images, setImages] = useState([]); // Initialize as an empty array
    // const [uploadResponse, setUploadResponse] = useState(""); // State to store the server response
    // 
    // function handleFileUpload(e) {
    //   console.log("handle upload");
    //   e.preventDefault();
    //   if (images) {
    //     const formData = new FormData();
    //     formData.append("image", images[0]);

    //     fetch("http://localhost:5000/uploadimage", {
    //       method: "POST",
    //       body: formData,
    //     })
    //       .then((response) => response.text()) // Convert the response to text
    //       .then((data) => {
    //         setUploadResponse(data); // Set the server response in the state
    //         console.log(data); // Log the response to the console
    //       })
    //       .catch((error) => {
    //         // Handle any errors
    //         console.error("Error:", error);
    //       });
    //   }

    // }



    // return (
    // uploads one file -- working Oct 30 2023 
    // 
    // <div>
    //   <form encType="multipart/form-data" onSubmit={handleFileUpload}>
    //   <input type="file" multiple onChange={handleFileChange} />
    //   <div className="image-preview">
    //       <div className="uploaded--image--scrollable">
    //       {images.map((image, index) => (
    //       <div className="uploaded--image" key={index}>
    //         <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
    //       </div>
    //     ))}
    //       </div>

    //       <button type="submit">Upload</button>


    //   </div>
    //   </form>
    // </div>
  );
}

export default FL_DragDrop;
