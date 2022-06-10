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

// Функция парсит линейные диаграммы в массив объектов
// Аргументы: массив со станками, y на графики, имя программы опционально
function pars(arrayParse, y, arrayName=null)
{

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
            roundDiagram[0] = roundDiagram[0] - roundDiagram[4];
            // Если работа оказалась меньше нуля предупредить
            if (0 > roundDiagram[0]) {
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

// Универсальная функция сборки и формирования данных для графиков аргументы
// Массив со станками, стартовый контейнер, если какие-то станки нужно пропустить
// Массив с исключениями, для добавления отдельной переменной ручного режима
// и изменения имени операции нагрузки и тд
function build (stankiDataArray,  startContainer = 1, exception = [0])
{
    $.map(stankiDataArray, function (stanok, index) {

        // Функция pushZero возвращает единицу если массив пустой и заполняет его нулями
        // С помощью exception учитываются исключения
        if (pushZero(stanok, exception)) {
            // Если массив оказался пустым, то переходим к следующему циклу $.map
            return
        }

        // Функция преобразования в дате сегодняшнего дня значений 23:59:59
        timeReplace(stanok);
        // Функция вычисления и добавления станку количества операций

        getPush_kol_op(stanok[0]);
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

        // Функция формирования заполнение данных для общей диаграммы аргументы:
        // круговой массив станка, массив исключений, индекс станка
        buildCommonDiagrams(roundDiagram, exception, index)

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

// Функция перевода миллисекунд в часы в формате 00:00:00
function msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);



    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

// Функция формирования массивов с именами программы и их выполнением, локальные переменные
function getTimeProgramName(arrayData)
{
    let timer = 0;
    let programTimeArray = [];
    let startSame = null

    arrayData? console.log("FormTable"):0;

    for(let i = 0; i<arrayData[0].length; i+=2)
    {

        if(arrayData[5][i/2] == arrayData[5][i/2+1])
        {
            if(arrayData[5][i/2] !== arrayData[5][i/2-1])
            {
                //console.log("Одинаковые начало")
                startSame = arrayData[0][i]
            }

            timer = timer + (new Date(arrayData[0][i+1]) - new Date(arrayData[0][i]))
            //arrayData[0][i+1]? console.log(arrayData[0][i].slice(11), '-', arrayData[0][i+1].slice(11), arrayData[5][i/2], timer):console.log('last')

        }

        else
        {

            if(arrayData[5][i/2] == arrayData[5][i/2-1])
            {
                timer = timer + (new Date(arrayData[0][i+1]) - new Date(arrayData[0][i]))
                //arrayData[0][i+1]? console.log(arrayData[0][i].slice(11), '-', arrayData[0][i+1].slice(11), arrayData[5][i/2], timer):console.log('last')
                //console.log("Одинаковые конец")
                programTimeArray.push([arrayData[5][i/2], startSame.slice(11), arrayData[0][i+1].slice(11), msToTime(timer), msToTime(new Date(arrayData[0][i+1]) - new Date(startSame))])
                timer = 0
            }
            else {
                timer = (new Date(arrayData[0][i+1]) - new Date(arrayData[0][i]))
                //arrayData[0][i+1]? console.log(arrayData[0][i].slice(11), '-', arrayData[0][i+1].slice(11), arrayData[5][i/2], timer):console.log('last')
                programTimeArray.push([arrayData[5][i/2], arrayData[0][i].slice(11), arrayData[0][i+1].slice(11), msToTime(timer), msToTime(timer)])
                timer = 0
            }


        }

    }
    //console.log(programTimeArray)

    // Фильтрация массива на наличие запятых
    programTimeArray.map((elem)=>{
        elem[0] = elem[0].split(',').join('_');
        return elem
    })

    let local_time = programTimeArray;
    window.localStorage['local_time'] = local_time;

    //return programTimeArray
}


// Функция по id элемента и имени массива добавляет в элемент атрибут
// onclick с вызовом функции с определенным массивом .
function addOnclick(id, arrayName) {
    let button = document.getElementById(id)
    button.setAttribute('onclick', `getTimeProgramName(${arrayName}); window.open(this.href, '', 'scrollbars=1,height='+Math.min(1200,screen.availHeight)+',width='+Math.min(835, screen.availWidth)); return false;`)
}

// Функция принимает массив и возвращает время в минутах и часах, создавая локальную переменную массива
// с общей таблицей работы станков
function convertTime(roundArray, name) {

    if(roundArray == roundArray.length)
    {
        return [name, '0 минут','0 минут','0 минут','0 минут','0 минут',]
    }

    let hourArray = roundArray[6]
    let sumArray = hourArray.reduce((acc, num) => acc + num, 0);

    let arrayPercent = hourArray.map(function (num, index) {
        return num / sumArray
    });

    let arrayTime = arrayPercent.map(function (num, index) {
        // Возведение числа в степень соответсвующую его индексу в массиве
        let out = num * 86400

        out = msToTime(out.toFixed(0)*1000)

        if (+out.slice(0,2) > 0) return `${+out.slice(0,2)} ч. ${+out.slice(3,5)} мин. ${+out.slice(6,8)} сек.`;
        else return `${+out.slice(3,5)} мин. ${+out.slice(6,8)} сек`;
    });

    //let local_time = arrayTime;
    //window.localStorage['local_time'] = local_time;
    arrayTime.unshift(name)
    return arrayTime
}

function sendTime(names, datas){

    let array = []

    for(let i=0; datas.length > i; i++)
    {
        array.push(convertTime(datas[i], names[i]))
    }

   // console.log(array)

    let local_time = array;
    window.localStorage['local_time'] = local_time;
}


// Стрелочная функция отправляющая запрос по url
const sendRequest = url => {
    // работаем с промисами для удобства, если ок, вызовем resolve, иначе reject у промиса
    return new Promise((resolve, reject) => {$.ajax({url, type: 'GET'}).done(resolve).fail(reject)})
}

// Функция рисования общих диаграмм с 5-ю обычными цветами
function paintGeneralDiagram(generalDiagramNames, exception=null){
    // Рисование общих диаграмм. Нужно это перенести.
    var colorsLine = ['#e81e1d','#000000', '#ffea32','#207210','#38e817'];

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

    if(exception==null) {
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
    }
    else {
        colorsLine = ['#e81e1d', '#000000','#5c7ed0', '#ffea32', '#207210', '#38e817'];

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
    }

    Highcharts.chart('container_kol_operations', {
        chart: {
            type: 'bar',
            marginLeft: marLeft
        },
        title: {
            text: 'Количество операций'
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
        var urlNow = `/api/complexData/${name}_days_date:${startTime}`

        // Запрос на текущий день для одного станка
        sendRequest(urlNow).then((data) => {

            // В массив текущего дня добавляем данные по запросу
            Object[name]['today'].push(data.work)
            Object[name]['today'].push(data.pause)
            Object[name]['today'].push(data.off)
            Object[name]['today'].push(data.avar)
            Object[name]['today'].push(data.nagruzka)
            Object[name]['today'].push(data.programName)

            checkerAllReady(exception)
        })

    })
}

// Функция запускается после обработки всех станков, делит время на две смены
function twoWorkTime(exception=null) {



    // Массив с заполненными данными
    var time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    // Преобразоавние времение в формат '2022-03-21 10:00:35'
    time = time.slice(0, 10) + " " + time.slice(11, 19);

    Names.map((name) => {

        // Получении объекта с именем текущего станка
        // Хранящий объедененные массивы текущего и предыдущего дня
        let stanok = clone[name]['today']

        // Отказ от работы с пустым объектом
        if (stanok === null) {
            return
        }
        // Переменная с массивом, который является копией объекта, но со вставкой 23:59
        // в нечетных массивах

        stanok = stanok.map((elem, i)=>{
            if(i == 5) {
                return elem
            }

            if(elem.length % 2 == 1)
            {
                if(startTime == time.slice(0, 10))
                {   // То добавить во вторую смену текущее время
                    elem.push(startTime + " " + time.slice(11, 19))
                }
                else {
                    elem.push(startTime + ' 23:59:59')
                }
            }

            return elem;

        })

        // Записываем в смены массивы для круговых диаграмм
        getRoundDiagramData(stanok)


        // Добавляем обе готовые смены в массив Diagram
        Diagram.push(stanok)


    }) // Конец функции map с именами станков

     exception !== null? build(Diagram,1, exception) : build(Diagram);

    // Вызов функции рисования общей
    paintGeneralDiagram(generalDiagramNames, exception)
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
