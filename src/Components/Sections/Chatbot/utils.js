import {
  DEFAULT_TARGET,
  DEFAULT_CRITERIA_OPERATIONS,
} from "../../../data/defaultSources";
import steps from "../../../data/chatbotSteps.json";
import openai from "../../../apiGPT";

export const getStorageConversations = () => {
  return JSON.parse(localStorage.getItem("conversations")) || {};
};

/**
 * Returns the number of results in the collection that have a title
 * matching the given entity.
 *
 * @param {string} entity - The entity to match against the titles in the collection
 * @return {number} The number of results in the collection matching the entity
 */
export const getNResults = (entity, target) => {
  return DEFAULT_TARGET[target]?.collection?.filter((item) => {
    const reg = new RegExp(entity, "g");
    return (
      item.title.toLowerCase().match(reg) ||
      item.category.toLowerCase().match(reg)
    );
  }).length;
};

const TRAINING_MESSAGES = {
  allMissing:
    'You are a helpful assistant. You need to recognize 5 kind of concepts (entity, target, source, criteria, slot) in the following sentences and return them in the form {key:value}. In next example: "I want to buy a wireless headphone", the entity is "wireless headphone", the target is "product" and the source is "missing". In next example: "I want to buy a book from Amazon", the entity is "book", the target is "product" and the source is "Amazon". In next example: "I want headphones from Amazon ordered by price", the entity is "headphones", the target is "product", the source is "Amazon" and the criteria is "order by" where "price" is the "slot".',
  entityMissing:
    'You are a helpful assistant. You need to recognize 1 concept (entity) in the following sentences and return it in the form {key:value}. In next example: "I want to buy a wireless headphone", the entity is "wireless headphone". In next example: "I want to buy a book from Amazon", the entity is "book".',
  targetMissing:
    'You are a helpful assistant. You need to recognize 1 concept (target) in the following sentences and return it in the form {key:value}. In next example: "I want to buy a wireless headphone", the target is "product". In next example: "I want to buy a book from Amazon", the target is "product".',
  sourceMissing:
    'You are a helpful assistant. You need to recognize 1 concept (source) in the following sentences and return it in the form {key:value}. In next example: "I want to buy a wireless headphone", the source is "missing". In next example: "I want to buy a book from Amazon", the source is "Amazon".',
  criteriaMissing:
    'You are a helpful assistant. You need to recognize 2 concepts (criteria, slot) in the following sentences and return it in the form {key:value}. "I want headphones from Amazon ordered by price", the entity is "headphones", the target is "product", the source is "Amazon" and the criteria is "order by" where "price" is the "slot".',
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
  const criteriaMissing = currentParams.criteria === "missing";
  const entityMissing = currentParams.entity === "missing";
  const targetMissing = currentParams.target === "missing";
  const sourceMissing = currentParams.source === "missing";
  const allMissing =
    entityMissing && targetMissing && sourceMissing && criteriaMissing;

  const searchPropsForMissing = {
    allMissing,
    entityMissing,
    targetMissing,
    sourceMissing,
    criteriaMissing,
  };
  const missingIndex = Object.entries(searchPropsForMissing).findIndex(
    (searchProp) => !!searchProp[1]
  );
  const propMissing =
    missingIndex !== -1 && Object.entries(searchPropsForMissing)[missingIndex];

  const messagePosition = propMissing[0];
  const content = TRAINING_MESSAGES[messagePosition];

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
  const { entity, target, source, criteria, slot } =
    completionResult.content && JSON.parse(completionResult.content);

  console.log({ completionResult });

  const entityFound =
    (!entityMissing && currentParams.entity) || entity || "missing";
  const targetFound =
    (!targetMissing && currentParams.target) || target || "missing";
  const sourceFound =
    (!sourceMissing && currentParams.source) || source || "missing";
  const criteriaFound =
    (!criteriaMissing && currentParams.criteria) || criteria || "missing";
  const slotFound =
    (!criteriaMissing && currentParams.slot) || slot || "missing";

  return {
    input,
    action: "search",
    slot: slotFound,
    criteria: criteriaFound,
    entity: entityFound,
    target: targetFound,
    source: sourceFound,
  };
};

/**
 * Parses the input string to extract the target, source, and entity values and constructs an object with the search action.
 * When some value is missing, returns the string "missing" for the property.
 *
 * @param {string} input - the input string to be parsed.
 * @return {object} an object containing the search action, entity value, target value, and source value.
 */
export const parseRequest = (input, currentParams) => {
  const formattedInput = input.toLowerCase();
  let entityFound = currentParams.entity;
  let targetFound = currentParams.target;
  let sourceFound = currentParams.source;

  //Third, split words from collections objects, in order to find them also by individual words
  if (!entityFound || entityFound === "missing") {
    for (let target in DEFAULT_TARGET) {
      const targetCollection = DEFAULT_TARGET[target].collection;
      let entityWords =
        targetCollection &&
        targetCollection.flatMap((item) => {
          return Object.entries(item).flatMap((value) => {
            if (value[0] !== "img" && typeof value[1] === "string") {
              return value[1].toLowerCase().split(" ").join("|");
            }
            return [];
          });
        });

      console.log(entityWords);

      entityWords = entityWords && [...new Set(entityWords)].join("|");

      console.log(entityWords);

      const reg3 = entityWords && new RegExp(entityWords, "g");
      entityFound = reg3 && formattedInput.match(reg3)?.join(" ");
      if (entityFound) {
        targetFound = target;
        break;
      }
    }
  }

  entityFound = entityFound || "missing";

  //First identify the target (class)
  if (!targetFound || targetFound === "missing") {
    const targets = Object.keys(DEFAULT_TARGET)
      .map((item) => item.toLowerCase())
      .join("|");
    const reg1 = new RegExp(targets, "g");
    targetFound = formattedInput.match(reg1)?.join(" ") || "missing";
  }

  //Second identify the source of the target (url | classification tag)
  if (targetFound && (!sourceFound || sourceFound === "missing")) {
    const sources =
      DEFAULT_TARGET[targetFound] &&
      DEFAULT_TARGET[targetFound].sources
        ?.map((item) => item.toLowerCase())
        .join("|");
    const reg2 = sources && new RegExp(sources, "g");
    sourceFound = reg2 && formattedInput.match(reg2)?.join(" ");
  }

  sourceFound = sourceFound || "missing";

  const criteria = DEFAULT_CRITERIA_OPERATIONS.map((item) =>
    item.toLowerCase()
  ).join("|");

  const reg4 = criteria && new RegExp(criteria, "g");
  const criteriaFound =
    (reg4 && formattedInput.match(reg4)?.join(" ")) ||
    currentParams.criteria ||
    "missing";
  console.log({ criteria, criteriaFound });

  let slot;
  if (criteriaFound === "order") {
    const words = formattedInput.split(" ");
    const i = words.findIndex((w) => w.toLowerCase().match(/by/g));
    slot = words[i + 1]; //Slot = next word after 'by'
  } else if (criteriaFound === "less than") {
    const words = formattedInput.split(" ");
    const i = words.findIndex((w) => w.toLowerCase().match(/than/g));
    slot = words[i + 1]; //Slot = next word after 'less than'
  }

  slot = slot || currentParams.slot || "missing";

  return {
    input,
    action: "search",
    slot,
    criteria: criteriaFound,
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
export const findNextStep = ({ params }) => {
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

  //Check if some criteria operation is part of user input
  if (params.criteria !== "missing") {
    return steps["criteria"];
  }

  //If no missing properties are found, return the result according source requested.
  const productRequested = params.target === "product";

  if (productRequested) {
    return steps["results"];
  }

  return steps["explore"];
};

/**
 * Returns the text of the next step in a conversation, based on the supplied `nextStep` and `currentParams`.
 *
 * @param {Object} nextStep - An object representing the next step in the conversation.
 * @param {Object} currentParams - An object representing the current parameters of the conversation.
 * @return {string} The text of the next step in the conversation.
 */
export const getText = (nextStep, currentParams) => {
  let text = nextStep.text;
  console.log({ nextStep });
  const { entity, target, source, input, criteria, slot } = currentParams;

  switch (nextStep.callbackForSlot) {
    case "getNResults":
      const nResults = getNResults(entity, target);
      text = text.replace(/@slotForResults/g, nResults);
      break;
    case "getSlot":
      text = text.replace(/@slotForEntity/g, input);
      break;
    case "oderBySlot":
      text = text.replace(/@slotForOrdering/g, slot);
      break;
    case "filterWithLess":
      text = text.replace(/@value/g, slot);
      break;
  }
  text = text.replace(/@entity/g, entity);
  text = text.replace(/@target/g, target);
  text = text.replace(/@source/g, source);
  text = text.replace(/@criteria/g, criteria);

  return text;
};

export const getOptions = (currentParams) => {
  const { target } = currentParams;
  return DEFAULT_TARGET[target].sources;
};

/**
 * Sorts an array of objects based on a specified slot using a provided criteria.
 *
 * @param {Array} filteredElements - Array of objects to be filtered
 * @param {string} criteria - The criteria to be used for sorting
 * @param {string} slot - The slot to sort the objects by
 * @return {Array} - A sorted array of objects
 */
export const applyCriteria = (filteredElements, criteria, slot) => {
  console.log("Before ", filteredElements);
  if (criteria === "order") {
    return filteredElements.sort(
      (firstItem, secondItem) => firstItem["subtitle"] - secondItem["subtitle"]
    );
  }

  if (criteria === "less than") {
    return filteredElements.filter((item) => item["subtitle"] < slot);
  }
};
