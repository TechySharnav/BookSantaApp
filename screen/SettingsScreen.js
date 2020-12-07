import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class SettingsScreen extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Address: "",
      Age: "",
      PhoneNo: "",
      func: false,
      docID: null,
    };
  }

  getValue = async () => {
    var email = await firebase.auth().currentUser.email;
    console.log(email, "This is email");
    var query = await db.collection("users").where("Email", "==", email).get();

    query.docs.map(async (doc) => {
      await this.setState(doc.data());
      this.setState({ docID: doc.id });
    });
    this.setState({ PhoneNo: this.state.PhoneNo + "" });
    console.log(this.state);
  };

  updateData = async () => {
    console.log(this.state);
    await db
      .collection("users")
      .doc(this.state.docID)
      .update({
        Address: this.state.Address,
        PhoneNo: eval(this.state.PhoneNo),
        Age: this.state.Age,
        Name: this.state.Name,
      });
  };

  async componentDidMount() {
    await this.getValue();
    setTimeout(() => {
      this.setState({ func: true });
    }, 1000);
  }

  render() {
    return (
      <View>
        <Header
          backgroundColor="#ff893b"
          centerComponent={{
            text: "Book Santa",
            style: { color: "#ecf3f4", fontSize: 18 },
          }}
        ></Header>
        <TextInput
          value={this.state.Name}
          style={styles.textInputStyle}
          placeholder="Enter Name"
          onChangeText={(txt) => {
            this.setState({ Name: txt });
          }}
        ></TextInput>
        <TextInput
          value={this.state.Address}
          multiline={true}
          style={[
            styles.textInputStyle,
            { minHeight: 100, textAlignVertical: "top" },
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
            value={this.state.Age}
            keyboardType="number-pad"
            style={[styles.textInputStyle, { width: 100, marginRight: 20 }]}
            placeholder="Age"
            onChangeText={(txt) => {
              this.setState({ Age: txt });
            }}
          ></TextInput>
          <TextInput
            value={this.state.PhoneNo}
            keyboardType="phone-pad"
            maxLength={10}
            style={[styles.textInputStyle, { width: 220 }]}
            placeholder="PhoneNo"
            onChangeText={(txt) => {
              this.setState({ PhoneNo: txt });
            }}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
          }}
        ></View>

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
            onPress={this.updateData}
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
      </View>
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
