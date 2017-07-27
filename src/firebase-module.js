

import Firebase from 'firebase';



// Initialize Firebase
var config = {
    apiKey: "AIzaSyCE7AltwM7OQhVST8F9N0nPYeUQkg-ocPM",
    authDomain: "to-do-ee14c.firebaseapp.com",
    databaseURL: "https://to-do-ee14c.firebaseio.com",
    projectId: "to-do-ee14c",
    storageBucket: "to-do-ee14c.appspot.com",
    messagingSenderId: "174008917247"
};

var firebaseApp = Firebase.initializeApp(config);

export const db = firebaseApp.database();

export const todoRef = db.ref('todo');