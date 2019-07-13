// //$(document).ready(function() {
//Initialize Firebase
// var firebaseConfig = {
//     apiKey: "AIzaSyA4RlrYXgKvMYzZQj8p9Ls9s6YZB9mAfXA",
//     authDomain: "bookshlf-61afa.firebaseapp.com",
//     databaseURL: "https://bookshlf-61afa.firebaseio.com",
//     projectId: "bookshlf-61afa",
//     storageBucket: "",
//     messagingSenderId: "427376747607",
//     appId: "1:427376747607:web:3cd338bd21f19ee8"
//   };
  
//   firebase.initializeApp(firebaseConfig);
  
//   var database = firebase.database();
//   var auth = firebase.auth();
  
  var allBooks = []; 

database.ref("BookLibrary").on("value", function (dbBooks) {
    allBooks = dbBooks.val();
    allBooks.forEach(function (book, i) {
  
      var p = $("<p>");
      var img = $("<img>");
      var div = $("<div>");
      var pDiv = $("<div>");
      var button = $("<button>")
      var buttonId = 'check-out ' + i;
      console.log(buttonId);
      p.html(book.title);
      img.attr("src", book.imgURL);
      img.attr("class", "bookImg")
      div.attr("class", "cards")
      pDiv.attr("class", "paragraphDiv");
      button.text("Checkout");
      button.addClass("checkoutBtn");
      pDiv.append(p);
      div.append(pDiv);
      div.append(img);
      div.append(button);
  
      $(".bookLibrary").append(div);
    });
  });
  

function submitBook() {
    var bookName = $("#search").val();
    var authorName = $("#searchAuthor").val();
    var BookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + bookName + "&maxResults=30";

    $.ajax({
        url: BookUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.items[0].volumeInfo.title);
        var h1 = $("<h3>Click on the book that you own to add to your owned books.</h3>");
        h1.attr("id", "question");
        var results = response.items;

        $("#booksView").append(h1);
        $('#booksView').empty();
        for (var i = 0; i < results.length; i++) {
            var p = $("<p>");
            var img = $("<img>");
            var div = $("<div>");
            var pDiv = $("<div>");
            var button = $("<button>");
            var smallThumbnail
            if (response.items[i].volumeInfo.imageLinks && response.items[i].volumeInfo.imageLinks.smallThumbnail) {
                smallThumbnail = response.items[i].volumeInfo.imageLinks.smallThumbnail
            } else {
                smallThumbnail = "https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg"
            }

            p.html(response.items[i].volumeInfo.title);
            img.attr("src", smallThumbnail);
            img.attr("class", "bookImg")
            div.attr("class", "cards")
            pDiv.attr("class", "paragraphDiv");
            button.attr("class", "addBookBtn");
            button.text("Add Book");
            button.attr("data-type", response.items[i].id);
            button.attr("title", response.items[i].volumeInfo.title);
            button.attr("imgURL", smallThumbnail);
            $('#booksView').append(div)
            pDiv.append(p);
            div.append(pDiv);
            div.append(img);
            div.append(button);

        }
        $(".addBookBtn").on("click", function (event) {
            event.preventDefault();
    
            console.log(this);
            var title = this.getAttribute("title");
            var imgURL = this.getAttribute('imgURL');
    
    
            // Creates local object
            var newBook = {
              title,
              imgURL
            };
            console.log(newBook);
    
            allBooks.push(newBook);

            console.log(allBooks)
    
            // Uploads member data to Firebase
            database.ref("BookLibrary").set(allBooks);
            
    
    
          });
    })


}
