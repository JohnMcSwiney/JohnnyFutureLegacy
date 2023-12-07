import React, {  useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './stylev2.css';
import { ImCross } from "react-icons/im";

const UpdatePfpPopup = ({ userId, onUploadSuccess, onUploadError, clickToExit }) => {
    const [file, setFile] = useState(null);
    
    const onDrop = (acceptedFiles) => {
        // Update the state with the selected file
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleUpload = async () => {
        try {
            if (!file) {
                return onUploadError("No file selected");
            }
            // console.log(file)
            // Create FormData object to send the file
            const formData = new FormData();
            formData.append('file', file);

            // Make a POST request using fetch
            const response = await fetch(`http://localhost:5000/api/user/${userId}/uploadProfilePicture`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const responseData = await response.json();

            // Callback for successful upload
            onUploadSuccess(responseData.profilePictureUrl);
        } catch (error) {
            // Callback for upload error
            onUploadError(error.message);
        }
    };
    const handleClose = () =>{
        console.log('closePopup')
        clickToExit('close')
        
    }
    return (
        <div className='popup--container'>
            <div className='popup scale-in-center'>
                <button className='popup--cancel--btn' onClick={handleClose}><ImCross /></button>
                <h2>Update Profile Picture</h2>
                <div {...getRootProps()} style={dropzoneStyles} className='dragDropDiv'>
                    <input {...getInputProps()} />
                    
                    {isDragActive && !file ? (
                        <p>Drop the file here...</p>
                    ) : (
                        <p>{file ? `${file.name}`:`Drag & drop a profile picture file here, or click to select one`}</p>
                    )}
                    
                </div>
                <button className='FL_btn__2' onClick={handleUpload}>Upload Profile Picture</button>
            </div>

        </div>
    );
};

const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    width: '500px',
    height: '200px',
    borderRadius: '15px'
};

export default UpdatePfpPopup;
