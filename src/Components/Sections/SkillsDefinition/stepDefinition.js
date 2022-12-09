import { useState, useEffect, useRef, Fragment, React } from "react";
import { Grid, Typography, Divider, TextField } from "@mui/material";
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

  useEffect(() => {
    shouldShowArrowIcon(wayOfAccess);
    shouldShowCheckIcon(wayOfAccess);
  }, [inspectMode, wayOfAccess]);

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleDisagree = () => {
    const dialogComesFromWayOfAccess = [
      "mainScreen",
      "menuNavigation",
      "searchUrl",
    ].includes(dialogText.current.props.forthSentence);
    contentData.current = {};
    if (!dialogComesFromWayOfAccess) {
      setInputValue("");
    }
    closeDialog();
  };

  const handleAgree = () => {
    const dialogComesFromWayOfAccess = [
      "mainScreen",
      "menuNavigation",
      "searchUrl",
    ].includes(dialogText.current.props.forthSentence);

    if (!dialogComesFromWayOfAccess) {
      const newInputValue = contentData.current.text?.split(" ")[0] || "";
      setInputValue(newInputValue);
      const newContentData = { ...contentData.current, name: newInputValue };
      contentData.current = newContentData;
    } else {
      setWayOfAccess(contentData.current.wayOfAccess?.type);
    }
    closeDialog();
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    contentData.current = {
      ...contentData.current,
      wayOfAccess: {
        type: value,
      },
    };

    if (!!wayOfAccess && wayOfAccess !== value) {
      dialogText.current = (
        <DialogText
          firstSentence="Are you sure to change the element access strategy from "
          secondSentence={wayOfAccess}
          thirdSentence=" to "
          forthSentence={value}
          fifthSentence=" ? This will require that you define a new content"
        />
      );
      setShowDialog(true);
      return;
    }

    setWayOfAccess(value);

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

  const shouldShowArrowIcon = (wayOfAccess) => {
    const conditionFulfill = !contentData.current.text;
    switch (wayOfAccess) {
      case "searchUrl":
        setShowArrowIcon(
          conditionFulfill &&
            contentData.current.wayOfAccess?.type === "searchUrl" &&
            !inspectMode
        );
        break;
      case "menuNavigation":
        setShowArrowIcon(
          conditionFulfill &&
            contentData.current.wayOfAccess?.type === "menuNavigation" &&
            !inspectMode
        );
        break;

      case "mainScreen":
        setShowArrowIcon(
          conditionFulfill &&
            contentData.current.wayOfAccess?.type === "mainScreen" &&
            !inspectMode
        );
        break;
    }
  };

  const shouldShowCheckIcon = (wayOfAccess) => {
    const conditionFulfill = contentData.current.text;
    switch (wayOfAccess) {
      case "searchUrl":
        setShowCheckIcon(
          conditionFulfill ||
            (contentData.current.wayOfAccess?.type === "searchUrl" &&
              !!inspectMode)
        );
        break;

      case "menuNavigation":
        setShowCheckIcon(
          conditionFulfill ||
            (contentData.current.wayOfAccess?.type === "menuNavigation" &&
              !!inspectMode)
        );
        break;

      case "mainScreen":
        setShowCheckIcon(
          conditionFulfill ||
            (contentData.current.wayOfAccess?.type === "mainScreen" &&
              !!inspectMode)
        );
        break;
    }
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Conversation Step Definition
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {
          "The action defined previously will be integrated by a serie of steps necessary to collect data from users."
        }
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {"You can choose between:"}
      </Typography>

      <Grid container sx={{ my: 2 }}>
        <SelectContainer
          inputLabel={"Step types"}
          options={["Ask for data", "Display information"]}
          stepType={steptype}
          handleSelect={handleSelect}
        />
      </Grid>

      <Typography variant="subtitle1" gutterBottom>
        {"This step will require to define:"}
      </Typography>

      <Grid container>
        <ContentSelectionStep
          showArrowIcon={!wayOfAccess}
          showCheckIcon={!!wayOfAccess}
          message="Optional conditions (to trigger the step)"
        />
        {/* <SelectContainer
          wayOfAccess={wayOfAccess}
          handleSelect={handleSelect}
        /> */}
      </Grid>
      {/* {wayOfAccess && ( */}
      {/* <Grid container sx={{ my: 2 }}>
        <Grid item xs={12} sm={12} sx={{ my: 2 }}>
          <Divider variant="middle" />
        </Grid>
        <ContentSelectionStep
          showArrowIcon={showArrowIcon}
          showCheckIcon={showCheckIcon}
          message={tasks[wayOfAccess]}
        />
      </Grid> */}
      {/* )} */}
      {/* {showCheckIcon && ( */}
      <>
        <Grid item xs={12} sm={12} sx={{ my: 2 }}>
          <Divider variant="middle" />
        </Grid>
        <ContentSelectionStep
          showArrowIcon={!contentData.current.text}
          showCheckIcon={inputValue && contentData.current.text}
          message="The response of the step (image, text, ...)"
        />
        {/* {!contentData.current.text && <HelperText container={true} />} */}
        {/* <TextInputContainer
          inputValue={inputValue}
          handleChange={handleChange}
        /> */}
        {/* {inputValue && contentData.current.text && siblings?.length > 0 && (
          <OneLineText inputValue={inputValue} siblings={siblings} />
        )} */}
      </>
      {/* )} */}
      <>
        <Grid item xs={12} sm={12} sx={{ my: 2 }}>
          <Divider variant="middle" />
        </Grid>
        <ContentSelectionStep
          showArrowIcon={!contentData.current.text}
          showCheckIcon={inputValue && contentData.current.text}
          message="A directive of what to do next (go to next step, finish action, ...)."
        />
      </>
      <Dialog
        open={showDialog}
        dialogText={dialogText.current}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
      />
      {/* <Footer step={step} handleBack={handleBack} handleNext={handleConfirm} /> */}
    </Fragment>
  );
}
