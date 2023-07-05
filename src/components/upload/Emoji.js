import React from 'react'
import './Upload.css'

const Emoji = ({ fileStatus }) => {
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

export default Emoji