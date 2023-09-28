import React from 'react'
import CollectionCard2 from '../../../../components/cards/home/CollectionCard'
import CollectionCard from '../../../../components/cards/home/CollectionCard'

export default function FeaturedCollection() {
  return (
    <div className='FL--home--showcase--2'>
        <div className='FL--home--showcase--header'>
          <h3>Featured Collections</h3>
        </div>
        <CollectionCard2 />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div> 
  )
}
