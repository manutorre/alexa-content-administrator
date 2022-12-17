import { React } from "react";
import {
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem,
} from "@mui/material";

const SelectContainer = ({
  wayOfAccess,
  handleSelect,
  inputLabel = "Element way of access",
  options = ["Main Screen", "Menu Navigation", "Search Url"],
  required = false,
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
            // renderValue={(selected) => {
            //   if (selected.length === 0) {
            //     return <em>None</em>;
            //   }

            //   return wayOfAccess;
            // }}
            defaultValue={wayOfAccess}
            label="Element way of access"
            onChange={handleSelect}
          >
            {!required && (
              <MenuItem value={""}>
                <em>None</em>
              </MenuItem>
            )}
            {options.map((option) => {
              const optionWithoutSpaces = option.replaceAll(" ", "");
              const value =
                optionWithoutSpaces.charAt(0).toLowerCase() +
                optionWithoutSpaces.substring(1);
              return <MenuItem value={value}>{option}</MenuItem>;
            })}
          </Select>
          {wayOfAccess === "askfordata" && (
            <FormHelperText>
              The chatbot will require you give more information to understand
              your request
            </FormHelperText>
          )}
          {wayOfAccess === "displayinformation" && (
            <FormHelperText>
              Define what kind of info the chatbot should give as response
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={3} />
    </>
  );
};

export default SelectContainer;
