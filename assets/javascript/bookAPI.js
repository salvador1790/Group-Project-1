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
        h1.attr("id","question");
        var results = response.items;

        $("#booksView").append(h1);
        $('#booksView').empty();
        for (var i = 0; i < results.length; i++) {
            var p = $("<p>");
            var img = $("<img>");
            var div = $("<div>");
            var pDiv = $("<div>");
            var button = $("<button>");

            p.html(response.items[i].volumeInfo.title);
            img.attr("src", response.items[i].volumeInfo.imageLinks.smallThumbnail);
            img.attr("class", "bookImg")
            div.attr("class", "cards")
            pDiv.attr("class","paragraphDiv");
            button.attr("class", "addBookBtn");
            button.text("Add Book");
            button.attr("data-type", response.items[i].id);
            $('#booksView').append(div)
            pDiv.append(p);
            div.append(pDiv);
            div.append(img);
            div.append(button);

        }
        $(".addBookBtn").on("click", function(){
            console.log($(this).attr("data-type"))
            alert("Book Added")
        })
    })

   
}