var mar_top = localStorage.getItem('mar_top');
var mar_left = localStorage.getItem('mar_left');
var bground = localStorage.getItem('bground');
var place_img = localStorage.getItem('place_img');

function uf5220 (){
    mar_top = -115;
    mar_left = 875;
    bground = 'url(../images/UVF_5220.png)';
    place_img = "../images/ii_ploshadka.png";
    // Изменения значений

    window.localStorage['mar_top'] = mar_top;
    window.localStorage['mar_left'] = mar_left;
    window.localStorage['bground'] = bground;
    window.localStorage['place_img'] = place_img;
    // Сохранение значений



};

function progress (){
    mar_top = -105;
    mar_left = 494;
    bground = 'url(../images/progress.png)';
    place_img = "../images/ii_ploshadka.png";

    window.localStorage['mar_top'] = mar_top;
    window.localStorage['mar_left'] = mar_left;
    window.localStorage['bground'] = bground;
    window.localStorage['place_img'] = place_img;

};