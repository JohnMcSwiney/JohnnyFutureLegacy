import React, { useEffect, useState } from 'react'
import FeaturedVideoCardLg from '../../collections/FeaturedVideoCardLg';
import './_PitchStyle.css'
import LargeFeaturedVideo from './LargeFeaturedVideo';
// import []

function FeaturedCollectionCarousel() {
    const [featuredCollections, setFeaturedCollections] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [totalSlides, setTotalSlides] = useState(0);

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
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [currentIndex]);

    useEffect(() => {
        getFeaturedCollection();
        
    }, [])



    useEffect(() => {
        if (featuredCollections !== null) {
            setTotalSlides(featuredCollections.length);
            changeSlide(1);
        }
    }, [featuredCollections])

    // const redirectCollection = (collectionid) => { navigate(`/collection/${collectionid}`) };

    return (
        <div className='featured--video--lg--cont--home' >
            {featuredCollections &&
                <div className="featured--carousel">
                    <button className='featured--carousel-btn carousel-btn-l' onClick={() => changeSlide(-1)}>&lt;</button>
                    <div className="carousel">
                        {featuredCollections.map((featured, index) => {
                            // console.log('Index:', index, 'Current Index:', currentIndex);
                            // console.log(featured)
                            return (
                                <div
                                    key={index}
                                    className={`collection--carousel-item`}
                                    style={{ transform: `translateX(${-currentIndex * 100}%) ` }}
                                >
                                    <LargeFeaturedVideo featuredCollection={featured} />
                                </div>
                            );
                        })
                        }
                    </div>
                    <button className='featured--carousel-btn carousel-btn-r' onClick={() => changeSlide(1)}>&gt;</button>
                </div>

            }

        </div>
    )
}

export default FeaturedCollectionCarousel