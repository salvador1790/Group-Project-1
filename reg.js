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

$("#sign-up-btn").on("click", function (event) {

    event.preventDefault();

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    var confirmPass = $("#password-confirm").val().trim();
    console.log(email, password, confirmPass);
    if (email === "") {
        $("#error-alert").html("Please enter a valid e-mail address");
        document.getElementById("error-alert").style.color = "red";
        document.getElementById("error-alert").style.fontFamily = "sans-serif";
    }
    else if (password === "" || confirmPass === "" || password.length < 6) {
        $("#error-alert").html("Please enter a valid password");
        document.getElementById("error-alert").style.color = "red";
        document.getElementById("error-alert").style.fontFamily = "sans-serif";
    }
    else if (password !== confirmPass) {
        $("#error-alert").html("Passwords do not match");
        document.getElementById("error-alert").style.color = "red";
        document.getElementById("error-alert").style.fontFamily = "sans-serif";
    }
    else {
        auth.createUserWithEmailAndPassword(email, password).then(function () {
            console.log("You have signed up");
            location.replace("./index.html");
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            if (errorMessage === "The email address is badly formatted.") {
                $("#error-alert").html("Invalid E-mail");
            }
            else {
                $("#error-alert").html("The E-mail address is already in use");
                document.getElementById("error-alert").style.color = "red";
                document.getElementById("error-alert").style.fontFamily = "sans-serif";
            }
        });
    }

});