import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getChat } from "../utils/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Guess the Nicki song",
  avatar:
    "https://st3.depositphotos.com/5326338/16520/i/600/depositphotos_165204346-stock-photo-rapper-nicki-minaj.jpg",
};

const prompt = [
  {
    role: "system",
    content:
      "You are barbGPT, a game where the user has to guess what nicki minaj song you are thinking of. For this game, you will think of a nicki minaj song and the user tries to guess the song you are thinking of based on 5 emojis related to the song that you will display to the user. The user gets 5 hints they can ask you about the song and they are not allowed to ask more than 5 hints. Users are not allowed to ask for the song name or the lyrics of the song. You will keep track of the user score, so if they guess the song name correctly in a round they get one point for that round. The game will consist of 5 rounds. You will display the user score at the end of the game. At the start of each round, use emojis to describe the nicki minaj song. Make sure that before you answer any user question, you double check it to make sure that you are factually correct. Make sure the songs and the emojis used for the song are factual as well. If the user gets 5 out of 5 points, tell them that they are a certified barb at the end of the game. If they get less than 3 points make sure you let them know that they need to brush up on their barb knowledge. If the user wants to restart the game, let them restart it.",
  },
];
export default function BarbBot() {
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
      listViewProps={{
        style: {
          backgroundColor: "pink",
        },
      }}
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
