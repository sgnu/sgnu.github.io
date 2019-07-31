$(window).scroll(() => {
    const wScroll = $(this).scrollTop();
    const vh = $(this).height() / 100;

    if (wScroll > 50 * vh + 48) {
        $('nav').css('background', 'var(--white)');
        $('nav *').css('color', 'var(--blue)');
    } else {
        $('nav').css('background', 'var(--blue)');
        $('nav *').css('color', 'var(--white)');
    }
})

$('#headerName').click(() => {
    $('html, body').animate({
        'scrollTop': 0
    }, 500);
})