import {request, initLoader} from "./photoloader.js";

let id;

function insert(data, base_url) {
    if(data.photos) {
        data.photos.forEach(function (photo) {
            let card = $('<div class="col-md-4"><div class="card mb-4 shadow-sm"><img class="card-img-top" height="225"></div></div>');
            $('img', card).attr({
                alt: photo.photo.titre,
                title: photo.photo.titre,
                src: base_url + photo.photo.thumbnail.href
            });
            $('.row').append(card);
        });
    }
}

export function load() {
    let base_url = "https://webetu.iutnc.univ-lorraine.fr";
    initLoader(base_url);
    request('/www/canals5/photobox/photos').then(function (response) {
        insert(response.data, base_url);
    });
}

export function init(i) {
    id = i;
}