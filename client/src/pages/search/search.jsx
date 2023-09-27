import React from 'react'
import { useEffect, useState } from 'react';
import './style.css'
import { useMyContext } from "../../context/FLContext";
import sanitizeHtml from 'sanitize-html';

export default function Search() {

  const { searchValue, setSearchValue } = useMyContext();
  const { searchAssets, setSearchAssets} = useState(null);
  const { searchCollections, setSearchCollections} = useState(null);
    useEffect(() => {
      if (searchValue) {
        const fetchAsset = async () => {
          const assetResponse = await fetch(`http://localhost:5000/api/asset/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          })
          const assetJson = await assetResponse.json()
          if (assetResponse.ok) {
            setSearchAssets(assetJson)
            console.log(assetJson);
          } else {
            // setDone(false);
          }
        }
        const fetchCollections = async () => {
          const collectionResponse = await fetch(`http://localhost:5000/api/collection/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'true'
            }
          })
          const collectionJson = await collectionResponse.json()
          if (collectionResponse.ok) {
            setSearchCollections(collectionJson)
            console.log(collectionJson);
          } else {
            // setDone(false);
          }
        }
        fetchAsset()
        fetchCollections()  
      }

      
    }, []);


  



  return (
    <div>search
      {searchValue !== null ?
        <h2> Searching for: {sanitizeHtml(searchValue)}</h2>
        :
        <h2>Search Value Empty</h2>
      }
    </div>

  )
}
