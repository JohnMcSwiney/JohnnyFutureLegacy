
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
import { useToastContext } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './style.css'
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';
import ContentTitle from '../../components/containers/ContentTitle';
import AssetPageContentContainer from '../../components/containers/AssetContentContainer';
import LicensePopup from './LicensePopup';

function AssetPage() {
  const { id, parentId } = useParams();
  const [assetData, setAssetData] = useState(null);
  const { currentCollection,
    collectionUserName,
    collectionUserId,
    collectionIsInstit,
    collectionUserPfp,
    userData } = useMyContext();
  const [longDesc, setLongDesc] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [licenseLevel, setLicenseLevel] = useState('edu-use');
  const { addToast } = useToastContext();

  //fetch asset
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
    if (currentCollection.collectionDescription) {
      if (currentCollection.collectionDescription.length > 100) {
        console.log('long description, requires proper handling still')
        setLongDesc(true);
      }
    }
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
  const handlePurchaseClick = () => {
    console.log('purchase clicked');
    //check user credentials here, will be updated later!
    if (userData) {
      addToast('Purchase Started')
      setPopupVisible(true);
    } else {
      addToast('you need to be logged in to license assets!')
      setPopupVisible(true);
    }






  }
  const handlePurchase = () => {
    if (assetData && userData) {
      console.log('confirm, purchase added!');
      setPopupVisible(false);
      addToast(`Purchasing Asset: ${assetData.assetName}`);

      const purchaseAsset = async () => {
        try {
          let assetId = assetData._id
          let userId = userData._id
          console.log(JSON.stringify(assetId))
          const purchaseResponse = await fetch(`http://localhost:5000/api/user/${userId}/purchase`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true',
            },
            body: JSON.stringify({ assetId }),
          });

          if (purchaseResponse.ok) {
            const purchaseJson = await purchaseResponse.json();
            console.log(purchaseJson);
          } else {
            console.error('Error Purchasing:', purchaseResponse.statusText);
            // Handle the error appropriately
          }
        } catch (error) {
          console.error('Error Purchasing:', error);
          // addToast(error)
        }

      }

      purchaseAsset()

    }

  }
  const handleCancel = (reason) => {
    console.log('cancelled');
    setPopupVisible(false);
    addToast('Purchase Cancelled');
  }
  return (
    <AppContentWrapper>
      <PageContainer>
        {isPopupVisible && (
          <LicensePopup
            licenseType={licenseLevel}
            onConfirm={handlePurchase}
            onCancel={handleCancel}
          />
        )}
        <AssetPageContentContainer>

          <section className='asset--title--cont'>
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

              <h2>{currentCollection.collectionName}</h2>

            ) : (
              'Loading...'
            )}
            {currentCollection && longDesc === false && <h4>{currentCollection.collectionDescription}</h4>}
          </section>


          <div className='asset--img-n-tags'>
            <div className='asset--page--img'>
              <img src={assetData.assetImage} alt={assetData.assetName} />
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
              <div className='asset--purchase--btn--cont'>
                <p>Note: If you select 'For Personal Use’ please note that this photo can only be used for personal purposes and cannot be used commercially.</p>
                <button className='purchase--btn'
                  onClick={handlePurchaseClick}
                >License Asset</button>
              </div>



            </div>


          </div>
        </AssetPageContentContainer>
      </PageContainer>
    </AppContentWrapper>

  );
}

export default AssetPage;