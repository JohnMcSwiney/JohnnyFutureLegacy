
import './style.css';
import React, { useRef, useEffect } from 'react';
function SearchResultsContainer({ children }) {
    const elementRef = useRef(null);

    useEffect(() => {
      const handleScroll = () => {
        const verticalScrollPosition = elementRef.current.scrollTop;
  
        console.log('Vertical Scroll Position:', verticalScrollPosition);
      };
  
      // Attach the scroll event listener
      elementRef.current.addEventListener('scroll', handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        
      };
    }, []); // Empty dependency array ensures that the effect runs only once on mount
  
    return (
      <div ref={elementRef} className='search--results--cont'>
        {children}
      </div>
    );
  }

export default SearchResultsContainer