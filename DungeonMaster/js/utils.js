/**
 * Creates a new html element
 * @param tag Html tag of new element.
 * @param text Text inside of the new element.
 */
function makeHtml(tag, text) {
    var newElement = document.createElement(tag);
    newElement.innerHTML = text;
    return newElement;
}
/**
 * Sets the modal's opacity and visibility to 1
 */
function showModal(id) {
    $('modal-parent').css({
        'opacity': '1',
        'visibility': 'visible'
    });
    $('#' + id).css({
        'opacity': '1',
        'visibility': 'visible'
    });
}
/**
 * Sets the modal's opacity and visibility to 0
 */
function hideModal(id) {
    $('modal-parent').css({
        'opacity': '0',
        'visibility': 'hidden'
    });
    $('#' + id).css({
        'opacity': '0',
        'visibility': 'hidden'
    });
}
/**
 * @returns A random int in the range [min, max)
 * @param min Lower bound
 * @param max Upper bound
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//# sourceMappingURL=utils.js.map