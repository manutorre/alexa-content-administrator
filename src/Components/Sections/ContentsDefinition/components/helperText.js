import { React } from "react";
import { Typography, Grid } from "@mui/material";

const HelperText = ({ container, additionalInstruction = "" }) => {
  return (
    <>
      <Grid container={!!container} sx={{ mb: 1 }}>
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Typography
            variant="body2"
            fontSize={14}
            sx={{ fontStyle: "italic", color: "GrayText" }}
            gutterBottom
          >
            {!!additionalInstruction && additionalInstruction + "."} Select an
            element from the Web site
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default HelperText;
