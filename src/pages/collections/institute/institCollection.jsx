import React, { useState }  from 'react'
import institutionsData from '../tempAssets/tempInstit.json'
import './style.css'

import ImageContainer from '../../../components/containers/ImageContainer'
import TextContainer from '../../../components/containers/TextContainer'
import InstColl_ImageContainer from './InstColl_ImageContainer'

export default function InstitCollection () {
  const institutions = institutionsData.institutions
  
  return (
    
    <div className='browse--instit--cont'>
      {institutions.map(institution => (
        <div className='browse--instit--showcase--1' key={institution.id}>
          <div className='browse--instit--showcase--upper'>
            <div className='browse--instit--title--img--cont'>
              {/* <img src={institution.imgurl} alt={institution.name} />  */}

              <ImageContainer
                imageUrl={institution.imgurl}
                aspectRatio={3 / 3}
              />
            </div>
            <div className='browse--instit--title--cont--1'>
              <h2 className='browse--instit--title' >{institution.name}</h2>
              {/* <TextContainer text={institution.description} /> */}
            </div>
          </div>
          <div className='browse--instit--showcase--lower'>
            <h4 className='browse--instit--coll--title--text'> FEATURED COLLECTIONS</h4>
            {institution.collections.map(collection => (
              <div
                className='browse--instit--collection--card--1'
                key={collection.id}
              >
                
                <InstColl_ImageContainer 
          imageUrl={collection.imgurl}
          collName={collection.name}
          />
              </div>
            ))}
            <div className='instit--showcase--lower--gradient' ></div>
          </div>
          {/* <h3>Collections:</h3>
          <ul className='browse--instit--collection--cont--1'>
            {institution.collections.map(collection => (
              <li
                className='browse--instit--collection--card--1'
                key={collection.id}
              >
                <h4>{collection.name}</h4>
                <img src={collection.imgurl} alt={collection.name} />
              </li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  )
}
