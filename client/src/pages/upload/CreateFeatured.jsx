import React, { useEffect, useState } from 'react'
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';
import ContentTitle from '../../components/containers/ContentTitle';
import Dropdown from '../../components/dropdown/Dropdown';

import './style.css'

function CreateFeatured() {
    const [collectionsInSystem, setCollectionsInSystem] = useState(null);
    // const [collectionNames, setCollectionNames] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [disableRadios, setDisableRadios] = useState(false);
    const [featuredId, setFeaturedId] = useState(null)
    let collectionNames = [];
    useEffect(() => {
        // http://localhost:3000/profile
        const fetchCollections = async () => {
            const collectionsResponse = await fetch(`http://localhost:5000/api/collection/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                }
            })
            const collectionsJson = await collectionsResponse.json()
            if (collectionsResponse.ok) {
                setCollectionsInSystem(collectionsJson);
            } else {

            }
        }

        fetchCollections()
    }, []);



    const [selectedRadioOption, setSelectedRadioOption] = useState(0);
    const [collectionToFeature, setCollectionToFeature] = useState(null);

    const handleRadioChange = (collectionIn) => {
        setSelectedRadioOption(collectionIn._id)
        setCollectionToFeature(collectionIn)

    }
    const [formData, setFormData] = useState({
        userId: '',
        connectedCollectionId: '',
        videoLink: '',
        startDate: '',
        endDate: '',
        importance: 6,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createFeaturedCollection = async () => {
        
        let featuredCollection = {
            userId: collectionToFeature.ownerName,
            connectedCollectionId: collectionToFeature._id,
            videoLink: formData.videoLink,
            startDate: formData.startDate,
            endDate: formData.endDate,
            importance: formData.importance,
        }
        console.log(featuredCollection);
        try {
            const response = await fetch('http://localhost:5000/api/featured/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(featuredCollection),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const createdFeaturedCollection = await response.json();
            console.log('Created Featured Collection:', createdFeaturedCollection);
            setFeaturedId(createdFeaturedCollection._id)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    useEffect(()=>{
        if(featuredId == null){
            return;
        } else {
            updateCollection();
        }
        
    },[featuredId])
    const updateCollection = async () => {
        console.log(collectionToFeature._id);
        console.log(featuredId);
    
        try {
            const response = await fetch(`http://localhost:5000/api/collection/${collectionToFeature._id}/add-featured/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    featuredId,
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
            }
    
            const updatedCollection = await response.json();
            console.log('updated collection:', updatedCollection);
            // setFeaturedCollId(createdFeaturedCollection._id)
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    
    return (
        <AppContentWrapper>
            <PageContainer>
                <PageTitle><h2>Create Featured</h2></PageTitle>

                <section>
                    {collectionsInSystem && (
                        <>
                            {collectionsInSystem.map((option) => (
                                <label key={option._id} className="radio-label">
                                    <input
                                        type="radio"
                                        name="collectionRadio"
                                        value={option.collectionName}
                                        checked={selectedRadioOption === option._id}
                                        onChange={() => handleRadioChange(option)}
                                    />
                                    <span className="radio-custom"></span>
                                    {option.collectionName}
                                </label>
                            ))}
                        </>
                    )}
                </section>
                {collectionToFeature && (
                    <section>
                        <ContentTitle><h3>Selected Collection: {collectionToFeature.collectionName} </h3></ContentTitle>
                        <div className='featured--form--cont'>
                            <label>User ID:
                                <input type="text" name="userId" value={collectionToFeature.ownerName} onChange={handleChange} disabled />
                            </label>

                            <label>Connected Collection ID:
                                <input type="text" name="connectedCollectionId" value={collectionToFeature._id} onChange={handleChange} disabled />
                            </label>

                            <label>Video Link:
                                <input type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} required />
                            </label>

                            <label>Start Date:
                                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                            </label>

                            <label>End Date:
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                            </label>

                            <label>Importance:
                                <input type="number" name="importance" value={formData.importance} onChange={handleChange} required min="1" max="6" />
                            </label>

                            <button type="button" onClick={createFeaturedCollection}>Create Featured Collection</button>
                        </div>

                    </section>
                )}
            </PageContainer>
        </AppContentWrapper>
    )
}

export default CreateFeatured