import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { Header } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

import BookAnimation from "../component/BookAnimation";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
      isVisible: false,
      name: "",
      age: "",
      Address: "",
      phoneNo: "",
      confirmPass: "",
    };
  }

  Login = async () => {
    var email = this.state.emailID;
    var pwd = this.state.password;

    if (email && pwd) {
      try {
        var response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, pwd);
        if (response) {
          {
            this.props.navigation.navigate("Drawer");
          }
          //Alert.alert("Logged in Successfully");
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

    if (email && pwd) {
      if (pwd === this.state.confirmPass) {
        try {
          var response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, pwd);
          if (response) {
            db.collection("users").add({
              Name: this.state.name,
              Address: this.state.Address,
              Age: this.state.age,
              PhoneNo: this.state.phoneNo,
              Email: this.state.emailID,
            });
            this.props.navigation.navigate("Drawer");

            //Alert.alert("Success", "Registered Successfully");
          }
        } catch (err) {
          Alert.alert(err.message);
        }
      } else {
        Alert.alert("Error", "Entered Passwords do not match");
      }
    } else {
      Alert.alert("Error", "Enter Email and Password");
    }
  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isVisible}
        transparent={!this.state.isVisible}
        animationType="slide"
      >
        <TextInput
          style={styles.textInputStyle}
          placeholder="Enter Name"
          onChangeText={(txt) => {
            this.setState({ name: txt });
          }}
        ></TextInput>
        <TextInput
          multiline={true}
          style={[
            styles.textInputStyle,
            { minHeight: 50, textAlignVertical: "top" },
          ]}
          placeholder="Enter Address"
          onChangeText={(txt) => {
            this.setState({ Address: txt });
          }}
        ></TextInput>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <TextInput
            keyboardType="number-pad"
            style={[styles.textInputStyle, { width: 100, marginRight: 20 }]}
            placeholder="Age"
            onChangeText={(txt) => {
              this.setState({ age: txt });
            }}
          ></TextInput>
          <TextInput
            keyboardType="phone-pad"
            maxLength={10}
            style={[styles.textInputStyle, { width: 220 }]}
            placeholder="PhoneNo"
            onChangeText={(txt) => {
              this.setState({ phoneNo: txt });
            }}
          ></TextInput>
        </View>
        <TextInput
          value={this.state.emailID}
          style={styles.textInputStyle}
          placeholder="Enter Email"
          onChangeText={(txt) => {
            this.setState({ name: txt });
          }}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          style={styles.textInputStyle}
          placeholder="Enter Password"
          onChangeText={(txt) => {
            this.setState({ password: txt });
          }}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          style={styles.textInputStyle}
          placeholder="Confirm Password"
          onChangeText={(txt) => {
            this.setState({ confirmPass: txt });
          }}
        ></TextInput>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#465461",
              padding: 10,
              width: "40%",
              margin: 10,
              marginTop: 20,
            }}
            onPress={() => this.setState({ isVisible: false })}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "#ff893b",
                textAlign: "center",
              }}
            >
              Cancel
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <View style={{ display: "flex", justifyContent: "flex-end" }}>
          <View>
            <this.showModal />
          </View>
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
            style={[styles.textInputStyle, { marginTop: 250 }]}
            placeholderTextColor="#729ca2"
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={(txt) => {
              this.setState({ password: txt });
            }}
            style={styles.textInputStyle}
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
              onPress={() => {
                this.setState({ isVisible: true });
              }}
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

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: "#c4dcdf",
    padding: 10,
    width: "95%",
    alignSelf: "center",
    borderColor: "#729ca2",
    borderWidth: 2,
    marginTop: 20,
  },
});
