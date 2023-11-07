import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import CollectionCard_v2 from '../home/CollectionCard_v2';

export default function UserCard({ toggleView, userId, collectionImg }) {
    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [userIsInstit, setUserIsInstit] = useState(false);
    const [collections, setCollectionIds] = useState(null);
    const [collectionObjects, setCollectionObjects] = useState(null);
    const [displayCard, setDisplayCard] = useState(false)
    const navigate = useNavigate();
    // console.log()
    // console.log(userId)
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
        // if (collectionIn) {

        //   navigate(`/collection/${collectionIn._id}`);
        // }
    };

    return (
        <>
            {displayCard ? (
                <div
            className={toggleView ? 'coll--card--row' : 'user--card--grid'}
            onClick={handleRedirect}
        >
                    {toggleView ? (
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
                        </div>
                    ) : (
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
                            <div className="user--card--collection--display">
                                {collections.map((collection) => (
                                    <CollectionCard_v2
                                        key={collection._id}
                                        collectionIn={collection}
                                        toggleView={toggleView}
                                    />  
                                ))
                                }
                            </div>

                            {/* <div className="coll--card--img--cont">
            
            <img src={collectionIn.collectionAssets[0].assetImage} className='coll--card--img--1'/>
            <div className="coll--card--img--title--cont">
              <h2>{collectionIn.collectionName}</h2>
            </div>
          </div> */}
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
