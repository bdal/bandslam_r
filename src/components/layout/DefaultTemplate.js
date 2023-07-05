import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import '../../App.css';
import bandslamlogo from '../../images/1058591_c.png';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const DefaultTemplate = ({ children }) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className='Default'>
                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}
                    sx={{
                        minHeight: '100vh'
                    }} >
                    <div className='centre-image'>
                        <img src={bandslamlogo} className="App-logo" alt="logo" />
                    </div>
                    {children}
                </Grid>
            </div>
        </ThemeProvider>
    )
}

export default DefaultTemplate   