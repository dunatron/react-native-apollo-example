import * as React from "react";
import { StyleSheet, View } from "react-native";

import NewChat from "../components/NewChat";
import ChatsList from "../components/ChatsList";
import NewPost from "../components/NewPost";
import PostList from "../components/PostList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const HomeScreen = () => (
  <View style={styles.container}>
    {/* <NewChat />
    <ChatsList /> */}
    <NewPost />
    <PostList />
  </View>
);

HomeScreen.navigationOptions = {
  title: "Home"
};

export default HomeScreen;
