import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const INTENTS = ["Search by name", "Search by category", "Buy a product"];
const UTTERANCES = ["Search", "Search by name"];

function SelectAutoWidth(props) {
  const [age, setAge] = React.useState(1);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label={props.label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            props.values.map((value, idx) => {
              return (<MenuItem value={idx+1}>{value}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default function IntentsDefinition() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Intents Definition
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        The intents are the main components that compose a Dialog Skill.
        You can think them as goals that are expressed in a customer's input.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        By recognizing the intent expressed in a customer's input, the chatbot can choose the correct dialog flow. 
      </Typography>
      
      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={1} sm={1} />
        <Grid item xs={5} sm={5} >
          <SelectAutoWidth label={"Intents"} values={INTENTS}/>
        </Grid>
        <Grid item xs={5} sm={5}>
          <TextField
            required
            id="category"
            name="category"
            label="Related content"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            defaultValue="Product"
          />
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={1} sm={1} />
        <Grid item xs={5} sm={5} >
          <SelectAutoWidth label={"User Utterances"} values={UTTERANCES}/>
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
    </React.Fragment>
  );
}