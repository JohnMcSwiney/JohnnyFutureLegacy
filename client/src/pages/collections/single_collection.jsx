import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import institutionsData from './tempAssets/tempInstit.json'
// import artifactsData from './tempAssets/tempArtifacts.json'
import ImageContainer from '../../components/containers/ImageContainer'
import ArtifactCard from '../../components/cards/home/ArtifactCard'
import InstHomeColl_ImageContainer from './notused/institute/InstColl_ImageContainer'
import './style.css'

function Single_collection() {
  const { param1 } = useParams() //collection id

  // const [institutions, setInstitutions] = useState(institutionsData.institutions)
  // const [artifacts, setArtifacts] = useState(artifactsData.collections)
  const hardcodedCollection = {
    "collectionName": "Test Collection",
            "ownerName": "John Doe",
            "collectionDate": "2023-09-28",
            "collectionDescription": "This is a test collection for testing purposes.",
            "collectionAssets": [
              "650de5b29b24487493bc2218"
            ]
  }
// console.log(param1, param2)
  // if (param2) {
    // const collection = artifacts.find((coll) => coll.id === param2)
    return (

    
    <div className='instit--collhomepage--main--cont'>
          <div className='instit--collhomepage--cont'>
            <div className='instit--collhomepage--title--cont'>
              <div className='instit--collhomepage--title--img'>
                {/* <ImageContainer
                  imageUrl={hardcodedCollection.imgurl}
                  aspectRatio={3 / 3}
                /> */}
              </div>
              {hardcodedCollection.collectionName}
            </div>
            <div className='instit--collhomepage--content--cont'>
              {/* {institution.description} */}
              {/* {institution.collections.map((collection) => (
                <div
                  className='browse--instit--collection--card--1'
                  key={collection.id}
                >
                  <InstHomeColl_ImageContainer
                    imageUrl={collection.imgurl}
                    collName={collection.name}
                    parentid={institution.id}
                    collectionid={collection.id}
                  />
                </div>
              ))} */}
            </div>
          </div>
        </div>
    )
    
  // } else if (param1) {
    // const institution = institutions.find((inst) => inst.id === param1)

  // }

  // return (
    // <div>
      // test
    // </div>
  // ) // If neither param1 nor param2 is provided, return null or display an appropriate message
}

export default Single_collection
