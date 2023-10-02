import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function CollectionCard({ toggleView, collectionIn, collectionImg }) {
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userIsInstit, setUserIsInstit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`http://localhost:5000/api/user/${collectionIn.ownerName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
          },
        });
        if (userResponse.ok) {
          const userJson = await userResponse.json();
          const temp = `${userJson.firstName} ${userJson.lastName}`;
          setUserName(temp);
          setUserIsInstit(userJson.isInstit);
          if (userJson.profilePictureUrl !== null && !userImg) {
            setUserImg(userJson.profilePicture);
          }
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchUser();
  }, [collectionIn.ownerName, userImg]);

  const handleRedirect = () => {
    if (collectionIn) {
      
      navigate(`/collection/${collectionIn._id}`);
    }
  };

  return (
    <div
      className={toggleView ? 'coll--card--row' : 'coll--card--grid'}
      onClick={handleRedirect}
    >
      {toggleView ? (
        <div className="coll--card--row--cont">
          <div className="coll--card--title--cont">
            <div className={userIsInstit ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}>
              {userImg ? (
                <img className="coll--avatar" src={userImg} alt="User Avatar" />
              ) : (
                <div>Broken Image</div>
              )}
            </div>
            <h2>{userName}</h2>
          </div>
          <div className="coll--card--img--cont">
          <img src={collectionIn.collectionAssets[0].assetImage} className='coll--card--img--1'/>
            <div className="coll--card--img--title--cont">
              <h2>{collectionIn.collectionName}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="coll--card--grid--cont">
          <div className="coll--card--title--cont">
            <div className={userIsInstit ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}>
              {userImg ? (
                <img className="coll--avatar" src={userImg} alt="User Avatar" />
              ) : (
                <div>Broken Image</div>
              )}
            </div>
            <h2>{userName}</h2>
          </div>
          <div className="coll--card--img--cont">
            
            <img src={collectionIn.collectionAssets[0].assetImage} className='coll--card--img--1'/>
            <div className="coll--card--img--title--cont">
              <h2>{collectionIn.collectionName}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
