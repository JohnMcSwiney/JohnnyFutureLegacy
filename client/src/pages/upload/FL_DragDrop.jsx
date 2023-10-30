import React, { useState, useEffect } from "react";

function FL_DragDrop() {



  const [files, setFiles] = useState([]);
  const [uploadResponses, setUploadResponses] = useState([]); // Store responses for each file
  const [isFilled, updateIsFilled] = useState(false);
  const [disableUpload, updateDisableUpload] = useState(true)
  const hardcodedUser = '650ca3a3cf7964c5cb70782c';
  const [modifiedFiles, setModifiedFiles] = useState([]);

  const handleFileChange = (e) => {
    updateDisableUpload(false);
    updateIsFilled(false)
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setFiles(selectedFiles)
    console.log(selectedFiles);
  };


  const handleUpload = () => {
    updateDisableUpload(true);
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
    if (isFilled === false) {
      if (uploadResponses.length === files.length
        && uploadResponses.length !== 0
        && files.length !== 0
      ) {
        console.log("lists are the same length!");
        const modifiedFiles = files.map((file) => ({
          file,
          selected: true, // Initialize all files as selected by default
        }));
        setModifiedFiles(modifiedFiles);
        updateIsFilled(true);
      }
    }
  }, [uploadResponses, files]);

  const handleToggleSelect = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].selected = !updatedFiles[index].selected;
    setModifiedFiles(updatedFiles);
    // console.log(updatedFiles)
  };

  return (
    <div className="FL_Drag_Drop">
      <h4>Choose files from system then press upload to start collection creation process</h4>
      <section className="choose__file__cont">

        <input type="file" accept="image/*" onChange={handleFileChange} multiple />
        <button className='upload--coll--btn' onClick={handleUpload} disabled={isFilled || disableUpload}>Upload</button>
      </section>
      <section className="response--scrollable">
        {uploadResponses.map((response, index) => (
          <div className="response--item" key={index}>Response {index + 1}: {response}</div>
        ))}
      </section>
      <section>
        {isFilled === true
          && uploadResponses.length !== 0 
          && files.length !== 0?
          <div className="image-preview">
            <div className="uploaded--image--scrollable">
              {files.map((file, index) => (
                <div className="uploaded--image" key={index} 
                onClick={() => handleToggleSelect(index)}
                >
                  <img src={`http://localhost:5000/getimage?userId=${hardcodedUser}&filename=${uploadResponses[index]}`} alt={`Image ${file.name}`} />
                  <span className="image--check--cont">
                    <input type="checkbox" 
                    checked={modifiedFiles[index].selected}
                      onChange={() => handleToggleSelect(index)}
                      />
                  </span>

                </div>
              ))}
            </div>
          </div>
          :
          <div>
            no image files
          </div>
        }
      </section>


    </div>

  );
}

export default FL_DragDrop;
