import React, { useState, useEffect } from 'react'
import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';


function CollectionForm_v2({collectionIn, onSubmit, userIdin }) {
    var collection = collectionIn
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const { addToast } = useToastContext();
    const {
        uploadStarted,
        setUploadStarted,
        startUploadProcess,
        FL_currentAsset, setFL_currentAsset,
        isEditingSelectedAsset, setIsEditingSelectedAsset,
        FL_uploadDate, setFL_UploadDate
    } = useUploadContext();
    // const userIdin = '650ca3a3cf7964c5cb70782c';
    const [formDataCollection, setFormDataCollection] = useState({
        collectionName: '',
        creatorName: userIdin,
        collectionDate: FL_uploadDate || '' ,
        collectionDescription: '',
        collectionPriceUSD:  0,
        collectionInformationTags: [],
        collectionImage:'',
        collectionAssetArray: null,
    });

    useEffect(() => {
        setFL_UploadDate('')
        if(collection !== null){
            setFormDataCollection(collection)
        }
    }, [])

    

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const buttonStyle = {
        transform: isMouseDown ? 'scale(0.98)' : 'scale(1)',
    };

    
    
    // collectionName: collection.collectionName ||'',
    //     creatorName: userIdin,
    //     collectionDate: FL_uploadDate || '' ,
    //     collectionDescription: collection.collectionDescription || '',
    //     collectionPriceUSD: collection.collectionPriceUSD || 0,
    //     collectionInformationTags: collection.collectionInformationTags || [],
    //     collectionImage:collection.collectionImage || '',
    //     collectionAssetArray: collection.collectionAssetArray || [{}],
    const resetCollectionForm = () => {
        setFormDataCollection({
            collectionName: '',
            creatorName: userIdin,
            collectionDate: '',
            collectionDescription: '',
            collectionPriceUSD: 0,
            collectionInformationTags: [],
            collectionImage: '',
            collectionAssetArray: [{}],
        });
    };
    //*
    // collection info
    const handleCollInfoChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'collectionInformationTags':
                let tagArray = value.split(', ');
                setFormDataCollection({ ...formDataCollection, [name]: tagArray });
                break;
            case 'collectionDate':
                setFL_UploadDate(value);
                // console.log(value)

                setFormDataCollection({ ...formDataCollection, [name]: value });
                break;
            case 'collectionPriceUSD':
                console.log(parseFloat(value))
                setFormDataCollection({ ...formDataCollection, [name]: parseFloat(value) });
                break;
            default:
                setFormDataCollection({ ...formDataCollection, [name]: value });
        }
        // console.log(formDataCollection)
        // updateAllAssets();
    };

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        if (formDataCollection.collectionPriceUSD === 0) {
            console.log('price is 0')
            return;
        } else {
            // if (!isConfirmed) {
            //   setErrorMessage('Please confirm the submission');
            //   console.error('Please confirm the submission');
            //   return;
            // }

            if (formDataCollection.collectionName.trim() === '' || formDataCollection.collectionName.length > 100) {
                setErrorMessage('Invalid collection name. Please enter a valid name.');
                console.error('Invalid collection name. Please enter a valid name.');
                addToast('Invalid collection name. Please enter a valid name.');
                return;
            }

            if (formDataCollection.collectionDescription.length > 5000) {
                setErrorMessage('Invalid collection description. Please keep it within 500 characters.');
                console.error('Invalid collection description. Please keep it within 500 characters.');
                addToast('Invalid collection description. Please keep it within 500 characters.');
                return;
            }
            const tagList = [];
            for (const tag of formDataCollection.collectionInformationTags) {
                if (tag.trim() === ', ' || tag.length > 50) {
                    setErrorMessage('Invalid information tag. Please enter valid tags.');
                    console.error('Invalid information tag. Please enter valid tags.');
                    addToast('Invalid information tag. Please enter valid tags.');
                    return;
                } else {
                    tagList.push(tag);
                }
            }

            // if (formDataCollection.collectionImage.trim() === '') {
            //   setErrorMessage('Invalid image URL. Please enter a valid URL.');
            //   console.error('Invalid image URL. Please enter a valid URL.');
            //   addToast('Invalid image URL. Please enter a valid URL.');
            //   return;
            // }

            if (isNaN(formDataCollection.collectionPriceUSD) || formDataCollection.collectionPriceUSD <= 0) {
                setErrorMessage('Invalid price. Please enter a valid number greater than 0.');
                console.error('Invalid price. Please enter a valid number greater than 0.');
                addToast('Invalid price. Please enter a valid number greater than 0.');
                return;
            }

            const collectionFormData = {
                collectionName: formDataCollection.collectionName,
                creatorName: userIdin,
                collectionDate: formDataCollection.collectionDate,
                collectionDescription: formDataCollection.collectionDescription,
                collectionPriceUSD: parseFloat(formDataCollection.collectionPriceUSD),
                collectionInformationTags: formDataCollection.collectionInformationTags,
                collectionImage: '',
                collectionAssetArray: [{}],
            };

            // setFormDataCollection(collectionFormData);
            // updateAllAssets();

            // setIsCollInfoFormComplete(true);//for testing only!!
            onSubmit(collectionFormData);
            // switchContentVal('ASSET_ARRAY');
            // remove later!!
        }



    }
    return (
        <form onSubmit={handleInfoSubmit} className='collection--upload--page--content--cont'>

            <div className='collection--upload--left'>
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
                    <h4>(Not required, 5000 characters max)</h4>
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

            <div className='collection--upload--right'>
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
                            Future Legacy prides itself on hosting the highest quality authentically human made assets, by checking this box you understand that your image will be verified as human.
                        </p>
                    </label>
                    <div>
                        <button type="submit"
                            disabled={!isConfirmed}
                            className='FL_btn__2 button--width--713'
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            style={buttonStyle}
                        >Confirm Collection Info</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CollectionForm_v2