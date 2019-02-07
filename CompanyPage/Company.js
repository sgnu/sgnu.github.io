$(window).scroll(function() {
    var wScroll = $(this).scrollTop();
    var wHeight = $(this).height();

    
    if (wScroll < wHeight) {
        $("#heroImage h1").css("margin-bottom", (10 - (wScroll * 22 / wHeight)) + "vh");
    }

    $(".fadeFromLeft").each(function(i) {
        if (wScroll > $(".fadeFromLeft").eq(i).offset().top - (wHeight / 1.3)) {
            $(".fadeFromLeft").eq(i).css({
                opacity: "1",
                transform: "translateX(0px)"
            });
        }
    });

    $(".fadeFromRight").each(function(i) {
        if (wScroll > $(".fadeFromRight").eq(i).offset().top - (wHeight / 1.3)) {
            $(".fadeFromRight").eq(i).css( {
                opacity: "1",
                transform: "translateX(0px)"
            })
        }
    })
    
    if (wScroll > $(".headShot").offset().top - (wHeight / 1.2)) {
        $(".headShot").each(function(i) {
            setTimeout(function() {
                $(".headShot").eq(i).addClass("isShowing")
            }, (150 * (i + 1)));
        });
    }

});

$("#navTitle").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 400);
});

$("#navAbout").click(function() {
    $("html, body").animate({
        scrollTop: $("#about").offset().top - getOffset()
    }, 400);
})

$("#navOne").click(function() {
    $("html, body").animate({
        scrollTop: $("#one").offset().top - getOffset()
    }, 400);
});

$("#navTwo").click(function() {
    $("html, body").animate({
        scrollTop: $("#two").offset().top - getOffset()
    }, 400);
});

$("#navThree").click(function() {
    $("html, body").animate({
        scrollTop: $("#three").offset().top - getOffset()
    }, 400);
});

function getOffset() {
    if ($(window).width() <= 920) {
        return 10;
    } else {
        return 72;
    }
}