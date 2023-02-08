import React, { useState } from "react";
import { Grid, Typography, Button, TextField, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import SelectContainer from "../ContentsDefinition/components/selectContainer";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const INTENTS = [
  "Search", // by identifier name of product",
  // "Search by feature of product",
];
const UTTERANCES = ["Search headphones", "Search headphones by price"];

export default function IntentsDefinition() {
  // const [actionName, setActionName] = useState("");
  // const [criteria, setCriteria] = useState("");
  // const [features, setFeatures] = useState([]);
  const [phrases, setPhrases] = useState(["Search", "I'm looking for"]);
  const [newPhrase, setNewPhrase] = useState("");
  // const optionWithoutSpaces = INTENTS[0].replace(" ", "");
  // const value =
  //   optionWithoutSpaces.charAt(0).toLowerCase() +
  //   optionWithoutSpaces.substring(1);
  const [actionSelected, setActionSelected] = useState("");

  const handleSelect = (event) => {
    const value = event.target.value;
    setActionSelected(value);
  };

  const onAddNewPhrase = () => {
    setPhrases([...phrases, newPhrase]);
  };

  const onChangeNewPhrase = ({ target }) => {
    setNewPhrase(target.value);
  };

  // const onChangeActionName = ({ target }) => {
  //   setActionName(target.value);
  // };

  // const onChangeCriteria = ({ target }) => {
  //   setCriteria(target.value);
  // };

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
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={1} sm={1}>
          <ArrowRightIcon fontSize="medium" />
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          {"You can choose one of the suggested actions:"}
        </Typography>
      </Grid>

      <Grid container sx={{ mt: 2 }}>
        <SelectContainer
          inputLabel={"Actions available"}
          options={INTENTS}
          wayOfAccess={actionSelected}
          handleSelect={handleSelect}
          required={true}
        />
      </Grid>

      {actionSelected && (
        <>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={1} sm={1}>
              <ArrowRightIcon fontSize="medium" />
            </Grid>
            <Grid item xs={10} sm={10}>
              <Typography variant="subtitle1" gutterBottom>
                {
                  "Each action will require to define some phrases to trigger it. "
                }
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 2 }} spacing={1}>
            {phrases.map((word) => {
              return (
                <Grid item xs={"auto"} sm={"auto"}>
                  <Button size="small" color="primary" variant="outlined">
                    {word || ""}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={1}>
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
                onChange={onChangeNewPhrase}
                value={newPhrase}
                // defaultValue={"Search"}
                helperText="Phrases are words users can say when interacts with the chatbot"
              />
            </Grid>
            <Grid item xs={1} sm={1} marginTop={2}>
              <Button
                startIcon={<AddIcon />}
                onClick={onAddNewPhrase}
                size="small"
                color="primary"
              >
                Add phrase
              </Button>
            </Grid>
          </Grid>
          <Grid spacing={1} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              {"These phrases will be followed then by the target words you want to search. " +
                'E.g. "'}
              {actionSelected.search(/feature/) === -1
                ? UTTERANCES[0] + '"'
                : UTTERANCES[1] + '"'}
            </Typography>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
}

/*
{/* {actionSelected.search(/feature/) !== -1 && (
  <Grid container sx={{ mt: 2 }}>
    <Typography variant="subtitle1" gutterBottom>
      {"Select the features you would like "}
    </Typography>
  </Grid>
)} }

{/* <Grid container sx={{ mt: 2 }}>
  <Typography variant="subtitle1" gutterBottom>
    {"or create a new one:"}
  </Typography>
</Grid>

<Grid container sx={{ my: 1 }}>
  <Grid item xs={3} sm={3} />
  <Grid item xs={5} sm={5}>
    <TextField
      required={!actionSelected}
      id="action"
      name="action"
      label="Action name"
      fullWidth
      autoComplete="given-name"
      variant="outlined"
      onChange={onChangeActionName}
      value={actionName}
      // defaultValue={"Searching"}
      disabled={!!actionSelected}
      helperText="This name acts as an identifier for the action"
    />
  </Grid>
  <Grid item xs={4} sm={4} />
</Grid>

<Grid container sx={{ my: 1 }}>
  <Grid item xs={3} sm={3} />
  <Grid item xs={5} sm={5}>
    <TextField
      required={!actionSelected}
      id="criteria"
      name="criteria"
      label="Criteria"
      fullWidth
      autoComplete="given-name"
      variant="outlined"
      onChange={onChangeCriteria}
      value={criteria}
      // defaultValue={"Searching"}
      disabled={!!actionSelected}
      helperText="Criteria to search: can be by name, a feature defined, etc"
    />
  </Grid>
  <Grid item xs={4} sm={4} />
</Grid> }
*/
