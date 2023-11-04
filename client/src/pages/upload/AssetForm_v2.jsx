import React, { useState, useEffect } from 'react';
import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';

function AssetForm_v2({ asset, onSubmit }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isConfirmed, setIsConfirmed] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { addToast } = useToastContext();
  const { 
    uploadStarted,
    setUploadStarted,
    startUploadProcess,
    FL_currentAsset, setFL_currentAsset,
    isEditingSelectedAsset, setIsEditingSelectedAsset
} = useUploadContext();
  useEffect(() => {
    console.log('isSubmitted? ', isSubmitted)
    if(isSubmitted === true){
      setIsEditingSelectedAsset(false)
    }
  }, [isSubmitted]);

  const hardcodedUser = '650ca3a3cf7964c5cb70782c';
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
    assetName: asset.assetName || '',
    creatorName: hardcodedUser,
    uploadDate: '',
    assetDescription: asset.assetDescription || '',
    assetPriceUSD: asset.assetPriceUSD || 0,
    informationTags: asset.informationTags || [],
    assetImage: asset.assetImage || '',
    exifData: asset.exifData || [],
  });

  const resetForm = () => {
    setFormData({
      assetName: '',
      creatorName: hardcodedUser,
      uploadDate: '',
      assetDescription: '',
      assetPriceUSD: 0,
      informationTags: [],
      assetImage: '',
      exifData: [],
    });
  };

  const handleChange = (e) => {
    console.log('change in asset: ', FL_currentAsset);
    setIsEditingSelectedAsset(true);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // if (!isConfirmed) {
    //   setErrorMessage('Please confirm the submission');
    //   console.error('Please confirm the submission');
    //   return;
    // }

    if (formData.assetName.trim() === '' || formData.assetName.length > 100) {
      setErrorMessage('Invalid asset name. Please enter a valid name.');
      console.error('Invalid asset name. Please enter a valid name.');
      addToast('Invalid asset name. Please enter a valid name.');
      return;
    }

    if (formData.assetDescription.length > 500) {
      setErrorMessage('Invalid asset description. Please keep it within 500 characters.');
      console.error('Invalid asset description. Please keep it within 500 characters.');
      addToast('Invalid asset description. Please keep it within 500 characters.');
      return;
    }

    for (const tag of formData.informationTags) {
      if (tag.trim() === ', ' || tag.length > 50) {
        setErrorMessage('Invalid information tag. Please enter valid tags.');
        console.error('Invalid information tag. Please enter valid tags.');
        addToast('Invalid information tag. Please enter valid tags.');
        return;
      }
    }

    if (formData.assetImage.trim() === '') {
      setErrorMessage('Invalid image URL. Please enter a valid URL.');
      console.error('Invalid image URL. Please enter a valid URL.');
      addToast('Invalid image URL. Please enter a valid URL.');
      return;
    }

    if (isNaN(formData.assetPriceUSD) || formData.assetPriceUSD <= 0) {
      setErrorMessage('Invalid price. Please enter a valid number greater than 0.');
      console.error('Invalid price. Please enter a valid number greater than 0.');
      addToast('Invalid price. Please enter a valid number greater than 0.');
      return;
    }

    // Create the completed asset object
    const completedAsset = {
      assetName: formData.assetName,
      creatorName: formData.creatorName,
      uploadDate: formData.uploadDate,
      assetDescription: formData.assetDescription,
      assetPriceUSD: parseFloat(formData.assetPriceUSD),
      informationTags: formData.informationTags,
      assetImage: formData.assetImage,
      exifData: formData.exifData,
    };

    // Call the onSubmit callback with the completed asset object
    onSubmit(completedAsset);

    // Reset the form after successful submission
    setIsSubmitted(true);
    // addToast("Search request failed");
    setSuccessMessage('Changes saved!');
    
    // resetForm();
  };

  return (   
      <form onSubmit={handleSubmit} className="asset--upload--page--content--cont">
      <div className='asset--upload--left'>
        {/* <label htmlFor="assetImage" className='left--label'>Asset Image:</label> */}
          <div className='collection--form--asset--imgcont pulsate-fwd'>
            <img
              src={formData.assetImage}
              alt="Asset Preview"
              // className="image-preview"
            />
          </div>
          
          {/* <div>
            <label>Asset Image URL:</label>
            <input
              type="text"
              name="assetImage"
              value={formData.assetImage}
              onChange={handleChange}
              required
            />
          </div> */}
          
          {/* <input
            type="file"
            id="assetImage"
            name="assetImage"
            accept="image/*"
            onChange={handleImageChange}
            disabled={true}
          /> */}
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
              <label>Asset Price:</label>
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
            <div className='submit--asset--btn--cont'>
            <label htmlFor={'submit ' + formData.assetName} className='upload--label '>
            {/* <div className="form-feedback"> */}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          {/* </div> */}

            </label>
              <button type="submit"
                // disabled={!isConfirmed}
                name={'submit ' + formData.assetName}
                className='FL_btn__1 button--width--413'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={buttonStyle}
              >Save Changes</button>
            </div>

            {/* <div className='FL_Input__date__1'>
              <label>Upload Date:</label>
              <input
                type="date"
                name="uploadDate"
                value={formData.uploadDate}
                onChange={handleChange}
                required
              />
            </div> */}
          </div>

          {/* <div className="human--made--verification--cont">
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
                // disabled={!isConfirmed}
                className='FL_btn__1 button--width--713'
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={buttonStyle}
              >Create Asset</button>
            </div>
          </div> */}
        </div>
      </form>
  );
}

export default AssetForm_v2;
