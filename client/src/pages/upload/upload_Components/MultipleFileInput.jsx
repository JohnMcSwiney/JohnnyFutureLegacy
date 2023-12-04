import React, { useState, useEffect } from "react";
import ProgressBar from "../../../components/progressbar/progressbar";
import { useToastContext } from '../../../context/ToastContext';
import { useMyContext } from "../../../context/FLContext";
import './uploadCompStyle.css';


function MultipleFileInput({ onSubmit, onFileChange }) {
  const [files, setFiles] = useState([]);
  const [uploadResponses, setUploadResponses] = useState([]); // Store responses for each file
  const [isFilled, updateIsFilled] = useState(false);
  const [disableUpload, updateDisableUpload] = useState(true)
  const hardcodedUser = '650ca3a3cf7964c5cb70782c';
  const [modifiedFiles, setModifiedFiles] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [disableAll, setDisableAll] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { addToast } = useToastContext();
  const { currentUserObject } = useMyContext();


  const handleFileChange = (e) => {
    updateDisableUpload(false);
    updateIsFilled(false)
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setFiles(selectedFiles);
    onFileChange(selectedFiles);
    // console.log(selectedFiles);
  };


  const handleUpload = () => {
    updateDisableUpload(true);
    const promises = [];
    let completedResponses = 0;

    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      const promise = fetch(`http://localhost:5000/uploadimage?userId=${currentUserObject._id}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          // Increment the progress every time a response is received
          completedResponses += 1;
          const progress = (completedResponses / files.length) * 100;
          setProgress(progress);
          return data;
        })
        .catch((error) => {
          addToast(`Error: ${error}`);
          setTimeout((addToast(`Try reloading the page and trying again`)), 500);
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

  const incrementProgress = () => {
    let temp = progress + 10;
    setProgress(temp);
  }
  useEffect(() => {
    if (isFilled === false) {
      if (uploadResponses.length === files.length
        && uploadResponses.length !== 0
        && files.length !== 0
      ) {
        console.log("lists are the same length!");
        const modifiedFiles = files.map((file, index) => ({
          file,
          selected: true, // Initialize all files as selected by default
          fileName: uploadResponses[index]
        }));
        setModifiedFiles(modifiedFiles);
        updateIsFilled(true);
      }
    }
  }, [uploadResponses, files]);

  // useEffect(()=>{
  //   console.log('upload progress: ' + progress);
  // },[progress])

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
    if (uploadResponses === null) {
      addToast('No files returned, reload and try again...');
      return;
    }
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
  function joinArraysByIndex(arr1, arr2) {
    const result = [];
    // Check that both arrays have the same length
    if (arr1.length !== arr2.length) {
      throw new Error('Arrays must have the same length to be joined by index.');
    }
    // Iterate through the arrays and pair elements at the same index
    for (let i = 0; i < arr1.length; i++) {
      result.push([arr1[i], arr2[i]]);
    }
    return result;
  }

  return (
    <div className="FL_Drag_Drop" style={{ display: isFormVisible ? 'flex' : 'none' }}>

      <div className={
        isFilled ?
          "hiding--upload--input"
          :
          "multi--upload--section--1"

      }>
        <span className="image-preview--title--1">
          <h4 className="upload--title">1: Choose files from system then press upload</h4>
          <p className="upload--subtitle">If another upload happens previous images will be discarded</p>
        </span>
        <section className="choose__file__cont">

          <input type="file" accept="image/*" onChange={handleFileChange} multiple disabled={disableAll} />
          <button className='upload--coll--btn' onClick={handleUpload} disabled={isFilled || disableUpload || disableAll}>Upload</button>

        </section>
      </div>
      {files.length !== 0
        && files.length !== uploadResponses.length
        && progress < 100 ?
        <section className="response--progress--cont">
          <ProgressBar progress={progress} />
        </section>
        :
        <section className="response--progress--cont">
        </section>
      }
      {isFilled === true
        && uploadResponses.length !== 0
        && files.length !== 0 ?
        <div className="image--preview">
          <span className="image-preview--title--2">
            <h4 className="upload--title">2: Choose images to add to this new Collection:</h4>
            <p className="upload--subtitle">Checked photos will be used, unchecked items will be discarded</p>
          </span>

          <div className="uploaded--image--scrollable">
            {files.map((file, index) => (
              <div className="uploaded--image--v2--cont" key={index}
                onClick={() => handleToggleSelect(index)}
              >
                <div className="uploaded--image--v2--img">
                  <img src={`http://localhost:5000/getimage?userId=${currentUserObject._id}&filename=${uploadResponses[index]}`} alt={`Image ${file.name}`} />
                </div>
                <span className="image--check--cont">
                  <input type="checkbox"
                    checked={modifiedFiles[index].selected}
                    onChange={() => handleToggleSelect(index)}
                    onClick={() => addToast('this is a bug, click the image, not the checkbox')}
                    disabled={disableAll}
                  />

                </span>
                <div className="checkbox--fix--cont">
                  <h4>{index + 1}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
        :
        <div>
          ...
        </div>
      }



      {isFilled === true
        && uploadResponses.length !== 0
        && files.length !== 0
        && modifiedFiles !== null &&
        <section className="upload--coll--p1--submit">
          <span className="image-preview--title--2">
            <h4 className="upload--title">3: Happy with your choices</h4>
            <p className="upload--subtitle">Press submit to go to the next step</p>
          </span>
          {/* <div className="upload--coll--image--names--submit">
            {filteredItems !== null ?
                <section className="response--scrollable">
                  {filteredItems.map((item, index) => (
                    <div className="response--item" key={index}>Item {index + 1}: {item.file.name}</div>
                  ))}
                </section>

                :
                <div>...</div>
              }
           


          </div> */}
          <button className='upload--coll--btn' onClick={handleSubmit} disabled={disableAll} type="submit">Submit Pictures</button>

        </section>
      }


    </div>

  );
}

export default MultipleFileInput;
