import React, { useState } from 'react';

import './style.css'

function AssetForm() {
  // unfinished
  // should be using the logged in user's data\
  // will be updated when that's implemented

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const hardcodedUser = '650ca3a3cf7964c5cb70782c';
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const buttonStyle = {
    transform: isMouseDown ? 'scale(0.98)' : 'scale(1)',
  };

  const [formData, setFormData] = useState({
    assetName: '',
    creatorName: hardcodedUser,
    uploadDate: '',
    assetDescription: '',
    assetPriceUSD: 0,
    informationTags: [],
    assetImage: '',
    exifData: [],
  });
  const resetForm = () => {
    setFormData({
      assetName: '',
      creatorName: hardcodedUser,
      uploadDate: '',
      assetDescription: '',
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
      <form onSubmit={handleSubmit} className='asset--page--content--cont'>

        <div className='asset--upload--left'>
        <label htmlFor="assetImage" className='left--label'>Asset Image:</label>
          <div className='image--preview--cont'>
            <img
              src={formData.assetImage}
              alt="Asset Preview"
              className="image-preview"
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
          
          <input
            type="file"
            id="assetImage"
            name="assetImage"
            accept="image/*"
            onChange={handleImageChange}
            disabled={true}
          />
        </div>


        <div className='asset--upload--right'>
          <div className='FL_Input__text__1'>
            <label>Name:</label>
            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              placeholder='Asset Name'
              required
            />
            <h4>(Required, 100 characters max)</h4>
          </div>

          {/* <div>
            <label>Creator Name (Uploader's ID):</label>
            <input
              type="text"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleChange}
            />
          </div> */}
          <div className='FL_Input__text__1'>
            <label>Description:</label>
            <textarea
              name="assetDescription"
              value={formData.assetDescription}
              onChange={handleChange}
              placeholder='Description Here'
            />
            <h4>(Not required, 500 characters max)</h4>
          </div>

          <div className='FL_Input__text__1'>
            <label>Tags:</label>
            <input
              type="text"
              name="informationTags"
              value={formData.informationTags}
              onChange={handleChange}
              placeholder='Tag, Tag2, Tag3...'
            />
            <h4>(comma-separated)</h4>
          </div>

          <div className='upload--right--price-n-date--cont'>
            <div className='FL_Input__number__1'>
              <label>Price:</label>
              <div className='inner--cont'>
                <div>
                  <h3>$</h3>
                  <h4>USD</h4>
                </div>
                <input
                  type="number"
                  name="assetPriceUSD"
                  value={formData.assetPriceUSD}
                  onChange={handleChange}
                  min={0}
                  required
                />
              </div>

            </div>
            <div className='FL_Input__date__1'>
              <label>Upload Date:</label>
              <input
                type="date"
                name="uploadDate"
                value={formData.uploadDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>



          {/* <div>
            <label>Exif Data (comma-separated):</label>
            <input
              type="text"
              name="exifData"
              value={formData.exifData}
              onChange={handleChange}
            />
          </div> */}

          <div className="human--made--verification--cont">
            <h5>Human Made Image Verification:</h5>
            <p>Learn more: <a>Statement Regarding AI</a></p>
            <label htmlFor="confirmation" className='checkbox--cont'>
              <input
                type="checkbox"
                id="confirmation"
                name="confirmation"
                onChange={(e) => setIsConfirmed(e.target.checked)}
              />
              <p className='human--made--description'>
                Future Legacy prides itself on hosting the highest quality authentically human made assets, by checking this box you understand that your image will be verified as human.</p>
            </label>
            <div>
              <button type="submit"
                disabled={!isConfirmed}
                className='FL_btn__1 button--width--713'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={buttonStyle}
              >Create Asset</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AssetForm;
