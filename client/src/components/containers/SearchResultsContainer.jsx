import './style.css';
import React, { useRef, useEffect } from 'react';

import PaginatedAssetContainer from './Paginated/PaginatedAssetContainer';
function SearchResultsContainer({ children }) {
  const elementRef = useRef(null);

  useEffect(() => {
    // Retrieve the stored scroll position from localStorage
    const storedScrollPosition = localStorage.getItem('searchResultsScrollPosition');
    const initialScrollPosition = storedScrollPosition ? parseInt(storedScrollPosition, 10) : 0;

    // Set the initial scroll position
    if (elementRef.current) {
      elementRef.current.scrollTop = initialScrollPosition;
    }

    const handleScroll = () => {
      // Save the current scroll position to localStorage
      localStorage.setItem('searchResultsScrollPosition', elementRef.current.scrollTop);
    };

    // Attach the scroll event listener
    if (elementRef.current) {
      elementRef.current.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      // Check if elementRef.current is not null before trying to remove the event listener
      if (elementRef.current) {
        elementRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div ref={elementRef} className='search--results--cont'>
      {children}
    </div>
  );
}

export default SearchResultsContainer;
