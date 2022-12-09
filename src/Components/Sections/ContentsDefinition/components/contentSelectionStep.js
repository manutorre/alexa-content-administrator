import { React } from "react";
import { Typography, Grid } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CheckIcon from "@mui/icons-material/Check";

const ContentSelectionStep = ({ showArrowIcon, showCheckIcon, message }) => {
  return (
    <Grid container spacing={1} sx={{ mb: 1 }}>
      {!!showArrowIcon && (
        <Grid item xs={1} sm={1}>
          <ArrowRightIcon fontSize="medium" />
        </Grid>
      )}
      <Grid item xs={10} sm={10}>
        <Typography variant="subtitle1" gutterBottom>
          {message}
        </Typography>
      </Grid>
      {!!showCheckIcon && (
        <Grid item xs={1} sm={1}>
          <CheckIcon color="primary" fontSize="medium" />
        </Grid>
      )}
    </Grid>
  );
};

export default ContentSelectionStep;
