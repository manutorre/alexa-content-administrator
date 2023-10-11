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
  applyOperation,
  sendPromptToGpt
} from "./utils";
import { HistoryBox } from "./historyBox";

export default function Chatbot() {
  const [requests, setRequests] = useState([]);
  const collection = useRef(null);
  const [steps, setSteps] = useState([chatbotSteps["welcome"]]);
  const [conversations, setConversations] = useState(getStorageConversations());
  const lastStep = useRef("welcome");
  const requestParams = useRef({
    entity: "missing",
    target: "missing",
    source: "missing",
    criteria: "missing",
  });
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
    const getResultsFromRequest = async () => {
      const lastRequest = requests[requests.length - 1];
      if (lastRequest) {
        const lastStep = steps[steps.length - 1];
        let operationResult;
        const nextStep = findNextStep(lastRequest, lastStep);
        console.log({ requestParams, nextStep });

        // if (nextStep.callbackForSlot === "getAverage") {
        //   const { criteria, entity, slot, value } = requestParams.current;
        //   if (criteria) {
        //     operationResult = await applyOperation(collection.current, criteria, slot);
        //   }
        // }
        if (nextStep.step !== 5 && lastStep.step === 6) { //steps["explore"]
          operationResult = await sendPromptToGpt(collection.current, lastRequest);
        }

        const { text, results } = await getText(nextStep, requestParams.current, operationResult);
        if (results) {
          collection.current = { ...collection.current, ...results };
        }
        let nextStepModified = { ...nextStep, text };
        if (nextStep.options) {
          const options = getOptions(requestParams.current);
          nextStepModified = { ...nextStepModified, options };
        }
        if (nextStepModified.carousel) {
          const elements = await getCarouselItems(collection.current, lastRequest);
          nextStepModified = { ...nextStepModified, elements };
        }
        requestParams.current.criteria = "missing";

        // setTimeout(() => {
        const newSteps = [...steps, lastRequest, nextStepModified];
        setSteps(newSteps);
        // }, 1000);
      }
    }

    getResultsFromRequest();
  }, [requests]);

  useEffect(() => {
    if (steps[steps.length - 1].callbackForSlot === "getNResults" || steps[steps.length - 1].step === 7) {
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
    requestParams.current = { ...requestParams.current, ...params };

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

  const getCarouselItems = async (results, lastRequest) => {
    //Returns an array of items based on user input
    const { criteria, entity, slot, value } = requestParams.current;
    let carouselItems = results || steps[steps.length - 1].elements || productsCollection;
    // if (!carouselItems.length) {
    //   carouselItems = Object.entries(carouselItems).map(item => { return { [item[0]]: item[1] } });
    // }
    // else {
    //   // carouselItems = carouselItems.map(item => item[1]);
    //   //Get items where their title or category matches the entity
    //   carouselItems = carouselItems.map(item => { return { [item[0]]: item[1] } });
    // }

    // .filter((item) => {
    //   // const reg = new RegExp(entity, "g");
    //   // const key = item[0];
    //   const info = Object.values(item)[0];
    //   return (
    //     info
    //     // info.text?.toLowerCase().match(reg) // ||item.category.toLowerCase().match(reg)
    //   );
    // });

    //Applies an additional criteria if was requested by user (ex. order, price less than, etc.)
    // if (criteria !== "missing" && slot !== "missing") {
    //   carouselItems = await applyCriteria(results, criteria, slot, value);
    // }
    console.log("After ", carouselItems);
    return carouselItems;
  };

  return (
    <React.Fragment>
      <Grid container sx={{}}>
        <Grid
          item
          xs={1}
          sm={2.5}
          sx={{
            height: (window.innerHeight * 4) / 5,
            maxHeight: (window.innerHeight * 4) / 5,
            bgcolor: "lightgrey",
            py: 2,
            my: 2,
            mx: 2,
          }}
        >
          <Typography sx={{ textAlign: "center", mb: 1 }} variant="h5">
            Historial
          </Typography>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              overflowY: "scroll",
              height: "90%",
            }}
          >
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={8.5}
          sx={{
            overflowY: "scroll",
            height: (window.innerHeight * 4) / 5,
            maxHeight: (window.innerHeight * 4) / 5,
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
      </Grid>
      <Grid container>
        <Grid item xs={1} sm={2.5} />
        <Grid item xs={12} sm={8.7} sx={{ ml: 4 }}>
          <Input onSubmit={onSubmit} />
        </Grid>
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
