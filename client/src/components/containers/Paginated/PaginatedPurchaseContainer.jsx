import React, { useState, useEffect } from 'react';
import PurchasedCard from '../../cards/home/PurchasedCard';

const PaginatedPurchaseContainer = ({ itemsPerPage, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage, data, itemsPerPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div >
          {/* Display your current items here */}
          {currentItems.map((collectionAssets, index) => (
            <PurchasedCard
              key={index}
              artifactId={collectionAssets._id}
              imgUrl={collectionAssets.assetImage}
              artifactTitle={collectionAssets.assetName}
              assetDescrip={collectionAssets.assetDescription}
              cardSize={1}
            />
          ))}
      
          {/* Pagination */}
          <div>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      );
};

export default PaginatedPurchaseContainer;
