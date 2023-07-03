import React from 'react'
import { useState, useRef, useEffect } from 'react';

import { ThemeProvider, createTheme, withStyles } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid'; // Grid version 1
import bandslamlogo from './1058591_c.png';
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
import { Input } from '@mui/material';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import './Upload.css'
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';
import { red } from '@mui/material/colors';

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
    const [isError, setisError] = useState(false);

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
                setisError(true);
                setisParentError('multipleError');
                return;
            }

            // check if some uploaded file is not in one of the allowed formats
            if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
                console.log(`Only following file formats are acceptable: ${formats.join(', ')}`);
                setisError(true);
                setisParentError('formatError');
                return;
            }

            if (files && files.length) {
                onUpload(files);
            }
        }

        const handleDragEnter = (e) => {
            preventDefaults(e);
            console.log('handleDragEnter (1 PARENT)');

            setDragging(true);
            setisError(false);
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

    function ReturnEmoji({ isError }) {
        if (isError) {
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
            >&#128526;</span>
        )
    }

    return (<div ref={drop}
        className='FilesDragAndDrop__area'>
        {dragging ?
            'Yeah!' :
            'Drop it like its hot'}
        <ReturnEmoji isError={isError} />
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
    const [isParentError, setisParentError] = useState(null)

    const onUpload = (files) => {
        console.log(files);
    };

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
                </Grid>
            </div>
        </ThemeProvider>
    );
}


export default Upload