//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDFbOl8hZV-OYRghvyAWlnKvZ5g3MoCyEU",
    authDomain: "school-reading-logger.firebaseapp.com",
    databaseURL: "https://school-reading-logger.firebaseio.com",
    projectId: "school-reading-logger",
    storageBucket: "",
    messagingSenderId: "96885408361",
    appId: "1:96885408361:web:35204891ba09be1f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Auth and firestore references
var auth = firebase.auth();
var database = firebase.database();

$("#login-btn").on("click", function (event) {

    event.preventDefault();

    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    auth.signInWithEmailAndPassword(email, password).then(function() {
        console.log("You have logged in");
        location.replace("https://www.google.com");
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
