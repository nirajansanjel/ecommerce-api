import axios from "axios";
import config from "../config/config.js";

const promptGemini = async (prompt) => {
  const response = await axios.post(
    config.gemini.apiUrl,
    {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          }
        ]
      }
    ]
  },
    {
      headers: {
        "X-goog-api-key":`${config.gemini.apiKey}`,
      },
    }
  );
  return response.data.candidates[0].content.parts[0].text;
};
export default  promptGemini ;
