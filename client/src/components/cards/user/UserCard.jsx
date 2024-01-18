import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import CollectionCard_v2 from '../home/CollectionCard_v2';
import CollectionCarousel from '../collection/CollectionCarousel';
import UserProfilePicture from '../../profilePicture/UserProfilePicture';
import API_BASE_URL from '../../../apiConfig';
export default function UserCard({ toggleView, userId}) {
    // const [userName, setUserName] = useState('');
    // const [userImg, setUserImg] = useState('');
    // const [userIsInstit, setUserIsInstit] = useState(false);
    // const [userBannerImg, setUserBannerImg] = useState(``);
    // const [collections, setCollectionIds] = useState(null);
    const [collectionObjects, setCollectionObjects] = useState(null);
    const [displayCard, setDisplayCard] = useState(false)
    const navigate = useNavigate();
    const [bannerImgVar, setBannerImgVar] = useState('')
    // console.log('collectionImg: ', collectionImg)
    // console.log(userId)
    
    const [tempUserObject, setTempUserObject] = useState({
        _id: '',
        profilePicture: '',
        isInstit: false,
        userName: '',
        userBannerImg: '',
        collections: null
      });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                if (userResponse.ok) {
                    const userJson = await userResponse.json();
                    const temp = `${userJson.firstName} ${userJson.lastName}`;
                    // console.log(userJson)
                    setTempUserObject({
                        ...tempUserObject, 
                        userName: temp,
                        isInstit:userJson.isInstit,
                        _id: userJson._id,
                        collections: userJson.userCollections,
                        profilePicture: userJson.profilePicture,
                        userBannerImg: userJson.userBannerImage
                      });
                } else {
                    // Handle error
                    console.log('bruh');
                }
            } catch (error) {
                // Handle error
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        let tempCollectionHolder = null
        if (tempUserObject.collections !== null) {

            if (tempUserObject.collections.length > 0) {
                // console.log(userName)
                // console.log(collections)
                // console.log('this user has collections');
                setDisplayCard(true)
                // console.log('temp user object:')
                // console.log(tempUserObject)
            } else {
                return;
            }
        }
        // console.log(tempUserObject)
    }, [tempUserObject])

    const handleRedirect = () => {
        if (userId) {

          navigate(`/user/${userId}`);
        }
    };

    useEffect(()=>{
        // console.log('temp user object:')
        // console.log(tempUserObject)
    },[tempUserObject])
    return (
        <>
            {displayCard ? (
                <div
                    className={toggleView ? 'coll--card--row' : 'user--card--grid'}
                    onClick={handleRedirect}
                >
                    {toggleView ? (
                        //true = row view
                        <div className="coll--card--row--cont">
                            {tempUserObject && (
                            <div className="coll--card--title--cont">
                                <UserProfilePicture currentUserObject={tempUserObject} size={1}/>
                                <h2>{tempUserObject.userName}</h2>
                            </div>
                            )}
                            {tempUserObject && (
                            <div className="coll--card--img--cont">
                                {tempUserObject.userBannerImg &&
                                    <img src={`${API_BASE_URL}/uploaded_files/${tempUserObject._id}/Banner/${tempUserObject.userBannerImg}`} className='coll--card--img--1' />
                                }
                            </div>
                            )}
                        </div>
                    ) : (
                        //false = grid view
                        <div className="user--card--cont--grid">
                            {tempUserObject && (
                            <div className="user--card--title--cont">
                                <UserProfilePicture currentUserObject={tempUserObject} size={1}/>
                                <h2>{tempUserObject.userName}</h2>
                            </div>
                            )}
                            <div className="user--card--img--cont">
                                {tempUserObject.userBannerImg &&
                                    <img src={`${API_BASE_URL}/uploaded_files/${tempUserObject._id}/Banner/${tempUserObject.userBannerImg}`} 
                                    // className='coll--card--img--1' 
                                    />
                                }
                            </div>

                            
                        </div>
                    )}</div>
            )
                :
                (
                    <div className='hidden'> don't display</div>
                )}

        </>
    );
}
