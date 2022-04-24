import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContentDefinition from './ContentsDefinition/contentDefinition.js';
import PropertiesDefinition from './ContentsDefinition/propertiesDefinition.js';
import UtterancesDefinition from './ContentsDefinition/utterancesDefinition.js';
import CategoriesDefinition from './ContentsDefinition/categoriesDefinition.js';
import Chatbot from './chatbot.js';
import DialogDefinition from './SkillsDefinition/dialogDefinition.js';
import ActionDefinition from './SkillsDefinition/actionDefinition.js';
import IntentsDefinition from './SkillsDefinition/intentsDefinition.js';
import OperationCreation from './SkillsDefinition/operationCreation.js';
// import UtterancesDefinition from './SkillsDefinition/utterancesDefinition.js';
// import CategoriesDefinition from './SkillsDefinition/categoriesDefinition.js';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const contentSteps= ['Contents Selection', 'Properties Definition', 'Words Mapping', 'Categories Definition (Optional)'];
var steps = contentSteps; 
const skillSteps = ['Intents Creation', 'Dialog Skill Definition (Optional)', 'Operation Creation', 'Action Skill Definition (Optional)'];

function getStepContent(step, handleImagePosition) {
  switch (step) {
    case 0:
      return <ContentDefinition handleImagePosition={handleImagePosition} />;
    case 1:
      return <PropertiesDefinition />;
    case 2:
      return <UtterancesDefinition />;
    case 3:
      return <CategoriesDefinition />;
    }
}

function getNewStepContent(step) {
  switch (step) {
    case 0:
      return <IntentsDefinition />;
    case 1:
      return <DialogDefinition />;
    case 2:
      return <OperationCreation />
    case 3:
      return <ActionDefinition />;
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeForm, setActiveForm] = React.useState('contentsDefinition');
  const [imagePosition, setImagePosition] = React.useState(null);

  React.useEffect(()=>{
    window.parent.postMessage({mge: "maskForNewContent", "maskPosition": imagePosition}, "*");
    window.parent.postMessage({mge: "titleAndLinkRecognizing"}, "*");
    window.addEventListener('message', (e) => onMessageReceive(e));
  }, [imagePosition]);


  const handleImagePosition = (maskStyle) => {
    setImagePosition(maskStyle);
  }

  const onMessageReceive = ({data}) => {
    console.log(`On message receive in app: ${data}`);

    if (typeof data === "string"){
      window.parent.postMessage({"mge":"hideMask"}, "*")
    }
    
    if (data.type === "titleAndLink") {
      // this.assignTitleAndLink(e.data.title, e.data.link)
      window.parent.postMessage({"mge":"hideMask"}, "*")
      // this.askForConfirmTitleAndLink()
    }
    // if(e.data.type === "className" || e.data.type === "tagName"  ){
    //   console.log("Mensaje desde el stepper ",e.data)
    //   // this.setState({
    //   //   siblings:e.data.pathsElem
    //   // })
    // }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const goToMenu = () => {
    setActiveForm("skillsDefinition");
    steps = skillSteps;
    setActiveStep(0);
  }

  const goToContent = () => {
    setActiveForm("contentsDefinition");
    steps = contentSteps;
    setActiveStep(0);
  }

  const renderContentsDefinition = () => {
    return (
      <React.Fragment>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Well done! 
            </Typography>
            <Typography variant="subtitle1">
              You already created a content that can be recognized by the chatbot! 
            </Typography>
            <Typography variant="subtitle1">
              Press on {`Skills Definition`.toUpperCase()} to follow on with the process
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          </React.Fragment>
        ) :  (
          <React.Fragment>
            {getStepContent(activeStep, handleImagePosition)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

  const renderSkillsDefinition = () => {
    return (
      <React.Fragment>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Well done! 
            </Typography>
            <Typography variant="subtitle1">
              The new skills were added to the chatbot!
            </Typography>
            <Typography variant="subtitle1">
              Press on {`Deploy Chatbot`.toUpperCase()} to finish the process
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              getNewStepContent(activeStep)
            }
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Chatbot
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Chatbot
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {
            activeForm === "contentsDefinition" && renderContentsDefinition()
          }
          {
            activeForm === "skillsDefinition" && renderSkillsDefinition()
          }
          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}