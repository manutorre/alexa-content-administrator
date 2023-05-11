import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onChangeValue = ({ target }) => {
    setValue(target.value);
  };

  const onPress = () => {
    onSubmit(value);
    setValue("");
  };

  return (
    <Box
      sx={{
        mx: 2,
        display: "flex",
        alignItems: "center",
        my: 2,
      }}
    >
      <TextField
        label="Input"
        fullWidth
        autoComplete="given-name"
        variant="outlined"
        value={value}
        onChange={onChangeValue}
      />
      <IconButton onClick={onPress}>
        <SendIcon sx={{ marginLeft: "10px", color: "black", mr: 1, my: 0.5 }} />
      </IconButton>
    </Box>
  );
};

export default Input;
