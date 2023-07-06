import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import { Box, Button, Input, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CustomButton from '../CustomButton';


const InputFields = ({ isParentError, handleInputFields }) => {
    const [artistName, setArtistName] = useState('');
    const [songName, setSongName] = useState('');
    const [venueName, setVenueName] = useState('');
    const [cityName, setCityName] = useState('');
    const [date, setDate] = useState('');

    function handleFormSubmit() {
        console.log('button click');
        const formData = new FormData();
        formData.append('artistName', artistName);
        formData.append('songName', songName);
        formData.append('venueName', venueName);
        formData.append('cityName', cityName);
        formData.append('date', date);
        handleInputFields(formData);

       
    }

    return (
        <Grid container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'10px'}
            sx={{
                width: '259px'
            }} >
            <Box gap={'10px'} />
            <TextField id='artistName' fullWidth label="Artist Name" required value={artistName} onChange={(e) => setArtistName(e.target.value)}></TextField>
            {/* variant='standard' */}
            <TextField id='songName' fullWidth label="Song Name" required value={songName} onChange={(e) => setSongName(e.target.value)}></TextField>
            <TextField id='venueName' fullWidth label="Venue Name" required value={venueName} onChange={(e) => setVenueName(e.target.value)}></TextField>
            <TextField fullWidth label="City Name" required value={cityName} onChange={(e) => setCityName(e.target.value)}></TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker fullWidth label="Date" required value={date} onChange={(newValue) => setDate(newValue)}></DatePicker>
            </LocalizationProvider>
            <CustomButton
                onClick={handleFormSubmit}
            // disabled={isParentError != 'success'}
            >Submit</CustomButton>
        </Grid>)
}

export default InputFields