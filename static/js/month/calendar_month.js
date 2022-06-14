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


        var datas = $('#datepicker').data().datepicker.viewDate;

        var mes = datas.getMonth()+1;
        var year = datas.getFullYear();

        name_data = mes+"-" + year;
    });

});