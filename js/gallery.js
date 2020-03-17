import {request, initLoader} from "./photoloader.js";
import {showLightbox} from "./lightbox.js";

let id;
let offset;
let max;
let data;

function insert(base_url) {
    if(data.photos) {
        data.photos.sort(function (a,b) {
            let res = 0;
            if(a.photo.id > b.photo.id) {
                res = -1;
            } else {
                res = 1;
            }
            return res;
        });
        let maxId = data.photos[0].photo.id, minId = data.photos[0].photo.id;
        data.photos.forEach(function (photo) {
            if(photo.photo.id < minId) {
                minId = photo.photo.id;
            }
            if(photo.photo.id > maxId) {
                maxId = photo.photo.id;
            }
        });
        id.empty();
        data.photos.forEach(function (photo) {
            let card = $('<div class="col-md-4"><div class="card mb-4 shadow-sm" id="'+ photo.photo.id +'"><img class="card-img-top" height="225"></div></div>');
            $('img', card).attr({
                alt: photo.photo.titre,
                title: photo.photo.titre,
                src: base_url + photo.photo.thumbnail.href,
                'data-img': base_url + photo.photo.original.href
            });
            card.find('img').on('click', function () {
                showLightbox(photo.photo.id, minId, maxId);
            });
            id.append(card);
        });
    }
}

export function firstLoad(){
    $('#load').attr('disabled', true);
    $('#next').attr('disabled', false);
    $('#prev').attr('disabled', false);
    load();
}

function setMax(link){
    let url = new URL(link);
    max = url.searchParams.get("offset");
}

function load(o = 0) {
    offset = o;
    let prev = $('#prev');
    let next = $('#next');
    switch (offset) {
        case 0:
            prev.attr('disabled', true);
            break;
        case max:
            next.attr('disabled', true);
            break;
        default:
            next.attr('disabled', false);
            prev.attr('disabled', false);
            break;
    }
    let base_url = "https://webetu.iutnc.univ-lorraine.fr";
    initLoader(base_url);
    request('/www/canals5/photobox/photos/?offset='+o+'&size=9').then(function (response) {
        data = response.data;
        insert(base_url);
        setMax(base_url+response.data.links.last.href)
    });
}

export function next(){
    let res = offset + 9;
    if(res>=max){
        offset=max;
    } else {
        offset = res;
    }
    load(offset);
}

export function prev(){
    let min = offset - 9;
    if(min <= 0){
        offset = 0;
    } else {
        offset = min;
    }
    load(offset);
}

export function init() {
    id = $('#gallery');
}