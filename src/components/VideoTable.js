import React from 'react'

import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from '@vidstack/react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';

function VideoPlayer({ video }) {

const src = (video === undefined || video === null) ?
'' : process.env.REACT_APP_MEDIA_SERVER_URL + 
':' +   process.env.REACT_APP_MEDIA_SERVER_PORT +   
'/' + video.videoName;

const vidName = (video === undefined || video === null) ?
'' : video.songName;

  return (
    //TODO: if fail to return video content, also display error message.
    <MediaPlayer
      title={vidName}
      src={src} type="file"      
      aspectRatio={16 / 9}
    >
      <MediaOutlet>
      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
       
    );
}

const handlePopOver = (event) => {
  console.log('test test'); //to do insert 'playing/sound here.
}

const VideoTable = ({ video , index, isLoading, isError}) => {

  return (
    (isLoading || video === undefined) ?
    <Skeleton variant="rounded" width={600} height={338} /> :
    (isError ?
      <p>There was an error trying to load the videos.</p> : 
      <Box onMouseEnter={handlePopOver} sx={{
        width: 600,
        height: 338
      }}>
        <VideoPlayer on video={video.data[index]} />
      </Box>)
  )
}

export default VideoTable