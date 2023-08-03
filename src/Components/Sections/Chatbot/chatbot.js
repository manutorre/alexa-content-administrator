import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField, Box, Typography } from "@mui/material";
import ConversationalBox from "./conversationalBox";
import Input from "./input";
import FORM from "../../../data/formPrompts.json";
import { productsCollection } from "../../../data/objectsCollection";
import chatbotSteps from "../../../data/chatbotSteps.json";
import {
  parseRequest,
  parseRequestWithGpt,
  findNextStep,
  getStorageConversations,
  getText,
  applyCriteria,
  getOptions,
} from "./utils";
import { HistoryBox } from "./historyBox";

export default function Chatbot() {
  const [requests, setRequests] = useState([]);
  const [steps, setSteps] = useState([chatbotSteps["welcome"]]);
  const [conversations, setConversations] = useState(getStorageConversations());
  const lastStep = useRef("welcome");
  const requestParams = useRef({});
  // const [requestAdded, setRequestAdded] = useState(false);
  const [requestEdited, setRequestEdited] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["", ""]);

  useEffect(() => {
    const conversationName = new Date().toDateString();
    const conversationFound = conversations[conversationName];
    console.log({ conversationFound });
    if (!conversationFound) {
      conversations[conversationName] = { steps };
    } else {
      conversations[conversationName].steps = steps;
    }

    setConversations(conversations);
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [steps]);

  useEffect(() => {
    const lastRequest = requests[requests.length - 1];
    if (lastRequest) {
      const nextStep = findNextStep(lastRequest);
      console.log({ requestParams });

      const text = getText(nextStep, requestParams.current);
      let nextStepModified = { ...nextStep, text };
      if (nextStep.options) {
        const options = getOptions(requestParams.current);
        nextStepModified = { ...nextStepModified, options };
      }
      if (nextStepModified.carousel) {
        const elements = getCarouselItems();
        nextStepModified = { ...nextStepModified, elements };
      }

      // setTimeout(() => {
      const newSteps = [...steps, lastRequest, nextStepModified];
      setSteps(newSteps);
      // }, 1000);
    }
  }, [requests]);

  useEffect(() => {
    if (steps[steps.length - 1].callbackForSlot === "getNResults") {
      const newSteps = [...steps, chatbotSteps.explore];
      setSteps(newSteps);
    }
  }, [steps]);

  //TODO: create some comparative operations

  const getLastStepType = () => {
    console.log({ steps });
    return steps.length > 0 && steps[steps.length - 1].type;
  };

  const onSubmit = async (inputValue) => {
    // const id = "req" + requests.length;
    if (getLastStepType() === "User") {
      return;
    }
    const params = await parseRequestWithGpt(inputValue, requestParams.current);
    console.log({ params });
    const newRequest = { type: "User", text: inputValue, params }; //, id };
    const newRequests = [...requests, newRequest];
    requestParams.current = params;

    setRequests(newRequests);
  };

  const onOptionSelected = (inputValue, id) => {
    //Remove options
    const newSteps = steps;
    const lastStep = newSteps[steps.length - 1];
    lastStep.options = null;
    setSteps(newSteps);

    console.log({ inputValue });
    onSubmit(inputValue);
  };

  const onPressHistoryItem = () => {
    //TODO: save conversations in local storage
    // const savedConversations = localStorage.getItem("conversations");
    // const parsedConversations = JSON.parse(savedConversations);
    // console.log({ parsedConversations });
    // const savedSteps = parsedConversations[0].steps;
    // setSteps(savedSteps);
  };

  console.log({ steps, requests, conversations });

  const getCarouselItems = () => {
    //Returns an array of items based on user input
    const { criteria, entity, slot } = requestParams.current;
    let carouselItems = steps[steps.length - 1].elements || productsCollection;

    //Get items where their title or category matches the entity
    carouselItems = carouselItems.filter((item) => {
      const reg = new RegExp(entity, "g");
      return (
        item.title.toLowerCase().match(reg) ||
        item.category.toLowerCase().match(reg)
      );
    });

    //Applies an additional criteria if was requested by user (ex. order, price less than, etc.)
    if (criteria !== "missing" && slot !== "missing") {
      carouselItems = applyCriteria(carouselItems, criteria, slot);
    }
    console.log("After ", carouselItems);
    return carouselItems;
  };

  return (
    <React.Fragment>
      <Grid container sx={{}}>
        <Grid
          item
          xs={1}
          sm={3}
          sx={{
            bgcolor: "lightgrey",
            py: 2,
            my: 2,
            mr: 4,
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Historial
          </Typography>

          {Object.keys(conversations).length > 0 &&
            Object.keys(conversations).map((text, index) => {
              return (
                <Grid item xs={12} sm={12} key={index}>
                  <HistoryBox
                    text={text}
                    onPressHistoryItem={onPressHistoryItem}
                    // options={options}
                    // carousel={carousel && collection}
                    // // editable={editable}
                    // // onEdit={onEdit}
                    // id={id}
                    // // onSubmit={onSubmitEdit}
                    // onOptionSelected={onOptionSelected}
                    // // requestEdited={requestEdited}
                    // selectedOptions={selectedOptions}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
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
              ({ type, text, options, carousel, elements, id }, index) => {
                return (
                  <Grid item xs={12} sm={12} key={index}>
                    <ConversationalBox
                      type={type}
                      text={text}
                      options={options}
                      carousel={carousel && elements}
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
        <Grid item xs={1} sm={4} />
      </Grid>
      <Grid container>
        <Grid item xs={1} sm={3} />
        <Grid item xs={12} sm={5} sx={{ ml: 4 }}>
          <Input onSubmit={onSubmit} />
        </Grid>
        <Grid item xs={1} sm={4} />
      </Grid>
    </React.Fragment>
  );
}

// const onOptionSelected = (inputValue, id) => {
//   console.log({ inputValue, selectedOptions });
//   const pos = id === "req2" ? 0 : 1;
//   const newValue = [...selectedOptions];
//   newValue[pos] = inputValue;

//   //Si cambia la opcion elegida del select
//   if (selectedOptions[pos] && selectedOptions[pos] !== newValue[pos]) {
//     console.log("entra");
//     setSelectedOptions(newValue);
//     if (pos === 0) {
//       onOptionChanged(inputValue);
//     }
//     return;
//   }

//   setSelectedOptions(newValue);
//   const nextStep = FORM[lastStep.current].nextStep;
//   lastStep.current = nextStep;

//   const newStep = { ...FORM[nextStep] };
//   console.log("Antes ", { newStep, FORM });

//   let stepsToAdd = [];
//   if (newStep.steps) {
//     if (newStep.steps[1]) {
//       const nextOptions = newStep.steps[1].options[inputValue];
//       console.log("Despues ", { newStep, FORM });

//       stepsToAdd = [newStep.steps[0]];
//       stepsToAdd[1] = { type: "User", id: "req3", options: nextOptions };
//       // newStep.steps[1].options = nextOptions;
//     }
//   } else {
//     stepsToAdd = [newStep];
//   }

//   console.log({ stepsToAdd, steps });

//   const newSteps = [...steps, ...stepsToAdd];
//   setSteps(newSteps);
// };

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
