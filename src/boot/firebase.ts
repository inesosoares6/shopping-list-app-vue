import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDCin_cDp6m03cN874Vb3kXO3-idXh29m4",
  authDomain: "awesome-todo-24872.firebaseapp.com",
  databaseURL:
    "https://awesome-todo-24872-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-todo-24872",
  storageBucket: "awesome-todo-24872.appspot.com",
  messagingSenderId: "927388689764",
  appId: "1:927388689764:web:568c99185ca2a6fe664671",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebase.auth();
const firebaseDb = firebase.database(firebaseApp);

export { firebaseAuth, firebaseDb };
