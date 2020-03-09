function next() {

}

function prev() {

}

function updateLightbox(image) {
    let content = $('#content');
    $('img', content).attr({
        src: image
    });
}

export function showLightbox(image) {
    updateLightbox(image);
    $('#lightbox').show();
}