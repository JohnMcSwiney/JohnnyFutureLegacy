import { useMyContext } from "../../context/FLContext";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './style.css'
import React from 'react';
import { useState, useEffect } from "react";
import artifactsData from '../collections/tempAssets/tempArtifacts.json';
import institutionsData from '../collections/tempAssets/tempInstit.json';
// import tagList from '../collections/tempAssets/tempPhotoTags.json';

function AssetPage() {
  const { id, parentId } = useParams();
  const [assetData, setAssetData] = useState(null);
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

  const handleRedirect = () => {
    navigate(`/insti_collection/${parentId}`);
  }

  return (
    <div className='asset--page--cont'>
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
        // onClick={handleRedirect}
        > Author of asset</a>

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
              <label for='edu-use'>For Eduactional Use </label>
            </li>

            <li>
              <input type='radio' id='edit-use' name='license-type' value='edit-use' disabled></input>
              <label for='edit-use'>For Editorial Use </label>
            </li>

            <li>
              <input type='radio' id='comm-use' name='license-type' value='comm-use' disabled ></input>
              <label for='comm-use'>For Commercial Use</label>
            </li>

          </ul>



        </div>


      </div>


    </div>
  );
}

export default AssetPage;