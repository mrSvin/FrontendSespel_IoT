var back_color = "#f2f6f8"; // основной цвет фона(и цвет текста кнопок обновить и выход)
var text_color = "#333333"; // основной цвет текста
// var text_color_gray = "#545050"; // цвет для роли пользователя старый
var drop_down_line = '#c9cbd0'; // цвет линии разделения в выпадающем меню
var header_color = '#2461db'; // цвет шапки
var nav_menu_color1 = '#3a6fdb';// цвета навигационных меню
var nav_menu_color2 = '#D43737';// цвета навигационных меню при наведении
var nav_menu_color3 = '#F36262';// цвет правой стенки навигационного меню
var sutoch_butt = '#6793d6'; // цвет фона выделенной кнопки месяца
var knopki = '#4f759b'; // цвета кнопок обновить и выход
var calen_1_color = '#555555'; // текст в календаре
var calen_3_color = '#cccccc'; // рамка вокруг кнопки календаря
var calen_4_color = '#eeeeee'; // фон вокруг кнопки календаря
var hicharts_color_3 = '#666666'; // графики цвет надписей наименования
var hicharts_color_4 = '#999999'; // графики цвет тени легенды количества операций
var hicharts_color_5 = '#e6e6e6'; // графики цвет линий в графиках
var mesto_personal_color = '#756e6e'; // цвета надписи место и персонал
var table_color_1 = '#0C213B'; // градиентые цвета таблицы
var table_color_3 = '#d1e6f6'; // градиентые цвета таблицы

var grafik_phone = '#f2f6f8';
var legend_color = '#f2f6f8';

// Переменные для темной темы
var back_color_black = "#161821"; // основной цвет фона(и цвет текста кнопок обновить и выход)
var text_color_black = "#83addd"; // основной цвет текста
// var text_color_gray_black = "#545050"; // цвет для роли пользователя старый
var drop_down_line_black = '#cccccc'; // цвет линии разделения в выпадающем меню
var header_color_black = '#161821'; // цвет шапки
// var nav_menu_color1_black = '#26272c';// цвета навигационных меню
// var nav_menu_color2_black = '#696161';// цвета навигационных меню при наведении
// var nav_menu_color3_black = '#000000';// цвет правой стенки навигационного меню
// var sutoch_butt_black = '#052467'; // цвет фона выделенной кнопки месяца
var knopki_black = '#83addd'; // цвета кнопок обновить и выход
var calen_1_color_black = '#b3b8be'; // текст в календаре
var calen_3_color_black = '#83addd'; // рамка вокруг кнопки календаря
var calen_4_color_black = '#83addd'; // фон вокруг кнопки календаря
var hicharts_color_3_black = '#b3b8be'; // графики цвет надписей наименования
var hicharts_color_4_black = '#83addd'; // графики цвет тени легенды количества операций
var hicharts_color_5_black = '#83addd'; // графики цвет линий в графиках
var mesto_personal_color_black = '#b3b8be'; // цвета надписи место и персонал
var table_color_1_black = "#cec7c7"; // градиентые цвета таблицы
var table_color_3_black = '#83addd'; // градиентые цвета таблицы

var grafik_phone_black = '#161821';
var legend_color_black = '#b3b8be';

var nav_menu_col1 = "#14b2f3";
var nav_menu_col2 = "#1aaae5";
var nav_menu_col3 = "#e0f7fe";
var nav_menu_col4 = "#000";


function light_theme_button() {
    $('.slider').attr('style','position: absolute;');
    $('.slider').css('top', '0');
    $('.slider').css('left', '0');
    $('.slider').css('right', '0');
    $('.slider').css('bottom', '0');
    $('.slider').css('background-color', 'rgb(204, 204, 204)');
    $('.slider').css('-webkit-box-shadow', '0px 0px 3px 1px rgb(204, 204, 204)');

    $('.slider_before').attr('style','position: absolute;');
    $('.slider_before').css('content', ';');
    $('.slider_before').css('height',  '25px');
    $('.slider_before').css('width', '60px');
    $('.slider_before').css('left', '0px');
    $('.slider_before').css('bottom', '0px');
    $('.slider_before').css('background-color', '#fff');
    $('.slider_before').css('-webkit-transition', '.4s');

    $('.slider.round, .slider_before.round_before').css('border-radius', '34px');
}

function dark_theme_button() {
    $('.slider').attr('style','position: absolute;' +
        ' top: 0; left: 0; right: 0; bottom: 0;' +
        ' background-color: black;' +
        ' -webkit-box-shadow: 0px 0px 2px 1px #2d2c2c;');


    $('.slider_before').attr('style','position: absolute;' +
        ' content: "";' +
        ' height: 25px;' +
        ' width: 60px;' +
        ' left: 0px;' +
        ' bottom: 0px;' +
        ' -webkit-transition: .4s; background-color: #231f2a;' +
        ' -webkit-transform: translateX(63px);' +
        ' -ms-transform: translateX(63px);' +
        ' transform: translateX(63px);');
    $('.slider.round, .slider_before.round_before').css('border-radius', '34px');
}


// Определения функций
//back_color: #fff; header_color: #2461db; text_color: #333333; knopki: #4f759b;
function backgroundes(back_color, header_color, text_color, knopki){
    $('body').attr("style", "background-color:" + back_color + "; color:" + text_color); // цвет фона и основной цвет текста
    // $(".hr, #menu_ul").attr("style", 'background-color:' + header_color + ';'); // цвет шапки
    $('.follow').attr('style','color:' + back_color + '; background: ' + knopki +'; font-size: 145%; margin: 19px 0px;'); // кнопки обновить и выход, цвет текста внутри кнопок соответствует цвету фона
}

//text_color: #333333; drop_down_line: #e8eaed; back_color: #fff;
function drop_content_colors(text_color, drop_down_line, back_color, mail_color){
    $('.dropdown-content').attr('style','background:' + back_color +'; float: right; text-align: center; box-shadow: 0px 3px 6px 0px' + text_color + ';'); // цвет выпадающего меню
    $('#role_vision').attr('style','color:' + text_color + '; font-size: 14px;'); // цвет роли пользователя
    $('.dropdown-content > li').attr('style','color:' + text_color + ";"); // цвет имени польвателя
    $('.dropdown-content > p').attr('style','color:' + mail_color + '; font-size: 14px;'); // цвет почты
    $('.dropdown-content > div').attr('style',' display: block; border-bottom: 1px solid' + drop_down_line + '; margin-bottom: 5px; line-height: normal;'); // цвет линии разделения кнопки администрации
    $('.div_login_mail > p').attr('style',' color:' + mail_color + ';font-size: 12px;'); // цвет линии разделения кнопки администрации
}

// nav_menu_color1: #3a6fdb; nav_menu_color2: #D43737; nav_menu_color3: #F36262; back_color: #fff; sutoch_butt: #6793d6;
// function nav_menu(nav_menu_color1, nav_menu_color2, nav_menu_color3, back_color, sutoch_butt) {
//     $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").attr('style','background-color:' + nav_menu_color1 + '; border-right: 1px solid' + nav_menu_color3 + ';'); // цвета навигационных меню и рамки
//     $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").hover(function() {
//         $(this).css("background-color",nav_menu_color2);
//     }, function(){
//         $(this).css("background-color", nav_menu_color1);
//     });
//
//     $('.menu-color').attr('style','background-color:' + nav_menu_color2 + '!important; border-right: 1px solid' + nav_menu_color3 + ';'); // светлая тема кнопка текущей позиции и темные границы в меню
//     $(".menu-color").hover(function() {
//         $(this).attr('style','background-color:' + nav_menu_color2 + '!important; border-right: 1px solid' + nav_menu_color3 + ';'); // Защита, чтоба кнопка текущей позиции оставалась светлова цвета при наведении
//     });
//
//     $('.btn_change').css('background-color' , back_color); // кнопки суточных
//     $('.btn_change').css('borderColor' , sutoch_butt); // и месячных отчетов
// }




function nav_menu(nav_menu_col1, nav_menu_col2, nav_menu_col3, nav_menu_col4) {
    $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").attr('style','color:' + nav_menu_col3 + ';'); // цвета навигационных меню и рамки
    $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").hover(function() {
        $(this).attr('style', 'color:' + nav_menu_col1 +'; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;');
    }, function(){
        $(this).attr('style','color:' + nav_menu_col3 + '!important; text-shadow: none;');
    });

    $('.menu-color').attr('style','color:' + nav_menu_col2 + '!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;'); // светлая тема кнопка текущей позиции и темные границы в меню
    $(".menu-color").hover(function() {
        $(this).attr('style','color:' + nav_menu_col1 + ';');
    }, function(){
        $(this).attr('style','color:' + nav_menu_col2 + '!important;');
    });

    $('.button_color').attr('style','color:' + nav_menu_col3 + '!important; '); // светлая тема кнопка текущей позиции и темные границы в меню
    $(".button_color").hover(function() {
        $(this).attr('style','color:' + nav_menu_col1 +'!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;');
    }, function(){
        $(this).attr('style','color:' + nav_menu_col3 + '; text-shadow: none;');
    });

    $('.button_color_active.button_color').attr('style','color:' + nav_menu_col2 + '!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;'); // светлая тема кнопка текущей позиции и темные границы в меню
    $(".button_color_active.button_color").hover(function() {
        $(this).attr('style','color:' + nav_menu_col1 + ';');
    }, function(){
        $(this).attr('style','color:' + nav_menu_col2 + '!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;');
    });

    $('.neo-line').attr('style',' background:' + nav_menu_col4 + '!important; box-shadow: 0px 0px 5px 3px' + nav_menu_col1 + ', inset 0px 0px 0px 0px' + nav_menu_col1 + '!important;'); // светлая тема кнопка текущей позиции и темные границы в меню
}


// calen_1_color: #555555; back_color: #fff; calen_3_color: #666666; calen_4_color: #eeeeee;
function calendar(calen_1_color ,back_color, calen_3_color, calen_4_color){
    $('.form-control').attr('style','color:' + calen_1_color +'; background:' + back_color + '; border: 1px solid' + calen_3_color + ';'); // форма заполнения даты
    $('.input-group-addon').attr('style','color:' + calen_1_color +'; background:' + calen_4_color +'; border: 1px solid ' + calen_3_color +';'); // кнопка календаря
}

// back_color: #fff; text_color: #333333; hicharts_color_3: #666666;, hicharts_color_4: #999999;, hicharts_color_5: #e6e6e6;
function hightcharts_colors(back_color, text_color, hicharts_color_3, hicharts_color_4, hicharts_color_5, grafik_phone, legend_color)
{
    $('.highcharts-background').attr('style','fill:' + grafik_phone +';'); // цвет фона графиков
    $('.highcharts-title').attr('style','color:' + text_color + '; font-size: 18px; fill:' + text_color + ';'); // название графиков

    $('.highcharts-axis-labels.highcharts-xaxis-labels > text').attr('style','fill:' + hicharts_color_3 + ';');  // надписи названий станков
    $('#container_sum_zagruzka .highcharts-axis-labels.highcharts-xaxis-labels > text, #container_kol_operations .highcharts-axis-labels.highcharts-xaxis-labels > text').attr('style','fill:' + hicharts_color_3 + ';font-size: 18px;'); // надписи названий станков для общей загрузки и количества операций
    $('.highcharts-legend-box').attr('style','fill:' + legend_color + ';'); // цвет поля легенды
    $('.highcharts-legend-box.highcharts-shadow').attr('style','stroke: ' + hicharts_color_4 + ';'); // цвет рамки легенды у количества операций
    $('.highcharts-axis.highcharts-yaxis > text').attr('style','fill:' + hicharts_color_3 + ';'); // цвет надписей первой оси
    $('.highcharts-axis-labels.highcharts-yaxis-labels > text').attr('style','fill:' +  hicharts_color_3 + ';'); // цвет надписей второй оси
    $('.highcharts-yaxis-grid >.highcharts-grid-line').attr('style','stroke:' + hicharts_color_5 + ';'); // цвета колонок
    $('.highcharts-axis-line').attr('style','stroke:' + hicharts_color_5 + ';'); // цвета осей x y
    $('.highcharts-button-box').attr('style',' fill:' + back_color + ';'); // цвета кнопки печати и тд
    $('.highcharts-pie-series > path').attr('style',' stroke:' + hicharts_color_3 + ';'); // обводка круглых диаграм
    $('.highcharts-pie-series > rect').attr('style',' stroke:' + hicharts_color_3 + ';'); // обводка кнопок круглых диаграмм
    $('.highcharts-point').attr('style','stroke:' + hicharts_color_3 + ';'); // обводка круглых кнопок
    $('.highcharts-point > rect').attr('style','stroke:' + hicharts_color_3 + ';'); // обводка диаграммы работа оборудования
}

// mesto_personal_color: #756e6e; back_color: #fff;
function mesto_personal(mesto_personal_color, back_color){
    $('.label_mesto').attr('style','color:' + mesto_personal_color + ';'); // надпись место
    $('.label_personal').attr('style','color:' + mesto_personal_color + ';'); // надпись персонал

    $(".icon_mesto").hover(function() { // свечение при наведении на место
        $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px' + back_color);
    }, function(){
        $(this).css('-webkit-box-shadow', 'none');
    });

    $(".icon_personal").hover(function() { // свечение при наведении на персонад
        $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px' + back_color);
    }, function(){
        $(this).css('-webkit-box-shadow', 'none');
    });
}

// table_color_1:#0C213B; back_color: #fff; table_color_3: #DCECF8;
function table_colors(table_color_1, back_color, table_color_3) {
    $('table').attr('style','text-shadow: none; color:' + table_color_1 + '; background: radial-gradient(farthest-corner at 50% 50%,' + back_color + ',' + table_color_3 + ');');
}

function dark(){
    if (count == 0) // условие светлой темы
    {
        $('.icon-logo').attr("src", "images/logo_black.png"); // картинка лого
        backgroundes(back_color, header_color, text_color, knopki); // Вызов функции для основных фонов
        drop_content_colors(text_color, drop_down_line, back_color, text_color); // Вызов функции для выпадающих меню
        // nav_menu(nav_menu_color1, nav_menu_color2, nav_menu_color3, back_color, sutoch_butt); // Вызов функции для меню навигации
        calendar(calen_1_color, back_color, calen_3_color,calen_4_color); // Вызов функции для календаря
        hightcharts_colors(back_color, text_color, hicharts_color_3, hicharts_color_4, hicharts_color_5, grafik_phone, legend_color); // Вызов функции для графиков
        mesto_personal(mesto_personal_color, back_color); // Вызов функции для надписей место и персонал
        table_colors(table_color_1, back_color, table_color_3); // Вызов функции для таблицы
        nav_menu(nav_menu_col1, nav_menu_col2, nav_menu_col4, nav_menu_col2 );
        light_theme_button();

        // $('header > ul > li').attr('style','color #fff;'); // цвет добро пожаловать пользователь исправить
        // $('#admin').attr('style','color: #ffffff; background: #ff3b3b; font-size: 12px; margin-bottom: 25px;'); // кнопка админа не могу
        // $('.highcharts-legend-item').attr('style','stroke: none; stroke-width: 0;'); // цвет надписей в легенде слишком сложно
        // $('.highcharts-legend-item > text').attr('style','fill: red; color: red; font-size:12px; font-weight:bold; '); // цвет надписей в легенде сбрасывается при наведении
    }
    else if (count == 1) // Темная тема активна ///////////////////////////////////////////////////////////////////////////////////////////////////
    {
        $('.icon-logo').attr("src", "images/logo_white.png"); // картинка лого
        document.getElementById('dark_button').checked = "checked"; // сохранение состояния темной темы для кнопки перелкючения темы.

        $('body').attr("style", "background-color: #111111; color: white"); // цвет фона тела и текста
        // $(".hr, #menu_ul").attr("style", 'background-color: #234C9D'); // цвет шапки

        backgroundes(back_color_black, header_color_black, text_color_black, knopki_black); // Вызов функции для основных фонов
        drop_content_colors(text_color_black, drop_down_line_black, back_color_black, hicharts_color_3_black); // Вызов функции для выпадающих меню
        // nav_menu(nav_menu_color1_black, nav_menu_color2_black, nav_menu_color3_black, back_color_black, sutoch_butt_black); // Вызов функции для меню навигации
        calendar(calen_1_color_black, back_color_black, calen_3_color_black, calen_4_color_black); // Вызов функции для календаря
        hightcharts_colors(back_color_black, text_color_black, hicharts_color_3_black, hicharts_color_4_black, hicharts_color_5_black, grafik_phone_black, legend_color_black); // Вызов функции для графиков
        mesto_personal(mesto_personal_color_black, back_color_black); // Вызов функции для надписей место и персонал
        table_colors(table_color_1_black, back_color_black, table_color_3_black); // Вызов функции для таблицы
        nav_menu(nav_menu_col1, nav_menu_col2, nav_menu_col3);
        dark_theme_button();
        $('table').attr('style','text-shadow: 1px 2px 3px white, 0 0 2em black, 0 0 0.1em white; color: black; background: radial-gradient(farthest-corner at 50% 50%, white, #808488);');
    }

}


