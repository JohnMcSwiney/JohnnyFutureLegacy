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
    const [tempCountVar, setTempCountVar] = useState(0)
    const [parentPictureData, setParentPictureData] = useState(null);
    const [assetArray, setAssetArray] = useState(null);
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

    const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
    const [assetsFormData, setAssetsFormData] = useState([
        {
            assetName: '',
            creatorName: hardcodedUser,
            assetDescription: '',
            assetPriceUSD: 0,
            informationTags: [],
            assetImage: '',
            exifData: [],
        }
    ]);
    const resetAssetFormData = () => {
        setAssetsFormData({
            assetName: '',
            creatorName: hardcodedUser,
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
        // console.log('entry: ', entry)
        if (currentAssetIndex !== index) {
            console.log('setting asset index: ', index)
            setCurrentAssetIndex(index);
        }

        switchContentVal('ASSET_ARRAY');
    }
    const switchContentVal = (input) => {
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

    useEffect(() => {
        // console.log(assetsFormData);
    }, [assetsFormData]);
    // const [exifDataObj, setExifDataObj] = useState([{}]);
    const handleInfoSubmit = async (e) => {
        e.preventDefault();

        //remove later!!
        setIsCollInfoFormComplete(true);//for testing only!!
        switchContentVal('ASSET_ARRAY');
        // console.log(formDataCollection);
        // console.log(parentPictureData);
        // console.log(assetsFormData[0]);
        // console.log(parentPictureData[0].file.name);

        // setAssetsFormData({ ...assetsFormData[0], [name]: parentPictureData[0].file.name })
        // setAssetsFormData({ ...assetsFormData[1], [name]: parentPictureData[1].file.name })
        // setAssetsFormData({ ...assetsFormData[2], [name]: parentPictureData[2].file.name })
        // setAssetsFormData({ ...assetsFormData[3], [name]: parentPictureData[3].file.name })
        // setAssetsFormData({ ...assetsFormData[4], [name]: parentPictureData[4].file.name })
        let tempAssetArray = [{}];

        // parentPictureData.map((asset, index) =>(
        for (let index = 0; index < parentPictureData.length; index++) {
            // console.log(parentPictureData[index].file.name)
            let jsonExifData = `http://localhost:5000/getimageData?userId=${hardcodedUser}&filename=${parentPictureData[index].file.name}`;
            // console.log(jsonExifData);
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
            // console.log(tempAsset.exifData);
            // tempAsset.exifData = "test";

            // const promises = [];
            // let completedResponses = 0;

            // const promise = 
            fetch(jsonExifData)
                .then((response) => response.json())
                .then((data) =>{
                    // completedResponses += 1;
                    tempAsset.exifData = data.content;
                    // tempAssetArray.push(tempAsset) 
                    // console.log
                })
                .catch((error) => {
                    tempAsset.exifData = 'none';
                    // tempAssetArray.push(tempAsset) 
                  });   
                //   promises.push(promise);
                
            // // console.log(exifDataObj)
            // Promise.all(promises).then((tempAsset) => {
                tempAssetArray.push(tempAsset)
            // }
                
            // )
            
            // console.log('index', index, 'file', parentPictureData[index].file.name)
        }
        // console.log(tempAssetArray)
        if (tempAssetArray.length === parentPictureData.length + 1) {
            // console.log()
            tempAssetArray.shift()
            console.log('lists are same length')
            console.log(tempAssetArray)
            setAssetArray(tempAssetArray);
        }
        //  tempAssetObject = 
        // )
        // )


        // setTimeout(console.log(assetsFormData[0]), 10000);
    }

    //*
    // asset info
    const handleAssetChange = (e) => {
        const { name, value } = e.target;
        console.log('name: ', name, ' value: ', value, ' current asset index: ', currentAssetIndex);
        console.log(assetArray[currentAssetIndex]);
        if(name == 'assetName'){
            console.log('weouthere')
            assetArray[currentAssetIndex].assetName = value;
            console.log(assetArray[currentAssetIndex].assetName)
        }
        // setFormData({ ...asset, [name]: value });
    };
    const handleAssetData = (assetData, index) => {
        console.log("index: ", index, "asset Data: ", assetData)
        
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

                                        <div className={index === currentAssetIndex ? '' : 'hidden'}>
                                           <AssetForm_v2 asset={asset} onSubmit={handleAssetData}/>
                                        </div>
                                    ))}
                                </div> : <div></div>}
                            </div>
                        }
                    </div>
                }
            </section>
        </div>
    )
}

export default CollectionForm