# myTrainBuilder
A train schedule application that incorporates Firebase to host arrival and departure data. 

## Overview
<p></p>

## Live
<p>App is available live through Firebase:</p>
<p>https://fir-train-scheduler-7f4a9.firebaseapp.com/</p>

## Structure of the project
<li> /public/assets/images contains the icons used in this app.</li>
<li> /public/assets/javascript contains the javascript to:
	<li>Initialize the firebase database.</li>
	<li>Display the time to the user</li>
	<li>Grab the user input from the text boxes when a user submits the form.</li> 
	<li>Push the train data to the firebase database when a train is added to the schedule.</li>
	<li>Perform Moment.js math calculations that determine values for train next arrival time and number of minutes away from destination.</li>
	<li>Update the HTML (<b>Current schedule</b> table) to reflect the latest stored values in the firebase database.</li>
</li>

<li>/public/assets/css contains the external stylesheet used for this app.</li>
<li>/public/index.html contains the code for the HTML and Bootstrap markup.</li>

## Screenshots
![Image of site header](readme_images/site_header2.png)
![Image of current trains schedule](readme_images/current_train_schedule2.png)
![Image of add train form](readme_images/add_train_section2.png)


## Technologies used to create site
<li>HTML5</li>
<li>CSS</li>
<li>Bootstrap 4.0.0-beta (http://getbootstrap.com/)</li>
<li>Javascript</li>
<li>JQuery (https://jquery.com/)</li>
<li>Firebase API for database hosting (https://firebase.google.com/)</li>
<li>Moment.js (http://momentjs.com/)</li>

## How to use the Firebase API
<p>To learn about the Firebase API and how to add Firebase to your web app, read the <a href="https://firebase.google.com/docs/web/setup" target="_blank">Firebase documentation</a>.</p>
<p>Because Firebase is a Google product, you will need to use your Google account to access and log into Firebase. If you don't have a Google account, you will need to create one.</p>


## How to use the site

### Entering or calulating train information
To build the train schedule, you will need to provide information about the train, such as train name, destination, first train time, and frequency. This information is used to calculate the train next arrival time and number of minutes away using the moment.js library. 

Train info | Description
------------ | -------------
Train name | The name of the train. For example, New Haven Railroad.
Destination | The location to where the train is traveling to. For example, Chicago, IL.
First train time (HH:mm - military time) | The first time that the train leaves (in military time).
Frequency (min) | How often (in minutes) the train leaves.
Next arrival | The next time the train will arrive at the destination.
Minutes away | The number of minutes until the next train is expected to arrive at the destination.

### Adding a train to the schedule
<p>To add a train to the schedule, use the <b>Add train</b> form to enter information about the train being added. All fields are required to add a train to the schedule.

<!-- ### Removing a train from the schedule

### Updating the train schedule -->


## Future feature enhancements
<ul>
	<li>Make it so that only users who log into the site with their Google or GitHub accounts can use the site. Read up on Firebase authentication for this.</li>
	<li>Try adding update and remove buttons for each train. Let the user edit the row's elements -- allow them to change a train's name, destination, and arrival time (and then, by relation, minutes to arrival).</li>
	<li>Consider updating "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).</li>
</ul>

## Icons
All icons used for this project can be obtained from <a href="http://fontawesome.io/icons/" target="_blank">Font Awesome</a> or <a href="https://www.iconfinder.com/" target="_blank">Iconfinder</a>.

## Feedback
<p>Feel free to send feedback via <a href="https://twitter.com/iamPhilStubbs" target="_blank">Twitter</a>, email (philipstubbs13@gmail.com), or <a href="https://github.com/philipstubbs13/Firebase-Train-Scheduler/issues/" target="_blank">file an issue</a>. Feature requests are always welcome. If you wish to contribute, please send an email with your request to philipstubbs13@gmail.com to discuss.</p>

