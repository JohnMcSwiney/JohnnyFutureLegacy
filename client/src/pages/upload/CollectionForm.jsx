import React, { useState } from 'react'

import { FileUploader } from "react-drag-drop-files";

import FL_DragDrop from './FL_DragDrop';





function CollectionForm() {


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