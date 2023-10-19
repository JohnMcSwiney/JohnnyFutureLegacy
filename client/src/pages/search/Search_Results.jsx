import React from 'react'
import { useEffect, useState } from 'react';
import './style.css'
import { useMyContext } from "../../context/FLContext";
import { useSearchContext } from "../../context/SearchContext";
import sanitizeHtml from 'sanitize-html';

import ArtifactCard from '../../components/cards/home/ArtifactCard'
import {
  StyledContainer,
  StyledTitleContainer,
  StyledTitleContainer2,
  StyledTitle,
  StyledTitle2,
  StyledSubTitle,
  SearchTitle,
  StyledSubTitle2,
  StyledContentContainer
} from '../../components/Styles'

export default function Search_Results() {
  // const { searchValue, setSearchValue } = useMyContext();
  const [searchAssets, setSearchAssets] = useState(null);
  const [searchCollections, setSearchCollections] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);

  const { searchValue, setSearchValue, searchData } = useSearchContext();

  console.log(searchData.assetResults)
  return (
    <StyledContainer>
      <StyledTitleContainer2>
        search
        {searchValue !== '' ?
          <h2> Searching for: {sanitizeHtml(searchValue)}</h2>
          :
          <h2>Search Value Empty</h2>
        }
      </StyledTitleContainer2>
      <StyledContentContainer>
        {searchData.assetResults ? <SearchTitle>Asset Results:</SearchTitle> : <></>}
        {searchData.assetResults ?
          <div className='search_results--container--row--scroll'>
            {searchData.assetResults.map((asset) => (
              <ArtifactCard
                key={asset._id}
                artifactId={asset._id}
                collectionId={asset._id}
                imgUrl={asset.assetImage}
                artifactTitle={asset.assetName}
                assetDescrip={asset.assetDescription}
              />
            ))}
          </div>
          :
          <div>
            none...
          </div>
        }
      </StyledContentContainer>
    </StyledContainer>

  )
}




