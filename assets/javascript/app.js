// // //$(document).ready(function() {
//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyA4RlrYXgKvMYzZQj8p9Ls9s6YZB9mAfXA",
    authDomain: "bookshlf-61afa.firebaseapp.com",
    databaseURL: "https://bookshlf-61afa.firebaseio.com",
    projectId: "bookshlf-61afa",
    storageBucket: "",
    messagingSenderId: "427376747607",
    appId: "1:427376747607:web:3cd338bd21f19ee8"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var auth = firebase.auth();

// var allBooks = [];  
// var allGames = [];

// //TEST BUTTON OUTSIDE OF TABLE
// //var myButton = '<button class="check-out" title="Frozen" >Check Out</button>';
// //document.append(myButton);
// //$(checkOutButton);

//Create Profile Button click
$("#add-member-btn").on("click", function (event) {
    event.preventDefault();

    // Get data from UI
    var name = $("#member-name-input").val().trim();
    var phone = $("#member-phone-input").val().trim();
    var street = $("#member-street-input").val().trim();
    var city = $("#member-city-input").val().trim();
    var state = $("#member-state-input").val().trim();
    var zip = $("#member-zip-input").val().trim();

    // Creates local object
    var newMember = {
        name,
        phone,
        street,
        city,
        state,
        zip
    };


})
console.log("HELLO");
//load profile from Firebase///////////////////////
auth.onAuthStateChanged(function (user) {
    console.log("user state has changed")
    console.log(user);
    if (user) {
        // User is signed in.
        console.log("You have signed in.");
        //window.location.href = './index.html';
        console.log(firebase.auth().currentUser);
        var currentUser = firebase.auth().currentUser.uid

        //database.ref("profiles" / currentUser).on("value", function (profile) {
        database.ref("profiles/" + currentUser).on("value", function (profile) {
            myProfile = profile.val();
            $("#member-name-input").val(myProfile.name);
            $("#member-phone-input").val(myProfile.phone);
            $("#member-street-input").val(myProfile.street);
            $("#member-city-input").val(myProfile.city);
            $("#member-state-input").val(myProfile.state);
            $("#member-zip-input").val(myProfile.zip);
        });
    }
    else {
        // User is signed out.
        console.log("You have signed out.");
    }

});


$("#logout-btn").on("click", function (event) {
    event.preventDefault();

    auth.signOut().then(function () {
        location.replace("./home.html");

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

    });
});

  //   ////////////////////

  //   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log(errorCode);
  //     console.log(errorMessage);
  //     // ...
  //   });
  //   ///////////////

  //   // Uploads member data to Firebase
  //   database.ref("users").push(newMember);

  //   alert("Profile successfully added");

  // });










  // // Login Button
  // $("#login-btn").on("click", function (event) {
  //   console.log("login button clicked");
  //   event.preventDefault();

  //   var email = $("#login-email-input").val().trim();
  //   var password = $("#login-password-input").val().trim();
  //   console.log(email);
  //   console.log(password);
  //   firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log(errorCode);
  //     console.log(errorMessage);

  //   });

  // });
  // // });

  // // Log Out Button
  // $("#log-out-button").on("click", function (event) {
  //   event.preventDefault();
  //   console.log("log out button pressed");
  //   auth.signOut().then(function () {
  //     console.log("Sign-out successful")
  //   }).catch(function (error) {
  //     console.log("Error logging out");
  //   });
  // });
  // //Alert user when logged in or out
  // auth.onAuthStateChanged(function (user) {
  //   console.log("user state has changed")
  //   console.log(user);
  //   if (user) {
  //     // User is signed in.
  //     console.log("You have signed in.");
  //     //window.location.href = './index.html';
  //   }
  //   else {
  //     // User is signed out.
  //     console.log("You have signed out.");
  //   }
  //   // Close for document.ready
  // });






