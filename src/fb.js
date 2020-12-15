import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/firebase-auth";

require("firebase/firestore");
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDOsi7o1ZaZB1HpfnHjgZWNAJWqaFU_ALU",
    authDomain: "todo-vue-27b02.firebaseapp.com",
    projectId: "todo-vue-27b02",
    storageBucket: "todo-vue-27b02.appspot.com",
    messagingSenderId: "277305906947",
    appId: "1:277305906947:web:53d96ebfbbab5f846b7b36"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  db.settings({timestampsInSnapShots:true});
  export {fb,db};
