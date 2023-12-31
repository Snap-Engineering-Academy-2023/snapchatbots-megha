import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getChat } from "../utils/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Guess the celebrity in 10 questions",
  avatar:
    "https://st2.depositphotos.com/1024849/7268/v/600/depositphotos_72683173-stock-illustration-doodle-10-anniversary-chalk-mark.jpg",
};

const prompt = [
  {
    role: "system",
    content:
      "You are celebGPT, a game where the user has to guess what celebrity you are thinking of. For this game, you will think of a celebrity and the user tries to guess the person you are thinking of based on questions the user asks you. The user gets 10 questions they can ask you about the person and they are not allowed to ask more than 10 questions. Users are not allowed to ask for the celebrity name or the name of people affiliated with the celebrity. You are not allowed to reveal more than two characters of the celebrity name. You will keep track of the user score, so if they guess the celebrity name correctly in a round they get one point for that round. The game will consist of 5 rounds. You will display the user score at the end of the game. At the start of each round, use emojis to describe the celebrity. When thinking of a celebrity, you have to think of someone who has been relevant in the last 20 years (dont display this in the chat box). Make sure that before you answer any user question, you double check it to make sure that you are factually correct.  If the user wants to restart the game, let them restart it.",
  },
];
export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);
  const [messagesGPT, setMessagesGPT] = useState(prompt);

  async function fetchinitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    const content = response.choices[0].message.content;
    setMessagesGPT(messagesGPT.concat(message));
    setMessages([
      {
        id: 1,
        text: content,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }

  useEffect(() => {
    fetchinitialMessage();

    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
    //     createdAt: new Date(),
    //     user: CHATBOT_USER_OBJ,
    //   },
    // ]);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = async (userMessages) => {
    console.log("User message text:", userMessages[0].text);
    const userMessageText = userMessages[0].text;
    const messagesObj = {
      role: "user",
      content: userMessageText,
    };
    const messageHistory = messagesGPT.concat(messagesObj);
    let response = await getChat(messageHistory);
    const messageResponse = response.choices[0].message;
    const content = messageResponse.content;
    setMessagesGPT(messageHistory.concat(messageResponse));

    addBotMessage(content); //addBotMessage("I am da response!");
  };

  const addNewGPTMessage = (message) => {
    setMessagesGPT(messagesGPT.concat(message));
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
