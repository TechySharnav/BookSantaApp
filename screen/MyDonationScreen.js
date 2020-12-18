import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert } from "react-native";
import db from "../config";
import { Header, ListItem } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../component/MyHeader";

export default class MyDonationScreen extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: [],
      func: false,
    };
  }

  AskUserforBookSent = () => {
    Alert.alert("Warning", "Did you sent the book?", [
      { text: "No" },
      { text: "Yes" },
    ]);
  };

  fetchRequests = async () => {
    this.unsub = await db
      .collection("BookRequests")
      .where("DonorEmail", "==", firebase.auth().currentUser.email)
      .onSnapshot(
        (snapshot) => {
          snapshot.docs.map(async (doc) => {
            await this.setState({
              allRequests: [...this.state.allRequests, doc.data()],
            });
          });
        },
        (error) => this.unsub()
      );
  };

  async componentDidMount() {
    await this.fetchRequests();
    await setTimeout(() => {
      this.setState({ func: true });
      console.log(this.state, "mount");
    }, 2000);
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} />
        <FlatList
          data={this.state.allRequests}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={this.AskUserforBookSent}
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
                title={`Name: ${item.Name}`}
                subtitle={`Book: ${item.BookName}`}
                rightElement={() => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ReceiverDetails", {
                        Details: item,
                        disabled: true,
                      })
                    }
                  >
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
