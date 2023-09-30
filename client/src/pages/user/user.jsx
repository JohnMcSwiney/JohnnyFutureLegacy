import React from 'react';
import {useMyContext} from "../../context/FLContext";
import {
  StyledContainer
} from '../../components/Styles';
import { TiSocialFacebook } from 'react-icons/ti';
import { FaTwitter, FaTelegramPlane } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

import CollectionCardProfile from '../../components/cards/collection/CollectionCardProfile';
import AssetCardProfile from '../../components/cards/asset/AssetCardProfile';
import './style.css';




function User() {

  const bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Lorem ipsum dolor sit amet consectetur adipiscing. Consectetur libero id faucibus nisl tincidunt eget nullam. Cursus sit amet dictum sit amet justo donec enim. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Nunc non blandit massa enim. Non enim praesent elementum facilisis leo vel fringilla. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Nulla posuere sollicitudin aliquam ultrices sagittis. Elit sed vulputate mi sit amet mauris commodo. Eu tincidunt tortor aliquam nulla. Justo laoreet sit amet cursus sit amet. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Ipsum dolor sit amet consectetur adipiscing elit.';

  const { userData} = useMyContext();
  
  return (
    <div className='profile--cont'>
      <div className='left--profile--cont'>
        <div className='left--profile--info--cont'>
          {/* top container with profile pic, edit, name, email & connect wallet btn */}
          <div className='profile--avatar--name'>
            <div className='profile--avatar--cont'>
              {/* <img></img> */}
              <button className='profile--edit--btn'>Edit Profile user</button>
            </div>
            <div className='left--profile--text--cont'>
              <h3>{userData ? userData.firstName + " " + userData.lastName : 'Loading...'}</h3>
              <h4>{userData ? userData.username: 'Loading...'}</h4>
              <button className='profile--wallet--btn'>Connect A Wallet</button>
            </div>
          </div>
          {/* container with social buttons */}
          <div className='profile--socials--cont'>
            <button className='profile--socials--btn'><TiSocialFacebook /> </button>
            <button className='profile--socials--btn'><FaTwitter /> </button>
            <button className='profile--socials--btn'><FaTelegramPlane /> </button>
            <button className='profile--socials--btn'><AiFillInstagram /> </button>
          </div>
          {/* bio container */}
          <div className='profile--bio--cont'>
            <h3>Bio:</h3>
            <p>{bio}</p>
          </div>
        </div>

      </div>



      <div className='right--profile--cont'>
        <div className='right--profile--inner--box'>
          <h3>My Collections:</h3>
          <div className='right--profile--content--cont--row'>
            <CollectionCardProfile/>
            <CollectionCardProfile/>
            <CollectionCardProfile/>
            <CollectionCardProfile/>
            <CollectionCardProfile/>
            <CollectionCardProfile/>
            <CollectionCardProfile/>
            <CollectionCardProfile/>
          </div>  
        </div>

        <div className='right--profile--inner--box'>
          <h3>Licensed Assets:</h3>
          <div className='right--profile--content--cont--row--2'>
            <AssetCardProfile/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default User