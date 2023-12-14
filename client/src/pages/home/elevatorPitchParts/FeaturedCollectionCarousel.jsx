import React, { useEffect, useState } from 'react';
import FeaturedVideoCardLg from '../../collections/FeaturedVideoCardLg';
import './_PitchStyle.css';
import LargeFeaturedVideo from './LargeFeaturedVideo';

import API_BASE_URL from '../../../apiConfig';

function FeaturedCollectionCarousel() {
  const [featuredCollections, setFeaturedCollections] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const getFeaturedCollection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/featured/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const obtainedFeaturedCollections = await response.json();
      setFeaturedCollections(obtainedFeaturedCollections);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    if (featuredCollections !== null) {
        setTotalSlides(featuredCollections.length);
        changeSlide(1);
    }
}, [featuredCollections])

  const changeSlide = (n) => {
    const newIndex = currentIndex + n;

    if (newIndex < 0) {
        setCurrentIndex(totalSlides - 1);
    } else if (newIndex >= totalSlides) {
        setCurrentIndex(0);
    } else {
        setCurrentIndex(newIndex);
    }
};

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeSlide(1);
    }, 4000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex]);

  useEffect(() => {
    getFeaturedCollection();
  }, []);

  useEffect(() => {
    if (featuredCollections !== null) {
      setCurrentIndex(0); // Reset index when new data is loaded
    }
  }, [featuredCollections]);

  return (
    <div className='featured--video--lg--cont--home'>
      {featuredCollections && (
        <div className="featured--carousel">
          <button className='featured--carousel-btn carousel-btn-l' onClick={() => changeSlide(-1)}>
            &lt;
          </button>
          <div className="carousel" style={{ transform: `translateX(${-currentIndex * 1430}px)` }}>
            {featuredCollections.map((featured, index) => (
              <div
                key={index}
                className={`collection--carousel-item ${index === currentIndex ? 'active-item' : 'inactive-item'}`}
              >
                <LargeFeaturedVideo featuredCollection={featured} />
              </div>
            ))}
          </div>
          <button className='featured--carousel-btn carousel-btn-r' onClick={() => changeSlide(1)}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default FeaturedCollectionCarousel;
