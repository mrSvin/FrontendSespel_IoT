function hide_dropdown_content_outside_click() {
    $(document).click( function(e){ // событие клика по веб-документу
        var div = $( ".dropdown" ); // тут указываем указание класса
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            $('.dropdown-content').css('display', 'none'); // то скрываем его
        }
    });
}
function click_avatar() {
    $( ".dropdown>input" ).click(function() { // кликаем изображению

        ($('.dropdown-content').css('display') == 'none') ?
            $('.dropdown-content').css('display', 'block') :
            $('.dropdown-content').css('display', 'none');

        hide_dropdown_content_outside_click(); // функция для закрытия меню при клике вне меню
    });
}
click_avatar();
