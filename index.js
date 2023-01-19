import * as dotenv from "dotenv";
import readline from "readline";
import { ChatGPTAPIBrowser } from "chatgpt";

dotenv.config();

const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
});
await api.initSession();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (questionText) =>
  new Promise((resolve) => rl.question(questionText, resolve));

let conversationId = undefined;
let parentMessageId = undefined;

while (true) {
  const prompt = await question("What would you like to ask ChatGPT? ");

  const result = await api.sendMessage(prompt, {
    conversationId: conversationId,
    parentMessageId: parentMessageId,
  });

  console.log(result.response);

  conversationId = result.conversationId;
  parentMessageId = result.messageId;
}
