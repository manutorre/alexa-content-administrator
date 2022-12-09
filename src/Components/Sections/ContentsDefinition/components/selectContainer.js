import { React } from "react";
import { FormControl, InputLabel, Select, Grid, MenuItem } from "@mui/material";

const SelectContainer = ({
  wayOfAccess,
  handleSelect,
  inputLabel = "Element way of access",
  options = ["Main Screen", "Menu Navigation", "Search Url"],
}) => {
  return (
    <>
      <Grid item xs={3} sm={3} />
      <Grid item xs={6} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="select-label">{inputLabel}</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={wayOfAccess}
            label="Element way of access"
            onChange={handleSelect}
          >
            {options.map((option) => {
              const optionWithoutSpaces = option.replace(" ", "");
              const value =
                optionWithoutSpaces.charAt(0).toLowerCase() +
                optionWithoutSpaces.substring(1);
              return <MenuItem value={value}>{option}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={3} />
    </>
  );
};

export default SelectContainer;
