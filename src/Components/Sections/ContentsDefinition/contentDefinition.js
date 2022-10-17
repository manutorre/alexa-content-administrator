import { useState, useEffect, useRef, Fragment, React } from "react";
import {
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Footer from "./footer";
import Dialog from "./dialog";

export default function ContentDefinition({
  step,
  handleBack,
  handleNext,
  saveInformation,
}) {
  const dialogText = useRef(null);
  const contentData = useRef({});
  const [showDialog, setShowDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [siblings, setSiblings] = useState([]);
  const [imgStyle, setStyle] = useState({
    // position:'absolute',
    // left:'40%',
    // bottom:'25%',
    height: "200px",
    width: "300px",
  });
  const [wayOfAccess, setWayOfAccess] = useState("");
  const tasks = {
    searchUrl: "Make a search using the search bar from the website",
    menuNavigation: "Drag and drop a section element from the menu",
  };

  useEffect(() => {
    window.addEventListener("message", (e) => onMessageReceive(e));
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [wayOfAccess, inputValue]);

  const onMessageReceive = ({ data }) => {
    console.log(`On message receive in content definition: ${data}`);

    if (data.type === "titleAndLink" && !contentData.current.text) {
      console.log("Data info ", data.link);
      const newData = assignTitleAndLink(data.link, data.title);
      window.parent.postMessage({ mge: "hideMask" }, "*");
      const { text, url, className, tagName } = newData;
      window.parent.postMessage({ mge: "className", elem: className }, "*");
      window.parent.postMessage({ mge: "tagName", elem: tagName }, "*");

      dialogText.current = (
        <Box sx={{ flexDirection: "row", flexWrap: "wrap", display: "flex" }}>
          <Typography variant="body1">The text:</Typography>
          <Typography variant="body2"> "{text}" </Typography>
          <Typography variant="body1">from: </Typography>
          <Typography variant="body2"> "{url}" </Typography>
          <Typography variant="body1">
            corresponds to the content you want to extract for the chatbot?
          </Typography>
        </Box>
      );
      setShowDialog(true);
    } else if (data.type === "className" || data.type === "tagName") {
      console.log(data.pathsElem);
      setSiblings([...siblings, ...data.pathsElem]);
    } else if (data.type === "searchUrl") {
      contentData.current = {
        ...contentData.current,
        searchEngineUrl: data.searchEngineUrl,
      };
      dialogText.current = (
        <Box
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">The </Typography>
          <Typography variant="body2">
            {" "}
            "{contentData.current.name}"{" "}
          </Typography>
          <Typography variant="body1">
            {" "}
            content will be available through the search engine now
          </Typography>
        </Box>
      );
      setShowDialog(true);
    } else if (data.type === "menuNavigation") {
      window.parent.postMessage({ mge: "hideMask" }, "*");
      assignMenuNavigation(data.link, data.title);
      dialogText.current = (
        <Box
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">The </Typography>
          <Typography variant="body2">
            {" "}
            "{contentData.current.name}"{" "}
          </Typography>
          <Typography variant="body1">
            {" "}
            content will be available through the menu navigation now
          </Typography>
        </Box>
      );
      setShowDialog(true);
    }
  };

  const assignMenuNavigation = (linkObject, titleObject) => {
    const menuElement = {
      text: titleObject.text,
      xpath: linkObject.data,
      url: linkObject.url,
      urlPagina: linkObject.urlPagina,
      className: linkObject.className,
      tagName: linkObject.tagName,
    };
    contentData.current = {
      ...contentData.current,
      menuNavigation: menuElement,
    };
    return;
  };
  const assignTitleAndLink = (linkObject, titleObject) => {
    const newContent = {
      text: titleObject.text,
      xpath: linkObject.data,
      url: linkObject.url,
      urlPagina: linkObject.urlPagina,
      className: linkObject.className,
      tagName: linkObject.tagName,
    };
    contentData.current = { ...newContent };
    return newContent;
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleDisagree = () => {
    if (
      !Object.keys(contentData.current).some(
        (key) => key === "menuNavigation" || key === "searchEngineUrl"
      )
    ) {
      contentData.current = {};
    }
    closeDialog();
  };

  const handleAgree = () => {
    if (
      !Object.keys(contentData.current).some(
        (key) => key === "menuNavigation" || key === "searchEngineUrl"
      )
    ) {
      const newInputValue =
        (contentData.current.text && contentData.current.text.split(" ")[0]) ||
        "";
      setInputValue(newInputValue);
      const newContentData = { ...contentData.current, name: newInputValue };
      contentData.current = newContentData;
    }
    closeDialog();
  };

  const handleSelect = (event) => {
    setWayOfAccess(event.target.value);
    window.parent.postMessage({ mge: "hideMask" }, "*");
    window.parent.postMessage({ mge: event.target.value }, "*");
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
        Contents Selection
      </Typography>
      <Grid container spacing={1} marginBottom={2}>
        {!contentData.current.text && (
          <Grid item xs={1} sm={1}>
            <ArrowRightIcon fontSize="large" />
          </Grid>
        )}
        <Grid item xs={11} sm={11}>
          <Typography variant="subtitle1" gutterBottom>
            What information the chatbot should support on it responses?
          </Typography>
        </Grid>
        {inputValue && contentData.current.text && (
          <Grid item xs={1} sm={1}>
            <CheckIcon color="primary" fontSize="medium" />
          </Grid>
        )}
      </Grid>
      {!contentData.current.text && (
        <Grid container>
          <Grid item xs={2} sm={2} />
          <Grid item xs={8} sm={"auto"}>
            <div style={{ height: "200px", width: "300px" }}>
              <img
                src={require("../../../Drag-elements.jpg")}
                style={{ ...imgStyle }}
              />
            </div>
          </Grid>
          <Grid item xs={2} sm={2} />
        </Grid>
      )}
      <Grid container spacing={3} style={{ marginBottom: 10 }}>
        <Grid item xs={3} sm={3} />
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="contentName"
            name="contentName"
            label="Content name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={inputValue}
            helperText="Content can be a product, a news, etc"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3} sm={3}></Grid>
      </Grid>
      {inputValue && contentData.current.text && (
        <Grid container spacing={2}>
          {siblings && siblings.length > 0 && (
            <Grid item xs={12} sm={12}>
              <Typography variant="body2" gutterBottom>
                The{" "}
                <Box fontWeight="fontWeightBold" display="inline">
                  {inputValue}
                </Box>{" "}
                content has{" "}
                {siblings && siblings.length > 0 ? siblings.length : 0} related
                sibling elements
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} sm={12}>
            <Divider variant="middle" />
          </Grid>
          {!wayOfAccess && (
            <Grid item xs={1} sm={1}>
              <ArrowRightIcon fontSize="large" />
            </Grid>
          )}
          <Grid item xs={11} sm={11}>
            <Typography variant="subtitle1" gutterBottom>
              Select strategy from where the chatbot should get this content
            </Typography>
          </Grid>
          {inputValue && wayOfAccess && (
            <Grid item xs={1} sm={1}>
              <CheckIcon color="primary" fontSize="medium" />
            </Grid>
          )}
          <Grid item xs={3} sm={3} />
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Element way of access</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={wayOfAccess}
                label="Element way of access"
                onChange={handleSelect}
              >
                <MenuItem value={"menuNavigation"}>Menu navigation</MenuItem>
                <MenuItem value={"searchUrl"}>Search Url</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={3} />
          <Grid item xs={12} sm={12}>
            <Divider variant="middle" />
          </Grid>
          {wayOfAccess && (
            <Grid container marginTop={2}>
              {inputValue && (
                <Grid item xs={1} sm={1}>
                  <ArrowRightIcon fontSize="large" />
                </Grid>
              )}
              <Grid item xs={11} sm={11}>
                <Typography variant="subtitle1" gutterBottom>
                  {tasks[wayOfAccess]}
                </Typography>
              </Grid>
              {wayOfAccess === "menuNavigation" && (
                <Grid container>
                  <Grid item xs={2} sm={2} />
                  <Grid item xs={8} sm={"auto"}>
                    <div style={{ height: "200px", width: "300px" }}>
                      <img
                        src={require("../../../Drag-elements.jpg")}
                        style={{ ...imgStyle }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2} sm={2} />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      )}
      <Dialog
        open={showDialog}
        dialogText={dialogText.current}
        handleDisagree={
          !Object.keys(contentData.current).some(
            (key) => key === "menuNavigation" || key === "searchEngineUrl"
          ) && handleDisagree
        }
        handleAgree={handleAgree}
      />
      <Footer step={step} handleBack={handleBack} handleNext={handleConfirm} />
    </Fragment>
  );
}
