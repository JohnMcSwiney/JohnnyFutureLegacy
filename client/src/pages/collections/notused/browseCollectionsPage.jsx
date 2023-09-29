import './collectionStyle.css';
import FL_splitter from '../../../components/splitter/FL_splitter'
import CollectionCard from '../../../components/cards/home/CollectionCard'
import CollectionCard2 from '../../../components/cards/home/ArtifactCard'

import FeaturedCollection from './featured/featuredCollection';
import IndivCollection from './individual/indivCollection';
import InstitCollection from './institute/browseInstitCollectionCard';
import FL_footer from '../../../components/FL_Footer/FL_footer'

import React, { useState } from 'react';

const BrowseCollectionsPage = () => {
  const [selectedOption, setSelectedOption] = useState('Feature');

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  
  return (
    <div className='mar-lr FL--home--cont '>
      <div className='FL--home--showcase--1'>
        <div className='FL--home-showcase--1--img'>
          <img src='https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TempAssets%2Fimage%2028.png?alt=media&token=a86ebad3-fef1-4279-8361-f15639e62331' />
        </div>
        <div className='FL--home-showcase--1--text'>
            <h3>Connect</h3>
            <h3>License</h3>
            <h3>Secure</h3>
            <h3>Share</h3>
          <p>Saving Underutilized Culture now and far into the future</p>
        </div>
      </div>
      <FL_splitter />

      <button onClick={() => handleButtonClick('Feature')}>Featured</button>
      <button onClick={() => handleButtonClick('Instit')}>Institute</button>
      <button onClick={() => handleButtonClick('Indiv')}>Individial</button>

      {selectedOption === 'Feature' && 
      <div>
        <FeaturedCollection/>

      </div>
      }

      {selectedOption === 'Instit' && 
      <div>
        <InstitCollection />

      </div>
      }

      {selectedOption === 'Indiv' && 
      
      <div>
        <IndivCollection />

      </div>
      }
      <FL_splitter />
      <FL_footer />
    </div>
  )
}
export default BrowseCollectionsPage;
