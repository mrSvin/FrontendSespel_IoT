function dark(){
    if (count == 0) // условие светлой темы
    {
        $('body').attr("style", "background-color: white; color: #333"); // цвет фона тела и текста
        $('.icon-logo').attr("src", "images/logo_black.png"); // картинка лого
        $(".hr").css('background-color', "rgb(36, 97, 219)"); // цвет верхушки шапки
        $("#menu_ul").css('background-color', "rgb(36, 97, 219)"); // цвет нижний части шапки
        $('header > li').attr('style','color #fff;'); // цвет добро пожаловать пользователь

        $('.dropdown-content').attr('style','background: #fff!important; float: right; text-align: center;'); // цвет выпадающего меню
        $('#role_vision').attr('style','color: #545050; font-size: 14px;'); // цвет роли пользователя
        $('.dropdown-content > li').attr('style','color #333;'); // цвет имени польвателя
        $('.dropdown-content > p').attr('style','color: #545050; font-size: 14px;'); // цвет почты
        $('.dropdown-content > div').attr('style',' display: block; border-bottom: 1px solid #e8eaed; margin-bottom: 5px; line-height: normal'); // цвет линии разделения кнопки администрации
        $('#admin').attr('style','color: #ffffff!important; background: #ff3b3b!important; font-size: 12px;important; margin-bottom: 25px!important;'); // кнопка админа

//Начало светлые темы для навигационных меню: цвет фона, цвет рамки справа, темно красный цвет при наведении.
        $("#menu_a").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a").css('border-right', "1px solid #F36262");
        $("#menu_a").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a1").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a1").css('border-right', "1px solid #F36262");
        $("#menu_a1").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a2").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a2").css('border-right', "1px solid #F36262");
        $("#menu_a2").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a3").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a3").css('border-right', "1px solid #F36262");
        $("#menu_a3").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a4").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a4").css('border-right', "1px solid #F36262");
        $("#menu_a4").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a5").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a5").css('border-right', "1px solid #F36262");
        $("#menu_a5").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a6").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a6").css('border-right', "1px solid #F36262");
        $("#menu_a6").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a7").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a7").css('border-right', "1px solid #F36262");
        $("#menu_a7").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a8").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a8").css('border-right', "1px solid #F36262");
        $("#menu_a8").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });

        $("#menu_a9").css('background-color', "rgb(58, 111, 219)");
        $("#menu_a9").css('border-right', "1px solid #F36262");
        $("#menu_a9").hover(function() {
            $(this).css("background-color",'#D43737');
        }, function(){
            $(this).css("background-color", "rgb(58, 111, 219)");
        });
// Конец Светлые темы для навигационных меню: цвет фона, цвет рамки справа, темно красный цвет при наведении.

        $('.menu-color').attr('style','background: #D43737 !important; border-right: 1px solid #F36262 !important'); // светлая тема кнопка текущей позиции и темные границы в меню
        $(".menu-color").hover(function() {
            $(this).attr('style','background: #D43737 !important; border-right: 1px solid #F36262 !important'); // Защита, чтоба кнопка текущей позиции оставалась светлова цвета при наведении
        });

        $('.btn_change').css('background-color' , '#fff'); // кнопки суточных
        $('.btn_change').css('borderColor' , '#6793d6'); // и месячных отчетов

        $('h2').attr('style','color: #333!important;'); // цвет надписи выберити дату(заголовки)
        $('.form-control').attr('style','color: #555!important; background: #fff!important; border: 1px solid #ccc!important'); // форма заполнения даты
        $('.input-group-addon').attr('style','color: #555!important; background: #eee!important; border: 1px solid #ccc!important'); // кнопка календаря
        $('.follow').attr('style','color: #fff!important; background: #4f759b!important; font-size: 145%!important; margin: 19px 0px!important;'); // кнопки обновить и выход

        $('.highcharts-background').attr('style','fill: #fff'); // цвет фона графиков
        $('.highcharts-title').attr('style','color: #333333; font-size: 18px; fill: #333333;'); // название графиков
        $('.highcharts-axis-labels.highcharts-xaxis-labels>text').attr('style','fill: #666666!important; font-size: 18px!important;'); // надписи названий станков
        $('.highcharts-legend-box').attr('style','fill: #fff!important; stroke: #fff;'); // цвет поля легенды

        // $('.highcharts-legend-item').attr('style','stroke: none!important; stroke-width: 0!important;'); // цвет надписей в легенде слишком сложно
        // $('.highcharts-legend-item > text').attr('style','fill: #333333!important; color: #333333;!important; font-size:12px;font-weight:bold;'); // цвет надписей в легенде

        $('.highcharts-axis.highcharts-yaxis > text').attr('style','fill: #666!important;'); // цвет надписей первой оси
        $('.highcharts-axis-labels.highcharts-yaxis-labels > text').attr('style','fill: #666!important;'); // цвет надписей второй оси

        $('.highcharts-yaxis-grid >.highcharts-grid-line').attr('style','stroke: #e6e6e6;'); // цвета колонок
        $('.highcharts-axis-line').attr('style','stroke: #e6e6e6;!important;'); // цвета осей x y

        $('.highcharts-button-box').attr('style',' fill: #fff;'); // цвета кнопки печати и тд

        $('.highcharts-pie-series > path').attr('style',' stroke: white;'); // обводка круглых диаграм
        $('.highcharts-pie-series > rect').attr('style',' stroke: white;'); // обводка кнопок круглых диаграмм

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

        $('table').attr('style','text-shadow: none!important; color: #0C213B!important; background: radial-gradient(farthest-corner at 50% 50%, white, #DCECF8)!important;');

        $('#dark_button').css('background', 'url(../images/light_butt.png) no-repeat'); // картинка лого
        $('#dark_button').css('width', '100px'); // картинка лого
        $('#dark_button').css('height', '45px'); // картинка лого
        $('#dark_button').css('background-size', '90% 80%'); // картинка лого
        $('#dark_button').css('border', 'none'); // картинка лого

        $("#dark_button").hover(function() { // свечение при наведении на персонад
            $(this).css('width', '102px');

        }, function(){
            $(this).css('width', '100px');
        });

        // $('.highcharts-point').attr('style','stroke: white;'); // обводка круглых кнопок
    }
    else if (count == 1) // Темная тема активна ///////////////////////////////////////////////////////////////////////////////////////////////////
    {
        $('body').attr("style", "background-color: #111111; color: white"); // цвет фона тела и текста
        $('.icon-logo').attr("src", "images/logo_white.png"); // картинка лого
        $(".hr").css('background-color', "rgb(35 76 157)"); // цвет верхушки шапки
        $("#menu_ul").css('background-color', "rgb(35 76 157)"); // цвет нижний части шапки
        $('header > li').attr('style','color: green;'); // цвет добро пожаловать пользователь

        $('.dropdown-content').attr('style','background: green!important; float: right; text-align: center;'); // цвет выпадающего меню
        $('#role_vision').attr('style','color: #545050; font-size: 14px;'); // цвет роли пользователя
        $('.dropdown-content > li').attr('style','color #333;'); // цвет имени польвателя
        $('.dropdown-content > p').attr('style','color: #545050; font-size: 14px;'); // цвет почты
        $('.dropdown-content > div').attr('style',' display: block; border-bottom: 1px solid #e8eaed; margin-bottom: 5px; line-height: normal'); // цвет линии разделения кнопки администрации
        $('#admin').attr('style','color: #ffffff!important; background: #ff3b3b!important; font-size: 12px;important; margin-bottom: 25px!important;'); // кнопка админа

// Начало Темные темы для навигационных меню: цвет фона, цвет рамки справа, темно красный цвет при наведении.
        $("#menu_a").css('background-color', "rgb(18 62 153)");
        $("#menu_a").css('border-right', "1px solid #1e2760");
        $("#menu_a").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a1").css('background-color', "rgb(18 62 153)");
        $("#menu_a1").css('border-right', "1px solid #1e2760");
        $("#menu_a1").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a2").css('background-color', "rgb(18 62 153)");
        $("#menu_a2").css('border-right', "1px solid #1e2760");
        $("#menu_a2").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a3").css('background-color', "rgb(18 62 153)");
        $("#menu_a3").css('border-right', "1px solid #1e2760");
        $("#menu_a3").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a4").css('background-color', "rgb(18 62 153)");
        $("#menu_a4").css('border-right', "1px solid #1e2760");
        $("#menu_a4").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a5").css('background-color', "rgb(18 62 153)");
        $("#menu_a5").css('border-right', "1px solid #1e2760");
        $("#menu_a5").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a6").css('background-color', "rgb(18 62 153)");
        $("#menu_a6").css('border-right', "1px solid #1e2760");
        $("#menu_a6").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a7").css('background-color', "rgb(18 62 153)");
        $("#menu_a7").css('border-right', "1px solid #1e2760");
        $("#menu_a7").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a8").css('background-color', "rgb(18 62 153)");
        $("#menu_a8").css('border-right', "1px solid #1e2760");
        $("#menu_a8").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });

        $("#menu_a9").css('background-color', "rgb(18 62 153)");
        $("#menu_a9").css('border-right', "1px solid #1e2760");
        $("#menu_a9").hover(function() {
            $(this).css("background-color",'#a50f0f');
        }, function(){
            $(this).css("background-color", "rgb(18 62 153)");
        });
// Конец Темные темы для навигационных меню: цвет фона, цвет рамки справа, темно красный цвет при наведении.

        $('.menu-color').attr('style','background: #a50f0f !important; border-right: 1px solid #1e2760 !important'); // темная тема кнопка текущей позиции и темные границы в меню
        $(".menu-color").hover(function() {
            $(this).attr('style','background: #a50f0f !important; border-right: 1px solid #1e2760 !important'); // Защита, чтоба кнопка текущей позиции оставалась темного цвета при наведении
        });

        $('.btn_change').css('background-color' , 'rgb(5,36,103)'); // кнопки суточный
        $('.btn_change').css('borderColor' , 'rgb(5,36,103)'); //  и месячный отчеты

        $('h2').attr('style','color: white!important;'); // цвет надписи выберити дату(заголовки)
        $('.form-control').attr('style','color: red!important; background: blue!important; border: 1px solid green!important'); // форма заполнения даты
        $('.input-group-addon').attr('style','color: red!important; background: blue!important; border: 1px solid green!important'); // кнопка календаря
        $('.follow').attr('style','color: black!important; background: gray!important; font-size: 145%!important; margin: 19px 0px!important;'); // кнопки обновить и выход

        $('.highcharts-background').attr('style','fill: #0a0202'); // цвет фона графиков
        $('.highcharts-title').attr('style','color: #333333; font-size: 18px; fill: white;'); // название графиков
        $('.highcharts-axis-labels.highcharts-xaxis-labels>text').attr('style','fill: red!important; font-size: 18px!important;'); // надписи названий станков
        $('.highcharts-legend-box').attr('style','fill: red!important; stroke: red;'); // цвет поля легенды

        // $('.highcharts-legend-item').attr('style','stroke: blue!important; stroke-width: 0.1px!important;'); // цвет надписей в легенде слишком сложно
        // $('.highcharts-legend-item > text').attr('style','fill: green!important; color: green!important; font-size:12px;font-weight:bold;'); // цвет надписей в легенде слишком сложно

        $('.highcharts-axis.highcharts-yaxis > text').attr('style','fill: red!important;'); // цвет надписей первой оси
        $('.highcharts-axis-labels.highcharts-yaxis-labels > text').attr('style','fill: red!important;'); // цвет надписей второй оси

        $('.highcharts-yaxis-grid >.highcharts-grid-line').attr('style','stroke: green;'); // цвета колонок
        $('.highcharts-axis-line').attr('style','stroke: red!important;'); // цвета осей x y
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

        $('table').attr('style','text-shadow: 1px 2px 3px white, 0 0 2em black, 0 0 0.1em white!important; color: black!important; background: radial-gradient(farthest-corner at 50% 50%, white, #808488)!important;');

        $('#dark_button').css('background', 'url(../images/dark_butt.png) no-repeat'); // картинка лого
        $('#dark_button').css('width', '100px'); // картинка лого
        $('#dark_button').css('height', '45px'); // картинка лого
        $('#dark_button').css('background-size', '90% 80%'); // картинка лого
        $('#dark_button').css('border', 'none'); // картинка лого

        $("#dark_button").hover(function() { // свечение при наведении на персонад
            $(this).css('width', '102px');

        }, function(){
            $(this).css('width', '100px');
        });



    }
}