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

 //Variables
 var train ="";
 var dest="";
 var firstTrain="";
 var trainFrequency="";
 var nextTrain = "";
 var tMinutesTillTrain = "";
 var tRow = "";
 var getKey = "";

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

	//Form validation for user input values. To add a train, all fields are required.
	//Check that all fields are filled out.
	if (trainName === "" || destination === "" || firstTrainTime === "" || frequency === ""){
		$("#not-military-time").empty();
		$("#missing-field").html("ALL fields are required to add a train to the schedule.");
		return false;		
	}

	//Check to make sure that there are no null values in the form.
	else if (trainName === null || destination === null || firstTrainTime === null || frequency === null){
		$("#not-military-time").empty();
		$("#missing-field").html("ALL fields are required to add a train to the schedule.");
		return false;		
	}

	//Check that the user enters the first train time as military time.
	else if (firstTrainTime.length !== 5 || firstTrainTime.substring(2,3)!== ":") {
		$("#missing-field").empty();
		$("#not-military-time").html("Use military time. For example, 15:00.");
		return false;
	}

	else{
		$("#not-military-time").empty();
		$("#missing-field").empty();
		//Moment JS math caclulations to determine train next arrival time and the number of minutes away from destination.
		// First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	    // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	    // Difference between the times
	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    console.log("DIFFERENCE IN TIME: " + diffTime);

	    // Time apart (remainder)
	    var tRemainder = diffTime % frequency;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = frequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

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
			trainFrequency: frequency,
			nextTrain: nextTrain,
			tMinutesTillTrain: tMinutesTillTrain
		})
	}
});


// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update the page in real-time when the firebase database changes.
database.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());

	//Set variables for form input field values equal to the stored values in firebase.
	train = snapshot.val().train;
	dest = snapshot.val().dest;
	firstTrain = snapshot.val().firstTrain;
	trainFrequency = snapshot.val().trainFrequency;
	nextTrain = snapshot.val().nextTrain;
	tMinutesTillTrain = snapshot.val().tMinutesTillTrain;

	//Update the HTML (schedule table) to reflect the latest stored values in the firebase database.
	var tRow = $("<tr>");
	var trainTd = $("<td>").text(train);
    var destTd = $("<td>").text(dest);
    var nextTrainTd = $("<td>").text(nextTrain);
    var trainFrequencyTd = $("<td>").text(trainFrequency);
    var tMinutesTillTrainTd = $("<td>").text(tMinutesTillTrain);

    // Append the newly created table data to the table row.
    //Append trash can icon to each row so that user can delete row if needed.
    tRow.append("<img src='assets/images/if_trash_1608958.svg' alt='trash can' class='trash-can mr-3'>", "<i class='fa fa-pencil' aria-hidden='true'></i>", trainTd, destTd, trainFrequencyTd, nextTrainTd, tMinutesTillTrainTd);
    // Append the table row to the table body
    $("#schedule-body").append(tRow);

});

//Click event for trash can icon/button. When user clicks trash can to remove a train from the schedule...
 $("body").on("click", ".trash-can", function(){
	// Prevent form from submitting
	event.preventDefault();

	//confirm with the user before he or she decides to actually delete data.
	var confirmDelete = confirm("Are you sure you want to delete this train?");
	if (confirmDelete) {
	$(this).closest('tr').remove();
	getKey = $(this).parent().attr('id');
	console.log(getKey);
	//dataRef.child(key).remove();
	//database.ref().child(getKey).remove();
	}
	else {
		return;
	}
});

//One way to initialize all tooltips on a page would be to select them by their data-toggle attribute:
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//OpenWeatherMap API
//Code for "Current weather" section.
$( document ).ready(function() {
    var appID = "beed4816a780902e0944aec50f172e2a";

    $(".query_btn").click(function(){
        var query_param = $(this).prev().val();

        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
        } else if ($(this).prev().attr("placeholder") == "Zip Code") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&APPID=" + appID;
        }

        $.getJSON(weather,function(json){
            $("#city").html("City: " + json.name);
            $("#main_weather").html("Main weather: " + json.weather[0].main);
            $("#description_weather").html("Description: " + json.weather[0].description);
            //$("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            var K = json.main.temp;
      		var F = Math.floor((K - 273.15) * 1.80 + 32);
      		// Create CODE HERE to dump the temperature content into HTML
      		$("#temperature").html("Temperature(F): "  + F);
        	});
    })
});