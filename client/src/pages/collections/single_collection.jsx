import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import institutionsData from './tempAssets/tempInstit.json'
// import artifactsData from './tempAssets/tempArtifacts.json'
import ImageContainer from '../../components/containers/ImageContainer'
import ArtifactCard from '../../components/cards/home/ArtifactCard'
import InstHomeColl_ImageContainer from './notused/institute/InstColl_ImageContainer'
import './style.css'

import {
  StyledContainer,
  StyledTitleContainer,
  StyledTitleContainer2,
  StyledTitle,
  StyledTitle2,
  StyledSubTitle,
  StyledSubTitle2,
  StyledContentContainer,
  Avatar,
  StyledButton,
  ButtonGroup
} from '../../components/Styles'
import AssetCardProfile from '../../components/cards/asset/AssetCardProfile'
import {useMyContext} from "../../context/FLContext";

function Single_collection() {
  const { param1 } = useParams() //collection id
  const {currentCollection, setFetchedCollection} = useMyContext();
  const [collectionObject, setCollectionObject] = useState(null);
  const [collectionUser, setCollectionUser] = useState(null);
  const [isObtained, setIsObtained] = useState(false);
  // currentCollection
  useEffect(() => {
    if (param1) {
      const fetchCollections = async () => {
        const collectionResponse = await fetch(`http://localhost:5000/api/collection/${param1}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
          }
        })
        const collectionJson = await collectionResponse.json()
        if (collectionResponse.ok) {
          setCollectionObject(collectionJson);    
          setFetchedCollection(collectionJson);
          // console.log(collectionJson);
        } else { }
      }
      fetchCollections();
    }
  }, []);
  useEffect(() => {
    if (collectionObject !== null) {

      const fetchCollectionUser = async () => {
        // console.log("user");
        const collectionUserResponse = await fetch(`http://localhost:5000/api/user/${collectionObject.ownerName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
          }
        })
        const collectionUserJson = await collectionUserResponse.json()
        if (collectionUserResponse.ok) {
          setCollectionUser(collectionUserJson);

          console.log(collectionUserJson)
        } else {
          console.log('error')
        }
      }
      fetchCollectionUser();
    }
  }, [collectionObject])


  return (
    <StyledContainer>
      <StyledTitleContainer2>
        <div className='instit--collhomepage--title--img'>
          {collectionUser ?
            <div className={collectionUser.isInstit ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}
            >
              <img className='coll--avatar' src={collectionUser.profilePicture} />
            </div>
            :
            <div className='coll--avatar--cont instit--shape'>
              no user
            </div>
          }
          <div>

          </div>
        </div>

        {collectionObject ?
          <StyledTitle size={35}>
            <div>{collectionObject.collectionName}</div>
          </StyledTitle>

          :
          "Loading..."}
        {collectionObject ?
          <h4>{collectionObject.collectionDescription}</h4>
          :
          "Loading..."}
                  
      </StyledTitleContainer2>

      <StyledContentContainer>
        {collectionObject ? 
          <div className='content-cont grid'>
            {collectionObject.collectionAssets.map((collectionAssets) => (
              <ArtifactCard 
              key={collectionAssets._id}
              artifactId={collectionAssets._id} 
              collectionId={collectionObject._id}
              imgUrl={collectionAssets.assetImage}
              artifactTitle={collectionAssets.assetName}
              assetDescrip={collectionAssets.assetDescription}
              />
            ))}
          </div> : 
          <div>
            loading...
          </div>
          }
      </StyledContentContainer>
    </StyledContainer>
  )
}

export default Single_collection
