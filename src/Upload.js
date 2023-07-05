import React from 'react'
import { useState, useRef, useEffect } from 'react';

import { ThemeProvider, createTheme, withStyles } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid'; // Grid version 1
import bandslamlogo from './1058591_c.png';
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
import { Box, Button, Input, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomButton from './components/CustomButton';

import './Upload.css'
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { Form } from 'react-router-dom';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function DragDropFile() {
    return (
        // <Input type='file'/>
        <form id='form-file-upload'>
            <label for='label-file-upload'>
                <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button">Upload a file</button>
                </div></label>
            {/* accept any video file type */}
            <input id='input-file-upload' type='file' accept='video/*'></input>
        </form>
    )
}

function CustomFilesDragAndDrop({ onUpload, count, formats, children, setisParentError }) {
    const drop = useRef(null); //initial state is null
    const drag = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [fileStatus, setfileStatus] = useState('empty');  //empty, error, success

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    // hook must be declared in top level of component
    useEffect(() => {
        const handleDragOver = (e) => {
            preventDefaults(e);
        }

        const handleDrop = (e) => {
            preventDefaults(e);
            console.log('Drop');

            setDragging(false);

            // this is required to convert FileList object to array
            const files = [...e.dataTransfer.files];

            if (count && count < files.length) {
                console.log(`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`);
                setfileStatus('error');
                setisParentError('multipleError');
                return;
            }

            // check if some uploaded file is not in one of the allowed formats
            if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
                console.log(`Only following file formats are acceptable: ${formats.join(', ')}`);
                setfileStatus('error');
                setisParentError('formatError');
                return;
            }

            if (files && files.length) {
                setfileStatus('success');
                setisParentError('success');
                onUpload(files);
            }
        }

        const handleDragEnter = (e) => {
            preventDefaults(e);
            console.log('handleDragEnter (1 PARENT)');

            setDragging(true);
            setfileStatus('empty');
            setisParentError();
        }

        const handleDragLeave = (e) => {
            preventDefaults(e);
            console.log('handleDragLeave (1 PARENT)');

            setDragging(false);
        }

        // bind the event handler to an event using 'addEventListener' on the DOM element
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
        drop.current.addEventListener('dragenter', handleDragEnter);
        drop.current.addEventListener('dragleave', handleDragLeave);

        return () => {
            // Return a cleanup function for the useEffect hook 
            // that removes the assigned event handler.
            // this is called when component unmounts.
            // This avoids memory leaks and potentially having multiple listeners, when we only expect one.
            drop.current.removeEventListener('dragover', handleDragOver);
            drop.current.removeEventListener('drop', handleDrop);
            drop.current.removeEventListener('dragenter', handleDragEnter);
            drop.current.removeEventListener('dragleave', handleDragLeave);

        }
    }, []);  //provide '[]' as dependency list, 
    // to only register even listener once the component is mounted.
    // otherwise it will run on every render

    function ReturnEmoji({ fileStatus }) {
        if (fileStatus === 'success') {
            return (<span
                style={{ pointerEvents: 'none' }}
                role='img'
                aria-label='emoji'
                className='area__icon'
            >&#129321;</span>)
        }

        if (fileStatus === 'error') {
            return (<span
                style={{ pointerEvents: 'none' }}
                role='img'
                aria-label='emoji'
                className='area__icon'
            >&#128557;</span>)
        }

        return (
            <span
                style={{ pointerEvents: 'none' }}
                role='img'
                aria-label='emoji'
                className='area__icon'
            >&#128528;</span>
        )
    }

    return (<div ref={drop}
        className='FilesDragAndDrop__area'>
        {dragging ?
            'Yeah!' :
            'Drop it like its hot'}
        <ReturnEmoji fileStatus={fileStatus} />
        {children}
        {/* <Grid container alignItems={'center'} direction={'column'}>
        <Typography  variant='h6' color="red">`Only following file formats are acceptable: mp4</Typography>
    </Grid> */}
    </div>)
}

CustomFilesDragAndDrop.propTypes = {
    onUpload: PropTypes.func.isRequired,
};



function ErrorText({ isParentError }) {

    return (<>
        {(() => {
            switch (isParentError) {
                case 'multipleError':
                    return <Grid container alignItems={'center'} direction={'column'}>
                        <Typography variant='h6' color="red">Only 1 file can be uploaded at a time</Typography>
                    </Grid>

                case 'formatError':
                    return <Grid container alignItems={'center'} direction={'column'}>
                        <Typography variant='h6' color="red">Only following file formats are acceptable: mp4</Typography>
                    </Grid>
                default:
                    return <div></div>;
            }
        })()
        }
    </>)
}

const Upload = () => {
    const [isParentError, setisParentError] = useState(null);
   

    const uploadFilesOld = async (files) => {
        console.log(files[0]);
        const formData = new FormData();
        formData.append('file', files[0]);

        const res = await fetch('https://localhost:7281/videoupload', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': files[0].type,
                'content-length': `${files[0].size}`
            },
            body: formData
        })

        const data = await res.json()
        console.log(data)
        return data
    }

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



    function InputFields({ isParentError }) {
        const [artistName, setArtistName] = useState('');
        const [songName, setSongName] = useState('');
        const [venueName, setVenueName] = useState('');
        const [cityName, setCityName] = useState('');
        const [date, setDate] = useState('');

        function handleFormSubmit() {
            console.log('button click');
            const formData = new FormData();
            formData.append('artistName', artistName);
            formData.append('songName', songName);
            formData.append('venueName', venueName);
            formData.append('cityName', cityName);
            formData.append('date', date);

            for (let obj of formData){
                console.log(obj);
            }
        }        


        return (
            <Grid container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'10px'}
                sx={{
                    width: '259px'
                }} >
                <Box gap={'10px'} />

                <TextField id='artistName' fullWidth label="Artist Name" required value={artistName} onChange={(e) => setArtistName(e.target.value)}></TextField>
                {/* variant='standard' */}
                <TextField id='songName' fullWidth label="Song Name" required value={songName} onChange={(e) => setSongName(e.target.value)}></TextField>
                <TextField id='venueName' fullWidth label="Venue Name" required value={venueName} onChange={(e) => setVenueName(e.target.value)}></TextField>
                <TextField fullWidth label="City Name" required value={cityName} onChange={(e) => setCityName(e.target.value)}></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker fullWidth label="Date" required value={date}  onChange={(newValue) => setDate(newValue)}></DatePicker>
                </LocalizationProvider>
                <CustomButton
                    onClick={handleFormSubmit}
                    // disabled={isParentError != 'success'}
                >Submit</CustomButton>
            </Grid>)
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className='Default'>
                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}
                    sx={{
                        minHeight: '100vh'
                    }} >
                    <img src={bandslamlogo} className="App-logo" alt="logo" />
                    <CustomFilesDragAndDrop
                        onUpload={onUpload}
                        count={1}
                        formats={['mp4']}
                        setisParentError={setisParentError} />
                    <ErrorText isParentError={isParentError} />
                    <InputFields isParentError={isParentError} />
                </Grid>
            </div>
        </ThemeProvider>
    );
}


export default Upload