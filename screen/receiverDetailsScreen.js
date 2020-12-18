import React, { Component } from "react";
import { Text, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Header, Card } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../component/MyHeader";

export default class receiverDetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: null,
    };
  }

  componentDidMount() {
    var detail = this.props.navigation.getParam("Details");
    var disabled = this.props.navigation.getParam("disabled");
    this.setState(detail);
    this.setState({ btnDisabled: disabled });
  }

  updateStatus = async () => {
    var q = await db
      .collection("BookRequests")
      .where("UID", "==", this.state.UID)
      .get();

    await q.docs.map(async (doc) => {
      this.setState({ docID: doc.id });
    });

    setTimeout(async () => {
      await db.collection("BookRequests").doc(this.state.docID).update({
        Status: "DonorInterested",
        DonorEmail: firebase.auth().currentUser.email,
        notifStatus: "unread",
      });
    }, 1000);
    Alert.alert(
      "Success",
      "Thanks for Showing interest in Donating this Book!"
    );
  };

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} />
        <ScrollView contentContainerStyle={{ paddingBottom: 125 }}>
          <Card
            title="Book Information"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          >
            <Card>
              <Text>Book Name: {this.state.BookName}</Text>
              <Text>Author Name: {this.state.AuthorName}</Text>
            </Card>
            <Card>
              <Text>Reason: {this.state.Reason}</Text>
            </Card>
          </Card>
          <Card
            title="Requester Information"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          >
            <Card>
              <Text>Name: {this.state.Name}</Text>
              <Text>Address: {this.state.DeliverAddress}</Text>
              <Text>Email: {this.state.RequesterEmail}</Text>
            </Card>
          </Card>
          <TouchableOpacity
            disabled={this.state.btnDisabled}
            onPress={() => {
              this.updateStatus();
              this.props.navigation.navigate("BookDonate", {
                ID: this.state.UID,
              });
            }}
            style={{
              backgroundColor: "#465461",
              alignSelf: "center",
              padding: 10,
              width: "75%",
              margin: 10,
              marginTop: 30,
              opacity: this.state.btnDisabled ? 0.5 : 1,
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "#ff893b",
                textAlign: "center",
                opacity: this.state.btnDisabled ? 0.5 : 1,
              }}
            >
              I WANT TO DONATE!
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 6, textAlign: "center" }}>
            {this.state.btnDisabled
              ? "Click on the list if you have sent the book"
              : ""}
          </Text>
        </ScrollView>
      </View>
    );
  }
}
