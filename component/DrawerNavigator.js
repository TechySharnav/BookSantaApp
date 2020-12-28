import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import SettingsScreen from "../screen/SettingsScreen";
import TabNavigator from "./TabNavigator";
import CustomSideBar from "./customSideBar";
import MyDonationScreen from "../screen/MyDonationScreen";
import NotificationScreen from "../screen/notificationScreen";
import MyReceivedBooksScreen from "../screen/MyReceivedBookScreen";
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
      navigationOptions: {
        drawerIcon: ({ focused }) => (
          <Image
            source={require("../assets/settingsIcon.png")}
            style={{
              width: 32,
              height: 32,
              tintColor: focused ? "#ff893b" : "#465461",
            }}
          />
        ),
      },
    },
    MyDonation: {
      screen: MyDonationScreen,
      navigationOptions: {
        title: "My Donations",
        drawerIcon: ({ focused }) => (
          <Image
            source={require("../assets/MyDonate.png")}
            style={{
              width: 32,
              height: 32,
              tintColor: focused ? "#ff893b" : "#465461",
            }}
          />
        ),
      },
    },
    Notifications: {
      screen: NotificationScreen,
    },
    MyReceivedBooks: {
      screen: MyReceivedBooksScreen,
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
