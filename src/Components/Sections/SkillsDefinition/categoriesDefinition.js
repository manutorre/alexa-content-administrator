import * as React from 'react';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function CategoriesDefinition() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Categories Definition
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        The contents from a Website could be organized into 'Categories', which let you find a product quickly in the web, for example using the options of a Menu.      
      </Typography>
      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={12} sm={3}/>
        <Grid item xs={12} sm={6} >
          <TextField
            required
            id="category"
            name="category"
            label="Add new category"
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
          <Button startIcon={<AddIcon/>} size='small'color="secondary" variant="outlined">category one</Button>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Button startIcon={<AddIcon/>} size='small' color="secondary" variant="outlined">category two</Button>
        </Grid>
        <Grid item xs={12} sm={2}/>
      </Grid>
    </React.Fragment>
  );
}