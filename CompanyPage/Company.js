$(window).scroll(function() {
    var wScroll = $(this).scrollTop();

    if (wScroll > $(".headShot").offset().top - ($(window).height() / 1.2)) {
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

$("#nav i").click(function() {
    $("#nav a").toggle();

    if ($("#nav").is("expanded")) {
        $("#nav").removeClass("expanded");
    } else {
        $("#nav").addClass("expanded");
    }
})

$("#navOne").click(function() {
    $("html, body").animate({
        scrollTop: $("#one").offset().top - 80
    }, 400);
});

$("#navTwo").click(function() {
    $("html, body").animate({
        scrollTop: $("#two").offset().top - 80
    }, 400);
});

$("#navThree").click(function() {
    $("html, body").animate({
        scrollTop: $("#three").offset().top - 80
    }, 400);
});
