import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Emoji from './Emoji';
import './Upload.css'

const DragAndDropFiles = ({ onUpload, count, formats, children, setisParentError }) => {
    const drop = useRef(null); //initial state is null
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
            setDragging(true);
            setfileStatus('empty');
            setisParentError();
        }

        const handleDragLeave = (e) => {
            preventDefaults(e);
            setDragging(false);
        }

        // bind the event handler to an event using 'addEventListener' on the DOM element
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
        drop.current.addEventListener('dragenter', handleDragEnter);
        drop.current.addEventListener('dragleave', handleDragLeave);

        const element = drop.current;
        return () => {
            // Return a cleanup function for the useEffect hook that removes the assigned event handler. This is called when component unmounts.
            // This avoids memory leaks and potentially having multiple listeners, when we only expect one.

            element.removeEventListener('dragover', handleDragOver);
            element.removeEventListener('drop', handleDrop);
            element.removeEventListener('dragenter', handleDragEnter);
            element.removeEventListener('dragleave', handleDragLeave);
        }
    }, []);  //provide '[]' as dependency list, 
    // to only register even listener once the component is mounted. otherwise it will run on every render

    return (
        <div ref={drop}
            className='FilesDragAndDrop__area'>
            {dragging ?
                'Yeah!' :
                'Drop it like its hot'}
            <Emoji fileStatus={fileStatus} />
            {children}
        </div>)
}

// DragAndDropFiles.propTypes = {
//     onUpload: PropTypes.func.isRequired,
// };

export default DragAndDropFiles