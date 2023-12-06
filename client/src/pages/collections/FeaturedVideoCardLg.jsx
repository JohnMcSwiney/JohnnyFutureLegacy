import React, { useState, useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import UserProfilePicture from '../../components/profilePicture/UserProfilePicture';

function FeaturedVideoCardLg({ featuredIn, userObject, collectionName, onButtonClick }) {
    const [youtubeUrl, setYoutubeUrl] = useState("https://youtu.be/w7x_lWJNnNg?si=MOEOddYRa1LgLs01");
    const navigate = useNavigate()
    
    useEffect(() => {
        if (featuredIn) {
            setYoutubeUrl(featuredIn.videoLink)
        }
    }, [])
    const getYouTubeVideoId = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };
    const videoId = getYouTubeVideoId(youtubeUrl);
    const handleRedirectAssetOwner = () => {
        if (userObject) {
            navigate(`/user/${userObject._id}`);
        }
    }
    return (
        <div className='featured--video--lg--cont'>
            {featuredIn && videoId &&
                <div className='featured--video--lg--inner--cont'>
                    <iframe
                        className='featured--youtube--video--lg'
                        width="1230"
                        height="700"
                        src={`https://www.youtube.com/embed/${videoId}?si=gmSGHP9k7cMgzkGa&controls=1&showinfo=1&iv_load_policy=3`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen

                    ></iframe>

                    <div className='featured--info--lg'>
                        <h2 className='featured--title--lg'>{collectionName}</h2>


                        <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${userObject.firstName} ${userObject.lastName}'s profile`}
                        data-tooltip-place="right"
                            className='featured--user--lg'
                        >
                            <Tooltip id="my-tooltip" />
                            <div className='featured--pfp--cont'>
                            <UserProfilePicture currentUserObject={userObject} size={3} onClick={handleRedirectAssetOwner}/>
                                </div>
                            
                            {/* <div 
                            onClick={handleRedirectAssetOwner}
                            className={`featured--avatar--cont--lg ${userObject.isInstit ? 'feat--instit' : 'feat--notIns'}`}>
                                <img src={userObject.profilePicture} />

                            </div> */}
                            <h3 
                            onClick={handleRedirectAssetOwner}
                            >{userObject.firstName} {userObject.lastName}</h3>
                        </div>

                        <button
                            className='featured--lg--btn'
                            onClick={onButtonClick}
                        >Explore Assets</button>
                    </div>
                </div>

            }
        </div>
    )
}

export default FeaturedVideoCardLg