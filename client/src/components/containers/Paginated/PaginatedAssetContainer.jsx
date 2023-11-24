import React, { useState, useEffect } from 'react';
import PurchasedCard from '../../cards/home/PurchasedCard';
import './paginatedStyle.css';
import ArtifactCard from '../../cards/home/ArtifactCard';
const PaginatedAssetContainer = ({ itemsPerPage, cardSize, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [])

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, data, itemsPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (

    <div className='paginated--asset--cont'>

      {/* Display your current items here */}
      {currentItems.map((asset, index) => (
        <ArtifactCard
          key={asset._id}
          artifactId={asset._id}
          collectionId={asset._id}
          imgUrl={asset.assetImage}
          artifactTitle={asset.assetName}
          assetDescrip={asset.assetDescription}
          cardSize={cardSize}
        />
      ))}

      {/* Pagination */}
      {data &&
        <div className='paginated--page--btns paginated--btns--top'>
          <h3>Page:</h3>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 && 'currentPageBtn'}>
              {index + 1}
            </button>
          ))}
        </div>
      }
      {data &&
        <div className='paginated--page--btns paginated--btns--bot'>
          <h3>Page:</h3>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 && 'currentPageBtn'}>
              {index + 1}
            </button>
          ))}
        </div>
      }
    </div>
  );
};

export default PaginatedAssetContainer;
