var firebaseConfig = {
  apiKey: "AIzaSyCA6zqc1TL-wEY4-guEF27nJ29P09vDXh0",
  authDomain: "myproject-fd913.firebaseapp.com",
  databaseURL: "https://myproject-fd913.firebaseio.com",
  projectId: "myproject-fd913",
  storageBucket: "myproject-fd913.appspot.com",
  messagingSenderId: "263780356447",
  appId: "1:263780356447:web:133cd53aef245888"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
$("#add-train").click(function (e) {
  e.preventDefault();
  //get value
  var trainName = $("#train-name").val();
  var destination = $("#destination").val();
  var firstTrain = $("#first-train").val();//time 
  var frequency = $("#frequency").val();//mins
  //push to database 
  console.log(frequency);

  database.ref().push({
    name: trainName,
    des: destination,
    time: firstTrain,
    freq: frequency
  });
  //clear form
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});
//listen on every child added to database
database.ref().on("child_added", function (snap) {
  //get values from snap
  //dispaly values
  if (snap.val()) {
    var tr = $("<tr>");
    var tdName = $("<td>").text(snap.val().name);
    var tdDes = $("<td>").text(snap.val().des);
    var tdFisrt = $("<td>").text(snap.val().time);
    var tdTime = $("<td>");
    var freq = snap.val().freq
    var tdFreq = $("<td>").text(freq);
    var time = snap.val().time;//fisrt train time
    //time like 11:33
    var tdMin = $("<td>");
    var date = moment().format("YYYY/MM/DD");//local date
    var timeFormated = date + " " + time;//time string
    timeFormated = moment(timeFormated, "YYYY/MM/DD HH:mm");//moment obj



    if (timeFormated.diff(moment(), "minutes") > 0) {
      //time in the future 
      tdMin.text(timeFormated.diff(moment(), "minutes"));
      //console.log("future");
      tdTime.text(snap.val().time);
    } else {
      //time passed 
      //console.log(freq);
      //passedTime < 0 
      //var passedTime = timeFormated.diff(moment(),"minutes");
      // console.log(passedTime);
      var minutes = freq - (Math.abs(timeFormated.diff(moment(), "minutes")) % freq);// negative numbers modulo
      tdMin.text(minutes);
      var next = moment().add(minutes, "minutes").format("HH:mm");
      tdTime.text(next);
    }

    tr.append(tdName, tdDes,tdFisrt, tdTime, tdFreq, tdMin);
    $("#body").append(tr);
  }


}, function (e) {
  console.log(e);

});