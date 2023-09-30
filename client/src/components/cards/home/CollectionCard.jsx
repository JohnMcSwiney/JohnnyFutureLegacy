import React, { useState, useEffect }  from 'react'
import {useNavigate} from 'react-router-dom';
import './style.css';

export default function CollectionCard({ toggleView, collectionIn, collectionImg }) {
  const avatarShape = true;
  // if(collectionIn){
    // console.log(collectionIn);
  // }
  
  const navigate = useNavigate();
  const handleRedirect = () => {
    if (collectionIn) {
      navigate(`/collection/${collectionIn._id}`);
    }
  }
  const [userName, setUserName] = useState("");
  const [userIsInstit, setUserIsInstit] = useState(false);
  useEffect(() => {
    // http://localhost:3000/profile
    const fetchUser = async () => {
      const userResponse = await fetch(`http://localhost:5000/api/user/${collectionIn.ownerName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      })
      const userJson = await userResponse.json()
      if (userResponse.ok) {
        let temp = userJson.firstName + " " + userJson.lastName;
        // console.log(temp);
        // console.log(userJson.isInstit);
        setUserName(temp);
        setUserIsInstit(userJson.isInstit);
        // console.log(collectionsJson);
      } else {
        // setDone(false);
      }
    }

    fetchUser()

  }, []);
  return (
    <div className={toggleView ? 'coll--card--row' : 'coll--card--grid'}
    // 'coll--card--2--cont'
    onClick={handleRedirect}
    >
      {toggleView ? (
        <div className='coll--card--row--cont'>
          {/* Row */}
          <div className='coll--card--title--cont'>
            <div className={userIsInstit ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}
            // 'coll--avatar--cont'
            > 
              {/* <img></img> */}
            </div>
            <h2>
              {userName}
              {/* {userName ? {userName} : "Loading..."} */}
              </h2>
          </div>
          <div className='coll--card--img--cont'>
            <div className='coll--card--img--title--cont'>
              <h2>{collectionIn.collectionName}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className='coll--card--grid--cont'>
          {/* Grid */}
          <div className='coll--card--title--cont'>
            <div className={userIsInstit ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}
            // 'coll--avatar--cont'
            > 
              {/* <img></img> */}
            </div>
            <h2>
              {userName}
              {/* {userName ? {userName} : "Loading..."} */}
              </h2>
          </div>
          <div className='coll--card--img--cont'>
            
            <div className='coll--card--img--title--cont'>
              <h2>{collectionIn.collectionName}</h2>
            </div>
          </div>
        
        </div>

      )}


    </div>
  )
}
