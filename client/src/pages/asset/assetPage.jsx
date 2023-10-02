
import React from 'react';
import { useState, useEffect } from "react";
// import artifactsData from '../collections/tempAssets/tempArtifacts.json';
// import institutionsData from '../collections/tempAssets/tempInstit.json';
// import tagList from '../collections/tempAssets/tempPhotoTags.json';
import {
  StyledContainer,
  StyledTitleContainer2,
  StyledTitle,
  StyledContentContainer,
} from '../../components/Styles';
import { useMyContext } from "../../context/FLContext";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './style.css'
function AssetPage() {
  const { id, parentId } = useParams();
  const [assetData, setAssetData] = useState(null);
  const { currentCollection, collectionUserName, collectionUserId, collectionIsInstit, collectionUserPfp } = useMyContext();

  useEffect(() => {
    // http://localhost:3000/profile
    const fetchAsset = async () => {
      const assetResponse = await fetch(`http://localhost:5000/api/asset/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      })
      const assetJson = await assetResponse.json()
      if (assetResponse.ok) {
        setAssetData(assetJson)
        // console.log(assetData);
      } else {
        // setDone(false);
      }
    }

    fetchAsset()

  }, []);
  const navigate = useNavigate()

  if (!assetData) {
    return <div>Cannot get asset data of asset: {id}</div>;
  }

  const handleRedirectCollection = () => {
    navigate(`/collection/${parentId}`);
  }

  const handleRedirectAssetOwner = () => {
    navigate(`/user/${collectionUserId}`);
  }
//collectionUserId
  return (
    <div className='asset--page--cont'>
      
      <StyledTitleContainer2>
        <div className='instit--collhomepage--title--img'>
          {collectionUserName && (
            <div
            onClick={handleRedirectAssetOwner} 
              className={
                collectionIsInstit
                  ? 'coll--avatar--cont instit--shape'
                  : 'coll--avatar--cont indiv--shape'
              }
            >
              {collectionUserPfp ? <img className='coll--avatar' src={collectionUserPfp} /> : "Img Broken"}
              
            </div>
          )}
          {/* Additional content here */}
        </div>

        {currentCollection ? (
          <StyledTitle size={35} onClick={handleRedirectCollection}>
            <div>{currentCollection.collectionName}</div>
          </StyledTitle>
        ) : (
          'Loading...'
        )}
        {currentCollection && <h4>{currentCollection.collectionDescription}</h4>}
      </StyledTitleContainer2>

      <div className='asset--content--cont'>
        <div className='asset--img-n-tags'>
          <div className='asset--img--cont'>
            <img src={assetData.assetImage} alt={assetData.assetName} className='asset--img' />
          </div>
          <div className='asset--tags--cont'>
            {assetData.informationTags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className='asset--details--cont'>
          <a
            className="asset--author"
            onClick={handleRedirectAssetOwner} 
          > {collectionUserName ? collectionUserName : "Author of Asset"}</a>

          <h3 className="asset--name">{assetData.assetName}</h3>
          <p className="asset--description">{assetData.assetDescription}</p>
          <div className='asset--price--cont'>
            <p>Price</p>
            <h4>${assetData.assetPriceUSD} USD</h4>
          </div>

          <div className="asset--license--cont">
            <p>License Type</p>
            <ul className="license--btns--cont">
              <li>
                <input type='radio' id='edu-use' name='license-type' value='edu-use' defaultChecked></input>
                <label htmlFor='edu-use'>For Eduactional Use </label>
              </li>

              <li>
                <input type='radio' id='edit-use' name='license-type' value='edit-use' disabled></input>
                <label htmlFor='edit-use'>For Editorial Use </label>
              </li>

              <li>
                <input type='radio' id='comm-use' name='license-type' value='comm-use' disabled ></input>
                <label htmlFor='comm-use'>For Commercial Use</label>
              </li>

            </ul>



          </div>


        </div>
      </div>




    </div>
  );
}

export default AssetPage;