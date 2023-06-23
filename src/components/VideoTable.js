import React from 'react'

import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from '@vidstack/react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';

function VideoPlayer({ video }) {
const src = process.env.REACT_APP_MEDIA_SERVER_URL + 
':' +   process.env.REACT_APP_MEDIA_SERVER_PORT + 
'/' + video.src;

  return (
    <MediaPlayer
      title={video.songName}
      src={src} type="file"
      

      aspectRatio={16 / 9}

    >
      <MediaOutlet>

      </MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>);
}


//import "vidstack/styles/base.css";
//import "vidstack/styles/ui/buttons.css";
//import "vidstack/styles/ui/sliders.css";

//import { MediaPlayer, MediaOutlet } from "@vidstack/react";

//function VideoPlayer()  {
//    return(
//        <MediaPlayer
//          src="C:\\src\\0_bd\\cs\\bandslam\\vid\\06062010064.mp4"
//          poster="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg"
//          controls
//          aspectRatio={16/9}
//        >
//          <MediaOutlet />
//        </MediaPlayer>
//      );
//}
const handlePopOver = (event) => {
  console.log('test test'); //to do insert 'playing/sound here.
}

const VideoTable = ({ video }) => {
  return (
    // <Grid container alignItems={'center'} direction={'column'}>
    <Box onMouseEnter={handlePopOver} sx={{
      width: 600,
      height: 338
    }}>
      <VideoPlayer on video={video} />
    </Box>
    // </Grid>
  )
}

export default VideoTable