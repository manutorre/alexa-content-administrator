import { useState, useEffect, useRef, Fragment, React } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Footer from "./footer";
import Dialog from "./dialog";

export default function PropertiesDefinition({
  step,
  handleBack,
  handleNext,
  saveInformation,
  contentData,
}) {
  const [inputValue, setInputValue] = useState("");
  const dialogText = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [property, setProperty] = useState({});
  const [properties, setProperties] = useState([]);
  const [imgStyle, setStyle] = useState({
    // position:'absolute',
    // left:'40%',
    // bottom:'25%',
    height: "200px",
    width: "300px",
  });
  const contentValue = useRef(contentData);

  useEffect(() => {
    window.addEventListener("message", (e) => onMessageReceive(e));
  }, []);

  const onMessageReceive = ({ data }) => {
    console.log(`On message receive in properties definition: ${data}`);

    if (data.type === "titleAndLink") {
      console.log("Data info ", data.link);
      const newData = assignTitleAndLink(data.link, data.title);
      window.parent.postMessage({ mge: "hideMask" }, "*");

      const { text, url } = newData;
      dialogText.current = (
        <Box sx={{ flexDirection: "row", flexWrap: "wrap", display: "flex" }}>
          <Typography variant="body1">The text:</Typography>
          <Typography variant="body2"> "{text}" </Typography>
          <Typography variant="body1">from: </Typography>
          <Typography variant="body2"> "{url}" </Typography>
          <Typography variant="body1">
            corresponds to the property you want to extract?
          </Typography>
        </Box>
      );
      setShowDialog(true);
    }
  };

  const assignTitleAndLink = (linkObject, titleObject) => {
    const newProperty = {
      text: titleObject.text,
      xpath: linkObject.data,
      url: linkObject.url,
      urlPagina: linkObject.urlPagina,
    }; //className:linkObject.className, tagName:linkObject.tagName});
    setProperty(newProperty);
    return newProperty;
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleDisagree = () => {
    setProperty({});
    closeDialog();
  };

  const handleAgree = () => {
    setInputValue((property.text && property.text.split(" ")[0]) || "");
    closeDialog();
  };

  const handleButtonClick = () => {
    if (inputValue && property.text) {
      setProperty({ ...property, name: inputValue });
      setProperties([...properties, property]);
      setInputValue("");
    }
  };

  const handleConfirm = () => {
    console.log("Next pressed ", properties);
    const operation = "setProperties";
    saveInformation(properties, operation);
    handleNext();
  };

  const handleChange = ({ target }) => {
    console.log("Changing input ", target.value);
    setInputValue(target.value);
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Properties Definition
      </Typography>
      <Typography component="div" variant="subtitle1" gutterBottom>
        Which{" "}
        <Box fontWeight="fontWeightBold" display="inline">
          {`${contentValue.current ? contentValue.current.name : "content"}`}{" "}
        </Box>{" "}
        properties the chatbot should recognize?
      </Typography>
      <Grid container marginTop={1} marginBottom={1} spacing={1}>
        {properties &&
          properties.length > 0 &&
          properties.map((property) => {
            return (
              <Grid item xs={"auto"} sm={"auto"}>
                <Button size="small" color="secondary" variant="outlined">
                  {property.text || ""}
                </Button>
              </Grid>
            );
          })}
      </Grid>
      <Grid container>
        <Grid item xs={2} sm={2} />
        <Grid item xs={"auto"} sm={"auto"}>
          <div style={{ height: "200px", width: "300px" }}>
            <img
              src={require("../../../Drag-elements.jpg")}
              style={{ ...imgStyle }}
            />
          </div>
        </Grid>
        <Grid item xs={2} sm={2} />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={1.8} sm={1.8} />
        <Grid item xs={1.2} sm={1.2} marginTop={2}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleButtonClick}
            size="small"
            color="secondary"
          ></Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="propertyName"
            name="propertyName"
            label="Property name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={inputValue}
            helperText="Properties can be product's price, name, rate, etc"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3} sm={3} />
      </Grid>

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
