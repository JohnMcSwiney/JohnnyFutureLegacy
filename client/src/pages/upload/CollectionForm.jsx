import React, { useState, useEffect } from 'react'
import { FileUploader } from "react-drag-drop-files";
import FL_DragDrop from './FL_DragDrop';
import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';
import { useNavigate } from 'react-router-dom';
import AssetForm_v2 from './AssetForm_v2';
import CollectionForm_v2 from './CollectionForm_v2';
import './style.css'
import { Asset } from '../../pages';

function CollectionForm() {
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
    const hardcodedUser = '650ca3a3cf7964c5cb70782c'; //remove me later!
    const navigate = useNavigate();
    const [isCollInfoFormComplete, setIsCollInfoFormComplete] = useState(false); // Tracks if the collection info has been submitted or not
    const [tabContent, setTabContent] = useState('COLLECTION_INFO');//  COLLECTION_INFO / OR / ASSET_ARRAY // used for the form tabs
    const [currentAssetIndex, setCurrentAssetIndex] = useState(0); //keeps track of the current selected asset to be edited
    const { addToast } = useToastContext();

    const [createdAssets, setCreatedAssets] = useState([]); // holding assets created in backend  
    const [isCreating, setIsCreating] = useState(false); // stops code from executing

    const [createdCollection, setCreatedCollection] = useState(null)

    useEffect(() => {
        incrementCount(); //run on load
    }, [])
    const incrementCount = () => { setTempCountVar(tempCountVar + 1) }

    useEffect(() => {
        if (uploadData !== null && uploadStarted == true && uploadValue == 'COLLECTION' && parentPictureData == null) {
            setParentPictureData(uploadData);
        }
    }, [tempCountVar])

    useEffect(() => {
        if (parentPictureData !== null && uploadData == null) {
            setUploadData(parentPictureData);
        }
    }, [parentPictureData])
    useEffect(() => {
        // localStorage.setItem('uploadValue', uploadValue);
        // currentAssetIndex
        if (currentAssetIndex !== FL_currentAsset) {
            setFL_currentAsset(currentAssetIndex)
        }
    }, [currentAssetIndex]);

    useEffect(() => {
        
        if(createdCollection !== null){
            console.log('collection data received! : ', createdCollection, ' updating assets... ');
            updateAllAssets();
            setIsCollInfoFormComplete(true);
            
        }
    }, [createdCollection]);

    useEffect(() => {
        if(assetArray !== null){
            console.log('asset array changed : ', assetArray);
            // setTabContent('ASSET_ARRAY');
            setIsEditingSelectedAsset(false)
        }
    }, [assetArray]);

    //updates global variable
    const updateUploadValue = () => {
        if (uploadValue === 'COLLECTION') {
        } if (uploadValue === 'SINGLE ASSET') {
            console.log("upload Value:", uploadValue);
            console.log("do something here!"); // redirect?
        } else {
            setUploadValue('COLLECTION');
        }
    }

    const handlePictureData = (pictureData) => {
        startUploadProcess("COLLECTION");
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
        console.log('in upload assets');
        if (createdCollection && parentPictureData) {
            console.log('1st if passed');
            if (assetArray) {
                console.log('2nd if p1');
                console.log('asset objects already created, editing!');
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
                        creatorName: hardcodedUser,
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
                console.log('2nd if p2');
                console.log('asset objects being created');
                // console.log(FL_uploadDate)
                for (let index = 0; index < parentPictureData.length; index++) {
                    let jsonExifData = `http://localhost:5000/getimageData?userId=${hardcodedUser}&filename=${parentPictureData[index].file.name}`;
                    let exifDataObj = [];
                    const tempAsset = {
                        assetName: parentPictureData[index].file.name,
                        creatorName: hardcodedUser,
                        uploadDate: FL_uploadDate,
                        assetDescription: '',
                        assetPriceUSD: createdCollection.collectionPriceUSD,
                        informationTags: createdCollection.collectionInformationTags,
                        assetImage: `http://localhost:5000/getimage?userId=${hardcodedUser}&filename=${parentPictureData[index].fileName}`,
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
            if(assetsDone === true){
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
        
        console.log('collectionSubmitted!');
        // console.log(collectionData);
        setCreatedCollection(collectionData);
    }

    //*
    // Submit all assets
    const submitCompletedCollection = async () => {
        console.log('submitting collection!');
        // updateAllAssets();
        // let result = await setFormDataCollection({ ...createdCollection, 'collectionAssetArray': assetArray })
        // console.log(result)
        // console.log(assetArray.length, createdCollection.collectionAssetArray.length)
        // console.log(createdCollection)
        // Compare the lengths after the update
        if (assetArray.length === createdCollection.collectionAssetArray.length) {
            console.log('Lengths are equal.');
            createCollectionsInServer();


        } else {
            console.log('Lengths are not equal.');
            console.log('Collection info: ', createdCollection);
            console.log('Asset info: ', assetArray)
        }
    }
    const createAssetsInServer = async () => {
        setIsCreating(true);
        const apiUrl = 'http://localhost:5000/api/asset/';
        try {
            const createdAssetsArray = [];

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
                } else {
                    console.error('Failed to create asset:', assetObject.assetName);
                }
            }
            console.log(createdAssetsArray);
        } catch (error) {
            console.error('Error creating assets:', error);
        }

        setIsCreating(false);
    };

    const createCollectionsInServer = async () => {
        setIsCreating(true);
        const apiUrl = 'http://localhost:5000/api/collection/';
        try {
            const createdCollectionObject = {};
            const assetsCreated = await createAssetsInServer();
            // if(createdCollection.collectionAssetArray.length === 0){
            //     createAssetsInServer();
            //     return;
            // }
            console.log('assets created? ', assetsCreated)
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(createdCollection),
                });

                if (response.ok) {
                    const createdCollection = await response.json();
                    createdCollectionObject = createdCollection;
                } else {
                    console.error('Failed to create asset:', createdCollection.collectionName);
                }
            console.log(createdCollectionObject);
        } catch (error) {
            console.error('Error creating assets:', error);
        }

        setIsCreating(false);
    };

    return (
        <div className='create--coll--page'
            onLoad={incrementCount}
            onReset={incrementCount}
            onClick={updateUploadValue}
        >
            <h2>Create a collection</h2>
            <button
                className='create--coll--reset--btn'
                onClick={resetUpload}
            >Reset Upload Items</button>
            {!parentPictureData ?
                <section onClick={updateUploadValue}>{/* Picture uploader */}
                    <FL_DragDrop onSubmit={handlePictureData} />
                </section>
                : <section>

                </section>}
            <section>{/* Asset list selector / display */}
                {/* data received and collection can start to be created */}
                {parentPictureData ?
                    <div className="image-preview--2">
                        <span className="image-preview--title--2">
                            {/* <h4 className="upload--title">4: Fill out collection information </h4> */}
                            <p className="upload--subtitle">Images to be used in the collection</p>
                        </span>

                        <div className="uploaded--image--scrollable">
                            {parentPictureData.map((entry, index) => (
                                <div className={currentAssetIndex === index ? 'uploaded--image selected--image' : 'uploaded--image'} key={index} onClick={() => setCurrentAsset(entry.file, index)}>
                                    <img src={`http://localhost:5000/getimage?userId=${hardcodedUser}&filename=${entry.fileName}`} alt={`Image ${entry.file.name}`} />
                                </div>
                            ))}
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
                            
                            <CollectionForm_v2 collectionIn={createdCollection} onSubmit={handleCollectionData}/>
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
            <section>{/* Collection Creation Submission */}
                {/* {isCollInfoFormComplete &&
                    <button className='upload--coll--btn'
                        onClick={submitCompletedCollection}
                        //    onClick={handleSubmit} disabled={disableAll} 
                        type="submit"
                    >Create Collection</button>
                } */}
            </section>
        </div>
    )
}

export default CollectionForm