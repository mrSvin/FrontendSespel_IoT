function show_dropdown_content() {
    $('.dropdown-content').css('display', 'block'); // показать меню
    $('.dropdown-content').css('top', '50px');
    $('.dropdown-content').css('right', '10px');
    $('.dropdown-content').css('opacity', '1'); //  убрать прозрачность
    $('.dropdown-content').css('z-index', '5'); // на передний план
}

function hide_dropdown_content() {
    $('.dropdown-content').css('display', 'none'); // скрыть меню
    $('.dropdown-content').css('opacity', '0'); // полностью прозрачный
}

function hide_dropdown_content_outside_click() {
    $(document).click( function(e){ // событие клика по веб-документу
        var div = $( ".dropdown" ); // тут указываем указание класса
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            hide_dropdown_content(); // то скрываем его
        }
    });
}


function click_avatar() {
    $( ".dropdown>input" ).click(function() { // кликаем изображению

        ($('.dropdown-content').css('display') == 'none') ?  show_dropdown_content() : hide_dropdown_content();

        hide_dropdown_content_outside_click(); // функция для закрытия меню при клике вне меню
    });


}

click_avatar();