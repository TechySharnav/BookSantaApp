import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Header, ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../component/MyHeader";

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
      Status: "pending",
      btnDisabled: true,
      func: false,
      allRequests: [],
      allDocID: [],
      index: null,
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

  AskUserforBookReceived = () => {
    Alert.alert("Warning", "Did you received the book?", [
      { text: "No" },
      { text: "Yes", onPress: this.updateStatus },
    ]);
  };

  updateStatus = async () => {
    db.collection("BookRequests")
      .doc(this.state.allDocID[this.state.index])
      .update({
        Status: "received",
      });
  };

  getRequests = async () => {
    var email = await firebase.auth().currentUser.email;
    this.unsub = await db
      .collection("BookRequests")
      .where("RequesterEmail", "==", email)
      .onSnapshot(
        (query) => {
          query.docs.map(async (doc) => {
            await this.setState({
              allRequests: [...this.state.allRequests, doc.data()],
              allDocID: [...this.state.allDocID, doc.id],
            });
          });
        },
        (error) => this.unsub()
      );
  };

  generateUID = () => {
    return ("" + Math.random()).substring(2, 9);
  };

  async componentDidMount() {
    await this.getValue();
    await this.getRequests();

    setTimeout(() => {
      this.setState({ func: true });
      this.setState({ btnDisabled: false });
      for (var i in this.state.allRequests) {
        if (this.state.allRequests[i].Status !== "received") {
          this.setState({ btnDisabled: true });
          this.setState({ index: i });
        }
      }
    }, 2000);
  }

  submitRequest = async () => {
    db.collection("BookRequests").add({
      AuthorName: this.state.authorName,
      BookName: this.state.bookName,
      DeliverAddress: this.state.Address,
      RequesterEmail: this.state.Email,
      Reason: this.state.reason,
      Status: this.state.Status,
      Name: this.state.Name,
      UID: eval(this.generateUID()),
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
            onPress={() => {
              this.submitRequest;
              this.setState({ btnDisabled: true });
            }}
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
        <MyHeader navigation={this.props.navigation} />
        <this.showModal />
        <TouchableOpacity
          disabled={this.state.btnDisabled}
          style={{
            backgroundColor: "transparent",
            width: 32,
            height: 32,
            marginTop: -45,
            marginLeft: 275,
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
        <FlatList
          data={this.state.allRequests}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={this.AskUserforBookReceived}>
              <ListItem
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  opacity: item.Status === "pending" ? 0.5 : 1,
                }}
                containerStyle={{
                  backgroundColor: "#c4dcdf",
                  alignItems: "center",
                  borderWidth: 4,
                  borderColor: "#729ca2",
                  width: "98%",
                }}
                titleStyle={{ color: "#465461", fontWeight: "bold" }}
                title={`Book: ${item.BookName}`}
                subtitle={`Status: ${item.Status}`}
                rightElement={() => (
                  <TouchableOpacity>
                    <Text>View</Text>
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
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
