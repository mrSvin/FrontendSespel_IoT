var color_white_value = "white";

function white_colors(color_arg)
{
    $('body').attr("style", "background-color:" + color_arg + "; color: #333"); // цвет фона тела и текста
}

function dark(){
    if (count == 0) // условие светлой темы
    {



        white_colors(color_white_value);

        // $('body').attr("style", "background-color: white; color: #333"); // цвет фона тела и текста
        $(".hr, #menu_ul").attr("style", 'background-color: rgb(36, 97, 219)'); // цвет шапки

        $('.icon-logo').attr("src", "images/logo_black.png"); // картинка лого

        $('header > ul > li').attr('style','color #fff;'); // цвет добро пожаловать пользователь

        $('.dropdown-content').attr('style','background: #fff; float: right; text-align: center;'); // цвет выпадающего меню
        $('#role_vision').attr('style','color: #545050; font-size: 14px;'); // цвет роли пользователя
        $('.dropdown-content > li').attr('style','color #333;'); // цвет имени польвателя
        $('.dropdown-content > p').attr('style','color: #545050; font-size: 14px;'); // цвет почты
        $('.dropdown-content > div').attr('style',' display: block; border-bottom: 1px solid #e8eaed; margin-bottom: 5px; line-height: normal'); // цвет линии разделения кнопки администрации
        // $('#admin').attr('style','color: #ffffff; background: #ff3b3b; font-size: 12px; margin-bottom: 25px;'); // кнопка админа итак красивая

//Начало светлые темы для навигационных меню:
        $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").attr('style','background-color: rgb(58, 111, 219); border-right: 1px solid #F36262"'); // цвета навигационных меню и рамки
        $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $('.menu-color').attr('style','background: #D43737; border-right: 1px solid #F36262'); // светлая тема кнопка текущей позиции и темные границы в меню
        $(".menu-color").hover(function() {
            $(this).attr('style','background: #D43737; border-right: 1px solid #F36262'); // Защита, чтоба кнопка текущей позиции оставалась светлова цвета при наведении
        });
// Конец Светлые темы для навигационных меню

        $('.btn_change').css('background-color' , '#fff'); // кнопки суточных
        $('.btn_change').css('borderColor' , '#6793d6'); // и месячных отчетов
        // $('h2').attr('style','color: #333;'); // цвет надписи выберите дату(заголовки)

        $('.form-control').attr('style','color: #555; background: #fff; border: 1px solid #ccc'); // форма заполнения даты
        $('.input-group-addon').attr('style','color: #555; background: #eee; border: 1px solid #ccc'); // кнопка календаря
        $('.follow').attr('style','color: #fff; background: #4f759b; font-size: 145%; margin: 19px 0px;'); // кнопки обновить и выход

        $('.highcharts-background').attr('style','fill: #fff'); // цвет фона графиков
        $('.highcharts-title').attr('style','color: #333333; font-size: 18px; fill: #333333;'); // название графиков
        $('.highcharts-axis-labels.highcharts-xaxis-labels>text').attr('style','fill: #666666; font-size: 18px;'); // надписи названий станков
        $('.highcharts-legend-box').attr('style','fill: #fff; stroke: #fff;'); // цвет поля легенды

        // $('.highcharts-legend-item').attr('style','stroke: none; stroke-width: 0;'); // цвет надписей в легенде слишком сложно
        // $('.highcharts-legend-item > text').attr('style','fill: #333333; color: #333333;; font-size:12px;font-weight:bold;'); // цвет надписей в легенде

        $('.highcharts-axis.highcharts-yaxis > text').attr('style','fill: #666;'); // цвет надписей первой оси
        $('.highcharts-axis-labels.highcharts-yaxis-labels > text').attr('style','fill: #666;'); // цвет надписей второй оси

        $('.highcharts-yaxis-grid >.highcharts-grid-line').attr('style','stroke: #e6e6e6;'); // цвета колонок
        $('.highcharts-axis-line').attr('style','stroke: #e6e6e6;;'); // цвета осей x y

        $('.highcharts-button-box').attr('style',' fill: #fff;'); // цвета кнопки печати и тд

        $('.highcharts-pie-series > path').attr('style',' stroke: white;'); // обводка круглых диаграм
        $('.highcharts-pie-series > rect').attr('style',' stroke: white;'); // обводка кнопок круглых диаграмм

        $('.highcharts-point').attr('style','stroke: white;'); // обводка круглых кнопок
        $('.highcharts-point > rect').attr('style','stroke: white;'); // обводка диаграммы работа оборудования



        // начало мест и персонала
        $('.label_mesto').attr('style','color: #756e6e;'); // надпись место
        $('.label_personal').attr('style','color: #756e6e;'); // надпись персонал

        $(".icon_mesto").hover(function() { // свечение при наведении на место
            $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px white');
        }, function(){
            $(this).css('-webkit-box-shadow', 'none');
        });

        $(".icon_personal").hover(function() { // свечение при наведении на персонад
            $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px white');
        }, function(){
            $(this).css('-webkit-box-shadow', 'none');
        });
        // конец мест и персонала

        $('table').attr('style','text-shadow: none; color: #0C213B; background: radial-gradient(farthest-corner at 50% 50%, white, #DCECF8);');


    }
    else if (count == 1) // Темная тема активна ///////////////////////////////////////////////////////////////////////////////////////////////////
    {
        $('body').attr("style", "background-color: #111111; color: white"); // цвет фона тела и текста
        $(".hr, #menu_ul").attr("style", 'background-color: rgb(35 76 157)'); // цвет шапки

        $('.icon-logo').attr("src", "images/logo_white.png"); // картинка лого

        $('header > ul > li').attr('style','color: green;'); // цвет добро пожаловать пользователь

        $('.dropdown-content').attr('style','background: green; float: right; text-align: center;'); // цвет выпадающего меню
        $('#role_vision').attr('style','color: #545050; font-size: 14px;'); // цвет роли пользователя
        $('.dropdown-content > li').attr('style','color #333;'); // цвет имени польвателя
        $('.dropdown-content > p').attr('style','color: #545050; font-size: 14px;'); // цвет почты
        $('.dropdown-content > div').attr('style',' display: block; border-bottom: 1px solid #e8eaed; margin-bottom: 5px; line-height: normal'); // цвет линии разделения кнопки администрации
        // $('#admin').attr('style','color: #ffffff; background: #ff3b3b; font-size: 12px; margin-bottom: 25px;'); // кнопка админа итак красивая

// Начало Темные темы для навигационных меню: цвет фона, цвет рамки справа, темно красный цвет при наведении.
        $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").attr('style','background-color: rgb(18 62 153); border-right: 1px solid #1e2760"');
        $("#menu_a, #menu_a1, #menu_a2, #menu_a3, #menu_a4, #menu_a5, #menu_a6, #menu_a7, #menu_a8, #menu_a9").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $('.menu-color').attr('style','background: #a50f0f ; border-right: 1px solid #1e2760 '); // темная тема кнопка текущей позиции и темные границы в меню
        $(".menu-color").hover(function() {
            $(this).attr('style','background: #a50f0f ; border-right: 1px solid #1e2760 '); // Защита, чтоба кнопка текущей позиции оставалась темного цвета при наведении
        });
// Конец Темные темы для навигационных меню: цвет фона, цвет рамки справа, темно красный цвет при наведении.

        $('.btn_change').css('background-color' , 'rgb(5,36,103)'); // кнопки суточный
        $('.btn_change').css('borderColor' , 'rgb(5,36,103)'); //  и месячный отчеты
        // $('h2').attr('style','color: white;'); // цвет надписи выберите дату(заголовки)

        $('.form-control').attr('style','color: red; background: blue; border: 1px solid green'); // форма заполнения даты
        $('.input-group-addon').attr('style','color: red; background: blue; border: 1px solid green'); // кнопка календаря
        $('.follow').attr('style','color: black; background: gray; font-size: 145%; margin: 19px 0px;'); // кнопки обновить и выход

        $('.highcharts-background').attr('style','fill: #0a0202'); // цвет фона графиков
        $('.highcharts-title').attr('style','color: #333333; font-size: 18px; fill: white;'); // название графиков
        $('.highcharts-axis-labels.highcharts-xaxis-labels>text').attr('style','fill: red; font-size: 18px;'); // надписи названий станков
        $('.highcharts-legend-box').attr('style','fill: red; stroke: red;'); // цвет поля легенды

        // $('.highcharts-legend-item').attr('style','stroke: blue; stroke-width: 0.1px;'); // цвет надписей в легенде слишком сложно
        // $('.highcharts-legend-item > text').attr('style','fill: green; color: green; font-size:12px;font-weight:bold;'); // цвет надписей в легенде слишком сложно

        $('.highcharts-axis.highcharts-yaxis > text').attr('style','fill: red;'); // цвет надписей первой оси
        $('.highcharts-axis-labels.highcharts-yaxis-labels > text').attr('style','fill: red;'); // цвет надписей второй оси

        $('.highcharts-yaxis-grid >.highcharts-grid-line').attr('style','stroke: green;'); // цвета колонок
        $('.highcharts-axis-line').attr('style','stroke: red;'); // цвета осей x y
        $('.highcharts-button-box').attr('style',' fill: red;'); // цвета кнопки печати и тд

        $('.highcharts-point').attr('style','stroke: white;'); // обводка круглых кнопок
        $('.highcharts-series > rect').attr('style',' stroke: red;'); // обводка диаграмм


        $('.highcharts-pie-series > path').attr('style',' stroke: green;'); // обводка круглых диаграм
        $('.highcharts-pie-series > rect').attr('style',' stroke: green;'); // обводка кнопок круглых диаграмм

        $('.highcharts-point > rect').attr('style','stroke: blue;'); // обводка диаграммы работа оборудования

        // начало мест и персонала
        $('.label_mesto').attr('style','color: white;'); // надпись место
        $('.label_personal').attr('style','color: white;'); // надпись персонал

        $(".icon_mesto").hover(function() { // свечение при наведении на место
            $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px #111111');
        }, function(){
            $(this).css('-webkit-box-shadow', 'none');
        });

        $(".icon_personal").hover(function() { // свечение при наведении на персонад
            $(this).css('-webkit-box-shadow', 'inset 0px 0px 12px 12px #111111');
        }, function(){
            $(this).css('-webkit-box-shadow', 'none');
        });
        // конец мест и персонала
        $('table').attr('style','text-shadow: 1px 2px 3px white, 0 0 2em black, 0 0 0.1em white; color: black; background: radial-gradient(farthest-corner at 50% 50%, white, #808488);');

        document.getElementById('dark_button').checked = "checked"; // сохранение состояния темной темы.



    }
}