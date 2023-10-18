import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const Item = styled(Paper)(({ theme, sx }) => ({
  ...sx,
  // ...theme.typography.body2,
  // padding: theme.spacing(3),
  // textAlign: "start",
  // display: "flex",
  // alignItems: "flex-start",
  // color: theme.palette.text.primary,
}));

const HistoryItem = ({ step, onPressHistoryItem }) => {
  const onButtonClicked = () => {
    onPressHistoryItem();
  };

  return (
    <Item sx={{ backgroundColor: "whitesmoke" }}>
      <Button onClick={onButtonClicked}>
        <Typography sx={{ fontSize: 14 }}>
          {!!step && step.text?.slice(0, 40)} ...
        </Typography>
      </Button>
    </Item>
  );
};

export const HistoryBox = ({ steps, onPressHistoryItem }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    boxRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  if (!steps[1]) {
    return null;
  }

  return (
    <Box ref={boxRef} sx={{ width: "100%" }}>
      <Stack spacing={2} sx={{ marginX: 4, marginY: 1 }}>
        <HistoryItem step={steps[1]} onPressHistoryItem={onPressHistoryItem} />
      </Stack>
    </Box>
  );
};
