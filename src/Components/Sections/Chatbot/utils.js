import {
  DEFAULT_TARGET,
  DEFAULT_CRITERIA_OPERATIONS,
} from "../../../data/defaultSources";
import steps from "../../../data/chatbotSteps.json";
import openai from "../../../apiGPT";
import axios from "axios";
import * as cheerio from "cheerio";

export const getStorageConversations = () => {
  return JSON.parse(localStorage.getItem("conversations")) || {};
};

const getDataAccordingSource = (source, url, pos, $) => {
  let text, price, imageSrc, link, fullLink;
  switch (source) {
    case "Amazon":
      text = $("span[class='a-size-medium a-color-base a-text-normal']")[pos].firstChild.data;
      price = $("span[class='a-price']")[pos].firstChild.children[0].data;
      imageSrc = $("div[class='a-section aok-relative s-image-fixed-height']")[pos].firstChild.attribs.src;
      link = $("h2[class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']")[pos].firstChild.attribs.href;
      fullLink = `${url}${link}`;
      break;
    case "MercadoLibre":
      text = $("h2[class='ui-search-item__title']")[pos].firstChild.data;
      price = $("span[class='andes-money-amount ui-search-price__part ui-search-price__part--medium andes-money-amount--cents-superscript']")[pos].firstChild.children[0].data;
      imageSrc = $(".ui-search-result-image__element")[pos].attribs['data-src'];
      link = $("div[class='andes-carousel-snapped ui-search-result__card andes-carousel-snapped--scroll-hidden']")[pos].firstChild.firstChild.firstChild.attribs.href;
      fullLink = `${link}`;
      break;
    default:
      break;
  }

  return { data: { text, price, imageSrc }, fullLink };
}

const getDescriptionAccordingSource = async (source, fullLink, $) => {
  let description;
  const res = await axios({
    method: "get",
    url: fullLink,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  $ = cheerio.load(res.data);
  let html = $.html();
  switch (source) {
    case "Amazon":
      description = $("li[class='a-spacing-mini']");
      break;
    case "MercadoLibre":
      description = $("li[class='ui-vpp-highlighted-specs__features-list-item ui-pdp-color--BLACK ui-pdp-size--XSMALL ui-pdp-family--REGULAR']");
      break;
    default:
      break;
  }
  return description;
}

/**
 * Returns the number of results in the collection that have a title
 * matching the given entity.
 *
 * @param {string} entity - The entity to match against the titles in the collection
 * @return {number} The number of results in the collection matching the entity
 */
export const getNResults = async (entity, source) => {
  let param, url, searchParam;
  switch (source) {
    case "Amazon":
      param = entity.replaceAll(" ", "+");
      url = 'https://www.amazon.com';
      searchParam = `/s?k=${param}`;
      break;
    case "MercadoLibre":
      param = entity.replaceAll(" ", "-");
      url = 'https://listado.mercadolibre.com.ar';
      searchParam = `/${param}`;  //#D[A:${entity}]`;
      break;
    default:
      param = entity.replaceAll(" ", "+");
      url = 'https://www.amazon.com';
      searchParam = `/s?k=${param}`;
      break;
  }

  const response = await axios({
    method: "get",
    url: url + searchParam,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  let $ = cheerio.load(response.data);

  // const mainElements = $("div[class='sg-col-20-of-24 s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 AdHolder sg-col s-widget-spacing-small sg-col-12-of-16']");
  const mainElements = {};

  let n = Object.entries(mainElements).length;
  if (n !== 5) {
    n = 0;
  } else {
    n = 6;
  }

  for (let i = 0; i < 5; i++) {
    const { data, fullLink } = getDataAccordingSource(source, url, i, $);
    let description = await getDescriptionAccordingSource(source, fullLink, $);
    let desc = [];
    let d;
    for (let p = 0; p < description.length; p++) {
      switch (source) {
        case 'Amazon':
          d = description[p].children[0].children[0].data;
          break;
        case 'MercadoLibre':
          d = description[p].children[0].data;
          break;
        default:
          break;
      }
      desc = [...desc, d];
    }
    $ = cheerio.load(response.data);
    mainElements[n + i] = { ...data, fullLink, source: 'Amazon', desc };
  }
  return mainElements;
};

const TRAINING_MESSAGES = {
  allMissing:
    'You are a helpful assistant. You need to recognize 4 kind of concepts (entity, target, source, action) in the following sentences and return them in the form {key:value}. In next example: "I want to buy a wireless headphone", the entity is "wireless headphone", the target is "product" and the source is "missing". In next example: "I want to buy a book from Amazon", the entity is "book", the target is "product" and the source is "Amazon". In next example: "I want to add headphones from MercadoLibre", the entity is "headphones", the target is "product", the source is "MercadoLibre" and the action is "add".',
  entityMissing:
    'You are a helpful assistant. You need to recognize 1 concept (entity) in the following sentences and return it in the form {key:value}. In next example: "I want to buy a wireless headphone", the entity is "wireless headphone". In next example: "I want to buy a book from Amazon", the entity is "book".',
  targetMissing:
    'You are a helpful assistant. You need to recognize 1 concept (target) in the following sentences and return it in the form {key:value}. In next example: "I want to buy a wireless headphone", the target is "product". In next example: "I want to buy a book from Amazon", the target is "product".',
  sourceMissing:
    'You are a helpful assistant. You need to recognize 1 concept (source) in the following sentences and return it in the form {key:value}. In next example: "I want to buy a wireless headphone", the source is "missing". In next example: "I want to buy a book from Amazon", the source is "Amazon".',
  // criteriaMissing:
  //   'You are a helpful assistant. You need to recognize 2 concepts (criteria, slot) in the following sentences and return it in the form {key:value}. "I want headphones from Amazon ordered by price", the entity is "headphones", the target is "product", the source is "Amazon" and the criteria is "order by" where "price" is the "slot". Or "I want the products with price less than 100", the criteria is "less than", the slot is "price" and the value is "100".',
};

/**
 * Parses the input string to extract the target, source, and entity values and constructs an object with the search action.
 * When some value is missing, returns the string "missing" for the property.
 *
 * @param {string} input - the input string to be parsed.
 * @return {object} an object containing the search action, entity value, target value, and source value.
 */
export const parseRequestWithGpt = async (input, currentParams) => {
  // const formattedInput = input.toLowerCase();
  // const criteriaMissing = currentParams.criteria === "missing";
  const entityMissing = currentParams.entity === "missing";
  const targetMissing = currentParams.target === "missing";
  const sourceMissing = currentParams.source === "missing";
  const allMissing = entityMissing && targetMissing && sourceMissing; // && criteriaMissing;
  let entity, target, source, content, action, entityFound, targetFound, sourceFound, actionFound;

  const searchPropsForMissing = {
    allMissing,
    entityMissing,
    targetMissing,
    sourceMissing,
    // criteriaMissing,
  };
  const missingIndex = Object.entries(searchPropsForMissing).findIndex(
    (searchProp) => !!searchProp[1]
  );
  const propMissing =
    missingIndex !== -1 && Object.entries(searchPropsForMissing)[missingIndex];

  const messagePosition = propMissing[0];

  //If some prop is missing
  if (messagePosition) {
    content = TRAINING_MESSAGES[messagePosition];
  } else {
    //Identify again the necessary props
    content = TRAINING_MESSAGES['allMissing'];
  }

  console.log({ content, currentParams });

  //First, train GPT to find entity, target and source values from a sentence
  const trainingMessages = [
    {
      role: "system",
      content,
    },
    { role: "user", content: input },
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: trainingMessages,
  });

  const completionResult = completion.data.choices[0].message;
  const data =
    completionResult.content && JSON.parse(completionResult.content);

  entity = data.entity;
  target = data.target;
  action = data.action;
  source = data.source.replaceAll(' ', '');
  source = source[0].toUpperCase() + source.slice(1, source.length);

  // criteria = data.criteria;
  // slot = data.slot;
  // value = data.value;
  console.log({ data });

  //If only some data is missing, don't replace the data already collected
  if (messagePosition) {
    entityFound = ((currentParams.entity !== "missing") && currentParams.entity) || entity || "missing";
    targetFound = ((currentParams.target !== "missing") && currentParams.target) || target || "missing";
    sourceFound = ((currentParams.source !== "missing") && currentParams.source) || source || "missing";
    actionFound = ((currentParams.action !== "missing") && currentParams.action) || action || "missing";
  } else {
    //Otherwise, get all data again
    entityFound = entity || currentParams.entity || "missing";
    targetFound = target || currentParams.target || "missing";
    sourceFound = source || currentParams.source || "missing";
    actionFound = action || currentParams.action || "missing";
  }

  // const criteriaFound =
  //   criteria || (!criteriaMissing && currentParams.criteria) || "missing";
  // const slotFound =
  //   slot || (!criteriaMissing && currentParams.slot) || "missing";
  // const valueFound =
  //   value || (!criteriaMissing && currentParams.value) || "missing";

  return {
    input,
    action: "search",
    // slot: slotFound,
    // value: valueFound,
    // criteria: criteriaFound,
    action: actionFound,
    entity: entityFound,
    target: targetFound,
    source: sourceFound,
  };
};

/**
 * Finds the next step based on the provided parameters.
 *
 * @param {Object} params - An object containing the entity, target, and source.
 * @return {string} The next step, or the result if no missing properties are found.
 */
export const findNextStep = (lastRequest, lastStep) => {
  const { params } = lastRequest;
  const missingProps = Object.keys(params).filter(
    (prop) => params[prop] === "missing"
  );

  // //Check if some step key is part of user input
  // const inputWords = params.input?.split(" ").join("|");
  // const reg1 = new RegExp(inputWords, "g");
  // const stepFound = Object.keys(steps).join(" ").match(reg1);
  // if (stepFound) {
  //   return steps[stepFound[0]];
  // }

  if (missingProps.includes("entity")) {
    return steps["entity"];
  }
  if (missingProps.includes("target")) {
    return steps["target"];
  }
  if (missingProps.includes("source")) {
    return steps["source"];
  }

  const productRequested = params.target === "product";
  if (params.action?.match("add") || productRequested) {
    return steps["results"];
  }

  if (lastStep.step === 6) {
    return steps["default"];
  }

  // if (lastStep.step === 5) {
  //   return steps["explore"];
  // }
};

/**
 * Returns the text of the next step in a conversation, based on the supplied `nextStep` and `currentParams`.
 *
 * @param {Object} nextStep - An object representing the next step in the conversation.
 * @param {Object} currentParams - An object representing the current parameters of the conversation.
 * @return {string} The text of the next step in the conversation.
 */
export const getText = async (nextStep, currentParams, operationResult) => {
  let text = nextStep.text;
  console.log({ nextStep });
  const { entity, target, source, input, criteria, slot, value } = currentParams;
  let results; //results={key: {text, price, image, url}}

  switch (nextStep.callbackForSlot) {
    case "getNResults":
      results = await getNResults(entity, source);
      text = text.replace(/@slotForResults/g, Object.entries(results).length);
      break;
    case "getSlot":
      text = text.replace(/@slotForEntity/g, input);
      break;
    case "oderBySlot":
      text = text.replace(/@slotForOrdering/g, slot);
      break;
    case "getAverage":
      text = text.replace(/@slot/g, slot);
      text = text.replace(/@value/g, operationResult);
      break;
    case "filterWith":
      text = text.replace(/@slot/g, slot);
      text = text.replace(/@value/g, value);
      break;
    case "default":
      text = text.replace(/@value/g, operationResult.msg);
      results = operationResult.elem;
      break;
  }
  text = text.replace(/@entity/g, entity);
  text = text.replace(/@target/g, target);
  text = text.replace(/@source/g, source);
  text = text.replace(/@criteria/g, criteria);

  return { text, results };
};

export const getOptions = (currentParams) => {
  const { target } = currentParams;
  return DEFAULT_TARGET[target].sources;
};

/**
 * Apply an operation to a collection of elements based on user request.
 *
 * @param {Array} collection - The list of elements.
 * @return {Object} - An object with a response message and the list of elements after applying the operation.
 */
export const sendPromptToGpt = async (collection, { text }) => {
  const content = 'You are a helpful assistant. I will give you a list of elements each one in the way {key:value}. I will also ask you to answer with some information about the values from the elements. For example, I can ask you to filter elements searching for some word in the text. Or filter elements by some specific value for number data. Return only the elements asked as an array with elements in the way {key:value}';

  let filteredElements = Object.entries(collection).filter(item => {
    const info = item[1];
    return info.text && info.price && info.source;
  });

  if (filteredElements.length === 0) {
    return collection;
  }

  filteredElements = filteredElements.map((item) => {
    const key = item[0];
    const info = item[1];
    return { [key]: { text: info.text, price: info.price, source: info.source } }
  });

  //First, train GPT to find entity, target and source values from a sentence
  const trainingMessages = [
    {
      role: "system",
      content,
    },
    { role: "user", content: "From this list " + JSON.stringify(filteredElements) + " " + text },
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: trainingMessages,
  });

  const completionResult = completion.data.choices[0].message?.content;
  const msg = completionResult.split(":")[0];
  let elements = completionResult.match(/\[(.*?)\]/, "g");
  elements = elements || completionResult.split(":")[1];
  // const elements = completionResult.match(/\{(.*?)\}/, "g");
  let parsedElements = elements ? JSON.parse(elements[0]) : JSON.parse(completionResult);
  // parsedElements = parsedElements.map(item => item[1]);
  let elem = {};
  let pos = 0;
  for (let item of parsedElements) {
    const key = Object.keys(item)[0];
    elem[pos] = collection[key]
    pos++;
  }

  return { msg, elem };
}

/**
 * Sorts an array of objects based on a specified slot using a provided criteria.
 *
 * @param {Array} filteredElements - Array of objects to be filtered
 * @param {string} criteria - The criteria to be used for sorting
 * @param {string} slot - The slot to sort the objects by
 * @return {Array} - A sorted array of objects
 */
export const applyCriteria = async (filteredElements, criteria, slot, value) => {
  let orderedElements;
  let elementsOnlyText = Object.entries(filteredElements).filter(item => {
    const info = item[1];
    const prop = info[slot];
    return prop !== null;
  });

  if (elementsOnlyText.length === 0) {
    return filteredElements;
  }

  elementsOnlyText = elementsOnlyText.map((item) => {
    const key = item[0];
    const info = item[1];
    const prop = info[slot];
    return { [key]: prop }
  });

  const content = 'You are a helpful assistant. I will give you a list of elements each one in the form {key:value}. I will also provide a criteria to return the elements. For each request you have to apply the criteria and return the elements or a subset of them. For example, "I want them ordered by price", you should return all the list of elements ordered by price. Or "I want the products with price less than 100", you should return only the elements with price less than 100. If no criteria can be applied, just order the elements by key. The response should be a list of elements each one in the form {key:value}';
  let userRequest;
  if (criteria === "order by") {
    userRequest = JSON.stringify(elementsOnlyText) + " " + criteria + " " + slot;
  } else {
    userRequest = JSON.stringify(elementsOnlyText) + " " + slot + " " + criteria + " " + value;
  }
  //First, train GPT to find entity, target and source values from a sentence
  const trainingMessages = [
    {
      role: "system",
      content,
    },
    { role: "user", content: userRequest },
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: trainingMessages,
  });

  const completionResult = completion.data.choices[0].message;
  orderedElements =
    completionResult.content && JSON.parse(completionResult.content);

  orderedElements = orderedElements.map((item) => {
    const key = Object.keys(item)[0];
    return { [key]: filteredElements[key] };
  });

  console.log({ completionResult, orderedElements });
  return orderedElements;
};


export const applyOperation = async (filteredElements, criteria, slot) => {
  const content = 'You are a helpful assistant. I will give you a list of elements each one in the form {key:value}. You have to apply an operation (which I will provide) with the values of the elements. For example, "I want the price average", you should apply the operation using the prices values and return the result. Only return the result of the operation without explanation.';

  let elementsOnlyText = Object.entries(filteredElements).filter(item => {
    const info = item[1];
    const prop = info[slot];
    return prop !== null;
  });

  if (elementsOnlyText.length === 0) {
    return filteredElements;
  }

  elementsOnlyText = elementsOnlyText.map((item) => {
    const key = item[0];
    const info = item[1];
    const prop = info[slot];
    return { [key]: prop }
  });

  //First, train GPT to find entity, target and source values from a sentence
  const trainingMessages = [
    {
      role: "system",
      content,
    },
    { role: "user", content: JSON.stringify(elementsOnlyText) + " " + slot + " " + criteria },
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: trainingMessages,
  });

  const completionResult = completion.data.choices[0].message?.content;
  return completionResult;
}

// console.log("Before ", filteredElements);
// if (criteria === "order") {
//   return filteredElements.sort(
//     (firstItem, secondItem) => firstItem["subtitle"] - secondItem["subtitle"]
//   );
// }

// if (criteria === "less than") {
//   return filteredElements.filter((item) => item["subtitle"] < slot);
// }


/**
 * Parses the input string to extract the target, source, and entity values and constructs an object with the search action.
 * When some value is missing, returns the string "missing" for the property.
 *
 * @param {string} input - the input string to be parsed.
 * @return {object} an object containing the search action, entity value, target value, and source value.
 */
// export const parseRequest = (input, currentParams) => {
//   const formattedInput = input.toLowerCase();
//   let entityFound = currentParams.entity;
//   let targetFound = currentParams.target;
//   let sourceFound = currentParams.source;

//   //Third, split words from collections objects, in order to find them also by individual words
//   if (!entityFound || entityFound === "missing") {
//     for (let target in DEFAULT_TARGET) {
//       const targetCollection = DEFAULT_TARGET[target].collection;
//       let entityWords =
//         targetCollection &&
//         targetCollection.flatMap((item) => {
//           return Object.entries(item).flatMap((value) => {
//             if (value[0] !== "img" && typeof value[1] === "string") {
//               return value[1].toLowerCase().split(" ").join("|");
//             }
//             return [];
//           });
//         });

//       console.log(entityWords);

//       entityWords = entityWords && [...new Set(entityWords)].join("|");

//       console.log(entityWords);

//       const reg3 = entityWords && new RegExp(entityWords, "g");
//       entityFound = reg3 && formattedInput.match(reg3)?.join(" ");
//       if (entityFound) {
//         targetFound = target;
//         break;
//       }
//     }
//   }

//   entityFound = entityFound || "missing";

//   //First identify the target (class)
//   if (!targetFound || targetFound === "missing") {
//     const targets = Object.keys(DEFAULT_TARGET)
//       .map((item) => item.toLowerCase())
//       .join("|");
//     const reg1 = new RegExp(targets, "g");
//     targetFound = formattedInput.match(reg1)?.join(" ") || "missing";
//   }

//   //Second identify the source of the target (url | classification tag)
//   if (targetFound && (!sourceFound || sourceFound === "missing")) {
//     const sources =
//       DEFAULT_TARGET[targetFound] &&
//       DEFAULT_TARGET[targetFound].sources
//         ?.map((item) => item.toLowerCase())
//         .join("|");
//     const reg2 = sources && new RegExp(sources, "g");
//     sourceFound = reg2 && formattedInput.match(reg2)?.join(" ");
//   }

//   sourceFound = sourceFound || "missing";

//   const criteria = DEFAULT_CRITERIA_OPERATIONS.map((item) =>
//     item.toLowerCase()
//   ).join("|");

//   const reg4 = criteria && new RegExp(criteria, "g");
//   const criteriaFound =
//     (reg4 && formattedInput.match(reg4)?.join(" ")) ||
//     currentParams.criteria ||
//     "missing";
//   console.log({ criteria, criteriaFound });

//   let slot;
//   if (criteriaFound === "order") {
//     const words = formattedInput.split(" ");
//     const i = words.findIndex((w) => w.toLowerCase().match(/by/g));
//     slot = words[i + 1]; //Slot = next word after 'by'
//   } else if (criteriaFound === "less than") {
//     const words = formattedInput.split(" ");
//     const i = words.findIndex((w) => w.toLowerCase().match(/than/g));
//     slot = words[i + 1]; //Slot = next word after 'less than'
//   }

//   slot = slot || currentParams.slot || "missing";

//   return {
//     input,
//     action: "search",
//     slot,
//     criteria: criteriaFound,
//     entity: entityFound,
//     target: targetFound,
//     source: sourceFound,
//   };
// };
