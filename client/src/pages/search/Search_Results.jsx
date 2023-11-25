import React from 'react'
import { useEffect, useState } from 'react';
import './style.css'
import { useMyContext } from "../../context/FLContext";
import { useSearchContext } from "../../context/SearchContext";
import sanitizeHtml from 'sanitize-html';

import ArtifactCard from '../../components/cards/home/ArtifactCard'
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import SearchResultsContainer from '../../components/containers/SearchResultsContainer';
import Splitter from '../../components/splitter/Splitter';
import CollectionCard_v2 from '../../components/cards/home/CollectionCard_v2'
import PaginatedAssetContainer from '../../components/containers/Paginated/PaginatedAssetContainer';
import PaginatedCollectionContainer from '../../components/containers/Paginated/PaginatedCollectionContainer';


export default function Search_Results() {
  // const { searchValue, setSearchValue } = useMyContext();
  const [searchAssets, setSearchAssets] = useState(null);
  const [searchCollections, setSearchCollections] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);

  const [showAssets, setShowAssets] = useState(true);
  const [showCollections, setShowCollections] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const { searchValue, setSearchValue, searchData } = useSearchContext();
  const [componentSize, setComponentSize] = useState(3)

  // console.log(searchData.assetResults)
  useEffect(() =>{
    console.log(searchData.collectionResults)
  },[])
  return (
    <AppContentWrapper>
      <PageContainer>
        <div className='result--title'>
          {searchValue !== '' ?
            <h2> Searching for: {sanitizeHtml(searchValue)}</h2>
            :
            <h2>Search Value Empty</h2>
          }
          <div className='asset--size--switch--cont'>
            Size:
            <div className='size--btn--cont'>
            <button onClick={() => {setComponentSize(1)}} >Small</button>
            <button onClick={() => {setComponentSize(2)}} >Medium</button>
            <button onClick={() => {setComponentSize(3)}} >Large</button>
            </div>
            
            </div>
        </div>
        {/* Assets */}
        <div className='search_results--title--bar pad--bot--5'>
        {searchData.assetResults &&
              <button onClick={() =>{setShowAssets(!showAssets);
            }}>{showAssets ? 'Hide Assets' : 'Show Assets'}</button>
          }
          {searchData.collectionResults && 
            <button onClick={() =>{
              setShowCollections(!showCollections);
            }}>{showCollections ? 'Hide Collections' : 'Show Collections'}</button>
            }
        </div>
        
            
        <SearchResultsContainer>
          {searchData.assetResults ?
            <div className={showAssets ? 'search_results--container--row--scroll' : 'hide--search_results'}
            >
              <div className='search_results--title--bar'><h2>Asset Results:</h2></div>
              <Splitter/>
              <PaginatedAssetContainer itemsPerPage={20} cardSize={componentSize} data={searchData.assetResults}/>
              {/* {searchData.assetResults.map((asset) => (
                <ArtifactCard
                  key={asset._id}
                  artifactId={asset._id}
                  collectionId={asset._id}
                  imgUrl={asset.assetImage}
                  artifactTitle={asset.assetName}
                  assetDescrip={asset.assetDescription}
                  cardSize={componentSize}
                />
              ))} */}
            </div>
            :
            <div className='search_results--title--bar'>
              No Assets Retrieved...
            </div>
          }
          {searchData.collectionResults ?
            <div className={showCollections ? 'search_results--container--row--scroll' : 'hide--search_results'}
            >
              <div className='search_results--title--bar'><h2>Collection Results:</h2></div>
              <Splitter/>
              <PaginatedCollectionContainer itemsPerPage={4} cardSize={componentSize} data={searchData.collectionResults}/>
              {/* {searchData.assetResults.map((asset) => (
                <ArtifactCard
                  key={asset._id}
                  artifactId={asset._id}
                  collectionId={asset._id}
                  imgUrl={asset.assetImage}
                  artifactTitle={asset.assetName}
                  assetDescrip={asset.assetDescription}
                  cardSize={componentSize}
                />
              ))} */}
            </div>
            :
            <div className='search_results--title--bar'>
              No Collections Retrieved...
            </div>
          }
        </SearchResultsContainer>
      </PageContainer>


    </AppContentWrapper>

  )
}




