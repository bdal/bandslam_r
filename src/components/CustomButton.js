import React from 'react'
import Button from '@mui/material/Button';

function CustomButton ({ onClick, disabled, children }) {
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

export default CustomButton