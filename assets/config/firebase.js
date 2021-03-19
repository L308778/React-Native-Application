import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC_VlYGQxkF4LvA_01-2NNCan2SCQlGKVg",
    authDomain: "trippy-2f4ef.firebaseapp.com",
    projectId: "trippy-2f4ef",
    storageBucket: "trippy-2f4ef.appspot.com",
    messagingSenderId: "726179378587",
    appId: "1:726179378587:web:ab21bba13e4b8efbfc5d3e",
    measurementId: "G-X58DM5YKFQ"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };