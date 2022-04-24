import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ContentDefinition({handleImagePosition}) {
  
  const [imgStyle, setStyle ] = React.useState({
    position:'absolute',
    left:'40%',
    bottom:'25%',
    height: '200px',
    width: '300px',
  });

  React.useEffect(()=> {
    handleImagePosition(imgStyle);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contents Selection
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        What information the chatbot should support on it responses? 
      </Typography>
      <Grid container>
        <Grid item xs={2} sm={2}/>
        <Grid item xs={8} sm={'auto'} >
          <div style={{height: '200px',width: '300px',}}>
            <img 
            src={require('../../../Drag-elements.jpg')}
            style={{...imgStyle}}/>
          </div>         
        </Grid>
        <Grid item xs={2} sm={2}/>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}/>
        <Grid item xs={6} sm={6} >
          <TextField
            required
            id="contentName"
            name="contentName"
            label="Content name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            defaultValue="Product"
          />
        </Grid>
        <Grid item xs={3} sm={3}/>
      </Grid>
    </React.Fragment>
  );
}