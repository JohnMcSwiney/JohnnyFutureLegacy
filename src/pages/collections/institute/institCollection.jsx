import React, { useState }  from 'react'
import institutionsData from '../tempAssets/tempInstit.json'
import './style.css'

import ImageContainer from '../../../components/containers/ImageContainer'
import TextContainer from '../../../components/containers/TextContainer'

export default function InstitCollection () {
  const institutions = institutionsData.institutions
  
  return (
    // <div className='browse--instit--showcase--1'>
    //   {institData.map((institutions) => (
    //     <div className='browse--instit--title--cont--1' key={institutions.id}>
    //     <h1>name: {institutions.name}</h1>
    //   </div>
    //   ))}

    // </div>



    
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
              <h2>{institution.name}</h2>
                <TextContainer text={institution.description} />
            </div>
          </div>

          <h3>Collections:</h3>
          <ul className='browse--instit--collection--cont--1'>
            {institution.collections.map(collection => (
              <li
                className='browse--instit--collection--card--1'
                key={collection.id}
              >
                <h4>{collection.name}</h4>
                {/* <img src={collection.imgurl} alt={collection.name} /> */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
