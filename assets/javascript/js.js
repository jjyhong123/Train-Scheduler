// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAXtjWo346vSSevkdxEcdg2N7lkIhmUQUA",
    authDomain: "jae-blog-bcbff.firebaseapp.com",
    databaseURL: "https://jae-blog-bcbff.firebaseio.com",
    projectId: "jae-blog-bcbff",
    storageBucket: "jae-blog-bcbff.appspot.com",
    messagingSenderId: "1041058382831"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train
$(".btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var trainData = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    // Uploads employee data to the database
    database.ref().push(trainData);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding new train row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());

    // Store everything into a variable
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    // Calculate the next arrival time
    var firstTrainTime_o = moment(firstTrainTime, "HH:mm")
    var diffTime = moment().diff(moment(firstTrainTime_o), "minutes");
    var remainder = diffTime % frequency;
    var minutesAway = frequency - remainder;
    var nextArrival = moment().add(minutesAway, "minutes");

    // Add each train's data into the table
    $("#current-train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextArrival).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");

});
