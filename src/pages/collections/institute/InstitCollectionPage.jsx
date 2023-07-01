import React, { useState } from 'react';
import { useParams } from 'react-router-dom'


function InstitCollectionPage() {
    const { id } = useParams();

    // Use the 'id' parameter to populate your variables or perform any other logic
  
    return (
      <div>
        <h1>Page ID: {id}</h1>
        {/* Render your content based on the 'id' parameter */}
      </div>
    );
  };
  

export default InstitCollectionPage;
