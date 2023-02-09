import { useState, useEffect, useRef, Fragment, React } from "react";
import {
  CssBaseline,
  AppBar,
  Box,
  Container,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import ResetTvIcon from "@mui/icons-material/ResetTv";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContentSelection from "./ContentsDefinition/contentSelection.js";
import PropertiesDefinition from "./ContentsDefinition/propertiesDefinition.js";
import UtterancesDefinition from "./ContentsDefinition/utterancesDefinition.js";
// import CategoriesDefinition from "./ContentsDefinition/categoriesDefinition.js";
import Chatbot from "./chatbot.js";
import DialogDefinition from "./SkillsDefinition/dialogDefinition.js";
import ActionDefinition from "./SkillsDefinition/actionDefinition.js";
import IntentsDefinition from "./SkillsDefinition/intentsDefinition.js";
import OperationCreation from "./SkillsDefinition/operationCreation.js";
import Dialog from "./ContentsDefinition/dialog";
// import UtterancesDefinition from './SkillsDefinition/utterancesDefinition.js';
// import CategoriesDefinition from './SkillsDefinition/categoriesDefinition.js';
import { grey } from "@mui/material/colors";
import { SettingsInputCompositeTwoTone } from "@mui/icons-material";
import StepDefinition from "./SkillsDefinition/stepDefinition.js";

const theme = createTheme({
  palette: {
    secondary: grey,
  },
});

const contentSteps = [
  "Contents Selection",
  "Features Selection",
  "Words Mapping",
  // "Categories Definition (Optional)",
];
let steps = contentSteps;
/* /////////////// Conversational Flow ///////////////////        
{ 
  Actions: {
    phrases to trigger action (utterances),
    steps: {
      conditions (to trigger step),
      responses: [text, images, ...],
      what do next: [go to next step, go to another action, finish action, ...]
    }
  }
}
*/
const skillSteps = [
  "Actions Definition",
  "Step Definition",
  // "Action Steps",
  // "Information models selection",
  // "Operation Creation",
  // "Action Skill Definition (Optional)",
];

function getStepContent(
  step,
  handleBack,
  handleNext,
  saveInformation,
  contentData,
  inspectMode
) {
  switch (step) {
    case 0:
      return (
        <ContentSelection
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          saveInformation={saveInformation}
          contentdata={contentData}
          inspectMode={inspectMode}
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
    // case 3:
    //   return <CategoriesDefinition />;
  }
}

function getSkillContent(step, saveInformation, handleNext, handleBack) {
  switch (step) {
    case 0:
      return (
        <IntentsDefinition
          step={step}
          saveInformation={saveInformation}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    case 1:
      return (
        <StepDefinition
          step={step}
          saveInformation={saveInformation}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    // case 2:
    //   return <DialogDefinition />;

    // case 3:
    //   return <ActionDefinition />;
  }
}

const DEFAULT_CONTENT_DATA = {
  xpath: "",
  url: "",
  urlPagina: "",
  name: "",
  text: "",
  properties: [],
  utterances: [],
  siblings: [],
  wayOfAccess: {
    type: "",
  },
};

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeForm, setActiveForm] = useState("contentsDefinition");
  const [inspectMode, setInspectMode] = useState(false);
  const [contentData, setContentData] = useState(DEFAULT_CONTENT_DATA);
  const [showDialog, setShowDialog] = useState(false);

  const onMessageReceive = ({ data }) => {
    const type = data?.type;
    const contentdata = data?.contentData;
    if (type === "contentData") {
      console.log("Message received in checkout ", { data });
      if (contentdata) {
        const dataInLocalStorage = JSON.parse(contentdata);
        setContentData({ ...contentData, ...dataInLocalStorage });
      }
    }
  };

  useEffect(() => {
    // console.log({
    //   json: JSON.parse(window.parent.localStorage.getItem("contentData")),
    // });
    // localStorage.clear();
    window.parent.postMessage(
      {
        mge: "getContentData",
      },
      "*"
    );
    window.addEventListener("message", (e) => onMessageReceive(e));
  }, []);

  const saveInformation = (newData, operation) => {
    console.log(`New data: "${{ newData }}"`);

    switch (operation) {
      case "setContent": {
        const newContentInfoFiltered = Object.entries(newData).filter(
          (keyValue) => {
            return !!keyValue[1];
          }
        );
        const newContentInfo = newContentInfoFiltered.reduce(
          (obj, keyValue) => {
            const key = keyValue[0];
            return Object.assign(obj, {
              [key]: newData[key],
            });
          },
          {}
        );

        setContentData({ ...contentData, ...newContentInfo });
        break;
      }
      case "setProperties": {
        const propertyNames = contentData.properties.map(
          (property) => property.text
        );
        const newProperties = newData.filter((property) => {
          return !propertyNames.includes(property.text);
        });
        contentData.properties = [...contentData.properties, ...newProperties];
        setContentData(contentData);
        break;
      }
      case "setUtterances": {
        const utteranceNames = contentData.utterances.map(
          (utterance) => utterance.text
        );
        const newUtterances = newData.filter((utterance) => {
          return !utteranceNames.includes(utterance.text);
        });
        contentData.utterances = [...contentData.utterances, ...newUtterances];
        setContentData(contentData);
        break;
      }
    }
    // console.log({ stringify: JSON.stringify(contentData.current) });
    // window.parent.localStorage.setItem(
    window.parent.postMessage(
      {
        mge: "setContentData",
        contentData: JSON.stringify(contentData),
      },
      "*"
    );
  };

  const handleNext = () => {
    console.log(contentData);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const goToMenu = () => {
    setShowDialog(!showDialog);
  };

  const goToContent = (step = 0) => {
    setActiveForm("contentsDefinition");
    steps = contentSteps;
    setActiveStep(step);
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
              You created a type of content that can be recognized by the
              chatbot!
            </Typography>
            <Typography variant="subtitle1">
              Press on {`Next step`.toUpperCase()} to follow on with the process
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
                Next step
              </Button>
            </Box>
            <Dialog
              open={showDialog}
              dialogText={
                "Press on CONTENT DEFINITION if you want to continue selecting new contents or press on SKILL DEFINITION to continue with chatbot creation process."
              }
              dialogTitle={"What you want to do next?"}
              agreeText="SKILL DEFINITION"
              disagreeText="CONTENT DEFINITION"
              handleDisagree={() => {
                setShowDialog(!showDialog);
                setActiveStep(0);
              }}
              handleAgree={() => {
                setShowDialog(!showDialog);
                setActiveForm("skillsDefinition");
                steps = skillSteps;
                setActiveStep(0);
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            {getStepContent(
              activeStep,
              handleBack,
              handleNext,
              saveInformation,
              contentData,
              inspectMode
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
                onClick={() => goToContent()}
                sx={{ mt: 3, ml: 1 }}
              >
                DEPLOY CHATBOT
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {getSkillContent(
              activeStep,
              saveInformation,
              handleNext,
              handleBack
            )}
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={activeStep !== 0 ? handleBack : () => goToContent(2)}
                sx={{ mt: 3, ml: 1 }}
              >
                Back
              </Button>

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box> */}
          </Fragment>
        )}
      </Fragment>
    );
  };

  const enableInspectModeOnOff = () => {
    if (!inspectMode) {
      window.parent.postMessage({ mge: "activateInspectMode" }, "*");
    } else {
      window.parent.postMessage({ mge: "desactivateInspectMode" }, "*");
    }
    setInspectMode(!inspectMode);
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
            Chatbot Creation
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          py: { xs: 3, md: 1 },
          // pt: { xs: 0, md: 1 },
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            // my: { xs: 0, md: 5 },
            p: { xs: 3, md: 5 },
          }}
        >
          <Grid container>
            <Grid item xs={2} sm={2} />
            <Grid item xs={8} sm={8}>
              <Typography component="h1" variant="h5" align="center">
                {activeForm === "contentsDefinition"
                  ? "Information Models Definition"
                  : "Chatbot Conversation Definition"}
              </Typography>
            </Grid>
            {activeForm === "contentsDefinition" && (
              <Grid item xs={2} sm={2} sx={{ pl: 3 }}>
                <IconButton
                  color={inspectMode ? "primary" : "secondary"}
                  // aria-label="upload picture"
                  component="label"
                  onClick={enableInspectModeOnOff}
                >
                  <ResetTvIcon />
                </IconButton>
                <Typography component="h5">Inspect mode</Typography>
              </Grid>
            )}
          </Grid>
          <Stepper
            activeStep={activeStep}
            sx={{ py: 3, px: 2 }}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="subtitle1">{label}</Typography>
                </StepLabel>
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
