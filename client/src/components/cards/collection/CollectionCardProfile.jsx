import React, { useState, useEffect } from 'react';
import './style.css';
import {useNavigate} from 'react-router-dom';
import API_BASE_URL from '../../../apiConfig';
function CollectionCardProfile({collectionName, collectionId, collectionImg }) {

const navigate = useNavigate();
  const handleRedirect = () => {

    navigate(`/collection/${collectionId}`)
  }
  const [collectionAssetImgObj, setCollectionAssetImgObj] = useState(null);
  useEffect(() => {
    // console.log(collectionImg);
    const fetchAssetById = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/asset/${collectionImg}`);
        if (response.ok) {
          const assetData = await response.json();
          setCollectionAssetImgObj(assetData);
          console.log(assetData)
        } else {
          console.error('Error fetching asset data');
        }
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }
    };

    fetchAssetById();
  }, [collectionImg]);

  return (
    <div className='profile--collection--card--cont' onClick={handleRedirect}>
        <div className='profile--collection--card--title--cont'>
            {collectionName ? <h1>{collectionName}</h1> : <h1>loading...</h1>}
        </div>
        <div className='profile--collection--card--img--cont'>
              {collectionAssetImgObj ? <img src={collectionAssetImgObj.assetImage}/> : 'image broken' }
        </div>
        
    </div>
  )
}

export default CollectionCardProfile