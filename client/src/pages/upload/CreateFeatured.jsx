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
    const [disableRadios, setDisableRadios] = useState(false)
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
    // useEffect(() => {
    //     if (collectionsInSystem) {
    //         if (collectionsInSystem.length != 0) {
    //             for (let i = 0; i < collectionsInSystem.length; i++) {
    //                 collectionNames.push(collectionsInSystem[i]._id);
    //             }
    //         }
    //     }
    // }, [collectionsInSystem])


    const [selectedRadioOption, setSelectedRadioOption] = useState(0);

    return (
        <AppContentWrapper>
            <PageContainer>
                <PageTitle><h2>Create Featured</h2></PageTitle>
                <p>Selected Option: {selectedOption}</p>
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
                                        onChange={() => setSelectedRadioOption(option._id)}
                                    />
                                    <span className="radio-custom"></span>
                                    {option.collectionName}
                                </label>
                            ))}
                        </>
                    )}
                </section>

            </PageContainer>
        </AppContentWrapper>
    )
}

export default CreateFeatured