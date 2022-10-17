import { useState, useEffect, useRef, Fragment, React } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContentDefinition from "./ContentsDefinition/contentDefinition.js";
import PropertiesDefinition from "./ContentsDefinition/propertiesDefinition.js";
import UtterancesDefinition from "./ContentsDefinition/utterancesDefinition.js";
import CategoriesDefinition from "./ContentsDefinition/categoriesDefinition.js";
import Chatbot from "./chatbot.js";
import DialogDefinition from "./SkillsDefinition/dialogDefinition.js";
import ActionDefinition from "./SkillsDefinition/actionDefinition.js";
import IntentsDefinition from "./SkillsDefinition/intentsDefinition.js";
import OperationCreation from "./SkillsDefinition/operationCreation.js";
import Dialog from "./ContentsDefinition/dialog";
// import UtterancesDefinition from './SkillsDefinition/utterancesDefinition.js';
// import CategoriesDefinition from './SkillsDefinition/categoriesDefinition.js';

const contentSteps = [
  "Contents Selection",
  "Properties Definition",
  "Words Mapping",
  "Categories Definition (Optional)",
];
let steps = contentSteps;
const skillSteps = [
  "Intents Creation",
  "Dialog Skill Definition (Optional)",
  "Operation Creation",
  "Action Skill Definition (Optional)",
];

function getStepContent(
  step,
  handleBack,
  handleNext,
  saveInformation,
  contentData
) {
  switch (step) {
    case 0:
      return (
        <ContentDefinition
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          saveInformation={saveInformation}
        />
      );
    case 1:
      return (
        <PropertiesDefinition
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          saveInformation={saveInformation}
          contentData={contentData}
        />
      );
    case 2:
      return (
        <UtterancesDefinition
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          saveInformation={saveInformation}
          contentData={contentData}
        />
      );
    case 3:
      return <CategoriesDefinition />;
  }
}

function getSkillContent(step) {
  switch (step) {
    case 0:
      return <IntentsDefinition />;
    case 1:
      return <DialogDefinition />;
    case 2:
      return <OperationCreation />;
    case 3:
      return <ActionDefinition />;
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(2);
  const [activeForm, setActiveForm] = useState("contentsDefinition");
  const contentData = useRef({
    xpath: "",
    url: "",
    urlPagina: "",
    name: "",
    text: "",
    properties: [],
  });

  // const assignTitleAndLink = (linkObject, titleObject) => {
  //   //const newTitle = Object.assign(this.state.title, {xpath: titleObject.data, text: titleObject.text});
  //   const newLink = Object.assign(contentLink, {text: titleObject.text, xpath: linkObject.data, url: linkObject.url, urlPagina:linkObject.urlPagina});  //className:linkObject.className, tagName:linkObject.tagName});
  //   setContentLink(newLink);
  //   setMessageData(newLink);
  // }

  const saveInformation = (newData, operation) => {
    console.log(`New data: "${{ newData }}"`);

    switch (operation) {
      case "setContent": {
        contentData.current = { ...contentData.current, ...newData };
        break;
      }
      case "setProperties": {
        contentData.current.properties = [
          ...contentData.current.properties,
          ...newData,
        ];
        break;
      }
    }
  };

  const handleNext = () => {
    console.log(contentData.current);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const goToMenu = () => {
    setActiveForm("skillsDefinition");
    steps = skillSteps;
    setActiveStep(0);
  };

  const goToContent = () => {
    setActiveForm("contentsDefinition");
    steps = contentSteps;
    setActiveStep(0);
  };

  const renderContentsDefinition = () => {
    return (
      <Fragment>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Well done!
            </Typography>
            <Typography variant="subtitle1">
              You already created a content that can be recognized by the
              chatbot!
            </Typography>
            <Typography variant="subtitle1">
              Press on {`Skills Definition`.toUpperCase()} to follow on with the
              process
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={goToMenu}
                sx={{ mt: 3, ml: 1 }}
              >
                Skills Definition
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {getStepContent(
              activeStep,
              handleBack,
              handleNext,
              saveInformation,
              contentData.current
            )}
          </Fragment>
        )}
      </Fragment>
    );
  };

  const renderSkillsDefinition = () => {
    return (
      <Fragment>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Well done!
            </Typography>
            <Typography variant="subtitle1">
              The new skills were added to the chatbot!
            </Typography>
            <Typography variant="subtitle1">
              Press on {`Deploy Chatbot`.toUpperCase()} to finish the process
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={goToContent}
                sx={{ mt: 3, ml: 1 }}
              >
                DEPLOY CHATBOT
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {getSkillContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Fragment>
        )}
      </Fragment>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Chatbot creation
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          style={{ marginBottom: 5 }}
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {activeForm === "contentsDefinition"
              ? "Info models definition"
              : "Chatbot elements definition"}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeForm === "contentsDefinition" && renderContentsDefinition()}
          {activeForm === "skillsDefinition" && renderSkillsDefinition()}
        </Paper>
        {/* <Dialog open={showDialog} messageData={messageData} handleDisagree={handleDisagree} handleAgree={handleAgree} /> */}
      </Container>
    </ThemeProvider>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
