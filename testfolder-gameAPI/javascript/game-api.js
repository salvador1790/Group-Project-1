console.log("This works");
$("#button-addon2").on("click", function () {
    var game = $("#search-bar").val().trim();
    console.log(game);
    var gameURL = "http://www.giantbomb.com/api/search/?api_key=b8881ebfa9a606ad4cc84a57b36a2b769c202a57&format=json&query=" + game + "&resources=game&limit=20";

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
            for (var i = 0; i < gameResults.length; i++) {
                var title = $("<h3>");
                var img = $("<img>");
                var div = $("<div>");
                title.text(gameResults[i].name);
                img.attr("src", gameResults[i].image.medium_url);
                img.attr("class", "bookImg")
                div.attr("class", "cards")
                div.attr("data-type", gameResults[i].id);
                $('#game-goes-here').append(div)
                div.append(title);
                div.append(img);
                div.on("click", function () {
                })
            }
        }
    });
})