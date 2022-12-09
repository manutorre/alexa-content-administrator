import { React } from "react";
import { Typography, Box } from "@mui/material";

const DialogText = ({
  firstSentence,
  secondSentence,
  thirdSentence,
  forthSentence,
  fifthSentence,
}) => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        // display: "flex",
        // alignItems: "center",
        // textAlign: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body1" display="inline">
        {firstSentence}
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }} display="inline">
        {secondSentence}
      </Typography>
      <Typography variant="body1" display="inline">
        {thirdSentence}
      </Typography>
      {!!forthSentence && (
        <Typography variant="body2" sx={{ color: "gray" }} display="inline">
          {forthSentence}
        </Typography>
      )}
      {!!fifthSentence && (
        <Typography variant="body1" display="inline">
          {fifthSentence}
        </Typography>
      )}
    </Box>
  );
};

export default DialogText;
