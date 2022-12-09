import * as React from "react";
import { Grid, Typography, Button, TextField, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";

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

export default function IntentsDefinition() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Actions Definition
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {
          "You need to define actions to train the chatbot so it can understand your requests and answer with the correct responses."
        }
      </Typography>

      <Grid container sx={{ my: 1 }}>
        <Grid item xs={3} sm={3} />
        <Grid item xs={5} sm={5}>
          <TextField
            required
            id="action"
            name="action"
            label="Action name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            defaultValue={"Searching"}
            helperText="This name acts as an identifier for the action"
          />
        </Grid>
        <Grid item xs={4} sm={4} />
      </Grid>

      <Typography variant="subtitle1" gutterBottom>
        {"Each action will require to define phrases to trigger it."}
      </Typography>

      <Grid container sx={{ mb: 2 }} spacing={1}>
        {["Search"].map((word) => {
          return (
            <Grid item xs={"auto"} sm={"auto"}>
              <Button size="small" color="primary" variant="outlined">
                {word || ""}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        <Grid item xs={3} sm={3} />
        <Grid item xs={5} sm={5}>
          <TextField
            required
            id="action"
            name="action"
            label="New phrase"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            // defaultValue={"Search"}
            helperText="Phrases are words users can say when interacts with the chatbot"
          />
        </Grid>
        <Grid item xs={1} sm={1} marginTop={2}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => {}}
            size="small"
            color="primary"
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
