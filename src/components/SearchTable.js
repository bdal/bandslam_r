import React from 'react'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';

function SearchBarOld() {
    return (
        <form>
            <input type="text" placeholder='Search...' />
        </form>
    )
}

export function MuiComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: '30%' }}
      renderInput={(params) => <TextField {...params} label="Search Gig" />}
    />
  );
}

const top100Films = [
  { label: 'Vampire Weekend', venue: 'Alexandra Palace' },
  { label: 'Rage Against the Machine', venue: 'Finsbury Park'}
]

function SearchBar() {
  return (
      <form>
          <input type="text" placeholder='Search...' />
      </form>
  )
}

const SearchTable = () => {
  return (
    <Grid container alignItems={'center'} direction={'column'}>
    
        <MuiComboBox/>
        </Grid>
  )
}

export default SearchTable