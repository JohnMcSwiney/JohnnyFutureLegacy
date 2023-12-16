import React, { useState, useEffect } from 'react';
import './style.css';
import { redirect } from 'react-router';
import {useNavigate} from 'react-router-dom';
import API_BASE_URL from '../../../apiConfig';

function AssetCardProfile() {
  const navigate = useNavigate()
  
  const [assetData, setAssetData] = useState(null);

  useEffect(()=> {
    // http://localhost:3000/profile
    const fetchAsset = async () => {
      const assetResponse = await fetch(`${API_BASE_URL}/api/asset`, {
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
  const redirectAsset =() =>{
    {assetData ?
    navigate(`/asset/${assetData._id}`) :
    console.log('no asset data') }
  }
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
      <button className='asset--profile--button' onClick={redirectAsset}>
        <p>Previously Downloaded</p>
      </button>
    </div>
  );
}

export default AssetCardProfile;
