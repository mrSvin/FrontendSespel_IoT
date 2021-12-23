var mar_top;
var mar_left;
var bground;
var place_img;

$( "#id_uf5220" ).click(function() {
    alert("Функция отработала")
    mar_top = -106;
    mar_left = 780;
    bground = 'url(../images/apec.png)';
    place_img = "../images/ii_ploshadka.png";
});

function uf5220 (){
    alert("Функция 2 отработала")
    mar_top = -106;
    mar_left = 780;
    bground = 'url(../images/apec.png)';
    place_img = "../images/ii_ploshadka.png";
    console.log(mar_top,mar_left, bground, place_img);
    ready ();
};


function ready () {
    $(document).ready(function(){
        $(".icon").css('marginTop', mar_top);
        $(".icon").css('marginLeft', mar_left);
        $('.icon').css('backgroundImage', bground)
        $(".place_img").attr("src", place_img);
        $(".pulse2").css('marginTop', mar_top - 10);
        $(".pulse2").css('marginLeft', mar_left - 10);
        alert("Внутри")
    });
    alert("Снарутжи")
    console.log(mar_top,mar_left, bground, place_img);
};
