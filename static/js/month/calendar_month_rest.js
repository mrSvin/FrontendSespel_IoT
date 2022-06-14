function ActiveButton() {
    $('.follow').removeClass('load');
}


$(function () {
    $('#datepicker').datepicker({
        format: "yyyy-mm",
        language: 'ru',
        viewMode: "months",
        minViewMode: "months",
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



    $('#button_obnovit').on("click", function() {

        $('.follow').addClass('load')
        setTimeout(ActiveButton,1500)

        datas = $('#datepicker').data().datepicker.viewDate.toISOString();

        date = new Date(datas); // some mock date

        startTime = datas.slice(0, 7)

        $('.form-control').attr('value', startTime)

        clone = JSON.parse(JSON.stringify(objectStankov))
        Names = Object.keys(clone)
        allStanki = Names.length

        Diagram = []

    linear_rabota = [];
    linear_pause = [];
    linear_off = [];
    linear_avar = [];
    linear_nagruzka = [];
    linear_ruchnoi = [];

        GetAllData(Names, clone, exception)
        dark_theme()

    });


});