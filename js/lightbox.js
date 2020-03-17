import {request, initLoader} from "./photoloader.js";
let actualImageId;
let maxId;
let minId;

function getInfoImage(imageId) {
    let base_url = "https://webetu.iutnc.univ-lorraine.fr";
    initLoader(base_url);
    request('/www/canals5/photobox/photos/' + imageId).then(function (response) {
        showInfoImage(response.data);
    });
}

function getCommentsImage(imageId) {
    let base_url = "https://webetu.iutnc.univ-lorraine.fr";
    initLoader(base_url);
    request('/www/canals5/photobox/photos/' + imageId + "/comments").then(function (response) {
        showCommentsImage(response.data);
    });
}

function showCommentsImage(data) {
    let node = $('#comments');
    node.empty();
    $.each(data.comments, function (index, value) {
        node.append('(#' + value.id + ') ' + value.pseudo + ' le <i>' + value.date + '</i> : <b>' + value.titre + '</b> - ' + value.content + "<br>");
    });
}

function showInfoImage(data) {
    let node = $('#infos');
    node.empty();
    $.each(data.photo, function (index, value) {
        if(typeof value !== "object")
        node.append('<span class="badge badge-primary mr-1">'+ index +': '+ value +'</span>')
    });
}

function updateLightbox(image) {
    $('#img').attr({
        src: image
    });
    getInfoImage(actualImageId);
    getCommentsImage(actualImageId)
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