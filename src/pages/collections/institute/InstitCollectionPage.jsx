import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import institutionsData from '../tempAssets/tempInstit.json';
import ImageContainer from '../../../components/containers/ImageContainer';
import InstHomeColl_ImageContainer from './InstColl_ImageContainer';
import './style.css';

function InstitCollectionPage() {
  const { param1, param2 } = useParams();

  if (param2) {
    // Render content when param2 is defined
    return <div>Param1: {param1}, Param2: {param2}</div>;
  } else {
    // Render content when param2 is not defined
    return <div>Param1: {param1}</div>;
  }
}


export default InstitCollectionPage;
