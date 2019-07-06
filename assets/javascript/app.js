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


//Create Profile Button
$("#add-member-btn").on("click", function (event) {
  event.preventDefault();

  // Get data from UI
  var name = $("#member-name-input").val().trim();
  var email = $("#member-email-input").val().trim();
  var phone = $("#member-phone-input").val().trim();
  var street = $("#member-street-input").val().trim();
  var city = $("#member-city-input").val().trim();
  var state = $("#member-state-input").val().trim();
  var zip = $("#member-zip-input").val().trim();

  // Creates local object
  var newMember = {
    name,
    email,
    phone,
    street,
    city,
    state,
    zip
  };

  // Uploads member data to Firebase
  database.ref("users").push(newMember);

  alert("Profile successfully added");

});



