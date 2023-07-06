import React from 'react'
import { useState, useRef, useEffect } from 'react';

import './Upload.css'
import axios from 'axios';
import DefaultTemplate from '../layout/DefaultTemplate';
import DragAndDropFiles from './DragAndDropFiles';
import UploadErrorText from './UploadErrorText';
import InputFields from './InputFields';
import CustomButton from '../CustomButton';

const initialValues = {
    artistName: "",
    songName: "",
    venueName: "",
    cityName: "",
    date: ""
};

const Upload = () => {
    const [isParentError, setisParentError] = useState(null);
    const [inputfields, setInputfields] = useState(null);
    const [videoData, setVideoData] = useState({});

    const handleFormSubmit = async () => {
        console.log('button click');
        const formData = new FormData();
        formData.append('file', videoData);

        for (let key in inputfields){
            console.log(key);
            formData.append(key, inputfields[key]);
        }

        for (let obj of formData) {
            console.log(obj);
        }

        // axios.post('https://localhost:7281/videoupload', formData)
        // .then((response) => {
        //     console.log('response', response.data)
        // })
        const res = await fetch("https://localhost:7281/videoupload", {
            method: 'POST',
            body: formData
        })

        const response = await res.json();
        console.log(response);
        if (response.succeeded){
            console.log('success');
        }
    }

    const onUpload = (files) => {
        setVideoData(files[0]);
    };

    const handleInputFields = (inputFields) => {
        setInputfields(inputFields);
    }

    return (
        <DefaultTemplate>
            <DragAndDropFiles
                onUpload={onUpload}
                count={1}
                formats={['mp4']}
                setisParentError={setisParentError}>
            </DragAndDropFiles>
            <UploadErrorText isParentError={isParentError} />
            <InputFields
                isParentError={isParentError}
                handleInputFields={handleInputFields} />
            <CustomButton
                onClick={handleFormSubmit}
            // disabled={isParentError != 'success'}
            >Submit</CustomButton>
        </DefaultTemplate>
    );
}

export default Upload