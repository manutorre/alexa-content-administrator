import { React } from "react";
import { Typography, Grid } from "@mui/material";

const OneLineText = ({ inputValue, siblings }) => {
  return (
    <Grid item xs={12} sm={12}>
      <Typography variant="body2" display="inline">
        The{" "}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: "fontWeightBold" }}
        display="inline"
      >
        {inputValue}
      </Typography>
      <Typography variant="body2" display="inline">
        {" "}
        content has{" "}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: "fontWeightBold" }}
        display="inline"
      >
        {siblings?.length > 0 ? siblings.length : 0}
      </Typography>
      <Typography variant="body2" display="inline">
        {" "}
        related sibling elements
      </Typography>
    </Grid>
  );
};

export default OneLineText;
