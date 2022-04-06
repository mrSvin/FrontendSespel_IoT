
function showGetResult (stanok, timeStart, timeEnd, tag=1, callback) {
    var adress = 'http://192.168.3.41:8080/api/complex/' + stanok + '&beginTime:' + time_start + '&endTime:' + time_end + '&statusTag:' + tag
    var result = $.get(adress, callback);
    return result
}

// var stanok = 'dmg_dmu50_1'
var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();

// Преобразоавние времение в формат '2022-03-21 10:00:35'
var time_date = time.slice(0, 10)
var time_start = time_date + " " + "00:00:00";
var time_end = time_date + " " + "23:59:59";

var string = ['dmg_dmu50_1', 'dmg_dmu50_2', 'dmg_dmu50_3', 'dmg_dmu50_4', 'dmg_dmu50_5', 'dmg_dmu50_6', 'dmg_dmu50_7', 'dmg_dmu50_8']

$.map(string, function (stanok)
    {
        console.log("/////////////////////////////////////////////////////////////////////////////////////////////////////")
        var time_rabota = []
        var programName_rabota = []
        var status_rabota = []

        var time_pause = []
        var status_pause = []

        var time_fail = []
        var status_fail = []

        var time_avar = []
        var status_avar = []

        var time_nagruzka = []
        var status_nagruzka = []


// Запрос к работе
        showGetResult(stanok, time_start, time_end, 1, function(data){
                data.onload = () => {
                    console.log("Вызвалась функция для работы")
                    $.map(data.time, function (element){
                        time_rabota.push(element)
                    })

                    $.map(data.programName, function (element){
                        programName_rabota.push(element)
                    })

                    $.map(data.status, function (element){
                        status_rabota.push(element)
                    })

                    console.log(stanok, "Rabota_time ", time_rabota)
                    console.log(stanok, "programName ", programName_rabota)
                    console.log(stanok, "status_rabota", status_rabota)
                }
            }
        );

// Запрос к паузе
        showGetResult(stanok, time_start, time_end, 2, function(data){

                data.onload = () => {
                    console.log("Вызвалась функция для паузы")
                    $.map(data.time, function (element) {
                        time_pause.push(element)
                    })

                    $.map(data.status, function (element) {
                        status_pause.push(element)
                    })

                    console.log(stanok, "time_pause", time_pause)
                    console.log(stanok, "status_pause", status_pause)
                }

            }
        );

// Запрос к выключенному
        showGetResult(stanok, time_start, time_end, 3, function(data){

                data.onload = () => {
                    console.log("Вызвалась функция для выключенного")
                    $.map(data.time, function (element) {
                        time_fail.push(element)
                    })

                    $.map(data.status, function (element) {
                        status_fail.push(element)
                    })

                    console.log(stanok, "time_fail", time_fail)
                    console.log(stanok, "status_fail", status_fail)
                }

            }
        );

// Запрос к аварии
        showGetResult(stanok, time_start, time_end, 4, function(data){
                console.log("Вызвалась функция для аварии")

                data.onload = () => {
                    $.map(data.time, function (element) {
                        time_avar.push(element)
                    })

                    $.map(data.status, function (element) {
                        status_avar.push(element)
                    })

                    console.log(stanok, "time_avar", time_avar)
                    console.log(stanok, "status_avar", status_avar)
                }

            }
        );

// Запрос к нагрузки
        showGetResult(stanok, time_start, time_end, 5, function(data){

            data.onload = () => {
                console.log("Вызвалась функция для нагрузки")
                $.map(data.time, function (element) {
                    time_nagruzka.push(element)
                })

                $.map(data.status, function (element) {
                    status_nagruzka.push(element)
                })

                console.log(stanok, "time_nagruzka", time_nagruzka)
                console.log(stanok, "status_nagruzka", status_nagruzka)
            }

            }
        );
    }
)

        // for(let i = 1; 100 > i-1; i++)
        // {
        //     if (request.status[i] == request.status[i-1])
        //     {
        //         console.log("Плохо", i-1)
        //         continue
        //     }
        //     else {
        //         arrayStatus.push(request.status[i-1])
        //     }
        // }



var appa = getRequest(stanok, time_start, time_end, tag)
console.log(appa)
var status
var time
var program

status = appa.responseJSON.status
time = appa.responseJSON.time
program = appa.responseJSON.programName
console.log(2, status, time, program)


window.setTimeout(function () {
    status = appa.responseJSON.status
    time = appa.responseJSON.time
    program = appa.responseJSON.programName
    console.log(2, status, time, program)
}, 1000);

console.log(1, status, time, program)


var arrayStatus = appa.responseJSON.status
var arrayTime = appa.responseJSON.time


var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();

// Преобразоавние времение в формат '2022-03-21 10:00:35'
var time_date = time.slice(0, 10)
var time_start = time_date + " " + "00:00:00";
var time_end = time_date + " " + "23:59:59";

var dmg_dmu50_1 = [[],[],[],[],[]]

var string = ['dmg_dmu50_1', 'dmg_dmu50_2', 'dmg_dmu50_3', 'dmg_dmu50_4', 'dmg_dmu50_5', 'dmg_dmu50_6', 'dmg_dmu50_7','dmg_dmu50_8']
// var string = ['navigator_1', 'navigator_2_golova_1', 'navigator_2_golova_2', 'navigator_3', ]

$.map(string, function (stanok)
{
    // Цикл для отправки запроса тегам от 1 до 5
    for(let i = 1; 5>i; i++)
    {
        // Эта функция должна быть объявлена внутри тела цикла, она вызывается из запросов
        function showMessage(stanok, tag) {
            console.log("________Вызвалась функция Message____________")
            console.log("Станок", stanok, "Tag", tag)
            console.log(programNameV);
            console.log(statusV);
            console.log(timeV);
            console.log("\n\n\n")
        }

        console.log("start")
        let adress = 'http://192.168.3.41:8080/api/complex/' + stanok + '_beginTime:' + time_start + '_endTime:' + time_end + '_statusTag:' + i

        var programNameV
        var statusV
        var timeV

        $.get( adress,
            function( data ) {
                console.log("________Внутри_запроса____________")
                programNameV = data.programName;
                statusV = data.status;
                timeV = data.time;
                console.log(adress, '\n', programNameV, statusV, timeV)
                showMessage(stanok, i);
            });
    }

})



var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();

// Преобразоавние времение в формат '2022-03-21 10:00:35'
var time_date = time.slice(0, 10)
var time_start = time_date + " " + "00:00:00";
var time_end = time_date + " " + "23:59:59";

var dmg_dmu50_1 = [[],[],[],[],[]]

var string = ['dmg_dmu50_2']//, 'dmg_dmu50_2', 'dmg_dmu50_3', 'dmg_dmu50_4', 'dmg_dmu50_5', 'dmg_dmu50_6', 'dmg_dmu50_7','dmg_dmu50_8']
// var string = ['navigator_1', 'navigator_2_golova_1', 'navigator_2_golova_2', 'navigator_3', ]

$.map(string, function (stanok)
{
    // Цикл для отправки запроса тегам от 1 до 5
    for(let i = 1; 5>i; i++)
    {
        // Эта функция должна быть объявлена внутри тела цикла, она вызывается из запросов

        console.log("start")
        let adress = 'http://192.168.3.41:8080/api/complex/' + stanok + '_beginTime:' + time_start + '_endTime:' + time_end + '_statusTag:' + i

        var programNameV
        var statusV
        var timeV

        $.get( adress,
            function( data ) {
                console.log("________Внутри_запроса____________")
                programNameV = data.programName;
                statusV = data.status;
                timeV = data.time;
                console.log(adress, '\n', programNameV, statusV, timeV)
                showMessage(stanok, i);
            });

        function showMessage(stanok, tag) {
            console.log("________Вызвалась функция Message____________")
            console.log("Станок", stanok, "Tag", tag)
            console.log(programNameV);
            console.log(statusV);
            console.log(timeV);
            console.log("\n\n\n")
        }

    }

})











