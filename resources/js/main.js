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
  var reference = bible.version[book].book_name + " " + chapter + ":" + verse +" "+ bible.version_ref;
  
  var description = chosen;
  var title = reference +' '+limitWords(description, 20)+' via @DailyEpistle #DailyEpistle';
  console.log(title);

  document.title = title;

  $('meta[name=description]'). remove();
  $('head'). append( '<meta name="description" content='+description+'>' );

  $('#verse').html(chosen + "<br /><br />" + reference);
  $('#refresh').html("&#x21bb;");
}

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function deleteCookie(name) { setCookie(name, '', -1); }

function setCookie(name, value, days) {
  var d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

function limitWords(textToLimit, wordLimit) {
  return '\"'+textToLimit.split(" ").splice(0,wordLimit).join(" ")+'...\"';
}