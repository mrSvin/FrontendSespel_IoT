const timezone = new Date().getTimezoneOffset()
var colorsLine = ['#207210','#38e817', '#ffea32', '#000000', '#e81e1d'];
var colorsRound = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210'];

Highcharts.setOptions({
    lang: {
        loading: 'Загрузка...',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        exportButtonTitle: "Экспорт",
        printButtonTitle: "Печать",
        rangeSelectorFrom: "С",
        rangeSelectorTo: "По",
        rangeSelectorZoom: "Период",
        downloadPNG: 'Скачать PNG',
        downloadJPEG: 'Скачать JPEG',
        downloadPDF: 'Скачать PDF',
        downloadSVG: 'Скачать SVG',
        printChart: 'Напечатать график',
        viewFullscreen: 'На весь экран'
    },
    plotOptions: {
        xrange: {
            grouping: false
        }
    },
    global: {
        timezoneOffset: timezone
    }
});


// Получение текущего времяни в формате toISO
var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
// Преобразоавние времение в формат '2022-03-21 10:00:35'
time = time.slice(0, 10) + " " + time.slice(11, 19);
// Время, которое будет переписано в массивах 'текущая дата 23:59:59'
time_miss = time.slice(0, 10) + " " + "23:59:59";

// Функция преобразования в дате сегодняшнего дня значений 23:59:59
function timeReplace(dataArray) {
    // индекс ограничение, чтобы не обрабатывать 5-ый массив с именем программы
    var index_time = 0;
    // выполнять если текущие время не равно 23:59:59
    if (time != time_miss) {
        // пробег по массивам до массива с именем программы
        while (index_time < 5) {
            $.each(dataArray[index_time], function (i) {
                // если в массиве время равно текущей дате 23:59:59
                if (dataArray[index_time][i] == time_miss) {
                    // то записать в него значение текущее время
                    dataArray[index_time][i] = time; //dataArray[index_time][i-1]
                }
            });
            // после оконачния цикла each перейти к следующему массиву
            index_time += 1;
        }
    }
}

function getCount(Array){
    var count = 0;
    $.each(Array[0], function(i){
        console.log(Array[0][i+1], "Not", time, "count=", count)
        if(Array[i+1] !== time && Array[i+1] !== time_miss)
        {
            count += 1;
        }
        else{
            return false
        }
    });
    console.log(count)
    return count
}

function pars(arrayParse, y, arrayName=null)
{

    var index_pars = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    var lengh = (arrayParse.length)/2-2
    if (lengh <= 0){
        return
    }

    // Если имя программы не передано в функцию, то массив формируется без нее
    if (arrayName == null){
        while(index_pars <= lengh)
        {   // Парсинг
            arraySave.push({x:(new Date(arrayParse[index_pars*2])).getTime(), x2:(new Date(arrayParse[index_pars * 2 + 1])).getTime(), y:y})
            index_pars += 1;
        }
    }
    // Иначе в массив парсится переданный массив с именем программы
    else {
        while(index_pars <= lengh)
        {   // Парсинг
            arraySave.push({x:(new Date(arrayParse[index_pars*2])).getTime(), x2:(new Date(arrayParse[index_pars * 2 + 1])).getTime(), y:y, programname:arrayName[index_pars]})
            index_pars += 1;
        }
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}

function setDataLine(containerLine, arrayWork, arrayPass, arrayFail,  arrayAvar, arrayNagruzka, nagruzkaName='Под нагрузкой', nagruzkaColor = '#24621d') {
    Highcharts.chart(containerLine, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange'
        },
        title: {
            text: 'Работа оборудования'
        },
        colors:colorsLine,


        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: [nagruzkaName, 'Работа', 'Ожидание', 'Выключен', 'В аварии'],
            reversed: true
        },
        credits: {
            enabled: false
        },

        series: [
            {
                name: 'Работа',
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#38e817',
                tooltip: {
                    pointFormat: '<b>Программа: {point.programname}</b>'
                },
                data: arrayWork,
            },
            {
                name: 'Ожидание',
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#ffea32',
                tooltip: {
                    pointFormat: ''
                },
                data: arrayPass,
                dataLabels: {
                    enabled: true
                }
            },
            {
                name: 'Выключен',
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#000000',
                data: arrayFail,
                dataLabels: {
                    enabled: true,
                }
            },
            {
                name: 'В аварии',
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#e81e1d',
                data: arrayAvar,
                dataLabels: {
                    enabled: true
                }
            },
            {
                name: nagruzkaName,
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: nagruzkaColor,
                data: arrayNagruzka,
                dataLabels: {
                    enabled: true
                }
            }
        ]


    });

}

function setDataRound(containerRound, work, pass, fail, avar, nagruzka, nagruzkaName='Нагрузка', colorArray=colorsRound) {
    Highcharts.chart(containerRound, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },

        title: {
            text: 'Загрузка оборудования'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        colors:colorArray,
        credits: {
            enabled: false
        },
        series : [ {
            type : 'pie',
            name : 'Показатель',
            data : [[ 'Работа', work ], [ 'Включен', pass ], [ 'Выключен', fail],  [ 'В аварии', avar ], [ nagruzkaName, nagruzka ] ]
        }]
    });
}


