import React, { useState, useEffect } from 'react';
import './style.css';

function AssetCardProfile() {
  const [assetData, setAssetData] = useState(null);

  useEffect(()=> {
    // http://localhost:3000/profile
    const fetchAsset = async () => {
      const assetResponse = await fetch(`http://localhost:5000/api/asset`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'true' }
      })
      const assetJson = await assetResponse.json()
      if (assetResponse.ok) {
        setAssetData(assetJson[0])
        // console.log(assetData);
      } else {
        // setDone(false);
      }
    }

    fetchAsset()
   
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
