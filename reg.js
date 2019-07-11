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
            location.replace("https://www.google.com");
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            $("#error-alert").html("The e-mail address is already in use");
            document.getElementById("error-alert").style.color = "red";
            document.getElementById("error-alert").style.fontFamily = "sans-serif";
        });
    }

});