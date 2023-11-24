import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';


export default function UploadPage() {
    const navigate = useNavigate();
    const redirectSingleAsset = () => {

        // navigate(`/upload/asset`)
    }
    const redirectCollection = () => {

        navigate(`/upload/collection`)
    }
    const redirectFeaturedCreate = () => {

        navigate(`/upload/featured`)
    }
    const redirectUploadBanner = () => {

        navigate(`/upload/userBanner`)
    }

    return (
        <div className='upload--landing--cont'>
            <h2>
            Upload Redirect Page
            </h2> 
            <button onClick={redirectSingleAsset} className='upload--landing--button'>Upload Single Asset</button>
            <button onClick={redirectCollection} className='upload--landing--button'>Upload Collection</button>
            <button onClick={redirectFeaturedCreate} className='upload--landing--button'>Create Featured</button>
            <button onClick={redirectUploadBanner} className='upload--landing--button'>Upload User Banner</button>
        </div>
    )
}
