import React, { useState, useEffect } from 'react'
import { FileUploader } from "react-drag-drop-files";
import FL_DragDrop from './FL_DragDrop';
import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';
import { useNavigate } from 'react-router-dom';
import AssetForm_v2 from './AssetForm_v2';
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
        startUploadProcess
    } = useUploadContext();
    const [tempCountVar, setTempCountVar] = useState(0); //Used to start page, keeps ux smooth
    const [parentPictureData, setParentPictureData] = useState(null); //Holds picture objects from the file upload (drag/drop input) 
    const [assetArray, setAssetArray] = useState(null); //Holds asset objects
    const hardcodedUser = '650ca3a3cf7964c5cb70782c'; //remove me later!
    const navigate = useNavigate();
    const [isCollInfoFormComplete, setIsCollInfoFormComplete] = useState(false); // Tracks if the collection info has been submitted or not
    const [tabContent, setTabContent] = useState('COLLECTION_INFO');//  COLLECTION_INFO / OR / ASSET_ARRAY // used for the form tabs
    const [currentAssetIndex, setCurrentAssetIndex] = useState(0); //keeps track of the current selected asset to be edited

    const [formDataCollection, setFormDataCollection] = useState({
        collectionName: '',
        creatorName: hardcodedUser,
        collectionDate: '',
        collectionDescription: '',
        collectionPriceUSD: 0,
        collectionInformationTags: [],
        collectionImage: '',
        collectionAssetArray: [{}],
    });
    const resetCollectionForm = () => {
        setFormDataCollection({
            collectionName: '',
            creatorName: hardcodedUser,
            collectionDate: '',
            collectionDescription: '',
            collectionPriceUSD: 0,
            collectionInformationTags: [],
            collectionImage: '',
            collectionAssetArray: [{}],
        });
    };
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
            updateAllAssets();
        }
    }, [parentPictureData])

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
        resetCollectionForm();
        // clearUploadData();
    }

    const setCurrentAsset = (entry, index) => {
        if (currentAssetIndex !== index) { setCurrentAssetIndex(index); }
        switchContentVal('ASSET_ARRAY');
    }
    const switchContentVal = (input) => {
        if (isCollInfoFormComplete == false) {
            return;
            // show some toast here!
        } else { setTabContent(input); }
    }


    // Collection form methods
    //
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    const buttonStyle = {
        transform: isMouseDown ? 'scale(0.98)' : 'scale(1)',
    };
    //*
    // collection info
    const handleCollInfoChange = (e) => {
        const { name, value } = e.target;
        switch(name){
            case 'collectionInformationTags':
                let tagArray = value.split(', ');
                setFormDataCollection({ ...formDataCollection, [name]: tagArray });
                break;
            case 'collectionPriceUSD':
                setFormDataCollection({ ...formDataCollection, [name]: parseFloat(value) });
                break;
            default :
                setFormDataCollection({ ...formDataCollection, [name]: value });
        }
        console.log(formDataCollection)
        // updateAllAssets();
    };
    


    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        //remove later!!
        setIsCollInfoFormComplete(true);//for testing only!!
        switchContentVal('ASSET_ARRAY');

    }

    const updateAllAssets = () => {
        let tempAssetArray = [{}];
        if (parentPictureData) {
            if (assetArray) {

                console.log('asset objects already created, editing!');
                for (let index = 0; index < assetArray.length; index++) {
                    let itemPrice = 0;
                    let itemTags = '';

                    if(assetArray[index].assetPriceUSD !== formDataCollection.collectionPriceUSD){
                        itemPrice = assetArray[index].assetPriceUSD;
                    } else {
                        itemPrice = formDataCollection.collectionPriceUSD;
                    }

                    if(assetArray[index].informationTags !== formDataCollection.collectionInformationTags){
                        itemTags = assetArray[index].informationTags;
                    } else {
                        itemTags = formDataCollection.collectionInformationTags;
                    }
                    console.log("asset: ",assetArray[index].assetName, " price: ", itemPrice, " tags: ", itemTags)
                    const tempAsset = {
                        assetName: assetArray[index].assetName,
                        creatorName: hardcodedUser,
                        assetDescription: assetArray[index].assetDescription,
                        assetPriceUSD: itemPrice,
                        informationTags: itemTags,
                        assetImage: assetArray[index].assetImage,
                        exifData: assetArray[index].exifData,
                    }
                    tempAssetArray.push(tempAsset)
                }

            } else {
                console.log('asset objects being created')
                for (let index = 0; index < parentPictureData.length; index++) {
                    let jsonExifData = `http://localhost:5000/getimageData?userId=${hardcodedUser}&filename=${parentPictureData[index].file.name}`;
                    let exifDataObj = [];
                    const tempAsset = {
                        assetName: parentPictureData[index].file.name,
                        creatorName: hardcodedUser,
                        assetDescription: '',
                        assetPriceUSD: formDataCollection.collectionPriceUSD,
                        informationTags: formDataCollection.collectionInformationTags,
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
                if (tempAssetArray.length === parentPictureData.length + 1) {
                    tempAssetArray.shift()
                    // console.log('lists are same length')
                    console.log(tempAssetArray)
                    setAssetArray(tempAssetArray);
                }
            }

        }
    }

    //*
    // asset info
    useEffect(() => {
        // console.log('asset array changed')
    }, [assetArray]);

    const handleAssetChange = (e) => {
        const { name, value } = e.target;
        console.log('name: ', name, ' value: ', value, ' current asset index: ', currentAssetIndex);
        console.log(assetArray[currentAssetIndex]);
        if (name == 'assetName') {
            console.log('weouthere')
            assetArray[currentAssetIndex].assetName = value;
            console.log(assetArray[currentAssetIndex].assetName)
        }
        // setFormData({ ...asset, [name]: value });
    };

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
        console.log(assetArray.length, formDataCollection.collectionAssetArray.length);
    }


    //*
    // Submit all assets
    const submitCompletedCollection = () => {
        console.log('submitting collection!');
        setFormDataCollection({ ...formDataCollection, 'collectionAssetArray': assetArray })
        console.log(assetArray.length, formDataCollection.collectionAssetArray.length)
        console.log(formDataCollection)
        // assetArray.length === formDataCollection.collectionAssetArray.length 
    }
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
                <section onClick={updateUploadValue}>
                    <FL_DragDrop onSubmit={handlePictureData} />
                </section>
                : <section>

                </section>}
            <section>
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

            <section>
                {parentPictureData &&
                    <div className="collection--form--container">
                        <div className="collection--form--title">
                            <h3>Collection Creation Form</h3>
                            <button onClick={() => switchContentVal('COLLECTION_INFO')}>Collection Info</button>
                            <button onClick={() => switchContentVal('ASSET_ARRAY')}>Assets</button>
                        </div>
                        {tabContent === 'COLLECTION_INFO' &&
                            <div>
                                COLLECTION INFO
                                <form onSubmit={handleInfoSubmit} className='asset--page--content--cont'>

                                    <div className='asset--upload--left'>
                                        <div className='FL_Input__text__1'>
                                            <label>Collection Name:</label>
                                            <input
                                                type="text"
                                                name="collectionName"
                                                value={formDataCollection.collectionName}
                                                onChange={handleCollInfoChange}
                                                placeholder='Collection Name'
                                                required
                                            />
                                            <h4>(Required, 100 characters max)</h4>
                                        </div>
                                        <div className='FL_Input__text__1'>
                                            <label>Description:</label>
                                            <textarea
                                                name="collectionDescription"
                                                value={formDataCollection.collectionDescription}
                                                onChange={handleCollInfoChange}
                                                placeholder='Description Here'
                                            />
                                            <h4>(Not required, 500 characters max)</h4>
                                        </div>
                                        <div className='FL_Input__text__1'>
                                            <label>Tags:</label>
                                            <input
                                                type="text"
                                                name="collectionInformationTags"
                                                value={formDataCollection.collectionInformationTags}
                                                onChange={handleCollInfoChange}
                                                placeholder='Tag, Tag2, Tag3...'
                                            />
                                            <h4>(comma-separated)</h4>
                                        </div>
                                    </div>

                                    <div className='asset--upload--right'>
                                        <div className='upload--right--price-n-date--cont'>
                                            <div className='FL_Input__number__1'>
                                                <label>Default Asset Price:</label>
                                                <div className='inner--cont'>
                                                    <div>
                                                        <h3>$</h3>
                                                        <h4>USD</h4>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        name="collectionPriceUSD"
                                                        value={formDataCollection.collectionPriceUSD}
                                                        onChange={handleCollInfoChange}
                                                        min={0}
                                                        required
                                                    />
                                                </div>

                                            </div>
                                            <div className='FL_Input__date__1'>
                                                <label>Upload Date:</label>
                                                <input
                                                    type="date"
                                                    name="collectionDate"
                                                    value={formDataCollection.collectionDate}
                                                    onChange={handleCollInfoChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="human--made--verification--cont">
                                            <h5>Human Made Image Verification:</h5>
                                            <p>Learn more: <a>Statement Regarding AI</a></p>
                                            <label htmlFor="confirmation" className='checkbox--cont'>
                                                <input
                                                    type="checkbox"
                                                    id="confirmation"
                                                    name="confirmation"
                                                    onChange={(e) => setIsConfirmed(e.target.checked)}
                                                />
                                                <p className='human--made--description'>
                                                    Future Legacy prides itself on hosting the highest quality authentically human made assets, by checking this box you understand that your image will be verified as human.</p>
                                            </label>
                                            <div>
                                                <button type="submit"
                                                    disabled={!isConfirmed}
                                                    className='FL_btn__1 button--width--713'
                                                    onMouseDown={handleMouseDown}
                                                    onMouseUp={handleMouseUp}
                                                    style={buttonStyle}
                                                >Confirm Collection Info</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        }
                        {tabContent === 'ASSET_ARRAY' &&
                            <div>
                                {/* ASSET ARRAY! */}
                                {assetArray ? <div>
                                    {assetArray.map((asset, index) => (
                                        <div className={index === currentAssetIndex ? '' : 'hidden'} key={index}>
                                            <AssetForm_v2 asset={asset} onSubmit={handleAssetData} />

                                        </div>
                                    ))}
                                </div> : <div></div>}
                            </div>
                        }
                    </div>
                }
            </section>
            <section>
                {isCollInfoFormComplete &&
                    <button className='upload--coll--btn'
                        onClick={submitCompletedCollection}
                        //    onClick={handleSubmit} disabled={disableAll} 
                        type="submit"
                        >Create Collection</button>
                }
            </section>
        </div>
    )
}

export default CollectionForm