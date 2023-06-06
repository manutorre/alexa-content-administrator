import { DEFAULT_TARGET, DEFAULT_SOURCES } from "../../../data/defaultSources";
import { collection } from "../../../data/objectsCollection";
import steps from "../../../data/chatbotSteps.json";

/**
 * Parses the input string to extract the target, source, and entity values and constructs an object with the search action.
 * When some value is missing, returns the string "missing" for the property.
 *
 * @param {string} input - the input string to be parsed.
 * @return {object} an object containing the search action, entity value, target value, and source value.
 */
export const parseRequest = (input, currentParams) => {
  const targets = DEFAULT_TARGET.join("|");
  const reg1 = new RegExp(targets, "g");
  const targetFound = input.match(reg1);

  const sources = DEFAULT_SOURCES.join("|");
  const reg2 = new RegExp(sources, "g");
  const sourceFound = input.match(reg2);

  const entities = collection.map((item) => item.title).join("|");
  const reg3 = new RegExp(entities, "g");
  const entityFound = input.match(reg3);

  return {
    action: "search",
    entity: entityFound
      ? currentParams.entity || entityFound[0]
      : currentParams.entity || "missing",
    target: targetFound
      ? currentParams.target || targetFound[0]
      : currentParams.target || "missing",
    source: sourceFound
      ? currentParams.source || sourceFound[0]
      : currentParams.source || "missing",
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

  if (missingProps.includes("entity")) {
    return steps["entity"];
  }
  if (missingProps.includes("target")) {
    return steps["target"];
  }
  if (missingProps.includes("source")) {
    return steps["source"];
  }

  //If no missing properties are found, return the result according source requested.
  const sourceRequested = params["source"];

  if (sourceRequested === "Amazon") {
    return steps["Amazon"];
  }
  if (sourceRequested === "MercadoLibre") {
    return steps["MercadoLibre"];
  }
  if (sourceRequested === "E-commerce") {
    return steps["E-commerce"];
  }
};
