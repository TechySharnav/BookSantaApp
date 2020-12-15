import React, { Component } from "react";
import { Image } from "react-native";
import bookDonateScreen from "../screen/bookDonateScreen";
import bookRequestScreen from "../screen/bookRequestScreen";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";
import StackNavigator from "./StackNavigator";
//const Tab = createBottomTabNavigator();

const TabNavigator = createBottomTabNavigator(
  {
    Donate: { screen: StackNavigator },
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
              source={require("../assets/donate_book.png")}
              style={{ width: 30, height: 30, marginTop: 5 }}
            />
          );
        } else if (routeName === "Request") {
          return (
            <Image
              source={require("../assets/request_book.png")}
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

{
  /*const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={bookDonateScreen} name="Donate" />
      <Tab.Screen component={bookRequestScreen} name="Request" />
    </Tab.Navigator>
  );
};*/
}

export default TabNavigator;
