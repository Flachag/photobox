let actualImageId;
let maxId;
let minId;

export function nextLightbox() {
    console.log("next");
    let i = actualImageId - 1;
    let testExists = $('#' + i);
    while(i > minId && !testExists.length) {
        console.log(i);
        i -= 1;
        testExists = $('#' + i)
    }
    change(i);
}

export function prevLightbox() {
    console.log("prev");
    let i = actualImageId + 1;
    let testExists = $('#' + i);
    while(i < maxId && !testExists.length) {
        console.log(i);
        i += 1;
        testExists = $('#' + i)
    }
    change(i);
}

function updateLightbox(image, next, prev) {
    let content = $('#content');
    $('img', content).attr({
        src: image,
        "data-next": next,
        "data-prev": prev
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
    updateLightbox(node.attr('data-img'), node.attr('data-next'), node.attr('data-prev'));
    $('#lightbox').show();
}

export function showLightbox(image, min, max) {
    minId = min;
    maxId = max;
    change(image);
}