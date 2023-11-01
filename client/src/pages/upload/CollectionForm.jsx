import React, { useState, useEffect } from 'react'
import { FileUploader } from "react-drag-drop-files";
import FL_DragDrop from './FL_DragDrop';
import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';
import { useNavigate } from 'react-router-dom';
import './style.css'

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
    const [tempCountVar, setTempCountVar] = useState(0)
    const [parentPictureData, setParentPictureData] = useState(null);
    const hardcodedUser = '650ca3a3cf7964c5cb70782c';
    const navigate = useNavigate();

    // const [newCollectionName, setNewCollectionName] = useState('New Collection');
    // const [newCollectionDesc, setNewCollectionDesc] = useState('Click to add Collection Description')
    // const [newCollectionDate, setNewCollectionDate] = useState(Date);
    // const [newCollectionAssets, setNewCollectionAssets] = useState([{}])
    // const [newCollectionImg, setNewCollectionImg] = useState('noImg');

    const [isCollInfoFormComplete, setIsCollInfoFormComplete] = useState(false);
    const [tabContent, setTabContent] = useState('COLLECTION_INFO');//  COLLECTION_INFO / OR / ASSET_ARRAY

    const [formDataCollection, setFormDataCollection] = useState({
        collectionName: '',
        creatorName: hardcodedUser,
        collectionDate: '',
        collectionDescription: '',
        collectionPriceUSD: 0,
        collectionInformationTags: [],
        collectionImage: ''
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
        });
    };

    const [assetsFormData, setAssetsFormData] = useState([{
        assetName: '',
        creatorName: hardcodedUser,
        uploadDate: '',
        assetDescription: '',
        assetPriceUSD: 0,
        informationTags: [],
        assetImage: '',
        exifData: [],
    }]);
    const resetAssetFormData = () => {
        setAssetsFormData({
            assetName: '',
            creatorName: hardcodedUser,
            uploadDate: '',
            assetDescription: '',
            assetPriceUSD: 0,
            informationTags: [],
            assetImage: '', // Clear the assetImage if you have it
            exifData: [],
        });
    };
    useEffect(() => {
        console.log('run on reload?');
        incrementCount();
    }, [])

    useEffect(() => {
        // console.log('onload upload data check:', uploadData,
        //     " upload Started?:", uploadStarted,
        //     "uploadValue:", uploadValue);
        if (uploadData !== null && uploadStarted == true && uploadValue == 'COLLECTION' && parentPictureData == null) {
            // console.log('we have previous data');
            setParentPictureData(uploadData);
        }


    }, [tempCountVar])

    useEffect(() => {
        if (parentPictureData !== null && uploadData == null) {
            // console.log("picture data received, setting global var")
            // console.log(parentPictureData)
            setUploadData(parentPictureData);
        }
    }, [parentPictureData])

    const updateUploadValue = () => {
        if (uploadValue === 'COLLECTION') {
            // console.log("upload Value:", uploadValue);
        } if (uploadValue === 'SINGLE ASSET') {
            console.log("upload Value:", uploadValue);
            console.log("do something here!");
        } else {
            setUploadValue('COLLECTION');
        }
    }

    const incrementCount = () => {
        setTempCountVar(tempCountVar + 1)
    }

    const handlePictureData = (pictureData) => {
        startUploadProcess("COLLECTION");
        setParentPictureData(pictureData);
    }

    const resetUpload = () => {
        console.log('resetting upload');
        startUploadProcess("COLLECTION");
        setParentPictureData(null)
        // clearUploadData();
    }

    const setCurrentAsset = (entry, index) => {
        console.log('entry: ', entry)
        console.log('index: ', index)
    }
    const switchContentVal = (input) => {
        // console.log('input val: ', input )
        //     setIsCollInfoFormComplete(input);

        if (isCollInfoFormComplete == false) {
            return;
            // show some toast here!
        } else {
            console.log('input val: ', input)
            
            setTabContent(input);
        }
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
        setFormDataCollection({ ...formDataCollection, [name]: value });
    };

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        //remove later!!
        //for testing only!!

        setIsCollInfoFormComplete(true);
        switchContentVal('ASSET_ARRAY');
        console.log(formDataCollection)
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

                </section>
            }


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
                                <div className="uploaded--image" key={index} onClick={() => setCurrentAsset(entry.file, index)}>
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
                                ASSET ARRAY!
                            </div>
                        }
                    </div>
                }
            </section>
        </div>
    )
}

export default CollectionForm