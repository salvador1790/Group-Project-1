console.log("This works");
$("#submit-button").on("click", function()  {
    var game = $("#search-bar").val();
    console.log(game);
    var gameURL = "http://www.giantbomb.com/api/search/?api_key=b8881ebfa9a606ad4cc84a57b36a2b769c202a57&format=json&query=" + game + "&resources=game&limit=40";

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
                pDiv.attr("class","paragraphDiv");
                button.addClass("addBookBtn");
                button.text("Add Game");
                button.attr("data-type", gameResults[i].id);
                $('#booksView').append(div);
                pDiv.append(title);
                div.append(pDiv);
                div.append(img);
                div.append(button);

            }
            $(".addBookBtn").on("click", function(){
                console.log($(this).attr("data-type"))
                alert("Game Added")
            })
        }
    });
});