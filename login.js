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

$("#login-btn").on("click", function (event) {

    event.preventDefault();

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    auth.signInWithEmailAndPassword(email, password).then(function () {
        console.log("You have logged in");
        location.replace("./index.html");
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        $("#error-alert").html("Invalid e-mail/password");
        document.getElementById("error-alert").style.color = "red";
        document.getElementById("error-alert").style.fontFamily = "sans-serif";
    });

});