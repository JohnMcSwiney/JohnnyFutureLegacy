import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import institutionsData from '../tempAssets/tempInstit.json'
import artifactsData from '../tempAssets/tempArtifacts.json'
import ImageContainer from '../../../components/containers/ImageContainer'
import ArtifactCard from '../../../components/cards/home/ArtifactCard'
import InstHomeColl_ImageContainer from './InstColl_ImageContainer'
import './style.css'

function InstitCollectionPage() {
  const { param1, param2 } = useParams()
  const [institutions, setInstitutions] = useState(institutionsData.institutions)
  const [artifacts, setArtifacts] = useState(artifactsData.collections)

  if (param2) {
    const collection = artifacts.find((coll) => coll.id === param2)

    if (collection) {
      return (
        <div className='instit--collhomepage--main--cont'>
          <div className='instit--collhomepage--cont'>
            <div className='instit--collhomepage--title--cont'>
              <div className='instit--collhomepage--title--img'>
                <ImageContainer
                  imageUrl={collection.imgurl}
                  aspectRatio={3 / 3}
                />
              </div>
              {collection.name}
            </div>
            <div className='instit--collhomepage--content--cont'>
              <div className='instit--collpage--content'>
              {collection.artifacts.map((artifact) => (
                
                <ArtifactCard
                key={artifact.id}
                  artifactId={artifact.id}
                  collectionId={param1}
                  imgUrl={artifact.imgurl}
                  artifactTitle={artifact.name}
                  className='grid-item'
                  
                />
              
            ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  } else if (param1) {
    const institution = institutions.find((inst) => inst.id === param1)

    if (institution) {
      return (
        <div className='instit--collhomepage--main--cont'>
          <div className='instit--collhomepage--cont'>
            <div className='instit--collhomepage--title--cont'>
              <div className='instit--collhomepage--title--img'>
                <ImageContainer
                  imageUrl={institution.imgurl}
                  aspectRatio={3 / 3}
                />
              </div>
              {institution.name}
            </div>
            <div className='instit--collhomepage--content--cont'>
              {institution.description}
              {institution.collections.map((collection) => (
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
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  return null // If neither param1 nor param2 is provided, return null or display an appropriate message
}

export default InstitCollectionPage
