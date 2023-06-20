import React from 'react'
import VideoTable from './VideoTable'

import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

function LeftArrow(params) {
    return(
        <div>
            <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
        </div>
    )
}

function RightArrow(params) {
    return(
        <div>           
            <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
        </div>
    )    
}

const MediaTable = ({videos}) => {
  return (
    <div>
        <LeftArrow/>
        <VideoTable videos={videos}/>
        <RightArrow/>
    </div>
  )
}

export default MediaTable