import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';


export default function UploadPage() {
    const navigate = useNavigate();
    const redirectSingleAsset = () => {

        navigate(`/upload/asset`)
    }

    return (
        <div className='upload--landing--cont'>
            <h2>
            Upload Redirect Page
            </h2> 
            <button onClick={redirectSingleAsset} className='upload--landing--button'>Upload Single Asset</button>
        </div>
    )
}
