let actualImageId;
let maxId;
let minId;

function updateLightbox(image) {
    let content = $('#content');
    $('img', content).attr({
        src: image
    });
}

function change(image) {
    if(image > maxId) {
        actualImageId = minId;
    } else if(image < minId) {
        actualImageId = maxId;
    } else {
        actualImageId = image;
    }
    let node = $('#' + actualImageId + '> img');
    updateLightbox(node.attr('data-img'));
    $('#lightbox').show();
}

export function nextLightbox() {
    let i = actualImageId - 1;
    let testExists = $('#' + i);
    while(i > minId && !testExists.length) {
        i -= 1;
        testExists = $('#' + i)
    }
    change(i);
}

export function prevLightbox() {
    let i = actualImageId + 1;
    let testExists = $('#' + i);
    while(i < maxId && !testExists.length) {
        console.log(i);
        i += 1;
        testExists = $('#' + i)
    }
    change(i);
}

export function showLightbox(image, min, max) {
    minId = min;
    maxId = max;
    change(image);
}