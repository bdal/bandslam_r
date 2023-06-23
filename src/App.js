import logo from './logo.svg';
import bandslamlogo from './1058591_c.png';
import './App.css';
import { useState, useEffect, Component } from 'react';

// import Button from './components/Button';
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
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    "videoName": "06062010064 - RATM - People of the Sun.mp4",
    // "src": "http://127.0.0.1:5500/06062010064_conv.mp4"
    "src": "06062010064_conv.mp4"
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
    "videoName": "03122010140 - Vampire Weekend - A-Punk.mp4",
    "src": "03122010140_conv.mp4"
  }
]


// Get Videos
const allVideos = async (task) => {
  const res = await fetch('https://localhost:7281/videos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify('')
  })

  const data = await res.json() //data that is returned from /videos endpoint

}


function Heading({ video, isLoading, isError }) {
  return (
    (isLoading || isError)?
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> :
      <Grid container alignItems={'center'} direction={'column'}>
        <Grid>
          <Typography variant='h5' >
            <p>{video.artistName} - {video.venueName}</p>
          </Typography>
        </Grid>
      </Grid>
  )
}

function Timeline({ video, isLoading, isError }) {
  return (
    (isLoading || isError) ?
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> :
      <Grid container alignItems={'center'} direction={'column'}>
        <Typography variant='h6' ><p>{new Date(video.date).toDateString()}</p>
        </Typography>
      </Grid >
  )
}

function NavBox({ children }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      p: 1,
      m: 1
    }}>{children}
    </Box>
  )
}

function App() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);   //for API response
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleNextClick() {
    setIndex(index + 1)
  }

  function handlePrevClick() {
    setIndex(index - 1)
  }

  function NavButton({ onClick, disabled, children }) {
    return (
      <Button
        sx={{
          height: 50
        }}
        variant='outlined'
        onClick={onClick}
        disabled={disabled}>{children}
      </Button>
    )
  }



  //temp
  useEffect(() => {
    (async () => {
      try {
        console.log('start loading');
        setIsLoading(true);
        const getVideos = await fetchVideos();
        //setVideos;
      } catch (err) {
        console.log('error: ' + err.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
        console.log('finish loading');
      }
    })();
  }, []);




  const fetchVideos = async () => {

    const res = await fetch('https://localhost:7281/videosummary', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ "videoName": "sun" })
    })

    const data = await res.json()
    return data

  }


  let video = Videos[index];
  console.log('video array length ' + Videos.length)


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='Default'>
        <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}
          sx={{
            minHeight: '100vh'
          }} >
          <img src={bandslamlogo} className="App-logo" alt="logo" />
          <SearchTable />
          <Heading video={video} isLoading={isLoading} isError={isError} />
          <Grid container direction={'row'} justifyContent={'center'}>
            <NavBox>
              <NavButton
                onClick={handlePrevClick}
                disabled={index == 0}>
                Prev
              </NavButton>
            </NavBox>
            <VideoTable video={video} isLoading={isLoading} isError={isError} />
            <NavBox>
              <NavButton
                onClick={handleNextClick}
                disabled={index == (Videos.length - 1)}>
                Next
              </NavButton>
            </NavBox>
          </Grid>
          <Timeline video={video} isLoading={isLoading} isError={isError} />
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
