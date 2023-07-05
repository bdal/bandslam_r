import React from 'react'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'

const ErrorText = ({ children }) => {
    return (
        <Grid container alignItems={'center'} direction={'column'}>
            <Typography variant='h6' color="red">
                {children}
            </Typography>

        </Grid>
    )
}

export default ErrorText

