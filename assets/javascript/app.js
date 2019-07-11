//$(document).ready(function() {
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

//TEST BUTTON OUTSIDE OF TABLE
//var myButton = '<button class="check-out" title="Frozen" >Check Out</button>';
//document.append(myButton);
//$(checkOutButton);

//Create Profile Button click
$("#add-member-btn").on("click", function (event) {
  event.preventDefault();

  // Get data from UI
  var name = $("#member-name-input").val().trim();
  var email = $("#member-email-input").val().trim();
  var password = $("#member-password-input").val().trim();
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

////////////////////

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
///////////////

  // Uploads member data to Firebase
  database.ref("users").push(newMember);

  alert("Profile successfully added");

});

//Populate the library from Firebase
database.ref("allBooks").on("value", function (dbBooks) {
  allBooks = dbBooks.val();
  allBooks.forEach(function (book, i) {
    
    //create HTML for image
    var myImage = '<td><img src="' + book.imgURL + '" height="100px" alt=""></td>';
    //create HTML for button
    //var checkOutButton = '<td><button class="check-out" title="Frozen" >Check Out</button></td>'
    var buttonId = 'check-out' + i;
    var checkOutButton = '<td><button id="' + buttonId + '" title="Frozen" >Check Out</button></td>'
    var buttonIdWithHash = '#' + buttonId;

    // Create the new row
    var newRow = $("<tr>").append(
      $(myImage),
      $("<td>").text(book.title),
      $("<td>").text(book.author),
      $("<td>").text(book.publishDate),
      $(checkOutButton),
    );
    $("#books-table > tbody").append(newRow);
    $(buttonIdWithHash).on("click", function () {
      event.preventDefault();
      console.log("checkout button pushed " + buttonId);
      alert("Checkout button clicked " +buttonId);
    
  });
});
});


//Button that adds books to library
// Adds to array already in memory.  Overwrites entire array in Firebase
$(".add-to-library").on("click", function (event) {
  event.preventDefault();

  console.log(this);
  var title = this.title;
  var author = this.getAttribute('author');
  var publishDate = this.getAttribute('publishDate');
  var imgURL = this.getAttribute('imgURL');


  // Creates local object
  var newBook = {
    title,
    author,
    publishDate,
    imgURL
  };
  console.log(newBook);

  allBooks.push(newBook);

  // Uploads member data to Firebase
  database.ref("allBooks").set(allBooks);

  alert("Book successfully added");

});

$(".check-out").on("click", function () {
  event.preventDefault();
  console.log("checkout button pushed");
  alert("Checkout button clicked");

});



// Login Button
$("#login-btn").on("click", function (event) {
  console.log("login button clicked");
  event.preventDefault();

  var email = $("#login-email-input").val().trim();
  var password = $("#login-password-input").val().trim();
  console.log(email);
  console.log(password);
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
 
  });
  
});
// });

// Log Out Button
$("#log-out-button").on("click", function (event) {
  event.preventDefault();
  console.log("log out button pressed");
  auth.signOut().then(function() {
    console.log("Sign-out successful")
 }).catch(function(error) {
   console.log("Error logging out");
 });
});
//Alert user when logged in or out
auth.onAuthStateChanged(function (user) {
  console.log("user state has changed")
  console.log(user);
        if (user) {
            // User is signed in.
            alert("You have signed in.");
            //window.location.href = './index.html';
        } 
        else {
            // User is signed out.
            alert("You have signed out.");
        }
// Close for document.ready
});
