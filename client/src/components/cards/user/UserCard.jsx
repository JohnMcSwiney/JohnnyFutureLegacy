import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import CollectionCard_v2 from '../home/CollectionCard_v2';
import CollectionCarousel from '../collection/CollectionCarousel';
export default function UserCard({ toggleView, userId, collectionImg }) {
    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [userIsInstit, setUserIsInstit] = useState(false);
    const [userBannerImg, setUserBannerImg] = useState(``);
    const [collections, setCollectionIds] = useState(null);
    const [collectionObjects, setCollectionObjects] = useState(null);
    const [displayCard, setDisplayCard] = useState(false)
    const navigate = useNavigate();
    // console.log('collectionImg: ', collectionImg)
    // console.log(userId)
    useEffect(() => {
        if (collectionImg !== null && collectionImg) {
            console.log('collectionImg: ', collectionImg)
            setUserBannerImg(collectionImg)
        }
    }, [])
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await fetch(`http://localhost:5000/api/user/${userId}`, {
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
                    setUserName(temp);
                    setUserIsInstit(userJson.isInstit);
                    if (userJson.profilePictureUrl !== null && !userImg) {
                        setUserImg(userJson.profilePicture);
                        setCollectionIds(userJson.userCollections);
                    }
                } else {
                    // Handle error
                    console.log('bruh');
                }
            } catch (error) {
                // Handle error
            }
        };

        fetchUser();
    }, [userId, userImg]);
    useEffect(() => {
        let tempCollectionHolder = null
        if (collections !== null) {

            if (collections.length > 0) {
                // console.log(userName)
                // console.log(collections)
                console.log('this user has collections');
                setDisplayCard(true)
                // fetch('/api/collection/getMultiCollectionsByIds', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ collections }),
                // })
                //     .then(response => response.json())
                //     .then(data => {
                //         console.log(data); // Array of collections
                //         tempCollectionHolder = data._id
                //         console.log(tempCollectionHolder)
                //     })
                //     .catch(error => {
                //         console.error('API call failed:', error);
                //     });
            } else {
                return;
            }
        }

    }, [collections])

    const handleRedirect = () => {
        if (userId) {

          navigate(`/user/${userId}`);
        }
    };

    return (
        <>
            {displayCard ? (
                <div
                    className={toggleView ? 'coll--card--row' : 'user--card--grid'}
                    onClick={handleRedirect}
                >
                    {toggleView ? (
                        //true row view
                        <div className="coll--card--row--cont">
                            <div className="coll--card--title--cont">
                                <div className={userIsInstit ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}>
                                    {userImg ? (
                                        <img className="coll--avatar" src={userImg} alt="User Avatar" />
                                    ) : (
                                        <div>Broken Image</div>
                                    )}
                                </div>
                                <h2>{userName}</h2>
                            </div>
                            <div className="coll--card--img--cont">
                                {userBannerImg &&
                                    <img src={`http://localhost:5000/uploaded_files/${userId}/Banner/${userBannerImg}`} className='coll--card--img--1' />
                                }
                            </div>
                        </div>
                    ) : (
                        //false grid view
                        <div className="user--card--cont--grid">
                            <div className="user--card--title--cont">
                                <div className={userIsInstit ? 'coll--avatar--cont instit--shape' : 'coll--avatar--cont indiv--shape'}>
                                    {userImg ? (
                                        <img className="coll--avatar" src={userImg} alt="User Avatar" />
                                    ) : (
                                        <div>Broken Image</div>
                                    )}
                                </div>
                                <h2>{userName}</h2>
                            </div>

                            <div className="user--card--img--cont">
                                {userBannerImg &&
                                    <img src={`http://localhost:5000/uploaded_files/${userId}/Banner/${userBannerImg}`} className='coll--card--img--1' />
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
