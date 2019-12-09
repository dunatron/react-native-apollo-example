import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import { AppLoading } from "expo";

import { Asset } from "expo-asset";
import * as Font from "expo-font";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";

import { mockedLink } from "./mock";
import AppNavigator from "./navigation/AppNavigator";
import gql from "graphql-tag";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://10.110.6.22:4444",
  link: new HttpLink({
    uri: "http://10.110.6.22:4444"
  })
  // link: mockedLink // new HttpLink()
});

// client
//   .query({
//     query: gql`
//       query TodoApp {
//         chats {
//           id
//           name
//           participants {
//             id
//             firstName
//           }
//         }
//       }
//     `
//   })
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        // ...
      ]),
      Font.loadAsync({
        // ...
      })
    ]);
  };

  handleLoadingError = () => {
    // ...
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </ApolloProvider>
    );
  }
}
