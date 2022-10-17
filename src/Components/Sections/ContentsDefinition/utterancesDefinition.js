import { Fragment, React, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Footer from "./footer";

export default function UtterancesDefinition({
  step,
  handleBack,
  handleConfirm,
}) {
  const [inputValue, setInputValue] = useState("");
  // const [utterance, setUtterance] = useState("");
  const [utterances, setUtterances] = useState([]);

  const handleButtonClick = () => {
    if (inputValue) {
      // setUtterance({ ...utterance, name: inputValue });
      setUtterances([...utterances, inputValue]);
      setInputValue("");
    }
  };

  const handleChange = ({ target }) => {
    console.log("Changing input ", target.value);
    setInputValue(target.value);
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Words Mapping
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Which words the chatbot should learn to recognize this content?
      </Typography>
      <Grid container marginTop={1} spacing={1}>
        {utterances &&
          utterances.length > 0 &&
          utterances.map((word) => {
            return (
              <Grid item xs={"auto"} sm={"auto"}>
                <Button size="small" color="secondary" variant="outlined">
                  {word || ""}
                </Button>
              </Grid>
            );
          })}
      </Grid>
      <Grid
        marginTop={1}
        marginBottom={1}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={1.8} sm={1.8} />
        <Grid item xs={1.2} sm={1.2} marginTop={2}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleButtonClick}
            size="small"
            color="secondary"
          ></Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="utterance"
            name="utterance"
            label="Add new word"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={inputValue}
            // helperText="Properties can be product's price, name, rate, etc"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3} sm={3} />
      </Grid>
      <Grid marginTop={5}>
        <Typography variant="subtitle1" gutterBottom>
          NOTE: the properties defined for this content will be recognized by
          the names assigned in the previous step
        </Typography>
      </Grid>
      <Footer step={step} handleBack={handleBack} handleNext={handleConfirm} />
    </Fragment>
  );
}
