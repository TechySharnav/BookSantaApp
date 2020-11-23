import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Header } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

import BookAnimation from "../component/BookAnimation";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = { emailID: "", password: "" };
  }

  Login = async () => {
    console.log(this.state);
    var email = this.state.emailID;
    var pwd = this.state.password;

    if (email && pwd) {
      try {
        var response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, pwd);
        if (response) {
          {
            // this.props.navigation.navigate("Home");
          }
          Alert.alert("Logged in Successfully");
        }
      } catch (err) {
        Alert.alert(err.message);
      }
    } else {
      Alert.alert("Enter Email and Password");
    }
  };

  signIn = async () => {
    var email = this.state.emailID;
    var pwd = this.state.password;
    console.log(this.state);

    if (email && pwd) {
      try {
        var response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, pwd);
        if (response) {
          {
            // this.props.navigation.navigate("Home");
          }
          Alert.alert("Registered Successfully");
        }
      } catch (err) {
        Alert.alert(err.message);
      }
    } else {
      Alert.alert("Enter Email and Password");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <View style={{ display: "flex", justifyContent: "flex-end" }}>
          <Header
            backgroundColor="#ff893b"
            centerComponent={{
              text: "Book Santa",
              style: { color: "#ecf3f4", fontSize: 18 },
            }}
          ></Header>

          <Text
            style={{
              color: "#465461",
              textAlign: "center",
              fontSize: 12,
              marginTop: 20,
            }}
          >
            Login/Register to Continue
          </Text>
          <BookAnimation></BookAnimation>
          <TextInput
            keyboardType="email-address"
            placeholder="Enter Email"
            onChangeText={(txt) => {
              this.setState({ emailID: txt });
            }}
            style={{
              backgroundColor: "#c4dcdf",
              padding: 10,
              width: "95%",
              alignSelf: "center",
              borderColor: "#729ca2",
              borderWidth: 2,
              marginTop: 250,
            }}
            placeholderTextColor="#729ca2"
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={(txt) => {
              this.setState({ password: txt });
            }}
            style={{
              backgroundColor: "#c4dcdf",
              padding: 10,
              width: "95%",
              alignSelf: "center",
              borderColor: "#729ca2",
              borderWidth: 2,
              marginTop: 20,
            }}
            placeholderTextColor="#729ca2"
          ></TextInput>
          <View
            style={{ marginLeft: 50, display: "flex", flexDirection: "row" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#465461",
                padding: 10,
                width: "30%",
                margin: 10,
                marginTop: 20,
              }}
              onPress={this.Login}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#ff893b",
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#465461",
                padding: 10,
                width: "40%",
                margin: 10,
                marginTop: 20,
              }}
              onPress={this.signIn}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#ff893b",
                  textAlign: "center",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
