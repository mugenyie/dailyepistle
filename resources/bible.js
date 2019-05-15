function randomVerse (){
    $.getJSON("https://quotes.rest/bible/verse.json", function(data) {
      $("#verse").html(data.contents.verse);
      $("#chapter").html(data.contents.book + " " +data.contents.chapter + " " + data.contents.number);
    });
}

$(document).ready(randomVerse);

$("#generate").on("click", randomVerse);
