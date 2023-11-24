import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';

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
    const redirectUpdateCollectionAssets = () => {

        navigate(`/upload/updateCollAssets`)
    }

    return (

        <AppContentWrapper>
            <PageContainer>

                <PageTitle>
                    Upload Redirect Page
                </PageTitle>
                <div className='upload--landing--cont'>
                <button onClick={redirectSingleAsset} className='upload--landing--button'>Upload Single Asset</button>
                <button onClick={redirectCollection} className='upload--landing--button'>Upload Collection</button>
                <button onClick={redirectFeaturedCreate} className='upload--landing--button'>Create Featured</button>
                <button onClick={redirectUploadBanner} className='upload--landing--button'>Upload User Banner</button>
                <button onClick={redirectUpdateCollectionAssets} className='upload--landing--button'>Collection: update asset ids</button>

                </div>
                
            </PageContainer>
        </AppContentWrapper>
    )
}
