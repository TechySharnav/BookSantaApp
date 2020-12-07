import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import SettingsScreen from "../screen/SettingsScreen";
import TabNavigator from "./TabNavigator";
import CustomSideBar from "./customSideBar";
import { Image } from "react-native";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        drawerIcon: ({ focused }) => (
          <Image
            source={require("../assets/homeIcon.png")}
            style={{
              width: 32,
              height: 32,
              tintColor: focused ? "#ff893b" : "#465461",
            }}
          />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    contentComponent: CustomSideBar,
    contentOptions: {
      activeTintColor: "#ff893b",
      inactiveTintColor: "#465461",
      activeBackgroundColor: "#465461",
      inactiveBackgroundColor: "transparent",
    },
  },
  {
    initialRouteName: "Home",
  }
);

export default DrawerNavigator;
