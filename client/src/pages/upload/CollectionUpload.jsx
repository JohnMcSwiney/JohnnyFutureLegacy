import React, { useState, useEffect } from 'react'
import { FileUploader } from "react-drag-drop-files";
import MultipleFileInput from './upload_Components/MultipleFileInput';
import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';
import { useNavigate } from 'react-router-dom';
import AssetForm_v2 from './AssetForm_v2';
import CollectionForm_v2 from './CollectionForm_v2';
import './style.css'
import { Asset } from '../../pages';
import ConfirmationPopup from './ConfirmationPopup';
import { useMyContext } from "../../context/FLContext";
import AppContentWrapper from '../../components/containers/AppContentWrapper';
import PageContainer from '../../components/containers/PageContainer';
import PageTitle from '../../components/containers/PageTitle';



function CollectionUpload() {
    const { clearUploadData,
        setUploadValue,
        uploadValue,
        setUploadData,
        uploadData,
        uploadCompleted,
        setUploadCompleted,
        uploadStarted,
        setUploadStarted,
        startUploadProcess,
        FL_currentAsset, setFL_currentAsset,
        isEditingSelectedAsset, setIsEditingSelectedAsset,
        FL_uploadDate, setFL_UploadDate
    } = useUploadContext();
    const [tempCountVar, setTempCountVar] = useState(0); //Used to start page, keeps ux smooth
    const [parentPictureData, setParentPictureData] = useState(null); //Holds picture objects from the file upload (drag/drop input) 
    const [assetArray, setAssetArray] = useState(null); //Holds asset objects
    // const hardcodedUser = '650ca3a3cf7964c5cb70782c'; //remove me later!
    const navigate = useNavigate();
    const [isCollInfoFormComplete, setIsCollInfoFormComplete] = useState(false); // Tracks if the collection info has been submitted or not
    const [tabContent, setTabContent] = useState('COLLECTION_INFO');//  COLLECTION_INFO / OR / ASSET_ARRAY // used for the form tabs
    const [currentAssetIndex, setCurrentAssetIndex] = useState(0); //keeps track of the current selected asset to be edited
    const { addToast } = useToastContext();
    const { currentUserObject } = useMyContext();

    const [createdAssets, setCreatedAssets] = useState([]); // holding assets created in backend  
    const [assetIds, setAssetIds] = useState([]) // holds asset ids, will be used in collection object
    const [isCreating, setIsCreating] = useState(false); // stops code from executing
    const [userConfirmation, setUserConfirmation] = useState(false)
    const [createdCollection, setCreatedCollection] = useState(null) //collection object for backend

    const [isComplete, setIsComplete] = useState(false);
    const [collectionId, setCollectionId] = useState(null);
    // helps initalize the program, and allows it to run smoothly 
    useEffect(() => {
        if (currentUserObject) {
            if (currentUserObject._id) {
                incrementCount(); //run on load
            }
        }
    }, [])
    const incrementCount = () => { setTempCountVar(tempCountVar + 1) }
    useEffect(() => {
        if (uploadData !== null && uploadStarted == true && uploadValue == 'COLLECTION' && parentPictureData == null) {
            setParentPictureData(uploadData);
        }
    }, [tempCountVar])

    // when the uploaded pictures are chosen. They're saved to a new variable
    useEffect(() => {
        if (parentPictureData !== null && uploadData == null) {
            setUploadData(parentPictureData);
        }
    }, [parentPictureData])

    // called when asset is being edited
    useEffect(() => {
        // localStorage.setItem('uploadValue', uploadValue);
        // currentAssetIndex
        if (currentAssetIndex !== FL_currentAsset) {
            setFL_currentAsset(currentAssetIndex)
        }
    }, [currentAssetIndex]);

    useEffect(() => {

        if (createdCollection !== null) {
            // console.log('collection data received! : ', createdCollection, ' updating assets... ');
            updateAllAssets();
            setIsCollInfoFormComplete(true);

        }
    }, [createdCollection]);

    useEffect(() => {
        if (assetArray !== null) {
            // console.log('asset array changed : ', assetArray);
            // setTabContent('ASSET_ARRAY');
            setIsEditingSelectedAsset(false)
        }
    }, [assetArray]);

    //updates global variable
    const updateUploadValue = () => {
        if (uploadValue === 'COLLECTION') {
        } if (uploadValue === 'SINGLE ASSET') {
            // console.log("upload Value:", uploadValue);
            // console.log("do something here!"); // redirect?
        } else {
            setUploadValue('COLLECTION');
        }
    }

    const handlePictureData = (pictureData) => {

        setParentPictureData(pictureData);
    }

    const resetUpload = () => {
        startUploadProcess("COLLECTION");
        setParentPictureData(null);
        // clearUploadData();
    }

    const setCurrentAsset = (entry, index) => {
        if (isEditingSelectedAsset === true) {
            addToast('Save Changes to continue');
            return;
        }
        if (currentAssetIndex !== index) {
            switchContentVal('ASSET_ARRAY');
            setCurrentAssetIndex(index);
        }
    }
    const switchContentVal = (input) => {
        if (isCollInfoFormComplete == false || isEditingSelectedAsset === true) {
            return;
            // show some toast here!
        } else { setTabContent(input); }
    }


    // Collection form methods
    //
    const [isMouseDown, setIsMouseDown] = useState(false);

    const updateAllAssets = () => {
        let tempAssetArray = [{}];
        let assetsDone = true;
        // console.log('in upload assets');
        if (createdCollection && parentPictureData) {
            // console.log('1st if passed');
            if (assetArray) {
                // console.log('2nd if p1');
                // console.log('asset objects already created, editing!');
                for (let index = 0; index < assetArray.length; index++) {
                    let itemPrice = 0;
                    let itemTags = '';

                    if (assetArray[index].assetPriceUSD !== createdCollection.collectionPriceUSD && assetArray[index].assetPriceUSD !== 0) {
                        itemPrice = assetArray[index].assetPriceUSD;
                    } else {
                        itemPrice = createdCollection.collectionPriceUSD;
                    }

                    if (assetArray[index].informationTags !== createdCollection.collectionInformationTags) {

                        itemTags = assetArray[index].informationTags;
                    } else {
                        itemTags = createdCollection.collectionInformationTags;
                    }
                    // console.log("asset: ", assetArray[index].assetName, " price: ", itemPrice, " tags: ", itemTags)
                    const tempAsset = {
                        assetName: assetArray[index].assetName,
                        creatorName: currentUserObject._id,
                        uploadDate: FL_uploadDate,
                        assetDescription: assetArray[index].assetDescription,
                        assetPriceUSD: itemPrice,
                        informationTags: itemTags,
                        assetImage: assetArray[index].assetImage,
                        exifData: assetArray[index].exifData,
                    }
                    tempAssetArray.push(tempAsset)
                }
                assetsDone = true;
            } else {
                // console.log('2nd if p2');
                // console.log('asset objects being created');
                // console.log(FL_uploadDate)
                for (let index = 0; index < parentPictureData.length; index++) {
                    let jsonExifData = `http://localhost:5000/getimageData?userId=${currentUserObject._id}&filename=${parentPictureData[index].file.name}`;
                    let exifDataObj = [];
                    const tempAsset = {
                        assetName: parentPictureData[index].file.name,
                        creatorName: currentUserObject._id,
                        uploadDate: FL_uploadDate,
                        assetDescription: '',
                        assetPriceUSD: createdCollection.collectionPriceUSD,
                        informationTags: createdCollection.collectionInformationTags,
                        assetImage: `http://localhost:5000/getimage?userId=${currentUserObject._id}&filename=${parentPictureData[index].fileName}`,
                        exifData: [],
                    }
                    fetch(jsonExifData)
                        .then((response) => response.json())
                        .then((data) => {
                            tempAsset.exifData = data.content;
                        })
                        .catch((error) => {
                            tempAsset.exifData = 'none';
                        });
                    tempAssetArray.push(tempAsset)
                }
                assetsDone = true;
            }
            if (assetsDone === true) {
                if (tempAssetArray.length === parentPictureData.length + 1) {
                    tempAssetArray.shift()
                    // console.log('lists are same length')
                    // console.log(tempAssetArray)
                    setAssetArray(tempAssetArray);
                }
            }
        }
    }


    const handleAssetData = (assetData) => {
        const index = currentAssetIndex;
        console.log("index: ", index, "asset Data: ", assetData);
        // Create a copy of the assets array
        const updatedAssets = [...assetArray];
        // Replace the asset at the specified index with the new assetData
        updatedAssets[index] = assetData;
        // Update the state with the new assets array
        console.log(updatedAssets[index])
        setAssetArray(updatedAssets);
        // console.log(assetArray.length, createdCollection.collectionAssetArray.length);
    }

    const handleCollectionData = (collectionData) => {
        setCreatedCollection(collectionData);
    }
    const [isPopupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        if (userConfirmation === true) {
            if (assetArray && createdCollection) {
                createAssetsInServer();
            }
        }
    }, [userConfirmation])

    useEffect(() => {
        if (assetArray && assetIds && createdAssets) {
            console.log('asset use effect if 1');
            console.log('objects: ', createdAssets.length, ' _ ', assetArray.length);
            console.log('ids:', assetIds.length, ' _ ', assetArray.length);
            if (createdAssets.length === assetArray.length
                && assetArray.length === assetIds.length
                && createdCollection.collectionAssetArray.length !== assetIds.length) {
                console.log('asset use effect if 2');
                createCollectionInServer();
            }
        }
    }, [assetIds, createdAssets]);

    const handleConfirm = () => {
        setPopupVisible(false);
        setUserConfirmation(true);
    };
    const handleCancel = () => { setPopupVisible(false); };

    //*
    const submitCompletedCollection = async () => {
        console.log('submitting collection!');
        console.log('Collection info: ', createdCollection);
        console.log('Asset info: ', assetArray);
        if (assetArray && createdCollection) {
            setPopupVisible(true);
        }

    }
    const createAssetsInServer = async () => {

        const apiUrl = 'http://localhost:5000/api/asset/';
        if (createdAssets.length !== assetArray.length && assetArray.length !== assetIds.length) {
            setIsCreating(true);
            try {
                const createdAssetsArray = [];
                const createdAssetIds = [];

                for (const assetObject of assetArray) {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(assetObject),
                    });

                    if (response.ok) {
                        const createdAsset = await response.json();
                        createdAssetsArray.push(createdAsset);
                        createdAssetIds.push(createdAsset._id);
                    } else {
                        console.error('Failed to create asset:', assetObject.assetName);
                    }
                }
                console.log(createdAssetsArray);
                if (createdAssets.length !== assetArray.length
                    && createdAssetIds.length === assetArray.length) {
                    console.log('match');
                    setCreatedAssets(createdAssetsArray);
                    setAssetIds(createdAssetIds);
                } else {
                    console.log('in create assets else: ')
                    console.log(createdAssets.length, ' _ ', assetArray.length);
                    console.log(createdAssetIds.length, ' _ ', assetArray.length);
                }
            } catch (error) {
                console.error('Error creating assets:', error);
            }

            setIsCreating(false);
        }

    };

    const createCollectionInServer = async () => {

        // console.log('creating assets');
        const apiUrl = 'http://localhost:5000/api/collection/';
        if (createdAssets.length === assetArray.length && assetArray.length === assetIds.length && createdCollection) {
            setIsCreating(true);
            try {
                const createdCollectionObject = {
                    collectionName: createdCollection.collectionName,
                    ownerName: currentUserObject._id,
                    collectionDate: createdCollection.collectionDate,
                    collectionDescription: createdCollection.collectionDescription,
                    collectionPriceUSD: createdCollection.collectionPriceUSD,
                    collectionInformationTags: createdCollection.collectionInformationTags,
                    collectionImage: createdAssets[0].assetImage,
                    collectionAssets: assetIds,
                };
                console.log('final collection object: ', createdCollectionObject);
                let serverResponseCollection = null;
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(createdCollectionObject),
                });

                if (response.ok) {
                    const createdCollection = await response.json();
                    serverResponseCollection = createdCollection;
                } else {
                    console.error('Failed to create collection:', createdCollection.collectionName);
                }
                console.log(serverResponseCollection);
                setCollectionId(serverResponseCollection._id);
                setIsComplete(true);
            } catch (error) {
                console.error('Error creating collection:', error);
            }

            setIsCreating(false);
        }

    };
    const redirectCollection = (collectionid) => { navigate(`/collection/${collectionid}`) };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };
    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    const buttonStyle = {
        transform: isMouseDown ? 'scale(0.98)' : 'scale(1)',
    };
    //adds complete collection to user
    useEffect(() => {
        if (isComplete === true) {
            if (collectionId !== null) {
                updateUser();
            }
        }
    }, [isComplete])
    const updateUser = async (e) => {
        try {
            const response = await fetch(`/api/user/${currentUserObject._id}/user-collections/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ collectionId }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('User updated:', updatedUser);
            } else {
                const errorResponse = await response.json();
                console.error('Error:', errorResponse.error);
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    }




    //                 <PageTitle>
    // </PageTitle>
    // 
    return (

        <AppContentWrapper
            onLoad={incrementCount}
            onReset={incrementCount}
            onClick={updateUploadValue}
        >
            <PageContainer>

                {isPopupVisible && (
                    <ConfirmationPopup
                        message="Confirm Creation of this Collection?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}
                <PageTitle>
                    <h2 className=''>Create a collection</h2>
                </PageTitle>
                <button
                    className='create--coll--reset--btn'
                    onClick={resetUpload}
                    disabled={userConfirmation}
                >Reset Upload Items</button>

                {userConfirmation === true ?
                    <div>
                        {isComplete ?
                            <>

                                <button
                                    onClick={() => redirectCollection({ collectionId })}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    style={buttonStyle}
                                    className='home--coll--btn'
                                >Visit Collection</button>
                            </>
                            :
                            <>
                                Creating  collection!
                                Don't refresh the page!
                            </>

                        }

                    </div> :
                    <>
                        {!parentPictureData ?
                            <section onClick={updateUploadValue}>{/* Picture uploader */}
                                <MultipleFileInput onSubmit={handlePictureData} onFileChange={() => startUploadProcess("COLLECTION")} />
                            </section>
                            : <section>

                            </section>}
                        <section>
                            {/* Asset list selector / display */}
                            {/* data received and collection can start to be created */}
                            {parentPictureData ?
                                <div className="image-preview--2">
                                    <p className="upload--images--subtitle">Images to be used in the collection</p>


                                    <div className="uploaded--image--scrollable--v2">
                                        {parentPictureData.map((entry, index) => (
                                            <div className={currentAssetIndex === index ? 'uploaded--image selected--image' : 'uploaded--image'} key={index} onClick={() => setCurrentAsset(entry.file, index)}>
                                                <img src={`http://localhost:5000/getimage?userId=${currentUserObject._id}&filename=${entry.fileName}`} alt={`Image ${entry.file.name}`} />
                                                <div className="checkbox--fix--cont">
                                                    <h4>{index + 1}</h4>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className='uploaded--image--scrollable--v2--gradient'>
                                        ...
                                    </div>

                                </div>
                                :
                                <div>

                                </div>
                            }
                        </section>

                        <section>{/* Form Container - Form 1: Collection Info - Form 2: Selected Asset Info */}
                            {parentPictureData &&
                                <div className="collection--form--container">
                                    <div className="collection--form--title">
                                        {/* <h3>Collection Creation Form</h3> */}
                                        <button onClick={() => switchContentVal('COLLECTION_INFO')} className={tabContent === 'COLLECTION_INFO' ? 'form--title--btn form--title--btn--selected' : 'form--title--btn'}>Collection Info</button>
                                        <button onClick={() => switchContentVal('ASSET_ARRAY')} className={tabContent === 'ASSET_ARRAY' ? 'form--title--btn form--title--btn--selected' : 'form--title--btn'}>Assets</button>
                                        {isCollInfoFormComplete &&
                                            <button className='upload--coll--btn'
                                                onClick={submitCompletedCollection}
                                                //    onClick={handleSubmit} disabled={disableAll} 
                                                type="submit"
                                            >Create Collection</button>
                                        }
                                    </div>
                                    {tabContent === 'COLLECTION_INFO' &&

                                        <CollectionForm_v2 collectionIn={createdCollection} onSubmit={handleCollectionData} />
                                    }
                                    {tabContent === 'ASSET_ARRAY' &&
                                        <div className='div--here'>
                                            {/* ASSET ARRAY! */}
                                            {assetArray ?
                                                <div className='div--here'>
                                                    {assetArray.map((asset, index) => (
                                                        <div className={index === currentAssetIndex ? 'another--div--named--here' : 'hidden'} key={index}>
                                                            <AssetForm_v2 asset={asset} onSubmit={handleAssetData} />
                                                        </div>
                                                    ))}
                                                </div> : <div></div>}
                                        </div>
                                    }
                                </div>
                            }
                        </section>
                    </>}

            </PageContainer>
        </AppContentWrapper>
    )
}

export default CollectionUpload