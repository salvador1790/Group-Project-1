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

$("#logout-btn").on("click", function (event) {
    event.preventDefault();

    auth.signOut().then(function() {
        location.replace("./home.html");

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        
    });
});