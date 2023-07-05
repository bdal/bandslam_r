import React from 'react'
import ErrorText from '../common/ErrorText';

const UploadErrorText = ({ isParentError }) => {
    return (<>
        {(() => {
            switch (isParentError) {
                case 'multipleError':
                    return <ErrorText>Only 1 file can be uploaded at a time</ErrorText>
                case 'formatError':
                    return <ErrorText>Only following file formats are acceptable: mp4</ErrorText>
                default:
                    return <div></div>;
            }
        })()
        }
    </>)
}

export default UploadErrorText