import React, { useEffect, useState } from 'react';
import { useMyContext } from "../../context/FLContext";
import {
  StyledContainer,
  StyledContentContainer
} from '../../components/Styles';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaTwitter, FaTelegramPlane } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

import CollectionCardProfile from '../../components/cards/collection/CollectionCardProfile';
import AssetCardProfile from '../../components/cards/asset/AssetCardProfile';
import './stylev2.css';

import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';
import ContentTitle from '../../components/containers/ContentTitle';
import ArtifactCard from '../../components/cards/home/ArtifactCard'
import PurchasedCard from '../../components/cards/home/PurchasedCard';
import CollectionCard_v2 from '../../components/cards/home/CollectionCard_v2';
function Profile() {

  // const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Lorem ipsum dolor sit amet consectetur adipiscing. Consectetur libero id faucibus nisl tincidunt eget nullam. Cursus sit amet dictum sit amet justo donec enim. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Nunc non blandit massa enim. Non enim praesent elementum facilisis leo vel fringilla. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Nulla posuere sollicitudin aliquam ultrices sagittis. Elit sed vulputate mi sit amet mauris commodo. Eu tincidunt tortor aliquam nulla. Justo laoreet sit amet cursus sit amet. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Ipsum dolor sit amet consectetur adipiscing elit.';

  const { userData } = useMyContext();
  const [userPurchases, setUserPurchases] = useState(null);
  const [toggleView, setToggleView] = useState(false);
  useEffect(() => {
    const fetchUserPurchases = async () => {
      try {
        const userResponse = await fetch(`http://localhost:5000/api/user/${userData._id}/purchase`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
          },
        });
        if (userResponse.ok) {
          const userPurchases = await userResponse.json();
          // const temp = `${userJson.firstName} ${userJson.lastName}`;
          console.log(userPurchases)
          setUserPurchases(userPurchases)
        } else {
          // Handle error
          console.log('bruh');
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchUserPurchases();
  }, [userData]);

  return (
    <AppContentWrapper>
      <PageContainer>
        <div className='profile--v2--cont'>
          <div className='left--profile--v2--cont'>
            <div className='left--profile--v2--info--cont'>
              {/* top container with profile pic, edit, name, email & connect wallet btn */}
              {userData && 
              <div className='profile--v2--avatar--name'>

                <div className='profile--v2--avatar--img-n-edit'>
                <div className='profile--v2--avatar--cont'>
                {/* <img></img> */}
                {userData.profilePicture && <img src={userData.profilePicture}/>}
                
              </div>
              <button className='profile--v2--edit--btn'>Edit</button>
                </div>
              
              <div className='left--profile--v2--text--cont'>
                <h3>{userData ? userData.firstName + " " + userData.lastName : 'Loading...'}</h3>
                <h4>{userData ? userData.username : 'Loading...'}</h4>
                
              </div>
              <button className='profile--v2--wallet--btn'>Connect A Wallet</button>
            </div>
              }
              
              {/* container with social buttons */}
              <div className='profile--v2--socials--cont'>
                <button className='profile--v2--socials--btn'><TiSocialFacebook /> </button>
                <button className='profile--v2--socials--btn'><FaTwitter /> </button>
                <button className='profile--v2--socials--btn'><FaTelegramPlane /> </button>
                <button className='profile--v2--socials--btn'><AiFillInstagram /> </button>
              </div>
              {/* bio container */}
              {/* <div className='profile--v2--bio--cont'>
                <h3>Bio:</h3>
                <p>{bio}</p>
              </div> */}
            </div>

          </div>



          <div className='right--profile--v2--cont'>
            <StyledContentContainer>
            <div className='right--profile--v2--inner--box'>
              
              {userData &&
                <>
                  {userData.userCollections ? 
                  <>
                  <ContentTitle>
                  <h3>Created Collections:</h3>
                  </ContentTitle>

                  <div className='profile--v2--horiz--scroll'>
                    {userData.userCollections.map((collection, index) => {
                      return (
                        <CollectionCard_v2
                          key={collection._id}
                          collectionIn={collection}
                          toggleView={toggleView}
                          style={{}}
                        />
                      );
                    })
                    }
                  </div>
                  
                  </>
                  
                    :
                    <div>
                      No Created Collections!
                    </div>}

                </>}
            </div>

            <div className='right--profile--v2--inner--box'>
              
              <div className='right--profile--v2--content--cont--row--2'>
                {userPurchases ?
                <>
                <ContentTitle>
                <h3>Licensed Assets:</h3>
                </ContentTitle>
                  <div className='profile--v2--horiz--scroll--purchase'>
                    {userPurchases.map((collectionAssets) => (
                      <PurchasedCard
                        key={collectionAssets._id}
                        artifactId={collectionAssets._id}
                        // collectionId={collectionObject._id}
                        imgUrl={collectionAssets.assetImage}
                        artifactTitle={collectionAssets.assetName}
                        assetDescrip={collectionAssets.assetDescription}
                        cardSize={1}
                      />
                    ))}
                  </div>
                </>
                 :
                  <div>
                    no purchases
                  </div>
                }

              </div>
            </div>
            </StyledContentContainer>


            
          </div>
        </div>
      </PageContainer>
    </AppContentWrapper>



  )
}

export default Profile