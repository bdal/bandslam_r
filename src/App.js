import logo from './logo.svg';
import './App.css';

import Button from './components/Button';
import BandslamTable from './components/BandslamTable';
import StackSandbox from './components/StackSandbox';
import GridSandbox from './components/GridSandbox';
import SearchTable from './components/SearchTable';
import VideoTable from './components/VideoTable';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'; // Grid version 1
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const Videos = [
  {
    "artistName": "Rage Against the Machine",
    "cityName": "London",
    "countryName": "United Kingdom",
    "date": "2010-06-06T00:00:00",
    "fanFirstName": null,
    "id": 2,
    "path": "C:\\\\src\\\\0_bd\\\\cs\\\\bandslam\\\\vid",
    "songName": "People of the Sun",
    "venueName": "Finsbury Park",
    "videoName": "06062010064 - RATM - People of the Sun.mp4"
  },
  {
    "artistName": "Vampire Weekend",
    "cityName": "London",
    "countryName": "United Kingdom",
    "date": "2010-12-03T00:00:00",
    "fanFirstName": null,
    "id": 1,
    "path": "C:\\\\src\\\\0_bd\\\\cs\\\\bandslam\\\\vid",
    "songName": "A-Punk",
    "venueName": "Alexandra Palace",
    "videoName": "03122010140 - Vampire Weekend - A-Punk.mp4"
  }
]

function Heading({ video }) {
  return (
    <Grid container alignItems={'center'} direction={'column'}>
      <Grid>
        <Typography variant='h5' color={'primary'}>
          <p>{video.artistName} - {video.venueName}</p>
        </Typography>
      </Grid>
    </Grid>
  )
}

function Timeline({ video }) {
  return (
    <Grid container alignItems={'center'} direction={'column'}>
      <p>{new Date(video.date).toDateString()}</p>
    </Grid>
  )
}

//first attempt

function App() {
  return (
    <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} 
    sx={{
      minHeight: '100vh'
    }} >
      
      <SearchTable />
      <Heading video={Videos[0]} />
      <VideoTable videos={Videos[0]} />
      <Timeline video={Videos[0]} />
    </Grid>
  );
}

export default App;
