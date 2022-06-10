// Функция получение пользовательских данных
function SetUserSetting() {
    $.post("/api/userInfo", function( data ) {

        $('.avatar').attr("src", data.imageUser); // картинка лого для папок на уровень ниже
        $('.dropdown-content img').attr("src", data.imageUser); // картинка лого для папок на уровень ниже
        $('.div_login_mail li').html(data.userName); // картинка лого для папок на уровень ниже
        $('.div_login_mail p').html(data.userMail); // картинка лого для папок на уровень ниже

        var role_status = data.userRole;

        if (role_status === "ROLE_ADMIN") {
            document.getElementById("role_vision").innerHTML = "Роль: Админ";
            document.getElementById("admin").style.display = "inline";

        } else if (role_status === "ROLE_USER") {
            document.getElementById("role_vision").innerHTML = "Роль: Пользователь"
            document.getElementById("admin").style.display = "none";
        }
    })
}

function ActiveButton() {
    $('#button_obnovit').attr('disabled', null)
    $('.follow').removeClass('load');
}

$(function () {
    $('#datepicker').datepicker({
        format: "yyyy-mm-dd",
        language: 'ru',
        autoclose: true,
        todayHighlight: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        autoclose: true,
        changeMonth: true,
        changeYear: true,
        orientation: "button"
    });
    <!--$("#datepicker").datepicker("update", new Date());  Задаем текущее время-->


    $('#button_obnovit').on("click", function () {

        $('#button_obnovit').attr('disabled', 'true')
        setTimeout(ActiveButton,1500)
        $('.follow').addClass('load')

        var datas = $('#datepicker').data().datepicker.viewDate.toISOString();

        linear_rabota = [];
        linear_pause = [];
        linear_off = [];
        linear_avar = [];
        linear_nagruzka = [];

        kol_op = [];
        kol_long_operations = [];

        date = new Date(datas); // some mock date

        startTime = datas.slice(0, 10)

        clone = JSON.parse(JSON.stringify(objectStankov))
        allStanki = Names.length

        Diagram = []
        GetAllData(Names, clone, exception)
    });
});