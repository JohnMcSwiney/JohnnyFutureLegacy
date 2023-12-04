import React, { useState, useEffect } from "react";
import ProgressBar from "../../../components/progressbar/progressbar";
import { useToastContext } from '../../../context/ToastContext';
import { useMyContext } from "../../../context/FLContext";

function SingleFileInput({ onSubmit }) {
    const [file, setFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [disableUpload, updateDisableUpload] = useState(true);
    const hardcodedUser = '650ca3a3cf7964c5cb70782c';
    const [disableAll, setDisableAll] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const { addToast } = useToastContext();
    const { currentUserObject } = useMyContext();

    const handleFileChange = (e) => {
        updateDisableUpload(false);
        const selectedFile = e.target.files[0]; // Select only the first file if multiple are selected
        setFile(selectedFile);
        console.log(selectedFile);
    };

    const handleUpload = () => {
        updateDisableUpload(true);

        if (!file) {
            addToast('Please select a file before uploading.');
            return;
        }
        if (!currentUserObject) {
            addToast('Login required');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:5000/api/user/${currentUserObject._id}/uploadBanner`, {
            method: 'POST',
            body: formData,  // Use FormData for file uploads
        })
            .then((response) => response.json())  // Assuming response is JSON
            .then((data) => {
                setUploadResponse(data);
            })
            .catch((error) => {
                addToast(`Error: ${error}`);
                setTimeout(() => addToast('Try reloading the page and trying again'), 500);
            });
    };

    useEffect(() => {
        if (file) {
            onSubmit(file, uploadResponse);
            //   setIsFormVisible(false);
        }
    }, [file, uploadResponse, onSubmit]);

    return (
        <div className="FL_Drag_Drop" style={{ display: isFormVisible ? 'flex' : 'none' }}>
            <section className="choose__file__cont">
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={disableAll} />
                <button className='upload--coll--btn' onClick={handleUpload} disabled={disableUpload || disableAll}>Upload</button>
            </section>

            {file && progress < 100 && (
                <section className="response--progress--cont">
                    <ProgressBar progress={progress} />
                </section>
            )}

            <section>
                {file && (
                    <div className="image-preview">
                        <span className="image-preview--title--2">
                            <h4 className="upload--title">File Selected:</h4>
                        </span>

                        <div className="uploaded--image-scrollable">
                            <div className="uploaded--image" key={file.name}>
                                <img src={`http://localhost:5000/uploaded_files/${currentUserObject._id}/Banner/${file.name}`} alt={`Image ${file.name}`} />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}

export default SingleFileInput;
