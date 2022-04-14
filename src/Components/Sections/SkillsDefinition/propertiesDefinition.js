import * as React from 'react';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function PropertiesDefinition() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Properties Definition
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Which content properties the chatbot should recognize? 
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={2}/>
        <Grid item xs={12} sm={'auto'}>
            <img 
              src={require('../../../Drag-elements.jpg')}
              height={200}
            />
        </Grid>
        <Grid item xs={12} sm={2}/>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}/>
        <Grid item xs={12} sm={6} >
          <TextField
            required
            id="propertyName"
            name="propertyName"
            label="Property name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={3}/>
      </Grid>
      <Grid container marginTop={3}>
        <Grid item xs={12} sm={2}/>
        <Grid item xs={12} sm={4} >
          <Button startIcon={<AddIcon/>} size='small'color="secondary" variant="outlined">property one</Button>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Button startIcon={<AddIcon/>} size='small' color="secondary" variant="outlined">property two</Button>
        </Grid>
        <Grid item xs={12} sm={2}/>
      </Grid>
    </React.Fragment>
  );
}