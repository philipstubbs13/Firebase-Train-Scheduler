//Initialize Firebase database
// Initialize Firebase
var config = {
	apiKey: "AIzaSyAJgJDtXUu5e5dwzeDVF5Hw5dnmcZwyV5s",
    authDomain: "fir-train-scheduler-7f4a9.firebaseapp.com",
    databaseURL: "https://fir-train-scheduler-7f4a9.firebaseio.com",
    projectId: "fir-train-scheduler-7f4a9",
    storageBucket: "",
    messagingSenderId: "123683577611"
 };
 firebase.initializeApp(config);

 //Create database variable to create reference to firebase.database().
 var database = firebase.database();