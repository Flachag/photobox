function createLightbox(image) {
    let content = $('#content');
    let lightbox = $('#lightbox');
    content.html('<img src="' + image + '" />');
    if (lightbox.length > 0) {
        content.html('<img src="' + image + '" />');
    } else {
        lightbox = '<div id="lightbox"><p>Click to close</p><div id="content"><img src="' + image +'" /></div></div>';
        $('body').append(lightbox);
    }
    $('#lightbox').on('click', function() {
        $('#lightbox').hide();
    });
}

export function showLightbox(image) {
    createLightbox(image);
    $('#lightbox').show();
}