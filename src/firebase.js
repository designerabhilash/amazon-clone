import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBpKW75sgUAfQGkH0Zm3QTzRxWEVcDNdmY",
    authDomain: "clone-9b8ae.firebaseapp.com",
    databaseURL: "https://clone-9b8ae.firebaseio.com",
    projectId: "clone-9b8ae",
    storageBucket: "clone-9b8ae.appspot.com",
    messagingSenderId: "851427100811",
    appId: "1:851427100811:web:d92c56ed37dd62b2ee6c8e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };