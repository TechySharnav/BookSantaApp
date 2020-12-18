import React, { Component } from "react";
import { View } from "react-native";
import { Header, Icon, Badge } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class MyHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
  }

  getUnreadNotificationCount = async () => {
    var q = await db
      .collection("BookRequests")
      .where("RequesterEmail", "==", firebase.auth().currentUser.email)
      .where("notifStatus", "==", "unread")
      .get();

    q.docs.map((doc) => this.setState({ count: this.state.count + 1 }));
  };

  async componentDidMount() {
    await this.getUnreadNotificationCount();
  }

  displayBellwithBadge = () => {
    return (
      <View>
        <Badge
          badgeStyle={{ scaleX: 0.7, scaleY: 0.7, marginLeft: 50 }}
          value={this.state.count + ""}
        ></Badge>
        <Icon
          iconStyle={{ marginRight: -30 }}
          name="bell"
          type="font-awesome"
          color="#ecf3f4"
          size={20}
          onPress={() => this.props.navigation.navigate("Notifications")}
        />
      </View>
    );
  };

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            color="#ecf3f4"
            type="font-awesome"
            onPress={() => this.props.navigation.openDrawer()}
          />
        }
        backgroundColor="#ff893b"
        centerComponent={{
          text: "Book Santa",
          style: { color: "#ecf3f4", fontSize: 18 },
        }}
        rightComponent={<this.displayBellwithBadge />}
      ></Header>
    );
  }
}
