// //$(document).ready(function() {
//Initialize Firebase
  // var firebaseConfig = {
  //   apiKey: "AIzaSyA4RlrYXgKvMYzZQj8p9Ls9s6YZB9mAfXA",
  //   authDomain: "bookshlf-61afa.firebaseapp.com",
  //   databaseURL: "https://bookshlf-61afa.firebaseio.com",
  //   projectId: "bookshlf-61afa",
  //   storageBucket: "",
  //   messagingSenderId: "427376747607",
  //   appId: "1:427376747607:web:3cd338bd21f19ee8"
  // };

  // firebase.initializeApp(firebaseConfig);

  // var database = firebase.database();
  // var auth = firebase.auth();

var allGames = [];

database.ref("GameLibrary").on("value", function (dbGames) {
  allGames = dbGames.val();
  console.log(dbGames.val());
  allGames.forEach(function (game, i) {

    var p = $("<p>");
    var img = $("<img>");
    var div = $("<div>");
    var pDiv = $("<div>");
    var button = $("<button>");
    var buttonId = 'check-out ' + i;
    console.log(buttonId);
    p.html(game.title);
    img.attr("src", game.imgURL);
    img.attr("class", "bookImg")
    div.attr("class", "cards")
    pDiv.attr("class", "paragraphDiv");
    button.text("Checkout");
    button.addClass("checkoutGameBtn");
    $(".gameLibrary").append(div);
    pDiv.append(p);
    div.append(pDiv);
    div.append(img);
    div.append(button);


  });
  $(".checkoutGameBtn").on("click" ,function (){
    console.log(allGames.this);

  })
});

function submitGame() {
    var game = $("#search-bar").val();
    console.log(game);
    var gameURL = "https://www.giantbomb.com/api/search/?api_key=b8881ebfa9a606ad4cc84a57b36a2b769c202a57&format=json&query=" + game + "&resources=game&limit=30";
  
    $.ajax({
      url: gameURL,
      dataType: "jsonp",
      jsonp: 'json_callback',
      data: {
        api_key: 'b8881ebfa9a606ad4cc84a57b36a2b769c202a57',
        format: 'jsonp',
      },
      success: function (response) {
        console.log(response.results);
        console.log(response.results[0].name);
        var gameResults = response.results;
        // console.log(gameResults);
        $('#booksView').empty();
        for (var i = 0; i < gameResults.length; i++) {
          var title = $("<p>");
          var pDiv = $("<div>");
          var img = $("<img>");
          var div = $("<div>");
          var button = $("<button>")
          title.text(gameResults[i].name);
          img.attr("src", gameResults[i].image.medium_url);
          img.attr("class", "bookImg");
          div.attr("class", "cards");
          pDiv.attr("class", "paragraphDiv");
          button.addClass("addGameBtn");
          button.text("Add Game");
          button.attr("data-type", gameResults[i].id);
          button.attr("title", gameResults[i].name);
          button.attr("imgURL", gameResults[i].image.medium_url);
          $('#booksView').append(div);
          pDiv.append(title);
          div.append(pDiv);
          div.append(img);
          div.append(button);
  
        }
        $(".addGameBtn").on("click", function (event) {
          event.preventDefault();
  
          console.log(this);
          var title = this.getAttribute("title");
          var imgURL = this.getAttribute('imgURL');
  
  
          // Creates local object
          var newGame = {
            title,
            imgURL
          };
          console.log(newGame);
  
          allGames.push(newGame);
  
          // Uploads member data to Firebase
          database.ref("GameLibrary").set(allGames);
  
          
  
        });
      }
    });
  }



  