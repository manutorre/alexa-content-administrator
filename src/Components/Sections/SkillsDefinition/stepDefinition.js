import { useState, useEffect, useRef, Fragment, React } from "react";
import { Grid, Typography, Divider, TextField, Box } from "@mui/material";
import DialogText from "../ContentsDefinition/components/dialogText";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Footer from "./footer";
import Dialog from "../ContentsDefinition/dialog";
import { bgcolor } from "@mui/system";
import ContentSelectionStep from "../ContentsDefinition/components/contentSelectionStep";
import TextInputContainer from "../ContentsDefinition/components/textInputContainer";
import OneLineText from "../ContentsDefinition/components/oneLineText";
import SelectContainer from "../ContentsDefinition/components/selectContainer";
import HelperText from "../ContentsDefinition/components/helperText";
import Footer from "../ContentsDefinition/footer";

export default function StepDefinition({
  step,
  handleBack,
  handleNext,
  saveInformation,
  contentdata,
  inspectMode,
}) {
  const dialogText = useRef("");
  const contentData = useRef({});
  const [showDialog, setShowDialog] = useState(false);
  const [showArrowIcon, setShowArrowIcon] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [siblings, setSiblings] = useState([]);
  const [imgStyle, setStyle] = useState({
    // position:'absolute',
    // left:'40%',
    // bottom:'25%',
    height: "200px",
    width: "300px",
  });
  const [steptype, setStepType] = useState("");

  const [wayOfAccess, setWayOfAccess] = useState("");
  const tasks = {
    mainScreen: "Condition 1",
    searchUrl: "Condition 2",
    menuNavigation: "Condition 3",
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [wayOfAccess, inputValue]);

  const handleSelect = (event) => {
    const value = event.target.value;
    setStepType(value);
    // contentData.current = {
    //   ...contentData.current,
    //   wayOfAccess: {
    //     type: value,
    //   },
    // };

    // if (!!wayOfAccess && wayOfAccess !== value) {
    //   dialogText.current = (
    //     <DialogText
    //       firstSentence="Are you sure to change the element access strategy from "
    //       secondSentence={wayOfAccess}
    //       thirdSentence=" to "
    //       forthSentence={value}
    //       fifthSentence=" ? This will require that you define a new content"
    //     />
    //   );
    //   setShowDialog(true);
    //   return;
    // }

    // setWayOfAccess(value);

    // shouldShowArrowIcon(event.target.value);
    // shouldShowCheckIcon(event.target.value);
    // window.parent.postMessage({ mge: event.target.value }, "*");
  };

  const handleConfirm = () => {
    console.log("Next pressed ", inputValue);
    const operation = "setContent";
    const newContentData = { ...contentData.current, name: inputValue };
    contentData.current = newContentData;
    saveInformation(newContentData, operation);
    handleNext();
  };

  const handleChange = ({ target }) => {
    console.log("Changing input ", target.value);
    setInputValue(target.value);
    const newContentData = { ...contentData.current, name: target.value };
    contentData.current = newContentData;
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Conversation Steps
      </Typography>

      <Grid container sx={{ m: 2 }}>
        <ContentSelectionStep
          showArrowIcon={!wayOfAccess}
          showCheckIcon={!!wayOfAccess}
          message="Criteria applied to the search action" //"Optional conditions (to trigger the step)"
        />
        <Typography variant="subtitle1">
          {
            "When you make a search, you need to tell to the chatbot what are you looking for."
          }
        </Typography>
        <Typography variant="subtitle1">
          {"If you only make a search using the content "}
          <Box fontWeight="fontWeightBold" display="inline">
            {"identifier"}
          </Box>
          {", the chatbot will return "}
          <Box fontWeight="fontWeightBold" display="inline">
            {"ALL"}
          </Box>
          {" content features. An example of a Search Action utterance is:"}
        </Typography>
      </Grid>

      <Grid container sx={{ m: 2 }}>
        <Typography variant="subtitle1">
          <Box fontWeight="fontWeightBold" display="inline">
            {"User request: "}
          </Box>
          {'"Search '}
          <Box fontWeight="fontWeightBold" display="inline">
            {"[identifier]"}
          </Box>
          {'"'}
        </Typography>
      </Grid>

      <Grid container sx={{ m: 2 }}>
        <Typography variant="subtitle1">
          {
            "It's also possible to add other criteria options from the list of features. An example of a Search Action utterance is: "
          }
        </Typography>
      </Grid>

      <Grid container sx={{ m: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          <Box fontWeight="fontWeightBold" display="inline">
            {"User request: "}
          </Box>
          {'"Search '}
          <Box fontWeight="fontWeightBold" display="inline">
            {"[name | price | image]"}
          </Box>
          {" from "}
          <Box fontWeight="fontWeightBold" display="inline">
            {"[identifier]"}
          </Box>
          {'"'}
        </Typography>
      </Grid>

      <Grid container sx={{ m: 2 }}>
        <Grid item xs={12} sm={12} sx={{ my: 2 }}>
          <Divider variant="middle" />
        </Grid>
        <ContentSelectionStep
          showArrowIcon={!wayOfAccess}
          showCheckIcon={!!wayOfAccess}
          message="Selection from defined contents" //"Optional conditions (to trigger the step)"
        />
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            {
              'The chatbot will try to find the response from the contents defined in the "Information Models Definition" stage. Eg. for the next request: '
            }
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} sx={{ my: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            <Box fontWeight="fontWeightBold" display="inline">
              {"User request: "}
            </Box>
            {'"Search '}
            <Box fontWeight="fontWeightBold" display="inline">
              {'headphones"'}
            </Box>
            {/* {" from "}
            <Box fontWeight="fontWeightBold" display="inline">
              {'products"'}
            </Box> */}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1">
            {"Behind the scene, the technology will search the word "}
            <Box fontWeight="fontWeightBold" display="inline">
              {"headphones"}
            </Box>{" "}
            {" between all "}
            <Box fontWeight="fontWeightBold" display="inline">
              {"[identifier]"}
            </Box>
            {" values from the contents defined."}
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1">
            {"Eg.: Between Contents identified as "}
            <Box fontWeight="fontWeightBold" display="inline">
              {"[Products | News]"}
            </Box>
          </Typography>
        </Grid> */}
        {
          //TODO: Podria ser necesario que el chatbot necesite mas info para saber en que contenido buscar
        }
      </Grid>
      {/* <Dialog
        open={showDialog}
        dialogText={dialogText.current}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
      /> */}
      <Footer step={step} handleBack={handleBack} handleNext={handleConfirm} />
    </Fragment>
  );
}

// useEffect(() => {
//   shouldShowArrowIcon(wayOfAccess);
//   shouldShowCheckIcon(wayOfAccess);
// }, [inspectMode, wayOfAccess]);

// const closeDialog = () => {
//   setShowDialog(false);
// };

// const handleDisagree = () => {
//   const dialogComesFromWayOfAccess = [
//     "mainScreen",
//     "menuNavigation",
//     "searchUrl",
//   ].includes(dialogText.current.props.forthSentence);
//   contentData.current = {};
//   if (!dialogComesFromWayOfAccess) {
//     setInputValue("");
//   }
//   closeDialog();
// };

// const handleAgree = () => {
//   const dialogComesFromWayOfAccess = [
//     "mainScreen",
//     "menuNavigation",
//     "searchUrl",
//   ].includes(dialogText.current.props.forthSentence);

//   if (!dialogComesFromWayOfAccess) {
//     const newInputValue = contentData.current.text?.split(" ")[0] || "";
//     setInputValue(newInputValue);
//     const newContentData = { ...contentData.current, name: newInputValue };
//     contentData.current = newContentData;
//   } else {
//     setWayOfAccess(contentData.current.wayOfAccess?.type);
//   }
//   closeDialog();
// };

// const shouldShowArrowIcon = (wayOfAccess) => {
//   const conditionFulfill = !contentData.current.text;
//   switch (wayOfAccess) {
//     case "searchUrl":
//       setShowArrowIcon(
//         conditionFulfill &&
//           contentData.current.wayOfAccess?.type === "searchUrl" &&
//           !inspectMode
//       );
//       break;
//     case "menuNavigation":
//       setShowArrowIcon(
//         conditionFulfill &&
//           contentData.current.wayOfAccess?.type === "menuNavigation" &&
//           !inspectMode
//       );
//       break;

//     case "mainScreen":
//       setShowArrowIcon(
//         conditionFulfill &&
//           contentData.current.wayOfAccess?.type === "mainScreen" &&
//           !inspectMode
//       );
//       break;
//   }
// };

// const shouldShowCheckIcon = (wayOfAccess) => {
//   const conditionFulfill = contentData.current.text;
//   switch (wayOfAccess) {
//     case "searchUrl":
//       setShowCheckIcon(
//         conditionFulfill ||
//           (contentData.current.wayOfAccess?.type === "searchUrl" &&
//             !!inspectMode)
//       );
//       break;

//     case "menuNavigation":
//       setShowCheckIcon(
//         conditionFulfill ||
//           (contentData.current.wayOfAccess?.type === "menuNavigation" &&
//             !!inspectMode)
//       );
//       break;

//     case "mainScreen":
//       setShowCheckIcon(
//         conditionFulfill ||
//           (contentData.current.wayOfAccess?.type === "mainScreen" &&
//             !!inspectMode)
//       );
//       break;
//   }
// };
