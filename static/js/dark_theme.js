// Переменные отвечающие за цвета

var back_color = "#f2f6f8"; // основной цвет фона(и цвет текста кнопок обновить и выход) +
var drop_down_line = '#c9cbd0'; // цвет линии разделения в выпадающем меню +
var calen_3_color = '#cccccc'; // рамка вокруг кнопки календаря +
var calen_4_color = '#eeeeee'; // фон вокруг кнопки календаря +

var select_color_2 = '#2c3e50'
var select_color_3 = '#34495e'

var text_color = "#333333"; // основной цвет текста +
var calen_1_color = '#756e6e'; // текст в календаре +

var knopki = '#4f759b'; // цвета кнопок обновить и выход
var nav_menu_col1 = "#14b2f3"; // цвет надписи в навигационном меню
var nav_menu_col2 = "#1aaae5"; // цвет надписи в навигационном меню при наведении

var good_blue = "#168aff"; // приятный синий
var good_blue_black = "#0c66c1"; // приятный синий темнее

var table_color_1 = '#0C213B'; // градиентые цвета таблицы
var table_color_3 = '#d1e6f6'; // градиентые цвета таблицы
var table_color_4 = '#223362'; // цвета таблицы

var back_color_black = "#161821"; // основной цвет фона(и цвет текста кнопок обновить и выход)
var text_color_black = "#83addd"; // основной цвет текста
var mesto_personal_color_black = '#b3b8be'; // цвета надписи место и персонал

var home_phone_light = 'url(images/white_lines.jpg)'; // светлый фон в меню home
var home_phone_dark = 'url(images/line.jpg)'; // темный фон в меню home

var login_phone_dark = 'url(images/background_login_dark.jpg)';
var login_phone_light = 'url(images/background_login_light.jpg)';

var opacity_login_light = '.5';
var opacity_login_dark = '.7';


function panel_admin(back_color, border_color, table_color_1, table_color_2, table_itog) {
    $('.header-div').attr("style", "background-color:" + back_color + ';'); // цвет фона и основной цвет текста
    $('#table_users th, #table_users tr , #table_users td').attr("style", 'outline: 1px solid' + border_color + '!important; border-color:' + border_color + '!important;');
    $('.table_energy th, .table_energy tr , .table_energy td').attr("style", 'outline: 1px solid' + border_color + '!important; border-color:' + border_color + '!important;');
    $('.table_energy > thead > tr > th:nth-of-type(1), .table_energy > tbody > tr > td:nth-of-type(1)').attr("style", `background-color: ${table_color_2}!important;` + 'outline: 1px solid' + border_color + '!important');
    $('.table_energy > thead > tr > th:nth-of-type(n+2)').attr("style", `background-color: ${table_color_1};` + 'outline: 1px solid' + border_color + '!important;' + `color: ${border_color}`);
    $('.table_general th, .table_general tr , .table_general td').attr("style", 'outline: 1px solid' + border_color + '!important; border-color:' + border_color + '!important;');
    $('.table_general th').attr('style', 'background-color: ' + table_color_2 + '!important; outline: 1px solid' + border_color + '!important; border-color:' + border_color + '!important;');
    $('.table_energy > thead > tr > th:nth-last-child(1)').attr('style', 'background-color: ' + table_itog + '!important; outline: 1px solid' + border_color + '!important; border-color:' + border_color + '!important;');
    $('.tr-sticky').attr("style", 'outline: 1px solid' + border_color + '!important; border-color:' + border_color + '!important ;position: sticky; width: 100%; margin-top: 90px; top: 75px; z-index: 1;');


}

function login_background(phone, color, opacity, h2color) {
    $('.login-body').attr("style", "background:" + phone + "no-repeat center center fixed; background-size: cover; background-repeat: no-repeat;"); // цвет фона и основной цвет текста
    $('.login-body legend').attr("style", "color:" + color + ";"); // цвет фона и основной цвет текста
    $('.alert').attr("style", "color:" + color + ";"); // цвет фона и основной цвет текста
    $('.login-box').css('background', 'rgba(0,0,0,' + opacity + ')');
    $('.login-box h2').css('color', h2color);

}

function home_background(phone, text_color, ramka, grad_col1, grad_col2, shadow_color, text_color) {
    $('.home-body').attr("style", "background:" + phone + "no-repeat center center fixed; background-size: cover; background-repeat: no-repeat; color:" + text_color + "!important;"); // цвет фона и основной цвет текста
    $('.icon-container').attr("style", 'box-shadow: 0 0 0.5px 0.5px' + ramka + ' inset; background: linear-gradient(45deg,' + grad_col1 + ',' + grad_col2 + ');');

    $(".container-home").hover(function () {
        $('h2', this).attr('style', 'text-shadow: 1px 0 3px' + shadow_color + '!important; color:' + text_color + ';');
    }, function () {
        $('h2', this).attr('style', 'text-shadow: none; color:' + text_color + ';');
    });

}

function light_theme_button() {
    $('.slider').attr('style', 'position: absolute;');
    $('.slider').css('top', '0');
    $('.slider').css('left', '0');
    $('.slider').css('right', '0');
    $('.slider').css('bottom', '0');
    $('.slider').css('background-color', 'rgb(204, 204, 204)');
    $('.slider').css('-webkit-box-shadow', '0px 0px 3px 1px rgb(204, 204, 204)');

    $('.slider_before').attr('style', 'position: absolute;');
    $('.slider_before').css('content', ';');
    $('.slider_before').css('height', '25px');
    $('.slider_before').css('width', '60px');
    $('.slider_before').css('left', '0px');
    $('.slider_before').css('bottom', '0px');
    $('.slider_before').css('background-color', '#fff');
    $('.slider_before').css('-webkit-transition', '.4s');
    $('.slider.round, .slider_before.round_before').css('border-radius', '34px');

}

function dark_theme_button() {
    $('.slider').attr('style', 'position: absolute;' +
        ' top: 0; left: 0; right: 0; bottom: 0;' +
        ' background-color: black;' +
        ' -webkit-box-shadow: 0px 0px 2px 1px #2d2c2c;');


    $('.slider_before').attr('style', 'position: absolute;' +
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

function backgroundes(back_color, text_color, knopki) {
    $('body').attr("style", "background-color:" + back_color + "; color:" + text_color + '!important;'); // цвет фона и основной цвет текста
    $('.follow').attr('style', 'color:' + back_color + '; background: ' + knopki + '; font-size: 145%; margin: 19px 0px;'); // кнопки обновить и выход, цвет текста внутри кнопок соответствует цвету фона
    // $('h1, h2, h3').attr("style", "color:" + text_color + '!important;'); // цвет текста заголовков
}

function drop_content_colors(text_color, drop_down_line, back_color, mail_color) {
    $('.dropdown-content').css('background', back_color); // цвет выпадающего меню
    $('.dropdown-content').css('box-shadow', '0px 3px 6px 0px' + text_color);
    $('#role_vision').attr('style', 'color:' + text_color + '!important; font-size: 14px;'); // цвет роли пользователя
    $('.dropdown-content > li').attr('style', 'color:' + text_color + '!important;'); // цвет имени польвателя
    $('.dropdown-content > p').attr('style', 'color:' + mail_color + '!important; font-size: 14px;'); // цвет почты
    $('.dropdown-content > div').attr('style', ' display: block; border-bottom: 1px solid' + drop_down_line + '; margin-bottom: 5px; line-height: normal;'); // цвет линии разделения кнопки администрации
    $('.div_login_mail > p').attr('style', 'color:' + mail_color + '!important; font-size: 12px;'); // цвет линии разделения кнопки администрации
}

function nav_menu(nav_menu_col1, nav_menu_col2, nav_menu_col3, back_color_black) {
    $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").attr('style', 'color:' + nav_menu_col3 + ';'); // цвета навигационных меню и рамки
    $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").hover(function () {
        $(this).attr('style', 'color:' + nav_menu_col1 + '; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;');
    }, function () {
        $(this).attr('style', 'color:' + nav_menu_col3 + '!important; text-shadow: none;');
    });

    $('.menu-color').attr('style', 'color:' + nav_menu_col2 + '!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;'); // светлая тема кнопка текущей позиции и темные границы в меню
    $(".menu-color").hover(function () {
        $(this).attr('style', 'color:' + nav_menu_col1 + '!important;');
    }, function () {
        $(this).attr('style', 'color:' + nav_menu_col2 + '!important;');
    });

    $('.button_color').attr('style', 'color:' + nav_menu_col3 + '!important; '); // светлая тема кнопка текущей позиции и темные границы в меню
    $(".button_color").hover(function () {
        $(this).attr('style', 'color:' + nav_menu_col1 + '!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;');
    }, function () {
        $(this).attr('style', 'color:' + nav_menu_col3 + '!important; text-shadow: none;');
    });

    $('.button_color_active.button_color').attr('style', 'color:' + nav_menu_col2 + '!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;'); // светлая тема кнопка текущей позиции и темные границы в меню
    $(".button_color_active.button_color").hover(function () {
        $(this).attr('style', 'color:' + nav_menu_col1 + '!important;');
    }, function () {
        $(this).attr('style', 'color:' + nav_menu_col2 + '!important; text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px -1px black, 1px 1px 8px' + nav_menu_col2 + '!important;');
    });

    $('.neo-line').attr('style', 'background:' + back_color_black + '!important; box-shadow: 0px 0px 5px 3px' + nav_menu_col1 + ', inset 0px 0px 0px 0px' + nav_menu_col1 + '!important;'); // светлая тема кнопка текущей позиции и темные границы в меню
}

function calendar(calen_1_color, back_color, calen_3_color, calen_4_color) {
    $('.form-control').attr('style', 'color:' + calen_1_color + '; background:' + back_color + '; border: 1px solid' + calen_3_color + ';'); // форма заполнения даты
    $('.input-group-addon').attr('style', 'color:' + calen_1_color + '; background:' + calen_4_color + '; border: 1px solid ' + calen_3_color + ';'); // кнопка календаря
}

function selectPower(select_1_color, select_2_color, select_3_color, calen_3_color) {
    $('.select select').attr('style', 'color:' + select_1_color + '; background-color:' + select_2_color + '; border: 1px solid' + calen_3_color + ';'); // форма заполнения даты
    $('.selectAfter').attr('style', 'background-color:' + select_3_color + '; border: 1px solid' + calen_3_color + ';'); // кнопка select
}

function hightcharts_colors(back_color, text_color, calen_1_color, calen_3_color, legend_color, line_special) {
    $('.highcharts-background').attr('style', 'fill:' + back_color + ';'); // цвет фона графиков
    $('.highcharts-title').attr('style', 'color:' + text_color + '; font-size: 18px; fill:' + text_color + ';'); // название графиков
    $('.highcharts-axis-labels.highcharts-xaxis-labels > text').attr('style', 'fill:' + calen_1_color + ';');  // надписи названий станков
    $('#container_sum_zagruzka .highcharts-axis-labels.highcharts-xaxis-labels > text').attr('style', 'fill:' + calen_1_color + ';font-size: 18px;'); // надписи названий станков для общей загрузки и количества операций
    $('#container_kol_operations .highcharts-axis-labels.highcharts-xaxis-labels > text').attr('style', 'fill:' + calen_1_color + ';font-size: 15px;'); // надписи названий станков для общей загрузки и количества операций
    $('.highcharts-legend-box').attr('style', 'fill:' + legend_color + ';'); // цвет поля легенды
    $('.highcharts-legend-box.highcharts-shadow').attr('style', 'stroke: ' + calen_1_color + ';'); // цвет рамки легенды у количества операций
    $('.highcharts-axis.highcharts-yaxis > text').attr('style', 'fill:' + calen_1_color + ';'); // цвет надписей первой оси
    $('.highcharts-axis-labels.highcharts-yaxis-labels > text').attr('style', 'fill:' + calen_1_color + ';'); // цвет надписей второй оси
    $('.highcharts-yaxis-grid >.highcharts-grid-line').attr('style', 'stroke:' + calen_3_color + ';'); // цвета колонок
    $('.highcharts-axis-line').attr('style', 'stroke:' + calen_3_color + ';'); // цвета осей x y
    $('.highcharts-button-box').attr('style', ' fill:' + back_color + ';'); // цвета кнопки печати и тд
    $('.highcharts-pie-series > path').attr('style', ' stroke:' + calen_1_color + ';'); // обводка круглых диаграм
    $('.highcharts-pie-series > rect').attr('style', ' stroke:' + calen_1_color + ';'); // обводка кнопок круглых диаграмм
    $('.highcharts-point').attr('style', 'stroke:' + calen_1_color + ';'); // обводка круглых кнопок
    $('.highcharts-point > rect').attr('style', 'stroke:' + calen_1_color + ';'); // обводка диаграммы работа оборудования

    $("path[aria-label*='Заданное давление']").attr('style', `stroke: ${line_special}!important;`);
    $("path[aria-label*='Температура']").attr('style', `stroke: ${line_special}!important;`);
}

function mesto_personal(calen_1_color, back_color) {
    $('.label_mesto').attr('style', 'color:' + calen_1_color + ';'); // надпись место
    $('.label_personal').attr('style', 'color:' + calen_1_color + ';'); // надпись персонал
    $('.label_error').attr('style', 'color:' + calen_1_color + ';'); // надпись персонал
    $('.label_power').attr('style', 'color:' + calen_1_color + ';'); // надпись персонал
    $('.label_programTime').attr('style', 'color:' + calen_1_color + ';'); // надпись персонал

    $(".icon_mesto").hover(function () { // свечение при наведении на место
        $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px' + back_color);
    }, function () {
        $(this).css('-webkit-box-shadow', 'none');
    });

    $(".icon_personal").hover(function () { // свечение при наведении на персонад
        $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px' + back_color);
    }, function () {
        $(this).css('-webkit-box-shadow', 'none');
    });

    $(".icon_error").hover(function () { // свечение при наведении на персонад
        $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px' + back_color);
    }, function () {
        $(this).css('-webkit-box-shadow', 'none');
    });

    $(".icon_power").hover(function () { // свечение при наведении на персонад
        $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px' + back_color);
    }, function () {
        $(this).css('-webkit-box-shadow', 'none');
    });

    $(".icon_programTime").hover(function () { // свечение при наведении на место
        $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px' + back_color);
    }, function () {
        $(this).css('-webkit-box-shadow', 'none');
    });
}

function table_colors_white(table_color_1, back_color, table_color_3) {
    $('table').attr('style', 'text-shadow: none; color:' + table_color_1 + '; background: radial-gradient(farthest-corner at 50% 50%,' + back_color + ',' + table_color_3 + ');');
    $('#vrs2_general > thead > tr > th:nth-child(2)').attr('style', 'text-shadow: none; color:' + table_color_1 + '; background: radial-gradient(farthest-corner at 50% 50%,' + back_color + ',' + table_color_3 + ')!important; outline: 0px solid #d1e6f6!important;');
}

function table_colors_black() {
    $('table').attr('style', 'text-shadow: 1px 2px 3px white, 0 0 2em black, 0 0 0.1em white; color: black; background: radial-gradient(farthest-corner at 50% 50%, white, #808488);');
    $('#vrs2_general > thead > tr > th:nth-child(2)').attr('style', 'text-shadow: 1px 2px 3px white, 0 0 2em black, 0 0 0.1em white; color: black; background: radial-gradient(farthest-corner at 50% 50%, white, #808488)!important; outline: 0px solid white!important;');
    $('#table_alarm').attr('style', 'text-shadow: 1px 2px 3px white, 0 0 2em black, 0 0 0.1em white; color: black; background: radial-gradient(farthest-corner at 25% 50%, white, #808488);');
}


function dark_theme() {
    dark_theme_state = 1
    if (dark_theme_state == 0) // условие светлой темы
    {
        $('.icon-logo-admin').attr("src", "../images/logo_black.png"); // картинка лого для папок на уровень ниже
        $('.icon-logo').attr("src", "images/logo_black.png"); // картинка лого обычная
        $('.icon-alarm').attr("src", "../../images/logo_black.png"); // картинка для аварий
        panel_admin(back_color, back_color_black, table_color_3, knopki, good_blue);
        backgroundes(back_color, text_color, knopki); // Вызов функции для основных фонов
        drop_content_colors(text_color, drop_down_line, back_color, text_color); // Вызов функции для выпадающих меню
        calendar(calen_1_color, back_color, calen_3_color, calen_4_color); // Вызов функции для календаря
        selectPower(calen_1_color, back_color, calen_4_color, calen_3_color)
        hightcharts_colors(back_color, text_color, calen_1_color, calen_3_color, back_color, back_color_black); // Вызов функции для графиков
        mesto_personal(calen_1_color, back_color); // Вызов функции для надписей место и персонал
        nav_menu(nav_menu_col1, nav_menu_col2, back_color_black, nav_menu_col2); // навигационное меню
        light_theme_button(); // функция для кнопки смены темы на светлую
        table_colors_white(table_color_1, back_color, table_color_3); // Вызов функции для таблицы
        home_background(home_phone_light, text_color, calen_1_color, back_color, knopki, back_color_black, text_color);
        login_background(login_phone_light, text_color, opacity_login_light, back_color);
    } else if (dark_theme_state == 1) // Темная тема активна ///////////////////////////////////////////////////////////////////////////////////////////////////
    {
        $('.icon-logo-admin').attr("src", "../images/logo_white.png"); // картинка лого
        $('.icon-logo').attr("src", "images/logo_white.png"); // картинка лого
        $('.icon-alarm').attr("src", "../../images/logo_white.png"); // картинка для аварий
        panel_admin(back_color_black, back_color, table_color_1, table_color_4, good_blue_black);
        backgroundes(back_color_black, text_color_black, text_color_black); // Вызов функции для основных фонов
        drop_content_colors(text_color_black, calen_3_color, back_color_black, mesto_personal_color_black); // Вызов функции для выпадающих меню
        calendar(back_color, back_color_black, text_color_black, text_color_black); // Вызов функции для календаря
        selectPower(back_color, select_color_2, select_color_3, text_color_black)
        hightcharts_colors(back_color_black, text_color_black, mesto_personal_color_black, text_color_black, mesto_personal_color_black, back_color); // Вызов функции для графиков
        mesto_personal(mesto_personal_color_black, back_color_black); // Вызов функции для надписей место и персонал
        nav_menu(nav_menu_col1, nav_menu_col2, back_color); // навигационное меню
        dark_theme_button(); // функция для кнопки смены темы на темную
        table_colors_black(); // Вызов функции для таблицы
        home_background(home_phone_dark, text_color_black, calen_1_color, calen_1_color, back_color, back_color, text_color_black);
        login_background(login_phone_dark, back_color, opacity_login_dark, text_color_black);

        // document.getElementById('dark_button').checked = "checked"; // сохранение состояния темной темы для кнопки перелкючения темы.
    }
}

// Условие, чтобы при изменении ширины темная тема вызывалась снова
window.addEventListener('resize', function () {
    window.setTimeout(function () {
        dark_theme();
    }, 500);
});

