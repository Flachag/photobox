import {init, firstLoad, next, prev} from "./gallery.js";

$(function () {
    init(1);
    $('#load').on('click', function () {
        firstLoad();
    });

    $('#next').on('click', function(){
        next();
    });

    $('#prev').on('click', function(){
        prev();
    });
});

