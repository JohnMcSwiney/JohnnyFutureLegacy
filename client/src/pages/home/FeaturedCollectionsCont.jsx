import React,{useEffect, useState} from 'react'
import './homePage_v2.css'
import FeaturedCollectionCard from './FeaturedCollectionCard';

function FeaturedCollectionsCont() {
  const [featuredCollections, setFeaturedCollections] = useState(null);
  useEffect(()=>{
      getFeaturedCollection(); 
  },[])

  const getFeaturedCollection = async () => {
      try {
          const response = await fetch('http://localhost:5000/api/featured/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const obtainedFeaturedCollections = await response.json();
          // console.log('Got Featured:', obtainedFeaturedCollections);
          setFeaturedCollections(obtainedFeaturedCollections);
      } catch (error) {
          console.error('Error:', error.message);
      }
  };
  
    return (
    <div className='featured--cont'>

      {featuredCollections && (
        <div className='featured--coll--cont--map'>
        {featuredCollections.map((featuredColl, index) => (
          <FeaturedCollectionCard featuredIn={featuredColl} 
          key={index} 
          indexIn={index}
          className={index >= 3 ? 'show-none' : ''}/>
        ))}  
        </div>
      )}
      </div>
  )
}

export default FeaturedCollectionsCont