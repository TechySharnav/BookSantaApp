import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LoginScreen from "./screen/LoginScreen.js";
import bookDonateScreen from "./screen/bookDonateScreen";
import bookRequestScreen from "./screen/bookRequestScreen";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Donate: { screen: bookDonateScreen },
    Request: { screen: bookRequestScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        console.log(routeName);
        if (routeName === "Donate") {
          return (
            <Image
              source={require("./assets/donate_book.png")}
              style={{ width: 30, height: 30, marginTop: 5 }}
            />
          );
        } else if (routeName === "Request") {
          return (
            <Image
              source={require("./assets/request_book.png")}
              style={{ width: 30, height: 30, marginTop: 5 }}
            />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: "#ff893b",
      inactiveTintColor: "#c4dcdf",
    },
  }
);

const AppNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Tab: { screen: TabNavigator },
});

const AppContainer = createAppContainer(AppNavigator);
