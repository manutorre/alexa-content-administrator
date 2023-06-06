import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField, Box } from "@mui/material";
import ConversationalBox from "./conversationalBox";
import Input from "./input";
import FORM from "../../../data/formPrompts.json";
import collection from "../../../data/objectsCollection";
import chatbotSteps from "../../../data/chatbotSteps.json";
import { parseRequest, findNextStep } from "./utils";

export default function Chatbot() {
  const [requests, setRequests] = useState([]);
  const [steps, setSteps] = useState([chatbotSteps["welcome"]]);
  const lastStep = useRef("welcome");
  const requestParams = useRef({});
  // const [requestAdded, setRequestAdded] = useState(false);
  const [requestEdited, setRequestEdited] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["", ""]);

  useEffect(() => {
    const lastRequest = requests[requests.length - 1];
    const nextStep = findNextStep(lastRequest);

    setTimeout(() => {
      newSteps = [...steps, lastRequest, nextStep];
      setSteps(newSteps);
    }, 1000);
  }, [requests]);

  const getLastStepType = () => {
    console.log({ steps });
    return steps.length > 0 && steps[steps.length - 1].type;
  };

  const onSubmit = (inputValue) => {
    // const id = "req" + requests.length;
    // if (getLastStepType() === "User") {
    //   return;
    // }
    const params = parseRequest(inputValue, requestParams.current);
    const newRequest = { type: "User", text: inputValue, params }; //, id };
    const newRequests = [...requests, newRequest];
    requestParams.current = params;

    setRequests(newRequests);
  };

  const onOptionSelected = (inputValue, id) => {
    console.log({ inputValue, selectedOptions });
    const pos = id === "req2" ? 0 : 1;
    const newValue = [...selectedOptions];
    newValue[pos] = inputValue;

    //Si cambia la opcion elegida del select
    if (selectedOptions[pos] && selectedOptions[pos] !== newValue[pos]) {
      console.log("entra");
      setSelectedOptions(newValue);
      if (pos === 0) {
        onOptionChanged(inputValue);
      }
      return;
    }

    setSelectedOptions(newValue);
    const nextStep = FORM[lastStep.current].nextStep;
    lastStep.current = nextStep;

    const newStep = { ...FORM[nextStep] };
    console.log("Antes ", { newStep, FORM });

    let stepsToAdd = [];
    if (newStep.steps) {
      if (newStep.steps[1]) {
        const nextOptions = newStep.steps[1].options[inputValue];
        console.log("Despues ", { newStep, FORM });

        stepsToAdd = [newStep.steps[0]];
        stepsToAdd[1] = { type: "User", id: "req3", options: nextOptions };
        // newStep.steps[1].options = nextOptions;
      }
    } else {
      stepsToAdd = [newStep];
    }

    console.log({ stepsToAdd, steps });

    const newSteps = [...steps, ...stepsToAdd];
    setSteps(newSteps);
  };

  // const onOptionChanged = (optionSelected, id = "req3", step = "step3") => {
  //   //Busco el segundo select dentro de steps
  //   const requestToEdit = steps.filter((req) => req.id === id);
  //   if (requestToEdit.length === 0) {
  //     return;
  //   }
  //   //Si lo encontro, me quedo con la posicion dentro del arreglo de steps
  //   const stepPos = steps.indexOf(requestToEdit[0]);
  //   if (stepPos === -1) {
  //     return;
  //   }
  //   const newSteps = [...steps];
  //   console.log("/////////// FORM ", FORM[step]);

  //   const nextOptions = [...FORM[step].steps[1].options[optionSelected]];
  //   const newStep = { type: "User", id: "req3", options: nextOptions };
  //   newSteps[stepPos] = newStep;

  //   console.log({ newSteps });
  //   setSteps(newSteps);
  //   // setRequestEdited(!requestEdited);
  // };

  console.log({ steps, requests });

  return (
    <React.Fragment>
      <Grid container sx={{}}>
        <Grid item xs={1} sm={3} />
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            overflowY: "scroll",
            height: (window.innerHeight * 3) / 4,
            maxHeight: (window.innerHeight * 3) / 4,
            bgcolor: "lightblue",
            py: 2,
            m: 2,
          }}
        >
          {/* <Grid item xs={12} sm={12}>
          <ConversationalBox {...DEFAULT_DATA["step1"]} />
        </Grid> */}
          {steps.length > 0 &&
            steps.map(
              ({ type, text, options, carousel, editable, id }, index) => {
                return (
                  <Grid item xs={12} sm={12} key={index}>
                    <ConversationalBox
                      type={type}
                      text={text}
                      options={options}
                      carousel={carousel}
                      // editable={editable}
                      // onEdit={onEdit}
                      id={id}
                      // onSubmit={onSubmitEdit}
                      onOptionSelected={onOptionSelected}
                      // requestEdited={requestEdited}
                      selectedOptions={selectedOptions}
                    />
                  </Grid>
                );
              }
            )}
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
      <Grid container>
        <Grid item xs={1} sm={3} />
        <Grid item xs={12} sm={6}>
          <Input onSubmit={onSubmit} />
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    </React.Fragment>
  );
}