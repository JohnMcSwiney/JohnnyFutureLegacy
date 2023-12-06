import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './stylev2.css';

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
        <div className='pfp--popup-container'>
            <div className='pfp--popup'>
                <button onClick={handleClose}>X</button>
                <div {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the file here...</p>
                    ) : (
                        <p>Drag & drop a profile picture file here, or click to select one</p>
                    )}
                </div>
                <button onClick={handleUpload}>Upload Profile Picture</button>
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
};

export default UpdatePfpPopup;
