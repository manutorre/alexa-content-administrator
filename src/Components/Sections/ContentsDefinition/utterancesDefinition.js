import { Fragment, React, useState, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Footer from "./footer";

export default function UtterancesDefinition({
  step,
  handleBack,
  handleNext,
  saveInformation,
  contentData,
}) {
  const [inputValue, setInputValue] = useState("");
  // const [utterance, setUtterance] = useState("");
  const [utterances, setUtterances] = useState(contentData?.utterances || []);
  const contentValue = useRef(contentData);

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

  const handleConfirm = () => {
    console.log("Next pressed ", utterances);
    const operation = "setUtterances";
    saveInformation(utterances, operation);
    handleNext();
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Words Mapping
      </Typography>
      <Typography component="div" variant="subtitle1" gutterBottom>
        Which words the chatbot should learn to recognize{" "}
        <Box fontWeight="fontWeightBold" display="inline">
          {`${
            contentValue?.current?.name ? contentValue.current.name : "this"
          }`}{" "}
        </Box>{" "}
        content?
      </Typography>
      <Grid container marginTop={1} spacing={1}>
        {utterances &&
          utterances.length > 0 &&
          utterances.map((word) => {
            return (
              <Grid item xs={"auto"} sm={"auto"}>
                <Button size="small" color="primary" variant="outlined">
                  {word || ""}
                </Button>
              </Grid>
            );
          })}
      </Grid>
      <Grid
        // marginTop={1}
        // marginBottom={1}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        // spacing={3}
        sx={{ my: 2 }}
      >
        <Grid item xs={2.5} sm={2.5} />
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="utterance"
            name="utterance"
            label="Word"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={inputValue}
            // helperText="Properties can be product's price, name, rate, etc"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={1} sm={1}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleButtonClick}
            size="small"
            color="primary"
          >
            Add word
          </Button>
        </Grid>
        <Grid item xs={2.5} sm={2.5} />
      </Grid>
      <Grid marginTop={5}>
        <Typography variant="subtitle1" gutterBottom>
          NOTE: the features defined on previous step will be recognized by the
          names assigned
        </Typography>
      </Grid>
      <Footer step={step} handleBack={handleBack} handleNext={handleConfirm} />
    </Fragment>
  );
}
