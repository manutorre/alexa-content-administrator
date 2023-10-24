import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import TitlebarImageList from "./titleBarImageList";
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import Popper from '@mui/material/Popper';

const SimplePopper = ({ description }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  // const handleClick = (event) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  // };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  // const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  if (description.length === 0) {
    return null;
  }

  return (
    <div style={{}}>
      <Button sx={{}} size="small" variant="contained" onClick={handleClick('left')}> {!open ? "Show more" : "Show less"}</Button>
      <Popper sx={{ borderRadius: 3, border: 1, p: 2, bgcolor: 'background.paper', width: "60%", height: "40%", overflowY: "scroll" }} id={id} open={open} anchorEl={anchorEl} placement={placement} >
        <Box>
          {description.map((paragraph) => {
            return (
              <Typography paragraph>
                {paragraph}
              </Typography>
            )
          })}
        </Box>
      </Popper>
    </div >
  );
}


const Carousel = ({ carousel }) => {
  //   const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = Object.entries(carousel).length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const redirectToUrl = () => {
    const url = carousel[activeStep].fullLink;
    window.open(url);
  }

  // console.log({ activeStep });

  return (
    <Box sx={{ flex: 1, bgcolor: "background.default", width: "90%", ml: 2 }}>
      <Paper
        square
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          // height: 50,
          mt: 1,
          px: 1
        }}
      >
        <Box
          component="img"
          sx={{
            // alignSelf: 'center',
            height: 20,
            display: "block",
            // overflow: "hidden",
            width: "auto",
            m: 1,

            // mx: "auto",
            // mt: 4
          }}
          src={carousel[activeStep].favicon}
        // alt={step.text}
        />
        <Box sx={{ flex: 1, height: 100 }}>

          <a style={{}}>
            <Typography onClick={redirectToUrl} variant="subtitle1">
              {carousel[activeStep].text} - <b>{carousel[activeStep].price}</b>
            </Typography>
          </a>
        </Box>
        <SimplePopper description={carousel[activeStep].desc} />

      </Paper>
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        containerStyle={{ alignItems: 'center' }}
        style={{}}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {/* <TitlebarImageList item={carousel[activeStep]} /> */}
        {Object.values(carousel).map((step, index) => (
          <div style={{}} key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  // alignSelf: 'center',
                  height: 200,
                  display: "block",
                  // overflow: "hidden",
                  width: "auto",
                  mx: "auto",
                  // mt: 4
                }}
                src={step.imageSrc}
                alt={step.text}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default Carousel;
