import firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAYschQ20HGA6pyj4fB_bwyLGC1OtWUVXw",
  authDomain: "booksanta-69260.firebaseapp.com",
  databaseURL: "https://booksanta-69260.firebaseio.com",
  projectId: "booksanta-69260",
  storageBucket: "booksanta-69260.appspot.com",
  messagingSenderId: "669438957912",
  appId: "1:669438957912:web:fc22d23d17dba132abad2d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
