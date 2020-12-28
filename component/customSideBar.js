import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Avatar } from "react-native-elements";
import { DrawerItems } from "react-navigation-drawer";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import db from "../config";
import { Alert } from "react-native";

export default class CustomSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      userMail: firebase.auth().currentUser.email,
      name: null,
    };
  }

  selectPicture = async () => {
    this.pickImage();
  };

  getUserName = async () => {
    var q = await db
      .collection("users")
      .where("Email", "==", this.state.userMail)
      .get();

    q.docs.map((doc) => this.setState({ name: doc.data().Name }));

    console.log(this.state.name);
  };

  pickImage = async () => {
    console.log("Working");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.uploadImage(this.state.image, this.state.userMail);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var storageRef = await firebase
      .storage()
      .ref()
      .child("UserProfile/" + imageName);

    return storageRef.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = async (imageName) => {
    var ref = await firebase
      .storage()
      .ref()
      .child("UserProfile/" + imageName);
    ref
      .getDownloadURL()
      .then((res) => this.setState({ image: res }))
      .catch((err) =>
        Alert.alert("Error", "There was an Error Updating the Profile Pic")
      );
  };

  componentDidMount = async () => {
    await this.fetchImage(this.state.userMail);
    await this.getUserName();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.AvatarContainer}>
            <Avatar
              size="medium"
              rounded
              source={{ uri: this.state.image }}
              onPress={this.selectPicture}
            />
            <Text style={{ marginLeft: 10 }}>{this.state.name}</Text>
          </View>
          <DrawerItems style={{ marginTop: 20 }} {...this.props} />
        </View>
        <View style={styles.lowerContainer}>
          <Image
            source={require("../assets/logoutIcon.png")}
            style={{
              width: 28,
              height: 28,
              marginLeft: 5,
              tintColor: "#465461",
            }}
          />
          <TouchableOpacity
            style={{
              marginLeft: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate("Login");
              firebase.auth().signOut();
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#465461" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.8,
    paddingTop: 30,
  },
  lowerContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: -120,
    padding: 10,
  },
  AvatarContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
});
