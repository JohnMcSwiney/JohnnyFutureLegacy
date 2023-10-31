import React, { useState, useEffect } from 'react'

import { FileUploader } from "react-drag-drop-files";

import FL_DragDrop from './FL_DragDrop';

import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';




function CollectionForm() {
    const { clearUploadData, setUploadValue } = useUploadContext();
    const [tempCountVar, setTempCountVar] = useState(0)
    const [parentPictureData, setParentPictureData] = useState(null);
    const hardcodedUser = '650ca3a3cf7964c5cb70782c';
    useEffect(() => {
        clearUploadData()
        setUploadValue("COLLECTION")
    }, [tempCountVar])

    const incrementCount = () => {
        setTempCountVar(tempCountVar + 1)
    }
    const handlePictureData = (pictureData) => {
        setParentPictureData(pictureData);
        console.log(pictureData);
    }
    return (
        <div className='create--coll--page'
            onClick={incrementCount}
        >
            <h2>Create a collection</h2>
            <section>
                <FL_DragDrop onSubmit={handlePictureData} />
            </section>
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
                                <div className="uploaded--image" key={index}>
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
        </div>
    )
}

export default CollectionForm