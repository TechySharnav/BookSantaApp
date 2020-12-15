import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import db from "../config";
import { Header, ListItem } from "react-native-elements";
import firebase from "firebase";

export default class bookDonateScreen extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: [],
      func: false,
    };
  }

  fetchRequests = async () => {
    this.unsub = await db
      .collection("BookRequests")
      .where("Status", "==", "pending")
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
    setTimeout(() => {
      for (var i in this.state.allRequests) {
        console.log(this.state.allRequests[i].RequesterEmail);
        if (
          this.state.allRequests[i].RequesterEmail ===
          firebase.auth().currentUser.email
        ) {
          this.state.allRequests.splice(0, 1);
        }
      }
    }, 1000);
    setTimeout(() => {
      this.setState({ func: true });
    }, 1000);
  }

  componentWillUnmount() {
    this.unsub();
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
          data={this.state.allRequests}
          renderItem={({ item, index }) => (
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
                    })
                  }
                >
                  <Text>View</Text>
                </TouchableOpacity>
              )}
            />
          )}
          keyExtractor={(item, index) => {
            index.toString();
          }}
        />
      </View>
    );
  }
}
