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

// Функция вычисляет количества операций, аргумент массив работы
function getPush_kol_op(arrayWork)
{

    var index_pars = 0; // Индекс по одному из циклов
    var array_kol_op = [0,0];

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    var lengh = arrayWork.length
    if (lengh <= 1){
        kol_op.push(0)
        kol_long_operations.push(0)
        return
    }

    if(lengh >= 4){
        if(lengh % 2 == 1) lengh -=1
        lengh = (lengh - lengh % 2) / 2
    }
    else lengh = 1

    while(index_pars < lengh)
    {   // Условие обычной операции
        if (new Date(arrayWork[index_pars*2]).getTime() !== (new Date(arrayWork[index_pars * 2 + 1])).getTime())
        {
            array_kol_op[0] += 1;
        }

        // Условие обычной больше 180 секунд(3 минуты)
        if ((new Date(arrayWork[index_pars*2 + 1])).getTime() - (new Date(arrayWork[index_pars * 2])).getTime() > 180000)
        {
            array_kol_op[1] += 1;
        }

        index_pars += 1;
    }

    // После выхода из цикла происходит запись количества операция для текущего станка
    kol_op.push(array_kol_op[0])
    kol_long_operations.push(array_kol_op[1])
}

// Функция вычисляет количества операций, аргумент массив работы
function getPush_kol_op_2(arrayWork)
{

    var index_pars = 0; // Индекс по одному из циклов
    var array_kol_op = [0,0];

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    var lengh = arrayWork.length
    if (lengh <= 1){
        kol_op_2.push(0)
        kol_long_operations_2.push(0)
        return
    }

    if(lengh >= 4){
        if(lengh % 2 == 1) lengh -=1
        lengh = (lengh - lengh % 2) / 2
    }
    else lengh = 1

    while(index_pars < lengh)
    {   // Условие обычной операции
        if (new Date(arrayWork[index_pars*2]).getTime() !== (new Date(arrayWork[index_pars * 2 + 1])).getTime())
        {
            array_kol_op[0] += 1;
        }

        // Условие обычной больше 180 секунд(3 минуты)
        if ((new Date(arrayWork[index_pars*2 + 1])).getTime() - (new Date(arrayWork[index_pars * 2])).getTime() > 180000)
        {
            array_kol_op[1] += 1;
        }

        index_pars += 1;
    }

    // После выхода из цикла происходит запись количества операция для текущего станка
    kol_op_2.push(array_kol_op[0])
    kol_long_operations_2.push(array_kol_op[1])
}

// Функция парсит линейные диаграммы в массив объектов
// Аргументы: массив со станками, y на графики, имя программы опционально
function pars(arrayParse, y, arrayName=null)
{
    if(arrayParse === undefined) return

    var index_pars = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    var lengh = arrayParse.length
    if (lengh <= 1){
        return
    }

    if(lengh >= 4){
        if(lengh % 2 == 1) lengh -=1
        lengh = (lengh - lengh % 2) / 2
    }
    else lengh = 1

    // Если имя программы не передано в функцию, то массив формируется без нее
    if (arrayName == null){
        while(index_pars < lengh)
        {   // Парсинг
            arraySave.push({x:(new Date(arrayParse[index_pars*2])).getTime(), x2:(new Date(arrayParse[index_pars * 2 + 1])).getTime(), y:y})
            index_pars += 1;
        }
    }
    // Иначе в массив парсится переданный массив с именем программы
    else {
        while(index_pars < lengh)
        {   // Парсинг
            arraySave.push({x:(new Date(arrayParse[index_pars*2])).getTime(), x2:(new Date(arrayParse[index_pars * 2 + 1])).getTime(), y:y, programname:arrayName[index_pars]})
            index_pars += 1;
        }
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}

// Функция загоняет массивы с данными в Highcharts линейной суточной,
// можно в качестве параметра передать имя нагрузки и новый цвет
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
            text: 'Работа оборудования смены 19:00 - 07:00'
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

function setDataLine2(containerLine, arrayWork, arrayPass, arrayFail,  arrayAvar, arrayNagruzka, nagruzkaName='Под нагрузкой', nagruzkaColor = '#24621d') {
    Highcharts.chart(containerLine, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange'
        },
        title: {
            text: 'Работа оборудования смены 07:00 - 19:00'
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


// Функция загоняет массивы с данными в Highcharts круговой суточной
// можно в качестве параметра передать имя нагрузки и новый цвет
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

// Функция для заполнения переменных общей линейной диаграммы
// нулями в случае пустого массива на входе
// Принимает обрабатываемый массив станка и массив индексами ручного режима
function pushZero (StanokElement, exception) {
    // Если массив пустой или нулевой, то
    if ((StanokElement === null) || (StanokElement == 0)) {

        // Переменная выполненности исключения, меняется на 1 если произошло исключение
        var exceptionGoted = 0

        // Пробегаемся по массиву с исключениями
        $.each(exception, function (i) {
            // Если в исключении найден ручной режим, то записываем нули c ручным режимом
            if ((exception[i][4]) == 'ruchnoi') {
                linear_rabota.push(0);
                linear_pause.push(0);
                linear_off.push(0);
                linear_avar.push(0);
                linear_nagruzka.push(0);
                linear_ruchnoi.push(0);

                kol_op.push(0)
                kol_long_operations.push(0)

                // Меняем состояние исключения
                exceptionGoted = 1
                // Выходим из цикла
                return
            }
        });

        // Если исключения не было найдено, то записываем нули без ручного режима
        if (exceptionGoted === 0) {
            linear_rabota.push(0);
            linear_pause.push(0);
            linear_off.push(0);
            linear_avar.push(0);
            linear_nagruzka.push(0);

            kol_op.push(0)
            kol_long_operations.push(0)
            // Возвращаем единицу, что произошла запись пустого станка
            return 1
        }
        // Если и второе условие не было выполнено, то возвращаем единицу, произошла запись пустого станка но с ручным режимом
        return 1
    }
    // Если массив не был пустым, возвращаем ноль
    else return 0
}

function pushZero_2 (StanokElement, exception) {
    // Если массив пустой или нулевой, то
    if ((StanokElement === null) || (StanokElement == 0)) {

        // Переменная выполненности исключения, меняется на 1 если произошло исключение
        var exceptionGoted = 0

        // Пробегаемся по массиву с исключениями
        $.each(exception, function (i) {
            // Если в исключении найден ручной режим, то записываем нули c ручным режимом
            if ((exception[i][4]) == 'ruchnoi') {
                linear_rabota_2.push(0);
                linear_pause_2.push(0);
                linear_off_2.push(0);
                linear_avar_2.push(0);
                linear_nagruzka_2.push(0);
                linear_ruchnoi_2.push(0);

                kol_op_2.push(0)
                kol_long_operations_2.push(0)

                // Меняем состояние исключения
                exceptionGoted = 1
                // Выходим из цикла
                return
            }
        });

        // Если исключения не было найдено, то записываем нули без ручного режима
        if (exceptionGoted === 0) {
            linear_rabota_2.push(0);
            linear_pause_2.push(0);
            linear_off_2.push(0);
            linear_avar_2.push(0);
            linear_nagruzka_2.push(0);

            kol_op_2.push(0)
            kol_long_operations_2.push(0)
            // Возвращаем единицу, что произошла запись пустого станка
            return 1
        }
        // Если и второе условие не было выполнено, то возвращаем единицу, произошла запись пустого станка но с ручным режимом
        return 1
    }
    // Если массив не был пустым, возвращаем ноль
    else return 0
}

// Функция парсит линейные суточные диаграммы и отправляет их
// В Highcharts. Аргументы: stanok - массив переменных станка
// exception - массив исключений
// index - индекс текущего станка, startContainer - число с какого
// станка начинать запись
function buildLinearDiagram(stanok, exception, index, startContainer){
    // Функция парсинга массивов с точками начала и конца
    var pars_nagruzka = pars(stanok[4], 0)
    var pars_rabota = pars(stanok[0], 1, stanok[5])
    var pars_pause = pars(stanok[1], 2)
    var pars_off = pars(stanok[2], 3)
    var pars_avar = pars(stanok[3], 4)

    // Переменная выполненности исключения, меняется на 1 если произошло исключение
    var exceptionGoted = 0


    // Пробегаемся по массиву исключений, если текущий станок будет найдет в исключениях, то выполним условие
    $.each(exception, function (i) {
        if(index == exception[i][0]) {
            setDataLine("container_work" + (index + startContainer), pars_rabota, pars_pause, pars_off, pars_avar, pars_nagruzka, exception[i][1], exception[i][2]);
            // Меняем состояение переменной на 1, т.к. произошло исключение
            exceptionGoted = 1
            return
        }
    });

    // Если исключения не случилось, обычная запись
    if (exceptionGoted === 0) {
        setDataLine("container_work" + (index + startContainer), pars_rabota, pars_pause, pars_off, pars_avar, pars_nagruzka);
    }
}

function buildLinearDiagram2(stanok, exception, index, startContainer){
    // Функция парсинга массивов с точками начала и конца
    var pars_nagruzka = pars(stanok[4], 0)
    var pars_rabota = pars(stanok[0], 1, stanok[5])
    var pars_pause = pars(stanok[1], 2)
    var pars_off = pars(stanok[2], 3)
    var pars_avar = pars(stanok[3], 4)

    // Переменная выполненности исключения, меняется на 1 если произошло исключение
    var exceptionGoted = 0


    // Пробегаемся по массиву исключений, если текущий станок будет найдет в исключениях, то выполним условие
    $.each(exception, function (i) {
        if(index == exception[i][0]) {
            setDataLine2("container_work" + (index + startContainer), pars_rabota, pars_pause, pars_off, pars_avar, pars_nagruzka, exception[i][1], exception[i][2]);
            // Меняем состояение переменной на 1, т.к. произошло исключение
            exceptionGoted = 1
            return
        }
    });

    // Если исключения не случилось, обычная запись
    if (exceptionGoted === 0) {
        setDataLine2("container_work" + (index + startContainer), pars_rabota, pars_pause, pars_off, pars_avar, pars_nagruzka);
    }
}

// Функция парсит круговые диаграммы станков. Учитывает наличие ручного режима
// Аргументы: stanok - массив переменных станка
// exception - массив исключений
// index - индекс текущего станка, startContainer - число с какого
// станка начинать запись
function buildRoundDiagram(roundDiagram, exception, index, startContainer) {
    // Если массив пустой или нулевой, то
    if ((roundDiagram == 0) || (roundDiagram === null)) {

        // Переменная выполненности исключения, меняется на 1 если произошло исключение
        var exceptionGoted = 0

        // Пробегаемся по массиву с исключениями
        $.each(exception, function (i) {
            // Если в исключении найден ручной режим, то записываем нули c ручным режимом
            if ((exception[i][4]) == 'ruchnoi') {
                linear_rabota.push(0);
                linear_pause.push(0);
                linear_off.push(0);
                linear_avar.push(0);
                linear_nagruzka.push(0);
                linear_ruchnoi.push(0);

                // Меняем состояние исключения
                exceptionGoted = 1
                // Выходим из цикла
                return
            }
        });

        // Если исключения не было найдено, то записываем нули без ручного режима
        if (exceptionGoted === 0) {
            linear_rabota.push(0);
            linear_pause.push(0);
            linear_off.push(0);
            linear_avar.push(0);
            linear_nagruzka.push(0);

            // Возвращаем единицу, что произошла запись пустого станка
            return
        }
        // Если и второе условие не было выполнено, то выходим из функции, произошла запись пустого станка но с ручным режимом
        return
    }

    // Иначе, если массив не оказался пустым, то
    else
    {
        // Преобразование элементов круговой диаграммы из строк в числа
        $.each(roundDiagram, function (i) {
            roundDiagram[i] = parseInt(roundDiagram[i]);
        });

        // Переменная выполненности исключения, меняется на 1 если произошло исключение
        exceptionGoted = 0

        // Пробегаемся по массиву исключений, если текущий станок будет найдет в исключениях, то выполним условие
        $.each(exception, function (i) {
            // Пробегаемся по массиву с индексами станков с ручным режимом, при соответсвии, загружаем такой массив в Highcharts
            if (index == exception[i][0]) {
                // В функцию SetDataRound exception передается [3], а не [2], т.к. круговая диаграмма требует не одного цвета, а целый массив
                setDataRound("container" + (index + startContainer), roundDiagram[0], roundDiagram[1], roundDiagram[2], roundDiagram[3], roundDiagram[4], exception[i][1], exception[i][3]);
                exceptionGoted = 1
                return
            }
        });

        // Если ручной режим не соответсвовал текущему станку, то обычная запись
        if (exceptionGoted === 0) {
            // Вычисление работы без нагрузки для круговой диаграммы
            roundDiagram[4] = 0;
            // Если работа оказалась меньше нуля предупредить
            if (0 > roundDiagram[0]) {
                console.log("Неверное значение работы на станке", index + 1)
                roundDiagram[0] = 0
            }
            setDataRound("container" + (index + startContainer), roundDiagram[0], roundDiagram[1], roundDiagram[2], roundDiagram[3], roundDiagram[4]);
        }
    }
}

// Функция заполняет переменные общей диаграммы значениями, учитывая наличие или
// отсутвие ручного режима Аргументы: stanok - массив переменных станка
// exception - массив исключений
// index - индекс текущего станка
function buildCommonDiagrams(roundDiagram, exception, index) {

    if ((roundDiagram == 0) || (roundDiagram === null)) {
        return
    }

    else {
        // Переменная выполненности исключения, меняется на 1 если произошло исключение
        var exceptionGoted = 0


        $.each(exception, function (i) {
            if ((exception[i][4]) == 'ruchnoi') {
                linear_rabota.push(roundDiagram[0]);
                linear_pause.push(roundDiagram[1]);
                linear_off.push(roundDiagram[2]);
                linear_avar.push(roundDiagram[3]);
                if (index == exception[i][0]) {

                    linear_nagruzka.push(0);
                    linear_ruchnoi.push(roundDiagram[4]);

                    exceptionGoted = 1
                    return
                } else {
                    linear_nagruzka.push(roundDiagram[4]);
                    linear_ruchnoi.push(0);

                    exceptionGoted = 1
                    return
                }
            }
        });

        if (exceptionGoted === 0) {
            linear_rabota.push(roundDiagram[0]);
            linear_pause.push(roundDiagram[1]);
            linear_off.push(roundDiagram[2]);
            linear_avar.push(roundDiagram[3]);
            linear_nagruzka.push(roundDiagram[4]);
        }

    }
}

function buildCommonDiagrams_2(roundDiagram, exception, index) {

    if ((roundDiagram == 0) || (roundDiagram === null)) {
        return
    }

    else {
        // Переменная выполненности исключения, меняется на 1 если произошло исключение
        var exceptionGoted = 0


        $.each(exception, function (i) {
            if ((exception[i][4]) == 'ruchnoi') {
                linear_rabota_2.push(roundDiagram[0]);
                linear_pause_2.push(roundDiagram[1]);
                linear_off_2.push(roundDiagram[2]);
                linear_avar_2.push(roundDiagram[3]);
                if (index == exception[i][0]) {

                    linear_nagruzka_2.push(0);
                    linear_ruchnoi_2.push(roundDiagram[4]);

                    exceptionGoted = 1
                    return
                } else {
                    linear_nagruzka_2.push(roundDiagram[4]);
                    linear_ruchnoi_2.push(0);

                    exceptionGoted = 1
                    return
                }
            }
        });

        if (exceptionGoted === 0) {
            linear_rabota_2.push(roundDiagram[0]);
            linear_pause_2.push(roundDiagram[1]);
            linear_off_2.push(roundDiagram[2]);
            linear_avar_2.push(roundDiagram[3]);
            linear_nagruzka_2.push(roundDiagram[4]);
        }

    }
}

// Универсальная функция сборки и формирования данных для графиков аргументы
// Массив со станками, стартовый контейнер, если какие-то станки нужно пропустить
// Массив с исключениями, для добавления отдельной переменной ручного режима
// и изменения имени операции нагрузки и тд
function build (stankiDataArray,  startContainer = 1, exception = [0])
{
    $.map(stankiDataArray, function (stanok, index) {
        if(index%2 == 0) {
            // Функция pushZero возвращает единицу если массив пустой и заполняет его нулями
            // С помощью exception учитываются исключения
            if (pushZero(stanok, exception)) {
                // Если массив оказался пустым, то переходим к следующему циклу $.map
                return
            }

            // Функция вычисления и добавления станку количества операций

            getPush_kol_op(stanok[0]);
            // Функция формирования линейной диаграммы станка аргументы:
            // массив станка, массив исключений, индекс станка, номер стартого станка
            buildLinearDiagram(stanok, exception, index, startContainer)

            // Условие проверки является ли stanok[6] вообще массивом
            if (Array.isArray(stanok[6])) {
                // Объявляем массив круговой диаграммы из 6-го массива станка.
                var roundDiagram = stanok[6];

                // Функция формирования круговой диаграммы станка аргументы:
                // круговой массив станка, массив исключений, индекс станка, номер стартого станка
                // функция выполнится, только если массив не пустой
                if (roundDiagram !== 0) {
                    buildRoundDiagram(roundDiagram, exception, index, startContainer)
                }
                else {
                    buildRoundDiagram(roundDiagram, exception, index, startContainer)
                }
            }
            // Если stanok[6] не оказался массивом, то заполняем нулями и переходим к следующему станку
            else {
                var exceptionGoted = 0

                // Пробегаемся по массиву с исключениями
                $.each(exception, function (i) {
                    // Если в исключении найден ручной режим, то записываем нули c ручным режимом
                    if ((exception[i][4]) == 'ruchnoi') {
                        linear_rabota.push(0);
                        linear_pause.push(0);
                        linear_off.push(0);
                        linear_avar.push(0);
                        linear_nagruzka.push(0);
                        linear_ruchnoi.push(0);

                        // Меняем состояние исключения
                        exceptionGoted = 1
                        // Выходим из цикла
                        return
                    }
                });

                // Если исключения не было найдено, то записываем нули без ручного режима
                if (exceptionGoted === 0) {
                    linear_rabota.push(0);
                    linear_pause.push(0);
                    linear_off.push(0);
                    linear_avar.push(0);
                    linear_nagruzka.push(0);

                    // Возвращаем единицу, что произошла запись пустого станка
                    return
                }
                // Если и второе условие не было выполнено, то выходим из функции, произошла запись пустого станка но с ручным режимом
                return
            }

            // Функция формирования заполнение данных для общей диаграммы аргументы:
            // круговой массив станка, массив исключений, индекс станка
            buildCommonDiagrams(roundDiagram, exception, index)

        }
        else {
            if(index%2 != 0) {
                // Функция pushZero возвращает единицу если массив пустой и заполняет его нулями
                // С помощью exception учитываются исключения
                if (pushZero_2(stanok, exception)) {
                    // Если массив оказался пустым, то переходим к следующему циклу $.map
                    return
                }

                // Функция вычисления и добавления станку количества операций

                getPush_kol_op_2(stanok[0]);
                // Функция формирования линейной диаграммы станка аргументы:
                // массив станка, массив исключений, индекс станка, номер стартого станка
                buildLinearDiagram2(stanok, exception, index, startContainer)

                // Условие проверки является ли stanok[6] вообще массивом
                if (Array.isArray(stanok[6])) {
                    // Объявляем массив круговой диаграммы из 6-го массива станка.
                    var roundDiagram = stanok[6];

                    // Функция формирования круговой диаграммы станка аргументы:
                    // круговой массив станка, массив исключений, индекс станка, номер стартого станка
                    // функция выполнится, только если массив не пустой
                    if (roundDiagram !== 0) {
                        buildRoundDiagram(roundDiagram, exception, index, startContainer)
                    }
                }
                // Если stanok[6] не оказался массивом, то заполняем нулями и переходим к следующему станку
                else {
                    var exceptionGoted = 0

                    // Пробегаемся по массиву с исключениями
                    $.each(exception, function (i) {
                        // Если в исключении найден ручной режим, то записываем нули c ручным режимом
                        if ((exception[i][4]) == 'ruchnoi') {
                            linear_rabota_2.push(0);
                            linear_pause_2.push(0);
                            linear_off_2.push(0);
                            linear_avar_2.push(0);
                            linear_nagruzka_2.push(0);
                            linear_ruchnoi_2.push(0);

                            // Меняем состояние исключения
                            exceptionGoted = 1
                            // Выходим из цикла
                            return
                        }
                    });

                    // Если исключения не было найдено, то записываем нули без ручного режима
                    if (exceptionGoted === 0) {
                        linear_rabota_2.push(0);
                        linear_pause_2.push(0);
                        linear_off_2.push(0);
                        linear_avar_2.push(0);
                        linear_nagruzka_2.push(0);

                        // Возвращаем единицу, что произошла запись пустого станка
                        return
                    }
                    // Если и второе условие не было выполнено, то выходим из функции, произошла запись пустого станка но с ручным режимом
                    return
                }

                // Функция формирования заполнение данных для общей диаграммы аргументы:
                // круговой массив станка, массив исключений, индекс станка
                buildCommonDiagrams_2(roundDiagram, exception, index)

            }
        }
    }); // Конец функции $.map(Diagram)
}

// Отдельная функция для разделов, с одним станком без общих диаграмм и количеств операций
function buildShort (stankiDataArray,  startContainer = 1, exception = [0])
{
    $.map(stankiDataArray, function (stanok, index) {

        // Если текущий массив пустой, следующий цикл
        if ((stanok === null) || (stanok == 0)){
            return
        }

        // Функция преобразования в дате сегодняшнего дня значений 23:59:59
        timeReplace(stanok);
        // Функция вычисления и добавления станку количества операций
        // Функция формирования линейной диаграммы станка аргументы:
        // массив станка, массив исключений, индекс станка, номер стартого станка
        buildLinearDiagram(stanok, exception, index, startContainer)

        // Условие проверки является ли stanok[6] вообще массивом
        if (Array.isArray(stanok[6]))
        {
            // Объявляем массив круговой диаграммы из 6-го массива станка.
            var roundDiagram = stanok[6];

            // Функция формирования круговой диаграммы станка аргументы:
            // круговой массив станка, массив исключений, индекс станка, номер стартого станка
            // функция выполнится, только если массив не пустой
            if (roundDiagram !== 0){
                buildRoundDiagram(roundDiagram, exception, index, startContainer)
            }
        }
        // Если stanok[6] не оказался массивом, то заполняем нулями и переходим к следующему станку
        else
        {
            var exceptionGoted = 0

            // Пробегаемся по массиву с исключениями
            $.each(exception, function (i) {
                // Если в исключении найден ручной режим, то записываем нули c ручным режимом
                if ((exception[i][4]) == 'ruchnoi') {
                    linear_rabota.push(0);
                    linear_pause.push(0);
                    linear_off.push(0);
                    linear_avar.push(0);
                    linear_nagruzka.push(0);
                    linear_ruchnoi.push(0);

                    // Меняем состояние исключения
                    exceptionGoted = 1
                    // Выходим из цикла
                    return
                }
            });

            // Если исключения не было найдено, то записываем нули без ручного режима
            if (exceptionGoted === 0) {
                linear_rabota.push(0);
                linear_pause.push(0);
                linear_off.push(0);
                linear_avar.push(0);
                linear_nagruzka.push(0);

                // Возвращаем единицу, что произошла запись пустого станка
                return
            }
            // Если и второе условие не было выполнено, то выходим из функции, произошла запись пустого станка но с ручным режимом
            return
        }

    }); // Конец функции $.map(Diagram)
}

/// Остальные для смены

// Стрелочная функция отправляющая запрос по url
const sendRequest = url => {
    // работаем с промисами для удобства, если ок, вызовем resolve, иначе reject у промиса
    return new Promise((resolve, reject) => {$.ajax({url, type: 'GET'}).done(resolve).fail(reject)})
}

// Функция рисования общих диаграмм с 5-ю обычными цветами
function paintGeneralDiagram(generalDiagramNames){
    // Рисование общих диаграмм. Нужно это перенести.
    var colorsLine = ['#e81e1d','#000000', '#ffea32','#207210','#38e817'];

    let marLeft;
    let fSize;

    if(Diagram.length/2 < 10) {
        marLeft = 0;
        fSize = '10px';
    }
    else {
        marLeft = 110;
        fSize = '15px';
    }

    Highcharts.chart('container_sum_zagruzka',{
        chart: {
            type: 'column'
        },
        colors:colorsLine,
        title: {
            text: 'Общая загрузка смены 19:00 - 07:00'
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '18px',
                }
            },
            categories: generalDiagramNames,
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

    Highcharts.chart('container_kol_operations', {
        chart: {
            type: 'bar',
            marginLeft: marLeft
        },
        title: {
            text: 'Количество операций смены 19:00 - 07:00'
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: fSize,
                }
            },
            categories: generalDiagramNames,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Количество',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' операций'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Общее количество операций',
            data: kol_op,
        }, {
            name: 'Количество операций более 3 минут',
            data: kol_long_operations,
        }]
    });

    Highcharts.chart('container_sum_zagruzka_2', {
        chart: {
            type: 'column'
        },
        colors:colorsLine,
        title: {
            text: 'Общая загрузка смены 07:00 - 19:00'
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '18px',
                }
            },
            categories: generalDiagramNames,
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
            data: linear_avar_2
        }, {
            name: 'Выключен',
            data: linear_off_2
        }, {
            name: 'Ожидание',
            data: linear_pause_2
        }, {
            name: 'Под нагрузкой',
            data: linear_nagruzka_2
        }, {
            name: 'Работа',
            data: linear_rabota_2
        }, ]
    });

    Highcharts.chart('container_kol_operations_2', {
        chart: {
            type: 'bar',
            marginLeft:  marLeft
        },
        title: {
            text: 'Количество операций смены 07:00 - 19:00'
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: fSize,
                }
            },
            categories: generalDiagramNames,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Количество',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' операций'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Общее количество операций',
            data: kol_op_2,
        }, {
            name: 'Количество операций более 3 минут',
            data: kol_long_operations_2,
        }]
    });

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
function GetAllData(ArrayNames, Object) {

    // Через map пробегаемся по массиву имен
    ArrayNames.map((name) => {
        // Формируем для каждого станка url для запроса
        var urlNow = `/api/complexData/${name}_days_date:${startTime}`
        var urlPast = `/api/complexData/${name}_days_date:${pastTime}`


        // Запрос на текущий день для одного станка
        sendRequest(urlNow).then((data) => {

            // В массив обработки запроса добавляем ноль
            Object[name]['ready'].push(0)

            // В массив текущего дня добавляем данные по запросу
            Object[name]['today'].push(data.work)
            Object[name]['today'].push(data.pause)
            Object[name]['today'].push(data.off)
            Object[name]['today'].push(data.avar)
            Object[name]['today'].push(data.nagruzka)
            Object[name]['today'].push(data.programName)

            // Переменная checkerData будет записана только если для одного станка обработались оба запроса
            // Иначе в нее будет записан null
            var checkerData = checkerTodayYesterday(Object[name]['today'],Object[name]['yesterday'],Object[name]['ready'])
            // Если в переменную не записался null
            if (checkerData !== null){
                checkerData.map((check) => {
                    Object[name]['complete'].push(check)
                })
            }
        })


        // Запрос на вчера
        sendRequest(urlPast).then((data) => {
            Object[name]['ready'].push(0)

            Object[name]['yesterday'].push(data.work)
            Object[name]['yesterday'].push(data.pause)
            Object[name]['yesterday'].push(data.off)
            Object[name]['yesterday'].push(data.avar)
            Object[name]['yesterday'].push(data.nagruzka)
            Object[name]['yesterday'].push(data.programName)

            // Переменная checkerData будет записана только если для одного станка обработались оба запроса
            // Иначе в нее будет записан null
            var checkerData = checkerTodayYesterday(Object[name]['today'],Object[name]['yesterday'],Object[name]['ready'])
            // Если в переменную не записался null
            if (checkerData !== null){
                checkerData.map((check) => {
                    Object[name]['complete'].push(check)
                })
            }
        })

    })
}

// Функция запускается после обработки всех станков, делит время на две смены
function twoWorkTime() {
    // Массив с заполненными данными
    var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    // Преобразоавние времение в формат '2022-03-21 10:00:35'
    time = time.slice(0, 10) + " " + time.slice(11, 19);

    Names.map((name) => {

        // Переменные массивов для двух смен
        let smena_1 = [];
        let smena_2 = [];

        // Переменные массивов для имен программ двух смен
        let programName1 = []
        let programName2 = []

        // Получении объекта с именем текущего станка
        // Хранящий объедененные массивы текущего и предыдущего дня
        let stanok = clone[name]['complete']

        // Переменная с индексом первого элемента следующего дня имени программы
        let programName2Index = 400

        // Отказ от работы с пустым объектом
        if (stanok === null) {
            return
        }

        // Переменная с массивом, который является копией объекта, но со вставкой 23:59
        // в нечетных массивах
        let stanok_change = []

        // Цикл вставки значения 23:59 в массивы работы, паузы, выключен, авария, нагрузка.
        for (let i = 0; i < 5; i++) {
            stanok_change.push(Array())

            // отказ от работы с неопределенным массивом
            if (stanok[i] !== undefined) {
                // Цикл внутри массива
                for (let j = 0; j < stanok[i].length; j++) {
                    // если этот элемент последний, то записать его и выйти из цикла
                    if (j == stanok[i].length) {
                        stanok_change[i].push(stanok[i][j])
                        break
                    }

                    // Если время 00:00 текущего дня меньше следующей переменной и текущая переменная меньше 00:00 текущего дня, и j четная, то
                    if ((new Date(startTime + ' 00:00:00') < new Date(stanok[i][j + 1]).getTime()) && (new Date(startTime + ' 00:00:00') > new Date(stanok[i][j]).getTime()) && j % 2 == 0) {
                        // Вставить в измененный массив переменную
                        stanok_change[i].push(stanok[i][j])
                        // и 23:59
                        stanok_change[i].push(pastTime + ' 23:59:59')
                    }
                    // Иначе  просто записать.
                    else stanok_change[i].push(stanok[i][j])
                }
            }

        }


        // Цикл для разбиения массива stanok_change на массивы smena_1, smena_2
        for (let i = 0; i < 5; i++) {
            // Каждый новый цикл, это: работа, пауза, выключен, авария, нагрузка
            // Поэтому в каждом новом цикле добавляем в смену новый пустой массив,
            // который будет заполняться
            smena_1.push(Array())
            smena_2.push(Array())

            // Отказ от работы с неопределенным массивом
            if (stanok_change[i] !== undefined) {
                // цикл пробежки по всему массиву
                for (let j = 0; stanok_change[i].length > j; j++) {
                    // Если время больше 19:00 прошлого дня и меньше 7 утра следующего дня то:
                    if ((new Date(stanok_change[i][j]).getTime() > new Date(pastTime + ' 19:00:00').getTime()) && (new Date(startTime + ' 07:00:00') > new Date(stanok_change[i][j]).getTime())) {

                        // Если j нечетный, а смена все еще пустая
                            if(smena_1[i].length == 0 && j % 2 == 1) {
                                // добавить в смену 19:00
                                smena_1[i].push(pastTime + ' 19:00:00')
                                    // Если это массив с работой и j нечетный
                                    if (i == 0 && j % 2 == 1) {
                                        // То добавить ПРОШЛУЮ(-1) программу, которая началась до 19:00
                                        programName1.push(stanok[5][(j-1)/2])
                                    }
                            }
                            // Затем в любом случае записать элемент в смену 1
                            smena_1[i].push(stanok_change[i][j])

                        // Если время больше 00:00 текущей даты
                        if (new Date(stanok_change[i][j]).getTime() > new Date(startTime + ' 00:00:00').getTime())
                        {
                            // И данный массив работа и j четный
                            if (i == 0 && j % 2 == 0) {
                                // То пишем имя программы в массив программ для первой смены
                                // по индексу текущего дня для имен программ
                                programName1.push(stanok[5][programName2Index])
                                programName2Index++
                            }
                        }
                        else
                        {   // Иначе записываем имя программы в массив программ для первой смены из массива прошлого дня
                            if (i == 0 && j % 2 == 0) {
                                programName1.push(stanok[5][j/2])
                            }
                        }
                    }
                    // Иначе если время входит в промежоток от 07:00 до 19:00 теккущего дня
                     else if ((new Date(stanok_change[i][j]).getTime() > new Date(startTime + ' 07:00:00').getTime()) && (new Date(startTime + ' 19:00:00') > new Date(stanok_change[i][j]).getTime())) {
                            // Если массив второй смены пустой, но j нечетный
                            if(smena_2[i].length == 0 && j % 2 == 1){
                                // то записать 07:00
                                smena_2[i].push(startTime + ' 07:00:00')
                                // если это индекс работы и j нечетный
                                if (i == 0 && j % 2 == 1) {
                                    // записываем ПРОШЛОЕ(-1) имя программы в массив программ для второй смены
                                    programName2.push(stanok[5][(programName2Index-1)])
                                }
                            }
                            // Затем в любому случае пишем текущий элемент в массив второй смены
                            smena_2[i].push(stanok_change[i][j])

                        // если работа и j четный
                        if (i == 0 && j % 2 == 0) {
                            // записываем имя программы в массив программ для второй смены
                            programName2.push(stanok[5][programName2Index])
                            programName2Index++
                        }
                    }
                } // Конец цилка обработки j

                // Если длина массива первой смены нечетная
                if(smena_1[i].length % 2 == 1)
                {   // То добавить в смену 06:59
                    smena_1[i].push(startTime + ' 06:59:00')
                }
                // Если длина массива второй смены нечетная
                if(smena_2[i].length % 2 == 1)
                {   // Если дата равна сегодняшней
                    if(startTime == time.slice(0, 10))
                    {   // То добавить во вторую смену текущее время
                        smena_2[i].push(startTime + " " + time.slice(11, 19))
                    }
                    else{
                        // Иначе добавить во вторую смену 18:59
                        smena_2[i].push(startTime + ' 18:59:00')
                    }
                }

                // Если смена 2 пустая, а первая смена не пустая и ее последнее значение 06:59
                if(smena_2[i].length == 0 && smena_1[i][(smena_1[i].length-1)] == startTime + ' 06:59:00')
                {
                    // то добавить во вторую смену 07:00
                    smena_2[i].push(startTime + ' 07:00:00')
                    // И в зависимости от текущей даты вставить 18:59 или текущее время
                    if(startTime == time.slice(0, 10))
                    {   // То добавить во вторую смену текущее время
                        smena_2[i].push(startTime + " " + time.slice(11, 19))
                    }
                    else{
                        // Иначе добавить во вторую смену 18:59
                        smena_2[i].push(startTime + ' 18:59:00')
                    }
                }
            }
        }// Конец цикла

        // Добавляем в получившиеся массивы, массивы с именами программ
        smena_1.push(programName1)
        smena_2.push(programName2)

        // Записываем в смены массивы для круговых диаграмм
        getRoundDiagramData(smena_1)
        getRoundDiagramData(smena_2)

        // Добавляем обе готовые смены в массив Diagram
        Diagram.push(smena_1, smena_2)
    }) // Конец функции map с именами станков

    // Когда все станки готовы, вызывается функция рисования линейной и круговой диаграм
    build(Diagram)

    // Вызов функции рисования общей
    paintGeneralDiagram(generalDiagramNames)
}

// Функция проверяет все ли станки загрузились из запроса использует глобальную
// переменную allStanki, при каждом вызове вычитается. Когда все станки готовы, начать обработку.
function checkerAllReady(){
    allStanki--
    if(allStanki === 0) {
        // Запуск дальнейшей логики
        //console.log(clone.navigator_1.complete, clone.navigator_2_golova_1.complete, clone.navigator_2_golova_2.complete, clone.navigator_3.complete)
        setTimeout(twoWorkTime, 1)
    }
}


// Функция проверки, объеденяет входные массивы, если они оба готовы
// Аргументы: массив текущего дня, массив предыдущего дня, переменная готовности
function checkerTodayYesterday (arrayToday, arrayYesterday,check)
{
    // Если массив готовности имеет две переменные
    if(check.length === 2)
    {   // То запустиль логику объедения массивов вчерашнего и сегодняшнего дня
        let arrayFull = []
        for (let i=0; 6 > i; i++)
        {   // метод concat объединяет массивы
            if(arrayToday[i] != undefined && arrayYesterday[i] != undefined) {
                arrayFull.push(arrayYesterday[i].concat(arrayToday[i]))
            }
        }
        checkerAllReady()
        return arrayFull
    }
    // Иначе вывести сообщение еще не готов
    else {
        return null
    }
}
