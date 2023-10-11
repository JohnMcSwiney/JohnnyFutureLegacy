import React, { useState } from 'react';

import './style.css'

function AssetForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send formData to your API endpoint for asset creation
    console.log(formData);
  };

  return (
    <div>
      <h2>Create Asset</h2>
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
        <div>
          <label>Exif Data (comma-separated):</label>
          <input
            type="text"
            name="exifData"
            value={formData.exifData}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Asset</button>
      </form>
    </div>
  );
}

export default AssetForm;
