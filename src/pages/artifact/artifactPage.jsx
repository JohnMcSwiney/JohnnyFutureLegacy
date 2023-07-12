import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './style.css'
import React from 'react';
import artifactsData from '../collections/tempAssets/tempArtifacts.json';
import institutionsData from '../collections/tempAssets/tempInstit.json';
// import tagList from '../collections/tempAssets/tempPhotoTags.json';

function ArtifactPage() {
  const { id, parentId } = useParams();
  const artifact = artifactsData.collections.flatMap(collection => collection.artifacts).find(artifact => artifact.id === id);
  const institute = institutionsData.institutions.find(inst => inst.id === parentId);
  const navigate = useNavigate()

  if (!artifact) {
    return <div>Artifact not found.</div>;
  }

  const { name, imgurl, price, description, tagNames } = artifact;
 
  const handleRedirect = () => {
    navigate(`/insti_collection/${parentId}`);
  }

  return (
    <div className='artifact--page--cont'>
      <div className='artifact--img-n-tags'>
        <div className='artifact--img--cont'>
          <img src={imgurl} alt={name} className='artifact--img' />
        </div>
        <div className='artifact--tags--cont'>
          {tagNames.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className='artifact--details--cont'>
        <a onClick={handleRedirect}>{institute.name}</a>
        
        <h1>{name}</h1>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      </div>
      
      
    </div>
  );
}

export default ArtifactPage;