import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class bookRequestScreen extends Component {
  constructor() {
    super();

    this.state = {
      isVisible: false,
      Name: "",
      bookName: "",
      authorName: "",
      reason: "",
      Address: "",
      Age: "",
      PhoneNo: "",
      Email: "",
    };
  }

  getValue = async () => {
    var email = await firebase.auth().currentUser.email;
    console.log(email, "This is email");
    var query = await db.collection("users").where("Email", "==", email).get();

    query.docs.map(async (doc) => {
      await this.setState(doc.data());
    });
    console.log(this.state);
  };

  async componentDidMount() {
    await this.getValue();
  }

  submitRequest = async () => {
    db.collection("BookRequests").add({
      AuthorName: this.state.authorName,
      BookName: this.state.bookName,
      DeliverAddress: this.state.Address,
      RequesterEmail: this.state.Email,
      Reason: this.state.reason,
    });
    Alert.alert("Success", "Request Submitted Successfully");
    this.setState({ isVisible: false });
  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isVisible}
        transparent={!this.state.isVisible}
        animationType="slide"
      >
        <TextInput
          value={this.state.Name}
          style={styles.textInputStyle}
          placeholder="Enter Name"
          onChangeText={(txt) => {
            this.setState({ name: txt });
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
              this.setState({ age: txt });
            }}
          ></TextInput>
          <TextInput
            value={this.state.PhoneNo}
            keyboardType="phone-pad"
            maxLength={10}
            style={[styles.textInputStyle, { width: 220 }]}
            placeholder="PhoneNo"
            onChangeText={(txt) => {
              this.setState({ phoneNo: txt });
            }}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <TextInput
            style={[styles.textInputStyle, { width: "45%", marginRight: 20 }]}
            placeholder="Book Name"
            onChangeText={(txt) => {
              this.setState({ bookName: txt });
            }}
          ></TextInput>
          <TextInput
            style={[styles.textInputStyle, { width: "45%" }]}
            placeholder="Author Name"
            onChangeText={(txt) => {
              this.setState({ authorName: txt });
            }}
          ></TextInput>
        </View>
        <TextInput
          multiline={true}
          style={[
            styles.textInputStyle,
            { minHeight: 100, textAlignVertical: "top" },
          ]}
          placeholder="Reason"
          onChangeText={(txt) => {
            this.setState({ reason: txt });
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
            onPress={this.submitRequest}
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
      <View>
        <Header
          backgroundColor="#ff893b"
          centerComponent={{
            text: "Book Santa",
            style: { color: "#ecf3f4", fontSize: 18 },
          }}
        ></Header>
        <this.showModal />
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            width: 32,
            height: 32,
            marginTop: -45,
            marginLeft: 320,
          }}
          onPress={() => this.setState({ isVisible: true })}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#ecf3f4",
              textAlign: "center",
              marginTop: -5,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
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
