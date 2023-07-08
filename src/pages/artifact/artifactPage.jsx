
import { useParams } from 'react-router-dom'
import './style.css'
import React from 'react';
import artifactsData from '../collections/tempAssets/tempArtifacts.json';
import institutionsData from '../collections/tempAssets/tempInstit.json';
function ArtifactPage() {
  const { id, parentId } = useParams();
  const artifact = artifactsData.collections.flatMap(collection => collection.artifacts).find(artifact => artifact.id === id);
  const institute = institutionsData.institutions.find(inst => inst.id === parentId);

  if (!artifact) {
    return <div>Artifact not found.</div>;
  }

  const { name, imgurl } = artifact;

  return (
    <div className='artifact--page--cont'>
      <div className='artifact--img-n-tags'>
      <div className='artifact--img--cont'>
          <img src={imgurl} alt={name} className='artifact--img' />
      </div>
      <div className='artifact--tags--cont'>

      </div>
      </div>
      
      
      <div>
        {institute.name}
      </div>
      <h1>{name}</h1>
      
    </div>
  );
}

export default ArtifactPage;
