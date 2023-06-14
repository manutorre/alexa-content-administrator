import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import {
  Box,
  Stack,
  Paper,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import Carousel from "./carousel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Grid from "antd/lib/card/Grid";
import SendIcon from "@mui/icons-material/Send";

const Item = styled(Paper)(({ theme, sx }) => ({
  ...sx,
  ...theme.typography.body2,
  padding: theme.spacing(3),
  // textAlign: "center",
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.primary,
}));

const HistoryItem = ({ text, onPressHistoryItem }) => {
  const onButtonClicked = () => {
    onPressHistoryItem();
  };

  return (
    <Item sx={{ backgroundColor: "whitesmoke" }}>
      <Button onClick={onButtonClicked} variant="text">
        {" "}
        {!!text && text}
      </Button>
    </Item>
  );
};

export const HistoryBox = ({ text, onPressHistoryItem }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    boxRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Box ref={boxRef} sx={{ width: "100%" }}>
      <Stack spacing={2} sx={{ marginX: 4, marginY: 1 }}>
        <HistoryItem text={text} onPressHistoryItem={onPressHistoryItem} />
      </Stack>
    </Box>
  );
};
