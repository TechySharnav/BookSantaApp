import React, { Component } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Dimensions, Animated } from "react-native";
import { ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class SwipeableFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotifications: this.props.allNotifications,
      func: false,
      allDocID: this.props.allDocID,
    };
  }

  onSwipeValueChange = (swipeData) => {
    var allNotif = this.state.allNotifications;
    console.log(swipeData);
    const { key, value } = swipeData;
    console.log("Func EXECUTED");
    if (value <= 0) {
      var index = allNotif.findIndex((item) => item.key === key);
      this.state.allNotifications.splice(index, 1);
      this.updateNotificationAsRead(this.state.allDocID[index]);
      this.state.allDocID.splice(index, 1);
    }
  };

  updateNotificationAsRead = async (i) => {
    await db.collection("Requests").doc(i).update({
      notifStatus: "read",
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ func: true });
    }, 2000);
  }

  renderItem = (data) => {
    console.log(this.state.allNotifications, "RenderItem called");
    return (
      <Animated.View>
        <ListItem
          style={{ alignItems: "center", marginTop: 5 }}
          containerStyle={{
            backgroundColor: "#f8d0d0",
            borderColor: "#534859",
            borderWidth: 4,
            opacity: item.Status !== "received" ? 0.5 : 1,
          }}
          titleStyle={{ color: "#534859", fontWeight: "bold" }}
          title={`Service: ${data.item.RequestedService}`}
          subtitle={
            data.item.Status === "DonorInterested"
              ? this.props.donor +
                " has shown Interest in donating this service"
              : this.props.donor + " has donated you the service"
          }
        />
      </Animated.View>
    );
  };

  render() {
    return (
      <Animated.View>
        <SwipeListView
          onSwipeValueChange={this.onSwipeValueChange}
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </Animated.View>
    );
  }
}
