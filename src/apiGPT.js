import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-MBFi1fGIEEhEArXRDgQsXYpE",
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
