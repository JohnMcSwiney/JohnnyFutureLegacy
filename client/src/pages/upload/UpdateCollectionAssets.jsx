import React, { useEffect, useState } from 'react';
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';
import ContentTitle from '../../components/containers/ContentTitle';
import API_BASE_URL from '../../apiConfig';
import './style.css';

function UpdateCollectionAssets() {
    const [collectionsInSystem, setCollectionsInSystem] = useState(null);
    const [selectedRadioOption, setSelectedRadioOption] = useState(null);
    const [collectionToFeature, setCollectionToFeature] = useState(null);

    useEffect(() => {
        const fetchCollections = async () => {
            const collectionsResponse = await fetch(`${API_BASE_URL}/api/collection/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
            });

            const collectionsJson = await collectionsResponse.json();

            if (collectionsResponse.ok) {
                setCollectionsInSystem(collectionsJson);
            }
        };

        fetchCollections();
    }, []);

    const handleRadioChange = (collection) => {
        setSelectedRadioOption(collection._id);
        setCollectionToFeature(collection);
    };

    const updateCollectionAssets = async () => {
        try {
            // Extract asset IDs from the collection
            const assetIds = collectionToFeature.collectionAssets.map((asset) => asset._id);
            console.log('Asset IDs:', assetIds);

            const response = await fetch(`${API_BASE_URL}/api/collection/${collectionToFeature._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assetIds
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
            }

            const updatedCollection = await response.json();
            console.log('Updated collection assets:', updatedCollection);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <AppContentWrapper>
            <PageContainer>
                <PageTitle>
                    <h2>Update Collection Assets</h2>
                </PageTitle>

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
                        <ContentTitle>
                            <h3>Selected Collection: {collectionToFeature.collectionName} </h3>
                        </ContentTitle>
                        <div className="update-assets-form-cont">
                            {/* Add any input fields or controls needed for updating assets */}
                            <button type="button" onClick={updateCollectionAssets}>
                                Update Collection Assets
                            </button>
                        </div>
                    </section>
                )}
            </PageContainer>
        </AppContentWrapper>
    );
}

export default UpdateCollectionAssets;