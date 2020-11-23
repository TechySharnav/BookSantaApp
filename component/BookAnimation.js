import React, { Component } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import LottieView from "lottie-react-native";

export default class BookAnimation extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, marginTop: -10 }} enabled>
        <LottieView
          source={require("../assets/book-animation.json")}
          autoPlay
          loop
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 300,
            position: "absolute",
            left: -75,
            top: -20,
            paddingBottom: 20,
          }}
        ></LottieView>
      </KeyboardAvoidingView>
    );
  }
}
