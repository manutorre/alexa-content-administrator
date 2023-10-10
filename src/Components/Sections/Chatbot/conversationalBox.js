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
  Typography,
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

const ChatbotItem = ({ text, options, carousel }) => {
  const onButtonClicked = (e) => {
    alert(e.currentTarget.value);
  };

  return (
    <Item sx={{ backgroundColor: "whitesmoke" }}>
      <SmartToyRoundedIcon sx={{ color: "lightblue", mr: 1 }} />
      {!!text && <Typography variant="body1">{text}</Typography>}
      {!!options && (
        <Stack direction="row" spacing={2}>
          {options.map((option, index) => (
            <Button
              variant="outlined"
              onClick={onButtonClicked}
              value={option}
              key={index}
            >
              {option}
            </Button>
          ))}
        </Stack>
      )}
      {!!carousel && <Carousel carousel={carousel} />}
    </Item>
  );
};

{
  /* <Stack direction="row" spacing={2}>
<TitlebarImageList carousel={carousel} />
<Carousel carousel={carousel} />
</Stack> */
}

const UsertItem = ({
  text,
  onEdit,
  id,
  editable,
  onSubmit,
  options,
  onOptionSelected,
  selectedOptions,
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChangeValue = ({ target }) => {
    setInputValue(target.value);
  };

  const onPress = ({ currentTarget }) => {
    onSubmit(inputValue, currentTarget.value);
    setInputValue("");
  };

  const onButtonClicked = ({ currentTarget }) => {
    setInputValue(currentTarget.value);
    onOptionSelected(currentTarget.value);
  };

  return (
    <Item sx={{ justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AccountCircle sx={{ mr: 1, color: "lightgreen" }} />
        {!editable && <Typography variant="body2">{text}</Typography>}
        {editable && (
          <TextField
            label="Input"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={inputValue}
            onChange={onChangeValue}
          />
        )}
        {!!options && (
          <Stack direction="row" spacing={2}>
            {options.map((option) => (
              <Button
                key={option}
                variant={option === inputValue ? "contained" : "outlined"}
                onClick={onButtonClicked}
                value={option}
                color={"primary"}
              >
                {option}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
      <Box>
        {/* {!editable && !options && (
          <IconButton onClick={onEdit} value={id}>
            <BorderColorIcon />
          </IconButton>
        )} */}
        {/* {editable && (
          <IconButton onClick={onPress} value={id}>
            <SendIcon
            // sx={{ marginLeft: "10px", color: "black", mr: 1, my: 0.5 }}
            />
          </IconButton>
        )} */}
      </Box>
    </Item>
  );
};

const ConversationalItem = ({
  type,
  text,
  options,
  carousel,
  editable,
  onEdit,
  id,
  onSubmit,
  onOptionSelected,
  selectedOptions,
}) => {
  switch (type) {
    case "Chatbot":
      return (
        <>
          <ChatbotItem text={text} />
          {options && (
            <UsertItem options={options} onOptionSelected={onOptionSelected} />
          )}
          {!!carousel && Object.entries(carousel).length > 0 && (
            <ChatbotItem carousel={carousel} />
          )}
        </>
      );
    case "User":
      return (
        <UsertItem
          text={text}
          editable={editable}
          onEdit={onEdit}
          id={id}
          onSubmit={onSubmit}
          options={options}
          onOptionSelected={onOptionSelected}
          selectedOptions={selectedOptions}
        />
      );
    case "Conversation":
      return <ChatbotItem text={text} />;
  }
};

const ConversationalBox = ({
  type,
  text,
  options,
  carousel,
  editable,
  onEdit,
  id,
  onSubmit,
  onOptionSelected,
  requestEdited,
  selectedOptions,
}) => {
  const boxRef = useRef(null);

  useEffect(() => {
    !requestEdited && boxRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Box ref={boxRef} sx={{ width: "100%" }}>
      <Stack spacing={2} sx={{ marginX: 4, marginY: 1 }}>
        <ConversationalItem
          type={type}
          text={text}
          options={options}
          carousel={carousel}
          editable={editable}
          onEdit={onEdit}
          id={id}
          onSubmit={onSubmit}
          onOptionSelected={onOptionSelected}
          selectedOptions={selectedOptions}
        />
      </Stack>
    </Box>
  );
};

export default ConversationalBox;