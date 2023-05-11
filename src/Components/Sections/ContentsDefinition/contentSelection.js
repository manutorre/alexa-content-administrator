import { useState, useEffect, useRef, Fragment, React } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import DialogText from "./components/dialogText";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Footer from "./footer";
import Dialog from "./dialog";
import { bgcolor } from "@mui/system";
import ContentSelectionStep from "./components/contentSelectionStep";
import TextInputContainer from "./components/textInputContainer";
import OneLineText from "./components/oneLineText";
import SelectContainer from "./components/selectContainer";
import HelperText from "./components/helperText";

// const mapStrings = (contentData) => {
//   return contentData.searchEngineUrl
//     ? "searchUrl"
//     : contentData.menuNavigation
//     ? "menuNavigation"
//     : "";
// };

export default function ContentSelection({
  step,
  handleBack,
  handleNext,
  saveInformation,
  contentdata,
  inspectMode,
}) {
  const dialogText = useRef("");
  const contentData = useRef(contentdata);
  const [showDialog, setShowDialog] = useState(false);
  const [showArrowIcon, setShowArrowIcon] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [inputValue, setInputValue] = useState(
    contentdata?.name ||
      contentData.current?.text?.split(" ")[0] ||
      contentdata?.text ||
      ""
  );
  const [siblings, setSiblings] = useState(
    contentData.current?.siblings || contentdata?.siblings || []
  );
  // const [imgStyle, setStyle] = useState({
  //   // position:'absolute',
  //   // left:'40%',
  //   // bottom:'25%',
  //   height: "200px",
  //   width: "300px",
  // });
  const [wayOfAccess, setWayOfAccess] = useState(
    contentData.current.wayOfAccess?.type ||
      contentdata?.wayOfAccess?.type ||
      ""
  );
  const tasks = {
    mainScreen: "Enable inspect mode",
    searchUrlIntro:
      "Make a search using the search bar from the website to catch the search url and enable inspect mode.",
    searchUrlBody:
      "Then go to the website and you will see how the web elements will highlight with a RED color box while you hover them.",
    menuNavigation:
      "Access to some section from the website menu and enable inspect mode",
  };

  useEffect(() => {
    window.addEventListener("message", (e) => onMessageReceive(e));
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [wayOfAccess, inputValue]);

  useEffect(() => {
    shouldShowArrowIcon(wayOfAccess);
    shouldShowCheckIcon(wayOfAccess);
  }, [inspectMode, wayOfAccess]);

  const onMessageReceive = ({ data }) => {
    console.log(`On message receive in content definition: ${data}`);

    if (data.type === "titleAndLink" && !contentData.current.text) {
      console.log("Data info ", data.link);
      const newData = assignTitleAndLink(data.link, data.title);
      const { text, url, className, tagName } = newData;
      dialogText.current = (
        <DialogText
          firstSentence="The text: "
          secondSentence={text}
          thirdSentence=" corresponds to the content you want to extract for the chatbot?"
          // forthSentence={url}
          // fifthSentence=" corresponds to the content you want to extract for the chatbot?"
        />
      );
      setShowDialog(true);

      window.parent.postMessage({ mge: "className", className }, "*");
      setTimeout(() => {
        window.parent.postMessage({ mge: "tagName", tagName }, "*");
      }, 400);
    } else if (data.type === "className" || data.type === "tagName") {
      console.log(data.pathsElem);
      setSiblings([...siblings, ...data.pathsElem]);
      contentData.current = {
        ...contentData.current,
        siblings: [...siblings, ...data.pathsElem],
      };
    } else if (data.type === "searchUrl") {
      console.log("######### Searching url ", { data });
      contentData.current = {
        ...contentData.current,
        wayOfAccess: {
          type: "searchUrl",
          data: data.pathsElem,
        },
        // searchEngineUrl: data.pathsElem,
      };

      dialogText.current = (
        <DialogText
          firstSentence="The "
          secondSentence={contentData.current.name}
          thirdSentence=" content will be available through the search engine"
        />
      );
      setShowDialog(true);
    } //else if (data.type === "menuNavigation") {
    //   assignMenuNavigation(data.link, data.title);

    //   dialogText.current = (
    //     <DialogText
    //       firstSentence="The "
    //       secondSentence={contentData.current.name}
    //       thirdSentence=" content will be available through the menu navigation"
    //     />
    //   );
    //   setShowDialog(true);
    // }
  };

  // const assignMenuNavigation = (linkObject, titleObject) => {
  //   const menuElement = {
  //     text: titleObject.text,
  //     xpath: linkObject.data,
  //     url: linkObject.url,
  //     urlPagina: linkObject.urlPagina,
  //     className: linkObject.className,
  //     tagName: linkObject.tagName,
  //   };
  //   contentData.current = {
  //     ...contentData.current,
  //     wayOfAccess: {
  //       type: "menuNavigation",
  //       data: menuElement,
  //     },
  //     // menuNavigation: menuElement,
  //   };
  //   return;
  // };
  const assignTitleAndLink = (linkObject, titleObject) => {
    let newContent = {
      text: titleObject.text,
      xpath: titleObject.data,
      urlPagina: titleObject.urlPagina,
      className: titleObject.className,
      tagName: titleObject.tagName,
    };

    if (linkObject) {
      newContent = {
        ...newContent,
        xpath: linkObject.data,
        url: linkObject.url,
        urlPagina: linkObject.urlPagina,
        className: linkObject.className,
        tagName: linkObject.tagName,
      };
    }
    contentData.current = { ...contentData.current, ...newContent };
    return newContent;
  };

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
    setWayOfAccess(value);

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
        Contents Selection
      </Typography>
      <Grid container>
        <ContentSelectionStep
          showArrowIcon={!wayOfAccess}
          showCheckIcon={!!wayOfAccess}
          message="Select strategy from where the chatbot should get this content"
        />
        <SelectContainer
          wayOfAccess={wayOfAccess}
          handleSelect={handleSelect}
        />
      </Grid>
      {wayOfAccess && (
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={12} sm={12} sx={{ my: 2 }}>
            <Divider variant="middle" />
          </Grid>
          <ContentSelectionStep
            showArrowIcon={showArrowIcon}
            showCheckIcon={showCheckIcon}
            message={tasks[wayOfAccess + "Intro"]}
          />
          {showCheckIcon && (
            <ContentSelectionStep
              showArrowIcon={false}
              showCheckIcon={false}
              message={tasks[wayOfAccess + "Body"]}
            />
          )}
        </Grid>
      )}
      {showCheckIcon && (
        <>
          <Grid item xs={12} sm={12} sx={{ my: 2 }}>
            <Divider variant="middle" />
          </Grid>
          <ContentSelectionStep
            showArrowIcon={!contentData.current.text}
            showCheckIcon={inputValue && contentData.current.text}
            message="What information the chatbot should support on it responses?"
          />
          {!contentData.current.text && <HelperText container={true} />}
          <TextInputContainer
            inputValue={inputValue}
            handleChange={handleChange}
            isDisabled={!contentData.current?.text}
          />
          {inputValue && contentData.current.text && siblings?.length > 0 && (
            <OneLineText inputValue={inputValue} siblings={siblings} />
          )}
        </>
      )}
      <Dialog
        open={showDialog}
        dialogText={dialogText.current}
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
      />
      <Footer step={step} handleBack={handleBack} handleNext={handleConfirm} />
    </Fragment>
  );
}
