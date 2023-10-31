import React, { useState, useEffect } from "react";

function FL_DragDrop({ onSubmit }) {



  const [files, setFiles] = useState([]);
  const [uploadResponses, setUploadResponses] = useState([]); // Store responses for each file
  const [isFilled, updateIsFilled] = useState(false);
  const [disableUpload, updateDisableUpload] = useState(true)
  const hardcodedUser = '650ca3a3cf7964c5cb70782c';
  const [modifiedFiles, setModifiedFiles] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [disableAll, setDisableAll] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);


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
    if (disableAll == true) {
      return;
    }
    if (modifiedFiles !== null) {
      const updatedFiles = [...modifiedFiles];
      updatedFiles[index].selected = !updatedFiles[index].selected;
      setModifiedFiles(updatedFiles);
      // console.log(updatedFiles)
      filterList();
    }
  };

  const filterList = (e) => {

    console.log("filtering...");
    const completedFilteredItems = modifiedFiles.filter(item => item.selected);
    setFilteredItems(completedFilteredItems);
    console.log(completedFilteredItems);
  };

  const handleSubmit = (e) => {
    setDisableAll(true);
    if (filteredItems === null) {
      console.log("using modified list")
      onSubmit(modifiedFiles);
      setIsFormVisible(false);
    } else {
      console.log("using filtered list")
      onSubmit(filteredItems);
      setIsFormVisible(false); // Close the component
    }

  }


  return (
    <div className="FL_Drag_Drop" style={{ display: isFormVisible ? 'flex' : 'none' }}>
      <span className="image-preview--title--1">
        <h4 className="upload--title">1: Choose files from system then press upload</h4>
        <p className="upload--subtitle">If another upload happens previous images will be discarded</p>
      </span>
      <section className="choose__file__cont">

        <input type="file" accept="image/*" onChange={handleFileChange} multiple disabled={disableAll} />
        <button className='upload--coll--btn' onClick={handleUpload} disabled={isFilled || disableUpload || disableAll}>Upload</button>
      </section>
      <section className="response--scrollable">
        {uploadResponses.map((response, index) => (
          <div className="response--item" key={index}>Response {index + 1}: {response}</div>
        ))}
      </section>

      <section >

        {isFilled === true
          && uploadResponses.length !== 0
          && files.length !== 0 ?
          <div className="image-preview">
            <span className="image-preview--title--2">
              <h4 className="upload--title">2: Choose images to add to this new Collection:</h4>
              <p className="upload--subtitle">Checked photos will be used, unchecked items will be discarded (might be slow...)</p>
            </span>

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
                      disabled={disableAll}
                    />
                  </span>

                </div>
              ))}
            </div>

          </div>
          :
          <div>
            ...
          </div>
        }
      </section>

      <section>
        {isFilled === true
          && uploadResponses.length !== 0
          && files.length !== 0
          && modifiedFiles !== null ?
          <div className="upload--coll--p1--submit">
            <span className="image-preview--title--3">
              <h4 className="upload--title">3: Happy with your choices</h4>
              <p className="upload--subtitle">Press submit to go to the next step</p>
            </span>
            <div>
              {filteredItems !== null ?
                <section className="response--scrollable">
                  {filteredItems.map((item, index) => (
                    <div className="response--item" key={index}>{item.file.name}</div>
                  ))}
                </section>

                :
                <div>...</div>
              }
              <button onClick={handleSubmit} disabled={disableAll} type="submit">submit</button>


            </div>

          </div>
          :
          <div>

          </div>
        }
      </section>

    </div>

  );
}

export default FL_DragDrop;
