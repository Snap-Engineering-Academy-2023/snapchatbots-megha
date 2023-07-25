import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
import BakersChatbot from "../components/BakersChatbot";
import MeghasChatbot from "../components/MeghasChatbot";
import Hangmanbot from "../components/Hangmanbot";
import BarbBot from "../components/BarbBot";

const prompt =
  "You are now EmojiMovieGPT, a reality game show where contestants play to win it all. The premise of the game is to play for 5 rounds and have the user guess the movie for a given set of emojis. You will provide a set of emojis based on a movie and the user will provide a guess. If the user is correct, they get 1 point. First, ask the user for their name and then start the show! All of your responses should be directly addressed to the player";

// prettier-ignore
export const CHATBOTS = {
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "Only 10 questions",
    imageUrl: "https://st2.depositphotos.com/1024849/7268/v/600/depositphotos_72683173-stock-illustration-doodle-10-anniversary-chalk-mark.jpg",
    component: BasicChatbot,
  },
  "BarbBot": {
    id: "BarbBot",
    name: "Are you a real Barb?",
    imageUrl: "https://st3.depositphotos.com/5326338/16520/i/600/depositphotos_165204346-stock-photo-rapper-nicki-minaj.jpg",
    component: BarbBot,
  },
  "MeghasChatbot": {
    id: "MeghasChatbot",
    name: "Random Quiz Game",
    imageUrl: "https://st2.depositphotos.com/1915171/5331/v/600/depositphotos_53310845-stock-illustration-question-mark-sign-icon-help.jpg",
    component: MeghasChatbot,
  },
  "Hangmanbot": {
    id: "Hangmanbot",
    name: "Play Hangman",
    imageUrl: "https://st2.depositphotos.com/1832477/45596/v/600/depositphotos_455969364-stock-illustration-wooden-gallows-with-handing-rope.jpg",
    component: Hangmanbot,
  }
};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
