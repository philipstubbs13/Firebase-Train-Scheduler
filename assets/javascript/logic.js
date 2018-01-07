//Names of passenger trains in the US for app testing purposes.
	//New York Central, Milwaukee Railroad, Illinois Central, New Haven Railroad, Michigan Central Railroad, Santa Fe, Union Pacific Railroad
	//Florida East Coast Railway, Southern Pacific, Pennsylvania Railroad, Canada Pacific Railway, St. Louis-San Francisco Railway, Pere Marquette Railway, Alaska Railroad.
	//https://en.wikipedia.org/wiki/List_of_named_passenger_trains_of_the_United_States_(I%E2%80%93M)
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

	//Remove the text from the form boxes after user presses submit button.
	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train-time").val("");
	$("#frequency").val("");

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
database.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());

	//Set variables for form input field values equal to the stored values in firebase.
	train = (snapshot.val().train);
	dest = snapshot.val().dest;
	firstTrain = snapshot.val().firstTrain;
	trainFrequency = snapshot.val().trainFrequency;

	//Update the HTML (schedule table) to reflect the latest stored values in the firebase database.
	var tRow = $("<tr>");
	var trainTd = $("<td>").text(train);
    var destTd = $("<td>").text(dest);
    var firstTrainTd = $("<td>").text(firstTrain);
    var trainFrequencyTd = $("<td>").text(trainFrequency);

    // Append the newly created table data to the table row
    tRow.append(trainTd, destTd, trainFrequencyTd, firstTrainTd,);
    // Append the table row to the table body
    $("#schedule-body").append(tRow);

});