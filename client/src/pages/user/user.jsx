import React, { useEffect, useState } from 'react';
import { useMyContext } from "../../context/FLContext";
import {
  StyledContainer,
  StyledTitleContainer2,
  StyledTitle,
  StyledContentContainer
} from '../../components/Styles';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaTwitter, FaTelegramPlane } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

import CollectionCardProfile from '../../components/cards/collection/CollectionCardProfile';
// import AssetCardUser from '../../components/cards/asset/AssetCardUser';
import './style.css';
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';
import ContentTitle from '../../components/containers/ContentTitle';
import { useParams } from 'react-router-dom';
import CollectionCard_v2 from '../../components/cards/home/CollectionCard_v2';

import UserProfilePicture from '../../components/profilePicture/UserProfilePicture';


function User() {

  const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Lorem ipsum dolor sit amet consectetur adipiscing. Consectetur libero id faucibus nisl tincidunt eget nullam. Cursus sit amet dictum sit amet justo donec enim. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Nunc non blandit massa enim. Non enim praesent elementum facilisis leo vel fringilla. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Nulla posuere sollicitudin aliquam ultrices sagittis. Elit sed vulputate mi sit amet mauris commodo. Eu tincidunt tortor aliquam nulla. Justo laoreet sit amet cursus sit amet. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Ipsum dolor sit amet consectetur adipiscing elit.';

  const { clearCachedCollectionData } = useMyContext();
  const { id } = useParams() //user id
  const [userObject, setUserObject] = useState(null);
  const [toggleView, setToggleView] = useState(false);
  useEffect(() => {
    console.log('clearing saved collections');
    clearCachedCollectionData();
  }, [])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`http://localhost:5000/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
          },
        });
        if (userResponse.ok) {
          const userJson = await userResponse.json();
          setUserObject(userJson);
          console.log(userJson)
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchUser();
  }, [id]);

  return (
    <AppContentWrapper>
      <PageContainer>
        {userObject &&
          <div className="profile--banner">
            <div className='banner--gradient'></div>
            {userObject.userBannerImage ?
              <div className="banner--img">
                <img src={`http://localhost:5000/uploaded_files/${userObject._id}/Banner/${userObject.userBannerImage}`} alt={`Image ${userObject.userBannerImage}`} />
              </div>
              :
              <div>

              </div>
            }
          </div>
        }
        <div className='top--user--info--cont'>
          {userObject &&
            <UserProfilePicture currentUserObject={userObject} size={1} />
          }
          <div className='top--user--text--cont'>
            {userObject ?
              <>
                <PageTitle>
                  <h2>{userObject.firstName} {userObject.lastName}</h2>
                </PageTitle>
                {userObject.bio !== null ?
                  <h4>{userObject.bio}</h4>
                  :
                  ""}
              </>


              :
              "Loading..."}

            <div className='profile--v2--socials--cont'>
              <button className='profile--v2--socials--btn'><TiSocialFacebook /> </button>
              <button className='profile--v2--socials--btn'><FaTwitter /> </button>
              <button className='profile--v2--socials--btn'><FaTelegramPlane /> </button>
              <button className='profile--v2--socials--btn'><AiFillInstagram /> </button>
            </div>
          </div>
        </div>


        <StyledContentContainer>
          <ContentTitle>
            <h3>Collections:</h3>
          </ContentTitle>
          <div className='profile--v2--vert--scroll'>

            {userObject && userObject.userCollections ? (
              userObject.userCollections.map((collection) => (
                <CollectionCard_v2
                  key={collection._id}
                  collectionIn={collection}
                  toggleView={toggleView}
                  style={{}}
                />

              ))
            ) : (
              <p>No collections available</p>
            )}
          </div>
        </StyledContentContainer>

        <div className='right--user--inner--box'>
          {/* <h3>Licensed Assets:</h3>
          <div className='right--User--content--cont--row--2'>
            <AssetCardUser/>
          </div> */}
        </div>

      </PageContainer>
    </AppContentWrapper>
  )
}

export default User