import React from 'react'
import './teamImg.css'

export default function TeamImg({imgUrl, name, description }) {
  
  
    return (
    <div className="team--member--cont">
        <div className="team--img--cont">
            <img src={imgUrl} />
        </div>
        <h2>{ name }</h2>
        <h4>{ description }</h4>
    </div>
  )
}
