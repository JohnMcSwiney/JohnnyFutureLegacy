import React, { useState }  from 'react'
import {useNavigate} from 'react-router-dom';
import './style.css';

export default function CollectionCard({ toggleView }) {
  const avatarShape = true;

  const hardcodedCollection = {
    "collectionName": "Test Collection",
            "ownerName": "John Doe",
            "collectionDate": "2023-09-28",
            "collectionDescription": "This is a test collection for testing purposes.",
            "collectionAssets": [
              "650de5b29b24487493bc2218"
            ]
  }
  const navigate = useNavigate();
  const handleRedirect = () => {
    // navigate(`/collection/${artifactId}/${collectionId}`)
    // /collection/:param1/:param2?
  }

  return (
    <div className={toggleView ? 'coll--card--row' : 'coll--card--grid'}
    // 'coll--card--2--cont'
    >
      {toggleView ? (
        <div className='coll--card--row--cont'>
          {/* Row */}
          <div className='coll--card--title--cont'>
            <div className={avatarShape ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}
            // 'coll--avatar--cont'
            > 
              {/* <img></img> */}
            </div>
            <h2>Name of User or Institute</h2>
          </div>
          <div className='coll--card--img--cont'>
            <div className='coll--card--img--title--cont'>
              <h2>COLLECTION TITLE</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className='coll--card--grid--cont'>
          {/* Grid */}
          <div className='coll--card--title--cont'>
            <div className={avatarShape ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}
            // 'coll--avatar--cont'
            > 
              {/* <img></img> */}
            </div>
            <h2>Name of User or Institute</h2>
          </div>
          <div className='coll--card--img--cont'>
            
            <div className='coll--card--img--title--cont'>
              <h2>COLLECTION TITLE</h2>
            </div>
          </div>
        
        </div>

      )}


    </div>
  )
}
