import React from 'react'
import { useEffect, useState } from 'react';
import './style.css'
import { useMyContext } from "../../context/FLContext";
import { useSearchContext } from "../../context/SearchContext";
import sanitizeHtml from 'sanitize-html';

export default function Search_Results() {
  // const { searchValue, setSearchValue } = useMyContext();
  const [ searchAssets, setSearchAssets] = useState(null);
  const [ searchCollections, setSearchCollections] = useState(null);
  const [ searchUsers, setSearchUsers] = useState(null);

  const { searchValue, setSearchValue } = useSearchContext();


  return (
    <div>search
      {searchValue !== '' ?
        <h2> Searching for: {sanitizeHtml(searchValue)}</h2>
        :
        <h2>Search Value Empty</h2>
      }
    </div>

  )
}


      //   const fetchAsset = async () => {
      //     const assetResponse = await fetch(`http://localhost:5000/api/asset/`, {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Access-Control-Allow-Origin': 'true'
      //       }
      //     })
      //     const assetJson = await assetResponse.json()
      //     if (assetResponse.ok) {
      //       setSearchAssets(assetJson)

      //     } else {
      //       // setDone(false);
      //     }
      //   }
      //   const fetchCollections = async () => {
      //     const collectionResponse = await fetch(`http://localhost:5000/api/collection/`, {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Access-Control-Allow-Origin': 'true'
      //       }
      //     })
      //     const collectionJson = await collectionResponse.json()
      //     if (collectionResponse.ok) {
      //       // const temp = collectionJson;
      //       setSearchCollections(collectionJson)

      //     } else {
      //       // setDone(false);
      //     }
      //   }
      //   const fetchUsers = async () => {
      //     const userResponse = await fetch(`http://localhost:5000/api/user/`, {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Access-Control-Allow-Origin': 'true'
      //       }
      //     })
      //     const userJson = await userResponse.json()
      //     if (userResponse.ok) {
      //       setSearchUsers(userJson)
      //       console.log(userJson);
      //     } else {
      //       // setDone(false);
      //     }
      //   }
      //   fetchAsset()
      //   fetchCollections()  
      

