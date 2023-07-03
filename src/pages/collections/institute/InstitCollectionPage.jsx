import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import institutionsData from '../tempAssets/tempInstit.json';
import ImageContainer from '../../../components/containers/ImageContainer';
import InstHomeColl_ImageContainer from './InstColl_ImageContainer';
import './style.css'

function InstitCollectionPage() {
    const { id } = useParams();
    const [institutions, setInstitutions] = useState(institutionsData.institutions);
    // Use the 'id' parameter to populate your variables or perform any other logic
  
    return (
      <div className='instit--collhomepage--main--cont'>
        {institutions.map(institution => {
          if (institution.id === id) {
            return (
              <div className='instit--collhomepage--cont' key={institution.id}>
                <div className='instit--collhomepage--title--cont'>
                <div className='instit--collhomepage--title--img'>
                  <ImageContainer
                    imageUrl={institution.imgurl}
                    aspectRatio={3 / 3}
                  />
                  </div>
                  {institution.name}
                </div>
                <div className='instit--collhomepage--content--cont'>
                {institution.collections.map(collection => (
                  <div
                    className='browse--instit--collection--card--1'
                    key={collection.id}
                  >
                    <InstHomeColl_ImageContainer
                      imageUrl={collection.imgurl}
                      collName={collection.name}
                      parentid={institution.id}
                      collectionid={collection.id}
                    />
                  </div>
                ))}
                {institution.description}
                  </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
    
  };
  

export default InstitCollectionPage;
