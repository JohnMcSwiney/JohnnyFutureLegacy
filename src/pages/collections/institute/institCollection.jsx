import React, { useState, useEffect } from 'react'
import './style.css'
import ImageContainer from '../../../components/containers/ImageContainer'
import TextContainer from '../../../components/containers/TextContainer'
import InstColl_ImageContainer from './InstColl_ImageContainer'
import { useNavigate, useParams } from 'react-router-dom'
import institutionsData from '../tempAssets/tempInstit.json'

export default function InstitCollection () {
  const [institutions, setInstitutions] = useState(
    institutionsData.institutions
  )
  const navigate = useNavigate()
  const { id: defaultId, collId: defaultCollId } = useParams()
  const [id, setId] = useState(defaultId)
  const [collId, setCollId] = useState(defaultCollId)

  const redirectInstitCollPage = id_In => {
    setId(id_In)
    setCollId(null)
  }

  const redirectInstitCollPage_Specific = (id_In, collId_In) => {
    console.log('Specific collection:' + collId_In)
    setCollId(collId_In)
    setId(id_In)
  }

  useEffect(() => {
    console.log(collId)
    if (collId && id) {
      navigate(`/insti_collection/${id}/${collId}`)
    } else if (id) {
      navigate(`/insti_collection/${id}`)
    }
  }, [id, collId, navigate])

  return (
    <div className='browse--instit--cont'>
      {institutions.length > 0 ? (
        institutions.map(institution => (
          <div className='browse--instit--showcase--1' key={institution.id}>
            <div className='browse--instit--showcase--1' key={institution.id}>
              <div
                className='browse--instit--showcase--upper'
                onClick={() => redirectInstitCollPage(institution.id)}
              >
                <div className='browse--instit--title--img--cont'>
                  <ImageContainer
                    imageUrl={institution.imgurl}
                    aspectRatio={3 / 3}
                  />
                </div>
                <div className='browse--instit--title--cont--1'>
                  <h2 className='browse--instit--title'>{institution.name}</h2>
                </div>
              </div>
              <div className='browse--instit--showcase--lower'>
                <h4 className='browse--instit--coll--title--text'>
                  FEATURED COLLECTIONS
                </h4>
                {institution.collections.map(collection => (
                  <div
                    className='browse--instit--collection--card--1'
                    key={collection.id}
                  >
                    <InstColl_ImageContainer
                      imageUrl={collection.imgurl}
                      collName={collection.name}
                      parentid={institution.id}
                      collectionid={collection.id}
                    />
                  </div>
                ))}
                <div className='instit--showcase--lower--gradient'></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
