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

 //Click event for submit button. When user clicks Submit button to add a train to the schedule...
 $("#submit-button").on("click", function() {

	// Prevent form from submitting
	event.preventDefault();

	//Grab the values that the user enters in the text boxes in the "Add train" section. Store the values in variables.
	var trainName = $("#train-name").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrainTime = $("#first-train-time").val().trim();
	var frequency = $("#frequency").val().trim();

	//Print the values that the user enters in the text boxes to the console for debugging purposes.
	console.log(trainName);
	console.log(destination);
	console.log(firstTrainTime);
	console.log(frequency);

	//Save the user values in Firebase database.
	database.ref().push({
		train: trainName,
		dest: destination,
		firstTrain: firstTrainTime,
		trainFrequency: frequency
	})
});

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update the page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
	console.log(snapshot.val());

	//Set variables for form input field values equal to the stored values in firebase.
	train = snapshot.val().train;
	console.log(train);
	dest = snapshot.val().dest;
	firstTrain = snapshot.val().firstTrain;
	trainFrequency = snapshot.val().trainFrequency;

	//Update the HTML (schedule table) to reflect the latest stored values in the firebase database.
	$("#train-name-col").html(train);
});