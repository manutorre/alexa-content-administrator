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
        <Grid item xs={2} sm={2}/>
        <Grid item xs={'auto'} sm={'auto'}>
            <img 
              src={require('../../../Drag-elements.jpg')}
              height={200}
            />
        </Grid>
        <Grid item xs={2} sm={2}/>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}/>
        <Grid item xs={6} sm={6} >
          <TextField
            required
            id="propertyName"
            name="propertyName"
            label="Property name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            defaultValue="Rating"
          />
        </Grid>
        <Grid item xs={3} sm={3}/>
      </Grid>
      <Grid container marginTop={3}>
        <Grid item xs={4} sm={4}/>
        <Grid item xs={2} sm={2} >
          <Button startIcon={<AddIcon/>} size='small'color="secondary" variant="outlined">Name</Button>
        </Grid>
        <Grid item xs={3} sm={3} >
          <Button startIcon={<AddIcon/>} size='small' color="secondary" variant="outlined">Price</Button>
        </Grid>
        <Grid item xs={3} sm={3}/>
      </Grid>
    </React.Fragment>
  );
}