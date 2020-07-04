import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA8gQa7P3uTWPMhY0R6vdw_03a0gUTe9zU",
  authDomain: "restapp-85459.firebaseapp.com",
  databaseURL: "https://restapp-85459.firebaseio.com",
  projectId: "restapp-85459",
  storageBucket: "restapp-85459.appspot.com",
  messagingSenderId: "311219987311",
  appId: "1:311219987311:web:fc13c6a2b3789af3e07e9a",
  measurementId: "G-3MN0J330FR",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const firebaseAuth = firebase.auth();

export { storage, firebaseAuth, firebase as default };
