import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
// import institutionsData from './tempAssets/tempInstit.json'
// import artifactsData from './tempAssets/tempArtifacts.json'
import ImageContainer from '../../unused/containers/ImageContainer'
import ArtifactCard from '../../components/cards/home/ArtifactCard'
import InstHomeColl_ImageContainer from './notused/institute/InstColl_ImageContainer'
import './style.css'
import FeaturedVideoCardLg from './FeaturedVideoCardLg';

import './collectionPageStyle.css'
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
import { useMyContext } from "../../context/FLContext";
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import CollectionPageContainer from '../../components/containers/CollectionPageContainer';
import Splitter from '../../components/splitter/Splitter';
import { useNavigate } from 'react-router-dom';
import FL_Footer from '../../components/FL_Footer/FL_footer';
import UserProfilePicture from '../../components/profilePicture/UserProfilePicture'

import API_BASE_URL from '../../apiConfig'


function Single_collection() {
  const { param1, featuredId } = useParams() //collection id
  const { currentCollection, setFetchedCollection } = useMyContext();
  const [collectionObject, setCollectionObject] = useState(null);
  const [collectionUser, setCollectionUser] = useState(null);
  const [featuredObject, setFeaturedObject] = useState(null);
  const [isObtained, setIsObtained] = useState(false);
  const [longDesc, setLongDesc] = useState(false);
  const [componentSize, setComponentSize] = useState(3);
  const [idInUrl, setIdInUrl] = useState(false);
  const navigate = useNavigate()
  const handleRedirectAssetOwner = () => {
    if(collectionUser){
      navigate(`/user/${collectionUser.id}`);
    }
    
  }
  useEffect(() => {
    // checks to see if been routed with a featuredId // if there page is told to not search collection for featured id
    if (featuredId) {
      setIdInUrl(true);
      const fetchFeatured = async () => {
        const featuredResponse = await fetch(`${API_BASE_URL}/api/featured/${featuredId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
          }
        })
        const featuredJson = await featuredResponse.json()
        if (featuredResponse.ok) {
          setFeaturedObject(featuredJson);
        } else { }
      }
      fetchFeatured();
    } else {
      setIdInUrl(false);
    }

    if (param1) {
      const fetchCollections = async () => {
        const collectionResponse = await fetch(`${API_BASE_URL}/api/collection/${param1}`, {
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
    // called when collection is filled // checks to see if a featured id is in url
    if (collectionObject !== null) {
      if (idInUrl === false) {
        console.log('no featured in url');
        // if there isn't an id the collection itself is checked
        if (collectionObject.featuredId !== null) {
          // featured gets added and page continues loading
          console.log('collection has featured');
          const fetchFeatured = async () => {
            const featuredResponse = await fetch(`${API_BASE_URL}/api/featured/${collectionObject.featuredId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true'
              }
            })
            const featuredJson = await featuredResponse.json()
            if (featuredResponse.ok) {
              setFeaturedObject(featuredJson);
            } else { }
          }
          fetchFeatured();

        }
        // if there isn't a featured id in object or the url the page loads as a regular collection
      }
      const fetchCollectionUser = async () => {
        // console.log("user");
        const collectionUserResponse = await fetch(`${API_BASE_URL}/api/user/${collectionObject.ownerName}`, {
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
      if (collectionObject.collectionDescription) {
        if (collectionObject.collectionDescription.length > 100) {
          console.log('longass')
        }
      }
    }
  }, [collectionObject])

  useEffect(() => {
    console.log(featuredObject);
  }, [featuredObject])
  const [isShown, setIsShown] = useState(false);

  const toggleVisibility = () => {
    setIsShown(!isShown);
  };
  const elementRef = useRef(null);

  useEffect(() => {
    // Retrieve the stored scroll position from localStorage
    const storedScrollPosition = localStorage.getItem('searchResultsScrollPosition');
    const initialScrollPosition = storedScrollPosition ? parseInt(storedScrollPosition, 10) : 0;

    // Set the initial scroll position
    if (elementRef.current) {
      elementRef.current.scrollTop = initialScrollPosition;
    }

    const handleScroll = () => {
      // Save the current scroll position to localStorage
      localStorage.setItem('searchResultsScrollPosition', elementRef.current.scrollTop);
    };

    // Attach the scroll event listener
    if (elementRef.current) {
      elementRef.current.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      // Check if elementRef.current is not null before trying to remove the event listener
      if (elementRef.current) {
        elementRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const scrollToContent = () => {
    // Find the target element by its ID or another selector
    const targetElement = document.getElementById('targetElementId');

    // Scroll to the target element
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppContentWrapper>
      <CollectionPageContainer ref={elementRef}>
        <main className='collection--page--container'  >
          {featuredObject ?
            <section className='featured--video--container'>
              {collectionObject && collectionUser &&
                <FeaturedVideoCardLg
                  featuredIn={featuredObject}
                  userObject={collectionUser}
                  collectionName={collectionObject.collectionName}
                  onButtonClick={scrollToContent}
                />
              }
            </section> :
            <div className='instit--collhomepage--title--cont'>
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
                <>
                  <button onClick={toggleVisibility}>
                    {isShown ? 'Hide Description' : 'Show Description'}
                  </button>
                  {isShown && (
                    <div className="description-content">
                      {collectionObject.collectionDescription}
                    </div>
                  )}
                </>

                :
                "Loading..."}

            </div>
          }
          <div className='collection--content--cont'>
            {collectionObject ?
              <div className='collection--assets--cont' id='targetElementId'>
                {collectionObject.collectionAssets.map((collectionAssets) => (
                  <ArtifactCard
                    key={collectionAssets._id}
                    artifactId={collectionAssets._id}
                    collectionId={collectionObject._id}
                    imgUrl={collectionAssets.assetImage}
                    artifactTitle={collectionAssets.assetName}
                    assetDescrip={collectionAssets.assetDescription}
                    cardSize={componentSize}
                  />
                ))}
              </div> :
              <div>
                loading...
              </div>
            }
          </div>
        </main>
        <FL_Footer/>
      </CollectionPageContainer>
    </AppContentWrapper>
  )
}

export default Single_collection



