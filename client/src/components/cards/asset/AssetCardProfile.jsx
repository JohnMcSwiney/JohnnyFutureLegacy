import React, { useState, useEffect } from 'react';
import './style.css';

function AssetCardProfile() {
  const [assetData, setAssetData] = useState(null);
  useEffect(() => {
    const backendUrl = 'http://localhost:5000';

    fetch(`${backendUrl}/api/assets`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch asset');
        }
        return response.json();
      })
      .then(data => {
        setAssetData(data);
      })
      .catch(error => {
        console.error('Error fetching asset:', error);
      });
  }, []); 

  return (
    <div className='asset--profile--card--cont'>
      <div className='asset--profile--img--preview--cont'>
        {assetData && (
          <img src={assetData.assetImage} alt={assetData.assetName} />
        )}
      </div>
      <h5 className='asset--profile--title'>
        {assetData ? assetData.assetName : 'Loading...'}
      </h5>
      <p className='asset--profile--description'>
        {assetData ? assetData.assetDescription : 'Loading...'}
      </p>
      <button className='asset--profile--button'>
        <p>Previously Downloaded</p>
      </button>
    </div>
  );
}

export default AssetCardProfile;
