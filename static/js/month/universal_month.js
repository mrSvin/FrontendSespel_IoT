const timezone = new Date().getTimezoneOffset()

// Получение текущего времяни в формате toISO
var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
// Преобразоавние времение в формат '2022-03-21 10:00:35'
time = time.slice(0, 10) + " " + time.slice(11, 19);
// Время, которое будет переписано в массивах 'текущая дата 23:59:59'
time_miss = time.slice(0, 10) + " " + "23:59:59";

let startTime = time.slice(0, 7)

// let linear_rabota = [];
// let linear_pause = [];
// let linear_off = [];
// let linear_avar = [];
// let linear_nagruzka = [];
// let linear_ruchnoi = [];

$('.form-control').attr('value', startTime)

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

function setDataLine(containerLine, arrayWork, arrayPass, arrayFail,  arrayAvar, arrayNagruzka, exception=[0,'Нагрузка',['#e81e1d','#000000', '#ffea32','#207210','#38e817'],['#38e817', '#ffea32', '#000000', '#e81e1d', '#207210']]) {
    Highcharts.chart(containerLine, {
        chart: {
            type: 'column'
        },
        colors: exception[2],
        title: {
            text: 'Загрузка оборудования по дням'
        },
        xAxis: {
            title: {
                text: 'Дни месяца',
                align: 'high'
            },
            labels: {
                style: {
                    fontSize: '18px',
                }
            },
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        credits: {
            enabled: false
        },
        yAxis: {
            min: 0,
            title: {
                text: '%'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },

        series: [{
            name: 'Авария',
            data: arrayAvar
        }, {
            name: 'Выключен',
            data: arrayFail
        }, {
            name: 'Ожидание',
            data: arrayPass
        }, {
            name: exception[1],
            data: arrayNagruzka
        }, {
            name: 'Работа',
            data: arrayWork
        }]
    });

}

function setDataRound(containerRound, work, pass,fail, avar, nagruzka, exception=[0,'Нагрузка',['#e81e1d','#000000', '#ffea32','#207210','#38e817'], ['#38e817', '#ffea32', '#000000', '#e81e1d', '#207210']]) {
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
        colors:exception[3],
        credits: {
            enabled: false
        },
        series : [ {
            type : 'pie',
            name : 'Показатель',
            data : [[ 'Работа', work ], [ 'Включен', pass ], [ 'Выключен', fail],  [ 'В аварии', avar ], [ exception[1], nagruzka ] ]
        }]
    });
}



// Функция проверки наличия ручного режима в исключениях
function exceptionHasRuchnoi(exc) {
    let trigger = false;
    for(let i = 0; i<exc.length; i++)
    {
        if(exc[i].includes('ruchnoi')) trigger = true;
    }
    return trigger;
}

// Стрелочная функция отправляющая запрос по url
const sendRequest = url => {
    // работаем с промисами для удобства, если ок, вызовем resolve, иначе reject у промиса
    return new Promise((resolve, reject) => {$.ajax({url, type: 'GET'}).done(resolve).fail(reject)})
}

// Функция рисования общих диаграмм с 5-ю обычными цветами
function paintGeneralDiagram(Names, exception=null){

    // Рисование общих диаграмм. Нужно это перенести.
    var colorsLine = ['#e81e1d','#000000', '#ffea32','#207210','#38e817'];

    var colorsRound = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210', '#5c7ed0'];

    let marLeft;
    let fSize;

    if(Diagram.length/2 < 10) {
        marLeft = null;
        fSize = '15px';
    }
    else {
        marLeft = 110;
        fSize = '10px';
    }

    let sumKrug = []

    if(exception==null) {
        sumKrug = [0,0,0,0,0];

        linear_nagruzka.forEach(item=>{
            sumKrug[4] = sumKrug[4] + item;
        })

        linear_avar.forEach(item=>{
            sumKrug[3] = sumKrug[3] + item;
        })

        linear_off.forEach(item=>{
            sumKrug[2] = sumKrug[2] + item;
        })

        linear_pause.forEach(item=>{
            sumKrug[1] = sumKrug[1] + item;
        })

        linear_rabota.forEach(item=>{
            sumKrug[0] = sumKrug[0] + item;
        })

        Highcharts.chart('container_sum_zagruzka',{
            chart: {
                type: 'column'
            },
            colors:colorsLine,
            title: {
                text: 'Общая загрузка оборудования'
            },
            xAxis: {
                labels: {
                    style: {
                        fontSize: '18px',
                    }
                },
                categories: Names,
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: '%'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                name: 'Авария',
                data: linear_avar
            }, {
                name: 'Выключен',
                data: linear_off
            }, {
                name: 'Ожидание',
                data: linear_pause
            }, {
                name: 'Под нагрузкой',
                data: linear_nagruzka
            }, {
                name: 'Работа',
                data: linear_rabota
            }, ]
        });

        Highcharts.chart('container_sum_zagruzka_krug', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: 'Суммарная загрузка оборудования'
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
            colors:colorsRound,
            credits: {
                enabled: false
            },
            series : [ {
                type : 'pie',
                name : 'Показатель',
                data : [ [ 'По программе', sumKrug[0] ], [ 'Включен', sumKrug[1] ],
                    [ 'Выключен', sumKrug[2] ],  [ 'В аварии', sumKrug[3]],  [ 'Под нагрузкой', sumKrug[4]]   ]
            }]
        });
    }
    else if(Array.isArray(exception) && exceptionHasRuchnoi(exception)){
        colorsLine = ['#e81e1d', '#000000','#5c7ed0', '#ffea32', '#207210', '#38e817'];
        colorsRound = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210', '#5c7ed0'];


        sumKrug = [0,0,0,0,0,0];

        linear_ruchnoi.forEach(item=>{
            sumKrug[5] = sumKrug[5] + item;
        })

        linear_nagruzka.forEach(item=>{
            sumKrug[4] = sumKrug[4] + item;
        })

        linear_avar.forEach(item=>{
            sumKrug[3] = sumKrug[3] + item;
        })

        linear_off.forEach(item=>{
            sumKrug[2] = sumKrug[2] + item;
        })

        linear_pause.forEach(item=>{
            sumKrug[1] = sumKrug[1] + item;
        })

        linear_rabota.forEach(item=>{
            sumKrug[0] = sumKrug[0] + item;
        })

        Highcharts.chart('container_sum_zagruzka',{
            chart: {
                type: 'column'
            },
            colors:colorsLine,
            title: {
                text: 'Общая загрузка оборудования'
            },
            xAxis: {
                labels: {
                    style: {
                        fontSize: '18px',
                    }
                },
                categories: Names,
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: '%'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                name: 'Авария',
                data: linear_avar
            }, {
                name: 'Выключен',
                data: linear_off
            },{
                name: 'Ручной',
                data: linear_ruchnoi
            }, {
                name: 'Ожидание',
                data: linear_pause
            }, {
                name: 'Под нагрузкой',
                data: linear_nagruzka
            }, {
                name: 'Работа',
                data: linear_rabota
            }, ]
        });

        Highcharts.chart('container_sum_zagruzka_krug', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: 'Суммарная загрузка оборудования'
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
            colors:colorsRound,
            credits: {
                enabled: false
            },
            series : [ {
                type : 'pie',
                name : 'Показатель',
                data : [ [ 'Работа', sumKrug[0] ], [ 'Ожидание', sumKrug[1] ],
                    [ 'Выключен', sumKrug[2] ],  [ 'Авария', sumKrug[3]],  [ 'Под нагрузкой', sumKrug[4]], [ 'Ручной', sumKrug[5]]   ]
            }]
        });
    }

    dark_theme()
}

// Функция вычисления часов работы для круговой диаграммы.
function getRoundDiagramData(smena){
    // Создаем пустой массив
    let array1 = []

    // если массив смены не undefined, то
    if (smena !== undefined)
    {
        // Через map пробегаемся по элементам
        smena.map((arraySmena, index)=>{

            // Нет смысла пробегаться по массиву с именами программ
            if(index == 5) return;

            // Переменная, которая будет хранить текущую переменную для состояния:
            // работы, паузы, выключен, аварии, нагрузки
            let delta = 0

            // Если массив, оказался пустым или подобным, то в массив запишется ноль.
            if(arraySmena == null || arraySmena.length <= 1 || arraySmena == undefined)
            {
                array1.push(delta)
                return
            }
            // Иначе
            else
            {   // Начиная с первого элемента с шагом 2
                for(let i = 1; i < arraySmena.length; i+=2)
                {
                    // старая заглушка
                    if(i==0) continue

                    // Вычисления дельты, сумма всех разниц между началом работы и концом.
                    delta = delta + (new Date(arraySmena[i]).getTime()) - (new Date(arraySmena[i-1]).getTime())
                }
            }
            // После вычисления добавить в массив
            array1.push(delta)
        })

        // После вычисления всех состояний, записать текущий массив в смену
        smena.push(array1)
    }
}

// Функция формирует запрос по массиву имен и дате и передает его в объект
function GetAllData(ArrayNames, Object, exception=null) {

    // Через map пробегаемся по массиву имен
    ArrayNames.map((name) => {
        // Формируем для каждого станка url для запроса
        var urlNow = `/api/monthData/${name}_month_date:${startTime}`

        // Запрос на текущий день для одного станка
        sendRequest(urlNow).then((data) => {
            // В массив текущего дня добавляем данные по запросу
            Object[name]['month'].push(data.work)
            Object[name]['month'].push(data.pause)
            Object[name]['month'].push(data.off)
            Object[name]['month'].push(data.avar)
            Object[name]['month'].push(data.nagruzka)

            checkerAllReady(exception)
        })

    })
}

// Функция запускается после обработки всех станков, делит время на две смены
function twoWorkTime(exception=null) {

    Names.map((name) => {

        // Получении объекта с именем текущего станка
        // Хранящий объедененные массивы текущего и предыдущего дня
        let stanok = clone[name]['month']

        // Отказ от работы с пустым объектом
        if (stanok === null || stanok === undefined) {
            return
        }
        // Переменная с массивом, который является копией объекта, но со вставкой 23:59
        // в нечетных массивах

        let roundData = []

        for(let i=0; i<stanok.length; i++)
        {
            roundData[i] = stanok[i].reduce((val1, val2)=> {
                return val1 + val2
            })
        }

        stanok.push(roundData)

        // Добавляем обе готовые смены в массив Diagram
        Diagram.push(stanok)


    }) // Конец функции map с именами станков

    // exception !== null? build(Diagram, exception) : build(Diagram);

    exception !== null? build(Diagram, exception) : build(Diagram);

}

// Функция проверяет все ли станки загрузились из запроса использует глобальную
// переменную allStanki, при каждом вызове вычитается. Когда все станки готовы, начать обработку.
function checkerAllReady(exception=null){
    allStanki--
    if(allStanki === 0) {
        // Запуск дальнейшей логики
        twoWorkTime(exception)
    }
}

function build(Diagram, exeption=null) {

    Diagram.map(function (element, index) {
        // Вычисление работы без нагрузки для линейной диаграммы
        if(element != null) {
            if(index != 0) { // Иссключение для станка без нагрузки
                $.each(element[0], function (index){
                    element[0][index] = element[0][index] - element[4][index];
                });
            }
            if(exeption==null){
                setDataLine("container_days" + (index + 1),  element[0], element[1], element[2], element[3], element[4]);
            }
            else {
                if(exeption[index] !== undefined && exeption[index][0] == index){
                    setDataLine("container_days" + (index + 1),  element[0], element[1], element[2], element[3], element[4], exeption[index]);
                }
                else {
                    setDataLine("container_days" + (index + 1),  element[0], element[1], element[2], element[3], element[4]);
                }
            }
        }

        if (element[5] != null) {
            if (index != 0) { // Иссключение для станка без нагрузки
                element[5][0] = element[5][0] - element[5][4];
            }
            if(exeption==null) {
                linear_rabota.push(element[5][0])
                linear_pause.push(element[5][1])
                linear_off.push(element[5][2])
                linear_avar.push(element[5][3])
                linear_nagruzka.push(element[5][4])
                setDataRound("container" + (index + 1), element[5][0], element[5][1], element[5][2], element[5][3], element[5][4]);
            }
            else {
                if(exeption[index] !== undefined && exeption[index][0] == index){
                    if(exceptionHasRuchnoi(exeption)){
                        linear_rabota.push(element[5][0])
                        linear_pause.push(element[5][1])
                        linear_off.push(element[5][2])
                        linear_avar.push(element[5][3])
                        linear_ruchnoi.push(element[5][4])
                        linear_nagruzka.push(0)
                    }
                    else {
                        linear_rabota.push(element[5][0])
                        linear_pause.push(element[5][1])
                        linear_off.push(element[5][2])
                        linear_avar.push(element[5][3])
                        linear_nagruzka.push(element[5][4])
                        linear_ruchnoi.push(0)
                    }
                    setDataRound("container" + (index + 1), element[5][0], element[5][1], element[5][2], element[5][3], element[5][4], exeption[index]);

                }
                else {
                    linear_rabota.push(element[5][0])
                    linear_pause .push(element[5][1])
                    linear_off.push(element[5][2])
                    linear_avar.push(element[5][3])
                    linear_nagruzka.push(element[5][4])
                    linear_ruchnoi.push(0)
                    setDataRound("container" + (index + 1), element[5][0], element[5][1], element[5][2], element[5][3], element[5][4]);
                }

            }
        }


    });

    paintGeneralDiagram(generalDiagramNames, exeption)

    dark_theme()
}


// Цвета для линейной и круговой диаграмм
// var colorsLine = ['#e81e1d','#000000', '#ffea32','#5c7ed0','#38e817'];
// var colorsRound = ['#38e817', '#ffea32', '#000000', '#e81e1d','#5c7ed0'];

// Порядок по индексам work[0], pass[1], fail[2], avar[3], nagruzka[4]
// Функция заполнения линейной диаграммы
