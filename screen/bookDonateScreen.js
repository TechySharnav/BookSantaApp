import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import db from "../config";

export default class bookDonateScreen extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: [],
      func: false,
    };
  }

  fetchRequests = async () => {
    var snapshot = await db.collection("BookRequests").get();
    {
      /*.onSnapshot((snapshot) => {*/
    }
    snapshot.docs.map(async (doc) => {
      await this.setState({
        allRequests: [...this.state.allRequests, doc.data()],
      });
    });
    console.log(this.state, "fetch");
  };

  async componentDidMount() {
    await this.fetchRequests();
    await this.setState({ func: true });
    console.log(this.state, "mount");
  }

  render() {
    return (
      <View>
        {this.state.allRequests.map((req) => {
          <View style={{ backgroundColor: "black" }}>
            <Text>Name:{req.BookName}</Text>
          </View>;
        })}
      </View>
    );
  }
}
