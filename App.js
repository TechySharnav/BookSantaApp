import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./screen/LoginScreen.js";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
});

const AppContainer = createAppContainer(AppNavigator);
