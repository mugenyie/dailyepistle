var bible;

function resize() {
  if ($(document).ready()) {
    $("#verse").css("font-size", ($(window).height() + $(window).width()) * .025 + "px");
    $("#refresh").css("font-size", ($(window).height() + $(window).width()) * .05 + "px");
  }
}

$(document).ready(function() {
  $("#verse").css("font-size", ($(window).height() + $(window).width()) * .025);
  $("#refresh").css("font-size", ($(window).height() + $(window).width()) * .05);
  $.getJSON('resources/bibles/kjv.json', function(data) {
    bible = data;
    getVerse(0);
  });
  new Clipboard('#verse', {
    target: function(trigger) {
      setTimeout(function(){document.getSelection().removeAllRanges();},150);
      $(trigger).css("color", "grey");
      setTimeout(function(){$(trigger).css("color", "white")},200);
      return trigger;
    }
  });

  $('.toggleDayNight').click(function(){
    $('.toggleDayNight').toggleClass('active')
    $('body').toggleClass('day')
    })

});

function getVerse(fresh) {
  var url = Qurl.create();
  if (fresh) {
    var max = 66;
    var min = 1;
    var book = Math.floor(Math.random() * (max - min + 1)) + min;
    
    var max = Object.keys(bible.version[book].book).length;
    var min = 1;
    var chapter = Math.floor(Math.random() * (max - min + 1)) + min;
    
    var max = Object.keys(bible.version[book].book[chapter].chapter).length;
    var min = 1;
    var verse = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    var book = url.query('b');
    var chapter = url.query('c');
    var verse = url.query('v');
    if (!book || !chapter || !verse) {
      var max = 66;
      var min = 1;
      var book = Math.floor(Math.random() * (max - min + 1)) + min;
      
      var max = Object.keys(bible.version[book].book).length;
      var min = 1;
      var chapter = Math.floor(Math.random() * (max - min + 1)) + min;
      
      var max = Object.keys(bible.version[book].book[chapter].chapter).length;
      var min = 1;
      var verse = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  url.query('b',book);
  url.query('c',chapter);
  url.query('v',verse);
  
  var chosen = bible.version[book].book[chapter].chapter[verse].verse;
  var reference = bible.version[book].book_name + " " + chapter + ":" + verse;
  
  console.log(chosen);
  console.log(reference);

  $('#verse').html(chosen + "<br /><br />" + reference);
  $('#refresh').html("&#x21bb;");
}