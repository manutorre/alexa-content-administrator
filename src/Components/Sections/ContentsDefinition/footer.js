import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Footer({step, handleBack, handleNext}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {step !== 0 && (
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
      )}

      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ mt: 3, ml: 1 }}
      >
        {step === 4 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
}