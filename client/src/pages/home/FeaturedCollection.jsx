import React, { useState, useEffect, useRef } from 'react'
import './homePage_v2.css'
function FeaturedCollection({ featuredIn }) {
  // console.log(featuredIn)
  // console.log(featuredIn)
  const [youtubeUrl, setYoutubeUrl] = useState("https://youtu.be/w7x_lWJNnNg?si=MOEOddYRa1LgLs01");
  const [collectionObject, setCollectionObject] = useState(null);
  const [hasImg, setHasImg] = useState(false);
  const [userObject, setObject] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  // const youtubePlayerRef = useRef(null);
  useEffect(() => {
    if (featuredIn) {
      setYoutubeUrl(featuredIn.videoLink)
    }

  }, [])
  useEffect(() => {
    if (featuredIn && collectionObject === null) {

      const getCollection = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/collection/${featuredIn.connectedCollectionId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const obtainedCollection = await response.json();
          setCollectionObject(obtainedCollection)
          // console.log('Got collection:', obtainedCollection);
          setHasImg(true)
          // setFeaturedCollections(obtainedFeaturedCollections);
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      getCollection();
    }
  }, [youtubeUrl])


  // Function to extract the video ID from the YouTube URL //GPT go this for me <3
  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };
  const [isHovered, setIsHovered] = useState(false);
  // Get the video ID
  const videoId = getYouTubeVideoId(youtubeUrl);
  useEffect(() => {
    
    if (isHovered) {
      // console.log('hovering');
      hideImgWithDelay()
    } else {
      // console.log('not hovering');
      showImgWithDelay();

    }
    
  }, [isHovered])

  // Function to show the element after a delay
  const hideImgWithDelay = () => {
    setTimeout(() => {
      setIsHidden(true);
    }, 300); // 3 seconds delay
  };
  const showImgWithDelay = () => {
    setTimeout(() => {
      setIsHidden(false);
    }, 300); // 3 seconds delay
  };
  const handleClick = () => {
    console.log('click');
    // setTimeout(() => {
      setVideoPlayed(true);
      setHasImg(false);
    // }, 300);
  };

  

  return (
    <div className={`featured--component--cont ${isHovered  ? 'Hov' : 'noHov'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

    >
      <div >
        {hasImg &&
          <div
            className={`featured--coll--img ${isHidden && videoPlayed !== true ? 'hidden' : ''}`}
          // className={`featured--coll--img ${isHovered ? 'hidden' : ''}`}
          >
            <img src={collectionObject.collectionImage} />
          </div>
        }
      </div>


      {/* <YouTubePlayer videoId={videoId} /> */}
      <iframe
        className='featured--youtube--video'
        width="358"
        height="703"
        src={`https://www.youtube.com/embed/${videoId}?si=gmSGHP9k7cMgzkGa&controls=0&showinfo=0&iv_load_policy=3`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen

      ></iframe>
      <div className='featured--info--cont'>
        {collectionObject &&
          <div >
            <h2>{collectionObject.collectionName}</h2>
            <h3></h3>
          </div >
        }

      </div>
    </div>
  )
}

export default FeaturedCollection