import React from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid'; // Grid version 1
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

const GridSandbox = () => {
  return (
    <Container maxWidth="sm">
<Box sx={{ bgcolor: '#cfe8fc', height: '50vh', width: '50vh'  }}>
      <Grid container spacing={2} >
        <Grid xs={2}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={2}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid xs={2}>
          <Item>xs=2</Item>
        </Grid>
        <Grid xs={8} sx={{height: '50%'}}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={2}>
          <Item>xs=2</Item>
        </Grid>
        <Grid xs={2}>
          {/* <Item>xs=2</Item> */}
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={2}>
          {/* <Item>xs=2</Item> */}
        </Grid>
      </Grid>
    </Box>
    </Container>
  )
}

export default GridSandbox