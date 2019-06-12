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
  $("#add-train").click(function(e){
      e.preventDefault();
    //get value
    var trainName = $("#train-name").val();
    var destination = $("#destination").val();
    var firstTrain = $("#first-train").val();//time 
    var frequency = $("#frequency").val();//mins
    //push to database 
    console.log(frequency);
    
    database.ref().push({
        name : trainName,
        des : destination,
        time : firstTrain,
        freq : frequency
    });
    //clear form
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });
  //listen on every child added to database
  database.ref().on("child_added",function(snap){
    //get values from snap
    //dispaly values
    if(snap.val()){
        var tr = $("<tr>");
        var tdName = $("<td>").text(snap.val().name);
        var tdDes = $("<td>").text(snap.val().des);
        var tdTime = $("<td>").text(snap.val().time);
        var tdFreq = $("<td>").text(snap.val().freq);
        //var tdMins = 
        //monet js
        tr.append(tdName,tdDes,tdTime,tdFreq);
        $("#body").append(tr);
    }
    

  },function(e){
      console.log(e);
      
  });