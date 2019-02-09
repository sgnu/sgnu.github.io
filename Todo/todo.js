$(document).ready(function() {
    function blink() {
        $(".cursor").animate({
            opacity: 0
        }, 600);
        $(".cursor").animate({
            opacity: 1
        }, 50);
        setTimeout(function() {
            blink();
        }, 900);

        
    }
    
    blink();
})

var demo1Running = false;
var demo1Command = "todo l"
var demo1Text = "0 Live life<br>1 Make a pie"

$("#demo1").click(function() {
    if (!demo1Running) {
        demo1Running = true;
        $("#demo1").addClass("disabled");
        setTimeout(function() {
            $("#window1 > .termContent .cursor").before(demo1Text);
            $("#window1 > .termContent .cursor").before("<br> <span class='query'>$</span>")
        }, demo1Command.length * 350 + 100);
    
        $("#window1 > .termContent > .query").last().after($("<span class='command'></span>"));
        showText("#window1", demo1Command, 0, 150, 350);
        setTimeout(function() {
            demo1Running = false;
            $("#demo1").removeClass("disabled");
        }, demo1Command.length * 350 + 150);

    }

});

function showText(target, message, index, min, max) {
    if (index < message.length) {
      $(target + " > .termContent > .command").last().html($(target + " > .termContent > .command").last().html() + message[index++]);
      setTimeout(function () { showText(target, message, index++, min, max); }, randomize(min, max));
    } else {
        $(target + " > .termContent > .command").last().after("<br>")
    }
  }

  function randomize(min, max){
      return Math.floor((Math.random() * (max - min)) + min)
  }