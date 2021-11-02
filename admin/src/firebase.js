import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD7hJ4j5q4oSZ_Rfd61z8plpkiSF0mKtfA",
    authDomain: "netflix-868e8.firebaseapp.com",
    projectId: "netflix-868e8",
    storageBucket: "netflix-868e8.appspot.com",
    messagingSenderId: "949617975867",
    appId: "1:949617975867:web:b8cf850a390ff2aac2321e",
    measurementId: "G-S6E4NPMBTB"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;