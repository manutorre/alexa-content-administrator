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
import HelperText from "./components/helperText";

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
  const [properties, setProperties] = useState(contentData?.properties || []);
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
          <Typography variant="body1">The text: </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            {text}
          </Typography>
          <Typography variant="body1">from: </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            {url}
          </Typography>
          <Typography variant="body1">
            corresponds to the feature you want to extract?
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
        Features Selection
      </Typography>
      <Typography component="div" variant="subtitle1" gutterBottom>
        Which{" "}
        <Box fontWeight="fontWeightBold" display="inline">
          {`${
            contentValue?.current?.name ? contentValue.current.name : "content"
          }`}{" "}
        </Box>{" "}
        features the chatbot should recognize?
      </Typography>
      {properties.length === 0 && (
        <HelperText additionalInstruction={"Enable inspect mode"} />
      )}
      <Grid container marginTop={1} marginBottom={1} spacing={1}>
        {properties &&
          properties.length > 0 &&
          properties.map((property) => {
            return (
              <Grid item xs={"auto"} sm={"auto"}>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  // disabled
                >
                  {property.text || ""}
                </Button>
              </Grid>
            );
          })}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        // spacing={3}
        sx={{ my: 2 }}
      >
        <Grid item xs={2.5} sm={2.5} />
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="propertyName"
            name="propertyName"
            label="Feature name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={inputValue}
            helperText="Features can be product's price, name, rate, etc"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={1} sm={1} marginTop={2}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleButtonClick}
            size="small"
            color="primary"
          ></Button>
        </Grid>
        <Grid item xs={2.5} sm={2.5} />
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
