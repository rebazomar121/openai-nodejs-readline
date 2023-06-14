import { Configuration, OpenAIApi } from "openai"
import readline from "readline"
require("dotenv")
// open ai config
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
})
let gptModel = process.env.GPT_MODEL
const openAI = new OpenAIApi(configuration)
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
userInterface.prompt()
const createChatCompletion = async ({ content }) => {
  try {
    await openAI
      .createChatCompletion({
        model: gptModel,
        messages: [{ role: "user", content }],
      })
      .then((res) => {
        console.log(res.data.choices[0].message.content)
      })
  } catch (error) {
    console.log("createChatCompletion  error , ", error)
  }
}
userInterface.on("line", async (input) => {
  createChatCompletion({ content: input })
})