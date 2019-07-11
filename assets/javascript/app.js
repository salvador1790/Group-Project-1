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

//Create Profile Button click
$("#add-member-btn").on("click", function (event) {
  event.preventDefault();
  var currentUser = firebase.auth().currentUser.uid
  
  // Get data from UI
  var name = $("#member-name-input").val().trim();
  var phone = $("#member-phone-input").val().trim();
  var street = $("#member-street-input").val().trim();
  var city = $("#member-city-input").val().trim();
  var state = $("#member-state-input").val().trim();
  var zip = $("#member-zip-input").val().trim();



  // Uploads profile data to Firebase

  //(Merge conflict can delete)
//   // Creates local object
//   var newMember = {
//     name,
//     email,
//     phone,
//     street,
//     city,
//     state,
//     zip
//   };

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


  var usersRef = database.ref("profiles");
  var currentUser = firebase.auth().currentUser.uid

  usersRef.set({
    [currentUser]: {
      name,
      phone,
      street,
      city,
      state,
      zip
    },
  });

});

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
      alert("Checkout button clicked " + buttonId);

    });
  });
});
// (Merged from branch can delete)
//     var p = $("<p>");
//     var img = $("<img>");
//     var div = $("<div>");
//     var pDiv = $("<div>");
//     var buttonId = 'check-out ' + i;
//     console.log(buttonId);
//     p.html(book.title);
//     img.attr("src", book.imgURL);
//     img.attr("class", "bookImg")
//     div.attr("class", "cards")
//     pDiv.attr("class", "paragraphDiv");
//     // checkOutButton.attr("title", book.title)
//     // checkOutButton.addClass("addBookBtn");
//     // checkOutButton.text("Add Book");
//     // checkOutButton.attr("data-type", buttonIdWithHash);

//     pDiv.append(p);
//     div.append(pDiv);
//     div.append(img);
//     // div.append(button);

//     $(".bookLibrary").append(div);
//   });
// });

// database.ref("allGames").on("value", function (dbGames) {
//   allGames = dbGames.val();
//   allGames.forEach(function (game, i) {

//     var p = $("<p>");
//     var img = $("<img>");
//     var div = $("<div>");
//     var pDiv = $("<div>");
//     var buttonId = 'check-out ' + i;
//     console.log(buttonId);
//     p.html(game.title);
//     img.attr("src", game.imgURL);
//     img.attr("class", "bookImg")
//     div.attr("class", "cards")
//     pDiv.attr("class", "paragraphDiv");
//     pDiv.append(p);
//     div.append(pDiv);
//     div.append(img);

//     $(".gameLibrary").append(div);

//   });
// });



// //Button that adds books to library
// // Adds to array already in memory.  Overwrites entire array in Firebase
// $(".addBookBtn").on("click", function (event) {
//   event.preventDefault();

//   console.log(this);
//   var title = this.title;
//   var author = this.getAttribute('author');
//   var publishDate = this.getAttribute('publishDate');
//   var imgURL = this.getAttribute('imgURL');


//   // Creates local object
//   var newBook = {
//     title,
//     author,
//     publishDate,
//     imgURL
//   };
//   console.log(newBook);

//   allBooks.push(newBook);

//   // Uploads member data to Firebase
//   database.ref("allBooks").set(allBooks);

//   alert("Book successfully added");

// });

// $(".check-out").on("click", function () {
//   event.preventDefault();
//   console.log("checkout button pushed");
//   alert("Checkout button clicked");

// });



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

  console.log('Your UserId is:  ' + firebase.auth().currentUser.uid);
});
// });

// Log Out Button
$("#log-out-button").on("click", function (event) {
  event.preventDefault();
  console.log("log out button pressed");
  auth.signOut().then(function () {
    console.log("Sign-out successful")
  }).catch(function (error) {
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


    //load profile from Firebase///////////////////////
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


    //end load profile from firebase////////////////////



  }
  else {
    // User is signed out.
    alert("You have signed out.");
  }
  // Close for document.ready
});


//(from master branch.. can remove)
// //Button to add games to Game library
// function submitGame() {
//   var game = $("#search-bar").val();
//   console.log(game);
//   var gameURL = "http://www.giantbomb.com/api/search/?api_key=b8881ebfa9a606ad4cc84a57b36a2b769c202a57&format=json&query=" + game + "&resources=game&limit=30";

//   $.ajax({
//     url: gameURL,
//     dataType: "jsonp",
//     jsonp: 'json_callback',
//     data: {
//       api_key: 'b8881ebfa9a606ad4cc84a57b36a2b769c202a57',
//       format: 'jsonp',
//     },
//     success: function (response) {
//       console.log(response.results);
//       console.log(response.results[0].name);
//       var gameResults = response.results;
//       // console.log(gameResults);
//       $('#booksView').empty();
//       for (var i = 0; i < gameResults.length; i++) {
//         var title = $("<p>");
//         var pDiv = $("<div>");
//         var img = $("<img>");
//         var div = $("<div>");
//         var button = $("<button>")
//         title.text(gameResults[i].name);
//         img.attr("src", gameResults[i].image.medium_url);
//         img.attr("class", "bookImg");
//         div.attr("class", "cards");
//         pDiv.attr("class", "paragraphDiv");
//         button.addClass("addGameBtn");
//         button.text("Add Game");
//         button.attr("data-type", gameResults[i].id);
//         button.attr("title", gameResults[i].name);
//         button.attr("imgURL", gameResults[i].image.medium_url);
//         $('#booksView').append(div);
//         pDiv.append(title);
//         div.append(pDiv);
//         div.append(img);
//         div.append(button);

//       }
//       $(".addGameBtn").on("click", function (event) {
//         event.preventDefault();

//         console.log(this);
//         var title = this.title;
//         var imgURL = this.getAttribute('imgURL');


//         // Creates local object
//         var newGame = {
//           title,
//           imgURL
//         };
//         console.log(newGame);

//         allGames.push(newGame);

//         // // Uploads member data to Firebase
//         // database.ref("allGames").set(allGames);

//         // alert("Game successfully added");

//       });
//     }
//   });
// }


// //Button to add book to Book library
// function submitBook() {
//   var bookName = $("#search").val();
//   var BookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + bookName + "&maxResults=30";

//   $.ajax({
//     url: BookUrl,
//     method: "GET"
//   }).then(function (response) {
//     console.log(response);
//     console.log(response.items[0].volumeInfo.title);
//     var h1 = $("<h3>Click on the book that you own to add to your owned books.</h3>");
//     h1.attr("id", "question");
//     var results = response.items;

//     $("#booksView").append(h1);
//     $('#booksView').empty();
//     for (var i = 0; i < results.length; i++) {
//       var p = $("<p>");
//       var img = $("<img>");
//       var div = $("<div>");
//       var pDiv = $("<div>");
//       var button = $("<button>");

//       p.html(response.items[i].volumeInfo.title);
//       img.attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
//       img.attr("class", "bookImg")
//       div.attr("class", "cards")
//       pDiv.attr("class", "paragraphDiv");
//       button.attr("title", response.items[i].volumeInfo.title)
//       button.addClass("addBookBtn");
//       button.text("Add Book");
//       button.attr("data-type", response.items[i].id);
//       button.attr("imgURL", response.items[i].volumeInfo.imageLinks.thumbnail);

//       pDiv.append(p);
//       div.append(pDiv);
//       div.append(img);
//       div.append(button);
//       $('#booksView').append(div)

//     }//Button that adds books to library
//     // Adds to array already in memory.  Overwrites entire array in Firebase
//     $(".addBookBtn").on("click", function (event) {
//       event.preventDefault();

//       console.log(this);
//       var title = this.title;
//       var imgURL = this.getAttribute('imgURL');


//       // Creates local object
//       var newBook = {
//         title,
//         imgURL
//       };
//       console.log(newBook);

//       allBooks.push(newBook);

//       // Uploads member data to Firebase
//       database.ref("allBooks").set(allBooks);

//       alert("Book successfully added");

//     });

//     $(".check-out").on("click", function () {
//       event.preventDefault();
//       console.log("checkout button pushed");
//       alert("Checkout button clicked");

//     });

//   })


// }


