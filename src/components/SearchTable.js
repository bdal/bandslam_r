import React from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export function MuiComboBox({bands}) {

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={bands}
      sx={{
        width: '30%'
      }}
      renderInput={(params) => <TextField {...params} label="Search Gig" />}
    />
  );
}

// const top100Films = [
//   { label: 'Vampire Weekend', venue: 'Alexandra Palace' },
//   { label: 'Rage Against the Machine', venue: 'Finsbury Park' }
// ]

const SearchTable = ({isLoading, isError, bands}) => {

  return (
    (isLoading || isError || bands === undefined) ?
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> :
      <Grid container alignItems={'center'} direction={'column'}>
        <MuiComboBox bands={bands} />
      </Grid>
  )
}

export default SearchTable