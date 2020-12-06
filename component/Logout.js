import React, { Component } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import firebase from "firebase";

export default class Logout extends Component {
  constructor() {
    super();
  }

  signOut = async () => {
    this.props.navigation.navigate("Login");
    firebase.auth().signOut();
  };

  render() {
    return <View></View>;
  }
}

/*firebase
    .auth()
    .signOut()
    .then(() => {
      Alert.alert("Success", "Logged Out Successfully");
      navigation.navigate("Login");
    })
    .catch((err) => {
      Alert.alert("Error", err);
    });*/
