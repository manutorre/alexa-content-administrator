import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const INTENTS = ["Complete form", "Send message"];
const UTTERANCES = ["Complete the form"];

function SelectAutoWidth(props) {
  const [age, setAge] = React.useState(1);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          {props.label}
        </InputLabel>
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
          {props.values.map((value, idx) => {
            return <MenuItem value={idx + 1}>{value}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default function OperationCreation() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Step Definition
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {
          "The action defined previously will be integrated by a serie of steps."
        }
        {" Each step will require to define:"}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {"- Conditions (to trigger it)"}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {"- Responses (text, image, ...)"}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {
          "- A directive of what to do next (go tonext step, finish action, ...)."
        }
      </Typography>

      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={1} sm={1} />
        <Grid item xs={5} sm={5}>
          {/* <SelectAutoWidth label={"Operations"} values={INTENTS} /> */}
        </Grid>
        <Grid item xs={5} sm={5}>
          {/* <TextField
            required
            id="category"
            name="category"
            label="Related content"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            defaultValue="Form"
          /> */}
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={1} sm={1} />
        <Grid item xs={5} sm={5}>
          {/* <SelectAutoWidth label={"User Utterances"} values={UTTERANCES} /> */}
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
    </React.Fragment>
  );
}
