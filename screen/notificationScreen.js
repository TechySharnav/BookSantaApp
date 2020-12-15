import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { Header, ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";

export default class NotificationScreen extends Component {
  constructor() {
    super();

    this.state = {
      allNotif: [],
      DonorName: "",
      index: 0,
    };
  }

  AskUserforBookReceived = () => {
    Alert.alert("Warning", "Did you received the book?", [
      { text: "No" },
      { text: "Yes" },
    ]);
  };

  getNotification = async () => {
    var q = await db
      .collection("BookRequests")
      .where("RequesterEmail", "==", firebase.auth().currentUser.email)
      .where("notifStatus", "==", "unread")
      .get();

    q.docs.map((doc) =>
      this.setState({ allNotif: [...this.state.allNotif, doc.data()] })
    );

    for (var i in this.state.allNotif) {
      if (this.state.allNotif[i].Status === "DonorInterested") {
        this.setState({ DonorName: this.state.allNotif[i].DonorEmail });
      }
    }

    var v = await db
      .collection("users")
      .where("Email", "==", this.state.DonorName)
      .get();

    v.docs.map((doc) => this.setState({ DonorName: doc.data().Name }));
  };

  async componentDidMount() {
    await this.getNotification();
    setTimeout(() => {
      this.setState({ func: true });
    }, 3000);
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

        <FlatList
          data={this.state.allNotif}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={this.AskUserforBookReceived}
              disabled={item.Status === "DonorInterested" ? false : true}
            >
              <ListItem
                style={{ alignItems: "center", marginTop: 5 }}
                containerStyle={{
                  backgroundColor: "#c4dcdf",
                  alignItems: "center",
                  borderWidth: 4,
                  borderColor: "#729ca2",
                  width: "98%",
                }}
                titleStyle={{ color: "#465461", fontWeight: "bold" }}
                title={`Book: ${item.BookName}`}
                subtitle={
                  item.Status === "DonorInterested"
                    ? this.state.DonorName +
                      " has shown Interest in donating this book"
                    : this.state.DonorName + " has donated you the book"
                }
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
