import React, { useState, useEffect } from 'react';
import './style.css'; // Assuming you have a separate CSS file for styling
import CollectionCard_v2 from '../home/CollectionCard_v2';
const CollectionCarousel = ({ toggleView, collections }) => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = collections.length;
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
        }, 3000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [currentIndex]);
    return (
        <div className="collection--carousel">
            <button className='collection--carousel-btn carousel-btn-l' onClick={() => changeSlide(-1)}>&lt;</button>
            <div className="carousel">
                {collections.map((collection, index) => {
                    console.log('Index:', index, 'Current Index:', currentIndex);
                    return (
                        <div
                            key={collection._id}
                            className={`collection--carousel-item`}
                            style={{ transform: `translateX(${-currentIndex * 100}%) `}}
                        >
                            <CollectionCard_v2
                                key={collection._id}
                                collectionIn={collection}
                                toggleView={toggleView}
                                style={{}}
                            />
                        </div>
                    );
                })
                }
            </div>
            <button className='collection--carousel-btn carousel-btn-r' onClick={() => changeSlide(1)}>&gt;</button>
        </div>
    )
}


export default CollectionCarousel
