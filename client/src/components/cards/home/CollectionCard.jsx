import React from 'react'

import './style.css';

export default function CollectionCard({ toggleView }) {
  const avatarShape = true;
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
