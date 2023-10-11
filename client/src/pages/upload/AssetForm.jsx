import React, { useState } from 'react';

import './style.css'

function AssetForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    assetName: '',
    creatorName: '',
    uploadDate: '',
    assetDescription: 'Description here',
    assetPriceUSD: 0,
    informationTags: [],
    assetImage: '',
    exifData: [],
  });
  const resetForm = () => {
    setFormData({
      assetName: '',
      creatorName: '',
      uploadDate: '',
      assetDescription: 'Description here',
      assetPriceUSD: 0,
      informationTags: [],
      assetImage: '', // Clear the assetImage if you have it
      exifData: [],
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  /*
  * Talk to Dylano about file handling
  */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // e.target.result contains the base64-encoded image
        const base64Image = e.target.result;
        setFormData({ ...formData, assetImage: base64Image });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset any previous messages
    setSuccessMessage('');
    setErrorMessage('');

    if (!isConfirmed) {
      // Display a message or take action to notify the user to confirm the submission
      setErrorMessage('Please confirm the submission');
      console.error('Please confirm the submission');
      return;
    }
    if (formData.assetName.trim() === '' || formData.assetName.length > 100) {
      setErrorMessage('Invalid asset name. Please enter a valid name.');
      console.error('Invalid asset name. Please enter a valid name.');
      return;
    }
    if (formData.assetDescription.length > 500) {
      setErrorMessage('Invalid asset description. Please keep it within 500 characters.');
      console.error('Invalid asset description. Please keep it within 500 characters.');
      return;
    }
    for (const tag of formData.informationTags) {
      if (tag.trim() === ', ' || tag.length > 50) {
        setErrorMessage('Invalid information tag. Please enter valid tags.');
        console.error('Invalid information tag. Please enter valid tags.');
        return;
      }
    }
    if (formData.assetImage.trim() === '') {
      setErrorMessage('Invalid image URL. Please enter a valid URL.');
      console.error('Invalid image URL. Please enter a valid URL.');
      return;
    }
    // for (const exif of formData.exifData) {
    //   if (exif.trim() === '' || exif.length > 100) {
    //     console.error('Invalid EXIF data. Please enter valid data.');
    //     return;
    //   }
    // }
    if (isNaN(formData.assetPriceUSD) || formData.assetPriceUSD <= 0) {
      setErrorMessage('Invalid price. Please enter a valid number greater than 0.');
      console.error('Invalid price. Please enter a valid number greater than 0.');
      return;
    }

    console.log(formData);
    const apiUrl = 'http://localhost:5000/api/asset/';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful asset creation, you can handle the response here
        const data = await response.json();
        setIsSubmitted(true);
        setSuccessMessage('Asset created successfully.');
        console.log('Asset created:', data);
        // Clear the form data
        resetForm();
      } else {
        // Handle errors when the request is not successful
        setErrorMessage('Asset creation failed. Please check your data.');
        console.error('Asset creation failed');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
      console.error('Error:', error);
    }



  };

  return (
    <div>
      <h2>Create Asset</h2>
      <div className="form-feedback">
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Asset Name:</label>
          <input
            type="text"
            name="assetName"
            value={formData.assetName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Creator Name (Uploader's ID):</label>
          <input
            type="text"
            name="creatorName"
            value={formData.creatorName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Upload Date:</label>
          <input
            type="date"
            name="uploadDate"
            value={formData.uploadDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Asset Description:</label>
          <textarea
            name="assetDescription"
            value={formData.assetDescription}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Asset Price (USD):</label>
          <input
            type="number"
            name="assetPriceUSD"
            value={formData.assetPriceUSD}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Information Tags (comma-separated):</label>
          <input
            type="text"
            name="informationTags"
            value={formData.informationTags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Asset Image URL:</label>
          <input
            type="text"
            name="assetImage"
            value={formData.assetImage}
            onChange={handleChange}
            required
          />
        </div>
        <label htmlFor="assetImage">Asset Image:</label>
        <input
          type="file"
          id="assetImage"
          name="assetImage"
          accept="image/*"
          onChange={handleImageChange}
          disabled={true}
        />
        <div>
          <img
            src={formData.assetImage}
            alt="Asset Preview"
            className="image-preview"
          />
        </div>
        <div>
          <label>Exif Data (comma-separated):</label>
          <input
            type="text"
            name="exifData"
            value={formData.exifData}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmation">
            <input
              type="checkbox"
              id="confirmation"
              name="confirmation"
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            Is everything correct? Double check then click me.
          </label>
        </div>


        <button type="submit" disabled={!isConfirmed}>Create Asset</button>
      </form>
    </div>
  );
}

export default AssetForm;
