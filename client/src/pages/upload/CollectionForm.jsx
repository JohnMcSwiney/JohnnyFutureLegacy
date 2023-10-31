import React, { useState, useEffect } from 'react'

import { FileUploader } from "react-drag-drop-files";

import FL_DragDrop from './FL_DragDrop';

import { useToastContext } from '../../context/ToastContext';
import { useUploadContext } from '../../context/UploadContext';




function CollectionForm() {
    const { clearUploadData,setUploadValue } = useUploadContext();
    useEffect(() =>{
        clearUploadData()
        setUploadValue("COLLECTION")
    },[])

    return (
        <div className='create--coll--page'>
            <h2>Create a collection</h2>
            <section>
            <FL_DragDrop/>
            </section>
            <section>

            </section>
        </div>
    )
}

export default CollectionForm