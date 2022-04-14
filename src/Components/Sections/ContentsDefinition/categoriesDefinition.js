import * as React from 'react';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function SelectAutoWidth(props) {
  const [age, setAge] = React.useState(props.value);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, minWidth: 140 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Access type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Access type"
          defaultValue="Link-based"
        >
          <MenuItem value={1}>Link-based</MenuItem>
          <MenuItem value={2}>Search-based</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

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
        <Grid item xs={1} sm={1}/>
        <Grid item xs={6} sm={6} >
          <TextField
            required
            id="category"
            name="category"
            label="Add new category"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            defaultValue="Wireless Headphones"
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <SelectAutoWidth value={1}/>
        </Grid>
        <Grid item xs={1} sm={1}/>
      </Grid>
      <Grid container marginTop={4}>
        <Grid item xs={1} sm={1}/>
        <Grid item xs={4} sm={4}>
          <Button startIcon={<AddIcon/>} size='small'color="secondary" variant="outlined">Headphones</Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <SelectAutoWidth value={2}/>
        </Grid>      
        <Grid item xs={1} sm={1}/>
      </Grid>
    </React.Fragment>
  );
}