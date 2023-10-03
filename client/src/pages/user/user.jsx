import React, { useEffect, useState } from 'react';
import {useMyContext} from "../../context/FLContext";
import {
  StyledContainer
} from '../../components/Styles';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaTwitter, FaTelegramPlane } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

import CollectionCardProfile from '../../components/cards/collection/CollectionCardProfile';
// import AssetCardUser from '../../components/cards/asset/AssetCardUser';
import './style.css';

import { useParams } from 'react-router-dom'


function User() {

  const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Lorem ipsum dolor sit amet consectetur adipiscing. Consectetur libero id faucibus nisl tincidunt eget nullam. Cursus sit amet dictum sit amet justo donec enim. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Nunc non blandit massa enim. Non enim praesent elementum facilisis leo vel fringilla. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Nulla posuere sollicitudin aliquam ultrices sagittis. Elit sed vulputate mi sit amet mauris commodo. Eu tincidunt tortor aliquam nulla. Justo laoreet sit amet cursus sit amet. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Ipsum dolor sit amet consectetur adipiscing elit.';

  const {clearCachedCollectionData} = useMyContext();
  const { id } = useParams() //user id
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    console.log('clearing saved collections');
    clearCachedCollectionData();
  },[])
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
    <div className='user--cont'>
      <div className='top--user--cont'>
        <div className='top--user--info--cont'>
          {/* top container with User pic, edit, name, email & connect wallet btn */}
          <div className='user--avatar--name'>
            <div className='user--avatar--cont'>
              {/* <img></img> */}
              
            <div className='top--user--text--cont'>
              {/* <h3>{userData ? userData.firstName + " " + userData.lastName : 'Loading...'}</h3>
              <h4>{userData ? userData.username: 'Loading...'}</h4> */}
            </div>
          </div>
          {/* container with social buttons */}
          <div className='user--socials--cont'>
            <button className='user--socials--btn'><TiSocialFacebook /> </button>
            <button className='user--socials--btn'><FaTwitter /> </button>
            <button className='user--socials--btn'><FaTelegramPlane /> </button>
            <button className='user--socials--btn'><AiFillInstagram /> </button>
          </div>
          {/* bio container */}
          <div className='user--bio--cont'>
            <h3>Bio:</h3>
            <p>{bio}</p>
          </div>
        </div>

      </div>



      <div className='right--user--cont'>
        <div className='right--user--inner--box'>
          <h3>My Collections:</h3>
          <div className='right--user--content--cont--row'>
            
          {userObject && userObject.userCollections ? (
        userObject.userCollections.map((collection) => (
          <CollectionCardProfile
            key={collection.collectionId}
            collectionName={collection.collectionName}
            collectionId={collection.collectionId}
            collectionImg={collection.collectionImage}
          />
        ))
      ) : (
        <p>No collections available</p>
      )}
          </div>  
        </div>

        <div className='right--user--inner--box'>
          {/* <h3>Licensed Assets:</h3>
          <div className='right--User--content--cont--row--2'>
            <AssetCardUser/>
          </div> */}
        </div>
      </div>
    </div>

  </div>
  )
}

export default User