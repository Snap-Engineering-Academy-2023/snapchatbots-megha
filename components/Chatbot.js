import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";
import { useNavigation } from "@react-navigation/native";

const BotDeveloper = ({ BotDeveloper }) => {
  return (
    <Text style={styles.botDeveloper} numberOfLines={1}>
      {BotDeveloper.map(({ name }) => `${name}`).join(", ")}
    </Text>
  );
};

const Chatbot = ({
  index,
  imageUrl,
  songTitle,
  botDevelopers,
  albumName,
  duration,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatScreen", {
          // this is a "quick and dirty" hack for the moment, we'll want to rename our properties later
          chatbotName: albumName,
        })
      }
    >
      <View style={styles.chatbot}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image
          style={[styles.image, styles.botImg]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.botInfoContainer}>
          <Text style={[styles.botTitle]} numberOfLines={1}>
            {songTitle}
          </Text>
          <BotDeveloper BotDeveloper={botDevelopers} />
        </View>
        <Text style={[styles.albumName]} numberOfLines={1}>
          {albumName}
        </Text>
        <Text style={[styles.duration]} numberOfLines={1}>
          {millisToMinutesAndSeconds(duration)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatbot: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  index: {
    color: Themes.colors.gray,
    flex: 0.05,
    textAlign: "center",
    fontSize: 12,
    margin: 1,
  },
  botImg: {
    resizeMode: "contain",
    flex: 0.2,
    width: 50,
    height: 50,
  },
  botInfoContainer: {
    flex: 0.4,
    margin: 5,
  },
  botTitle: {
    color: Themes.colors.white,
    fontSize: 12,
  },
  botDeveloper: {
    color: Themes.colors.gray,
    fontSize: 12,
  },
  albumName: {
    color: Themes.colors.white,
    flex: 0.25,
    fontSize: 12,
    margin: 5,
  },
  duration: {
    color: Themes.colors.gray,
    flex: 0.1,
    fontSize: 12,
    margin: 5,
  },
});

export default Chatbot;
