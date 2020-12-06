import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./screen/LoginScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import TabNavigator from "./component/TabNavigator";
import firebase from "firebase";
import DrawerNavigator from "./component/DrawerNavigator";
const Drawer = createDrawerNavigator();

export default function App() {
  return <AppContainer />;
}

const AppNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Drawer: { screen: DrawerNavigator },
});

const AppContainer = createAppContainer(AppNavigator);

/*function AppDrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={customSideBar} initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

function customSideBar({ props, navigation }) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => <Text style={{ color: "#465461" }}>Logout</Text>}
        onPress={() => {
          firebase.auth().signOut();
          navigation.navigate(AppContainer, { screen: "Login" });
        }}
      />
    </DrawerContentScrollView>
  );
}
*/
