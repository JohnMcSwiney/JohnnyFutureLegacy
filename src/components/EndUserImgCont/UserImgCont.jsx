import React from 'react'
import './UserImg.css'

export default function UserImgCont({imgUrl, userName}) {
  return (
    <div className='img--cont--cont'>
        <div className='img--cont'>
        <img src={imgUrl} />
        </div>
    </div>
  )
}
