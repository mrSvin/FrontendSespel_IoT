function ActiveButton() {
    $('.follow').removeClass('load');
}

$(function () {
    $('#datepicker').datepicker({
        format: "dd/mm/yyyy",
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



    $('#button_obnovit').on("click", function() {

        setTimeout(ActiveButton,1500)
        $('.follow').addClass('load')

        var datas = $('#datepicker').data().datepicker.viewDate;
        var day = datas.getDate();
        var mes = datas.getMonth()+1;
        var year = datas.getFullYear();

        name_data = year+"-" +mes+"-" +day;
        <!--console.log(name_data);-->
    });


});
