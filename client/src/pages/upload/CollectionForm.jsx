import React, { useState, useEffect } from 'react'

import { FileUploader } from "react-drag-drop-files";

import FL_DragDrop from './FL_DragDrop';

import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';




function CollectionForm() {
    const { clearUploadData, setUploadValue } = useUploadContext();
    const [tempCountVar, setTempCountVar] = useState(0)
    const [parentPictureData, setParentPictureData] = useState(null);
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
                {parentPictureData ?
                    <div>
                        
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