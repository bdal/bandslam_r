import React from 'react'
import { useState, useRef, useEffect } from 'react';

import './Upload.css'
import axios from 'axios';
import DefaultTemplate from '../layout/DefaultTemplate';
import DragAndDropFiles from './DragAndDropFiles';
import UploadErrorText from './UploadErrorText';
import InputFields from './InputFields';

const Upload = () => {
    const [isParentError, setisParentError] = useState(null);

    const uploadFiles = async (files) => {
        console.log(files[0]);
        const formData = new FormData();
        formData.append('file', files[0]);

        axios.post('https://localhost:7281/videoupload', formData)
            .then((response) => {
                console.log('response', response.data)
            })

        // const data = await res.json()
        // console.log(data)
        // return data
    }

    const onUpload = async (files) => {
        console.log(files);
        await uploadFiles(files);
    };

    return (
        <DefaultTemplate>
            <DragAndDropFiles
                onUpload={onUpload}
                count={1}
                formats={['mp4']}
                setisParentError={setisParentError} />
            <UploadErrorText isParentError={isParentError} />
            <InputFields isParentError={isParentError} />
        </DefaultTemplate>
    );
}


export default Upload

// OLD

// const uploadFilesOld = async (files) => {
//     console.log(files[0]);
//     const formData = new FormData();
//     formData.append('file', files[0]);

//     const res = await fetch('https://localhost:7281/videoupload', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'content-type': files[0].type,
//             'content-length': `${files[0].size}`
//         },
//         body: formData
//     })

//     const data = await res.json()
//     console.log(data)
//     return data
// }

// #########################################

// function DragDropFile() {
//     return (
//         // <Input type='file'/>
//         <form id='form-file-upload'>
//             <label for='label-file-upload'>
//                 <div>
//                     <p>Drag and drop your file here or</p>
//                     <button className="upload-button">Upload a file</button>
//                 </div></label>
//             {/* accept any video file type */}
//             <input id='input-file-upload' type='file' accept='video/*'></input>
//         </form>
//     )
// }