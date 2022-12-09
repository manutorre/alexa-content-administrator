import { React } from "react";
import { Grid, TextField } from "@mui/material";

const TextInputContainer = ({ inputValue, handleChange }) => {
  return (
    <Grid container spacing={5} style={{ marginBottom: 10 }}>
      <Grid item xs={3} sm={3} />
      <Grid item xs={5.5} sm={5.5}>
        <TextField
          InputLabelProps={{
            sx: {
              fontSize: 14,
              my: 0.5,
            },
          }}
          FormHelperTextProps={{
            sx: {
              fontSize: 13,
              // bgcolor: "red",
              mx: 1,
            },
          }}
          // InputProps={{}}
          required
          id="contentName"
          name="contentName"
          label="Content name"
          fullWidth
          autoComplete="given-name"
          variant="outlined"
          value={inputValue}
          helperText="Content can be a product, a news, etc"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4} sm={4}></Grid>
    </Grid>
  );
};

export default TextInputContainer;
