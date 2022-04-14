import * as React from 'react';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function PropertiesDefinition() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Words Mapping
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Which words the chatbot should learn to recognize this content?
      </Typography>
      
      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={12} sm={3}/>
        <Grid item xs={12} sm={6} >
          <TextField
            required
            id="wordText"
            name="wordText"
            label="Add new word"
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
          <Button startIcon={<AddIcon/>} size='small'color="secondary" variant="outlined">utterance one</Button>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Button startIcon={<AddIcon/>} size='small' color="secondary" variant="outlined">utterance two</Button>
        </Grid>
        <Grid item xs={12} sm={2}/>
      </Grid>

      <Typography variant="subtitle1" gutterBottom>
        NOTE: the properties defined for this content will be recognized by the names
      </Typography>
    </React.Fragment>
  );
}