import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Tooltip } from 'react-tooltip'
import UserProfilePicture from '../../../components/profilePicture/UserProfilePicture'


function LargeFeaturedVideo({featuredCollection}) {
    useEffect(()=>{
        if(featuredCollection !== null){
            fetchCollectionUser();
            fetchCollectionName();
        }

    },[])
    const [collectionUser, setCollectionUser] = useState(null)
    const [collectionName, setCollectionName] = useState(null);
    const fetchCollectionUser = async () => {
        // console.log("user");
        const collectionUserResponse = await fetch(`http://localhost:5000/api/user/${featuredCollection.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true'
            }
        })
        const collectionUserJson = await collectionUserResponse.json()
        if (collectionUserResponse.ok) {
            setCollectionUser(collectionUserJson);

            // console.log(collectionUserJson)
        } else {
            console.log('error')
        }
    }
    const fetchCollectionName = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/collection/${featuredCollection.connectedCollectionId}/getName`);
          const data = await response.json();
  
          if (response.ok) {
            // console.log(data)
            setCollectionName(data.collectionName);
          } else {
            console.error(data.error); // Handle errors if needed
          }
        } catch (error) {
          console.error('Error fetching collection name:', error);
        }
      };
  
      
    const [youtubeUrl, setYoutubeUrl] = useState("https://youtu.be/w7x_lWJNnNg?si=MOEOddYRa1LgLs01");
    const navigate = useNavigate()

    useEffect(() => {
        if (featuredCollection) {
            setYoutubeUrl(featuredCollection.videoLink)
        }
    }, [collectionUser])

    const getYouTubeVideoId = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(youtubeUrl);

    const redirectCollectionUser = () => {
        if (collectionUser) {
            navigate(`/user/${collectionUser._id}`);
        }
    }
    const handleRedirectCollection = () =>{
        if(featuredCollection){
            navigate(`/collection/${featuredCollection.connectedCollectionId}/${featuredCollection._id}`);
        }
    }


    return (
        <div className='featured--video--lg--inner--cont'>
            {featuredCollection && videoId &&
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

                        {collectionUser &&
                        <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={`${collectionUser.firstName} ${collectionUser.lastName}'s profile`}
                        data-tooltip-place="right"
                        className='featured--user--lg'
                    >
                        <Tooltip id="my-tooltip" />
                        <div className='featured--pfp--cont'>
                            <UserProfilePicture currentUserObject={collectionUser} size={3} onClick={redirectCollectionUser} />
                        </div>

                        
                        <h3
                            onClick={redirectCollectionUser}
                        >{collectionUser.firstName} {collectionUser.lastName}</h3>
                    </div>
                        }
                        

                        <button
                            className='featured--lg--btn'
                            onClick={handleRedirectCollection}
                        >Visit Collection</button>
                    </div>
                </div>
            }
        </div>



    )
}

export default LargeFeaturedVideo