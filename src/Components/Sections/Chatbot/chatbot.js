import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Grid, TextField, Box } from "@mui/material";
import ConversationalBox from "./conversationalBox";
import Input from "./input";

const IMAGE_PATHS = {
  "JBL Tune": require("../../../assets/jbl.png"),
  "Sony Zx": require("../../../assets/sony.png"),
  "Jabra Evolve": require("../../../assets/jabra.png"),
};
const itemData = [
  {
    img: IMAGE_PATHS["JBL Tune"],
    title: "JBL Tune",
    subtitle: "$40",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: IMAGE_PATHS["Sony Zx"],
    title: "Sony Zx",
    subtitle: "$50",
  },
  {
    img: IMAGE_PATHS["Jabra Evolve"],
    title: "Jabra Evolve",
    subtitle: "$30",
  },
];

const DEFAULT_DATA = {
  step1: { type: "Chatbot", text: "How can I help you?", step: 1 },
  step2: {
    type: "Chatbot",
    text: 'Here are the main options available for "On-ear" headphones',
    step: 2,
  },
  step3: {
    type: "Chatbot",
    options: ["JBL Tune", "Sony Zx", "Jabra Evolve"],
    step: 3,
  },
  step4: {
    type: "Chatbot",
    text: 'Here are the main options available for "On-ear" headphones',
    step: 4,
  },
  step5: {
    type: "Chatbot",
    carousel: itemData,
    step: 5,
  },
};

const FORM = {
  welcome: {
    intro: {
      type: "Chatbot",
      text: "I will need some information from you to complete the form action",
      // nextStep: "slot1",
    },
    slot1: {
      type: "Chatbot",
      text: "What is your name and surname?",
      // nextStep: "slot2",
    },
    nextStep: "step2",
  },
  step2: {
    steps: [
      {
        type: "Chatbot",
        text: "Where do you live? Select one option from next countries",
      },
      {
        type: "User",
        options: ["Argentina", "Brasil", "Uruguay"],
        id: "req2",
      },
    ],
    nextStep: "step3",
  },
  step3: {
    steps: [
      {
        type: "Chatbot",
        text: "Select one option from next states",
      },
      {
        type: "User",
        options: {
          Argentina: ["Buenos Aires", "Mendoza", "Cordoba"],
          Brasil: ["Sao Paulo", "Rio de Janeiro", "Santa Catarina"],
          Uruguay: ["Montevideo", "Maldonado", "Colonia"],
        },
        id: "req3",
      },
    ],
    nextStep: "slot4",
  },
  slot4: {
    type: "Chatbot",
    text: "Do you have some email address?",
    nextStep: "slot5",
  },
  slot5: {
    type: "Chatbot",
    text: "I need your email address again to confirm.",
    nextStep: "submit",
  },
  submit: {
    type: "Chatbot",
    text: "Is all the information ok? If no, you can edit some or all the info. Just ask for some slot",
  },
};

export default function Chatbot() {
  const [requests, setRequests] = useState([]);
  const [steps, setSteps] = useState([
    { ...FORM["welcome"].intro },
    { ...FORM["welcome"].slot1 },
  ]);
  const lastStep = useRef("welcome");
  // const [requestAdded, setRequestAdded] = useState(false);
  const [requestEdited, setRequestEdited] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["", ""]);

  useEffect(() => {
    console.log("here");
    if (requests.length === 0) {
      return;
    }
    const lastRequest = requests[requests.length - 1];
    const nextStep = FORM[lastStep.current].nextStep;

    if (!nextStep) {
      return;
    }
    lastStep.current = nextStep;

    let stepsToAdd = [];
    if (FORM[nextStep].steps) {
      stepsToAdd = [...FORM[nextStep].steps];
    } else {
      stepsToAdd = [{ ...FORM[nextStep] }];
    }

    let newSteps = [...steps, lastRequest];
    setSteps(newSteps);

    setTimeout(() => {
      newSteps = [...steps, lastRequest, ...stepsToAdd];
      setSteps(newSteps);
    }, 1000);
  }, [requests]);

  // useEffect(() => {
  //   if (requests.length === 0) {
  //     return;
  //   }
  //   const lastRequest = requests[requests.length - 1];
  //   let newSteps, res;
  //   if (requests.length === 1) {
  //     res = [DEFAULT_DATA["step2"], DEFAULT_DATA["step3"]];
  //     newSteps = [...steps, lastRequest, ...res];
  //   } else if (requests.length === 2) {
  //     res = [DEFAULT_DATA["step4"], DEFAULT_DATA["step5"]];
  //     newSteps = [...steps, lastRequest, ...res];
  //   } else {
  //     newSteps = [...steps, lastRequest];
  //   }

  //   newSteps && setSteps(newSteps);
  // }, [requests]);

  const getLastStepType = () => {
    console.log({ steps });
    return steps.length > 0 && steps[steps.length - 1].type;
  };

  const onSubmit = (inputValue) => {
    const id = "req" + requests.length;
    const newRequest = { type: "User", text: inputValue, id };
    const newRequests = [...requests, newRequest];
    if (getLastStepType() === "User") {
      return;
    }
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

  const onOptionChanged = (optionSelected, id = "req3", step = "step3") => {
    //Busco el segundo select dentro de steps
    const requestToEdit = steps.filter((req) => req.id === id);
    if (requestToEdit.length === 0) {
      return;
    }
    //Si lo encontro, me quedo con la posicion dentro del arreglo de steps
    const stepPos = steps.indexOf(requestToEdit[0]);
    if (stepPos === -1) {
      return;
    }
    const newSteps = [...steps];
    console.log("/////////// FORM ", FORM[step]);

    const nextOptions = [...FORM[step].steps[1].options[optionSelected]];
    const newStep = { type: "User", id: "req3", options: nextOptions };
    newSteps[stepPos] = newStep;

    console.log({ newSteps });
    setSteps(newSteps);
    // setRequestEdited(!requestEdited);
  };

  const onSubmitEdit = (inputValue, id) => {
    const newRequest = { type: "User", text: inputValue, id };
    let newRequests = requests;
    const requestToEdit = requests.filter((req) => req.id === id);
    if (requestToEdit.length === 0) {
      return;
    }
    const pos = newRequests.indexOf(requestToEdit[0]);
    if (pos === -1) {
      return;
    }
    newRequests[pos] = newRequest;
    const stepPos = steps.indexOf(requestToEdit[0]);
    if (stepPos === -1) {
      return;
    }
    let newSteps = steps;
    newSteps[stepPos] = newRequest;
    console.log({ newRequests, newSteps });
    setRequests(newRequests);
    setSteps(newSteps);
    setRequestEdited(!requestEdited);
  };

  const onEdit = ({ currentTarget }) => {
    const value = currentTarget.value;
    let newRequests = requests;
    const boxToEdit = requests.filter((req) => req.id === value);
    // console.log({ boxToEdit, value });
    if (boxToEdit.length === 0) {
      return;
    }
    const newRequest = { ...boxToEdit[0], editable: true };
    const pos = newRequests.indexOf(boxToEdit[0]);
    // console.log({ pos });
    if (pos === -1) {
      return;
    }
    newRequests[pos] = newRequest;

    const stepPos = steps.indexOf(boxToEdit[0]);
    if (stepPos === -1) {
      return;
    }
    let newSteps = steps;
    newSteps[stepPos] = newRequest;
    console.log({ newRequests, newSteps });
    setRequests(newRequests);
    setSteps(newSteps);
    setRequestEdited(!requestEdited);
  };

  console.log("/////////// FORM ", FORM);

  return (
    <React.Fragment>
      <Grid container sx={{}}>
        <Grid xs={1} sm={3} />
        <Grid
          container
          xs={12}
          sm={6}
          sx={{
            overflowY: "scroll",
            maxHeight: (window.innerHeight * 2) / 3,
            bgcolor: "lightblue",
            py: 2,
            m: 2,
          }}
        >
          {/* <Grid item xs={12} sm={12}>
          <ConversationalBox {...DEFAULT_DATA["step1"]} />
        </Grid> */}
          {steps.length > 0 &&
            steps.map(({ type, text, options, carousel, editable, id }) => {
              return (
                <Grid item xs={12} sm={12}>
                  <ConversationalBox
                    type={type}
                    text={text}
                    options={options}
                    carousel={carousel}
                    editable={editable}
                    onEdit={onEdit}
                    id={id}
                    onSubmit={onSubmitEdit}
                    onOptionSelected={onOptionSelected}
                    requestEdited={requestEdited}
                    selectedOptions={selectedOptions}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Grid xs={1} sm={3} />
      </Grid>
      <Grid container>
        <Grid xs={1} sm={3} />
        <Grid xs={12} md={6}>
          <Input onSubmit={onSubmit} />
        </Grid>
        <Grid xs={1} sm={3} />
      </Grid>
    </React.Fragment>
  );
}
