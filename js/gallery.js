import {request, initLoader} from "./photoloader.js";

let id;

function insert(data) {
    if(data.photos) {
        data.photos.forEach(function (photo) {
            let card = $('<div class="col-md-4"><div class="card mb-4 shadow-sm"><img class="card-img-top" height="225"></div></div>');
            $('img', card).attr({
                alt: photo.photo.titre,
                title: photo.photo.titre,
                src: photo.photo.thumbnail.href
            });
            $('.row').append(card);
        });
    }
}

export function load() {
    initLoader('https://webetu.iutnc.univ-lorraine.fr');
    request('/www/canals5/photobox/photos').then(function (response) {
        insert(response.data);
    });
}

export function init(i) {
    id = i;
}