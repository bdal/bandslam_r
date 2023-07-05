import logo from './logo.svg';
import bandslamlogo from './1058591_c.png';
import './App.css';
import { useState, useEffect, Component } from 'react';
import axios from 'axios';

// import Button from './components/Button';
import BandslamTable from './components/BandslamTable';
import StackSandbox from './components/StackSandbox';
import GridSandbox from './components/GridSandbox';
import DefaultTemplate from './components/layout/DefaultTemplate';
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

function Heading({ video, index, isLoading, isError }) {
  return (
    (isLoading || isError || video === undefined) ?
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> :
      <Grid container alignItems={'center'} direction={'column'}>
        <Grid>
          <Typography variant='h5' >
            <p>{video.data[index].artistName} - {video.data[index].venueName}</p>
          </Typography>
        </Grid>
      </Grid>
  )
}

function Timeline({ video, index, isLoading, isError }) {
  return (
    (isLoading || isError || video === undefined) ?
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> :
      <Grid container alignItems={'center'} direction={'column'}>
        <Typography variant='h6' ><p>{new Date(video.data[index].date).toDateString()}</p>
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
  const [servVideos, setServVideos] = useState();   //for API response
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // TODO:
  // Dont store 'bands' as another piece of state. rather get list of bands from 'servVideos'
  const [bands, setBands] = useState();

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

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('start loading', servVideos === undefined);
        setIsLoading(true);
        const videosFromServer = await fetchVideos();

        setServVideos(videosFromServer);

        const bandsFromServer = videosFromServer.data.map((video) => (
          video.artistName
        ))
        console.log('bands', bandsFromServer);
        setBands(bandsFromServer);

        console.log('result: ', videosFromServer)
      } catch (err) {
        console.log('error: ' + err.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
        console.log('finish loading', servVideos === undefined);
      }
    };

    getData();

  }, []); //this empty array is for if you had any dependencies


  const fetchVideos = async () => {
    const res = await fetch('https://localhost:7281/videosummary', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ "videoName": "" })
    })

    const data = await res.json()
    console.log(data)
    return data
  }

  return (
    <DefaultTemplate>
      <SearchTable isLoading={isLoading} isError={isError} bands={bands} />
      <Heading video={servVideos} index={index} isLoading={isLoading} isError={isError} />
      <Grid container direction={'row'} justifyContent={'center'}>
        <NavBox>
          <NavButton
            onClick={handlePrevClick}
            disabled={servVideos === undefined ||
              index == 0}>
            Prev
          </NavButton>
        </NavBox>
        <VideoTable video={servVideos} index={index} isLoading={isLoading} isError={isError} />
        <NavBox>
          <NavButton
            onClick={handleNextClick}
            disabled={servVideos === undefined ||
              index == (servVideos?.data.length - 1)}>
            Next
          </NavButton>
        </NavBox>
      </Grid>
      <Timeline video={servVideos} index={index} isLoading={isLoading} isError={isError} />
    </DefaultTemplate>
  );
}

export default App;
