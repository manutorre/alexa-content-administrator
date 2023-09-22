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

const Carousel = ({ carousel }) => {
  //   const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carousel.length;

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
    const url = Object.values(carousel[activeStep])[0].fullLink;
    window.open(url);
  }

  // console.log({ activeStep });

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          // height: 50,
          mt: 1,
        }}
      >
        <a>
        <Typography onClick={redirectToUrl} variant="subtitle1" sx={{}}>
          {Object.values(carousel[activeStep])[0].text} - <b>{Object.values(carousel[activeStep])[0].price}</b>
        </Typography>
        </a>

      </Paper>
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {/* <TitlebarImageList item={carousel[activeStep]} /> */}
        {carousel.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 200,
                  display: "block",
                  // maxWidth: 400,
                  overflow: "hidden",
                  width: "40%",
                  margin: "auto",
                }}
                src={Object.values(step)[0].imageSrc}
                alt={Object.values(step)[0].text}
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
