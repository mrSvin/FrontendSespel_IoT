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
    var lengh = (arrayWork.length)/2-2
    // Если длина меньше нуля, выйти из функции
    if (lengh <= 0){
        kol_op.push(0)
        kol_long_operations.push(0)
        return
    }

    while(index_pars <= lengh)
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
                console.log("Неверное значение работы на станке", index + 1)
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
            console.log("Пустой вообще", index + 1)
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
            console.log("Пустой вообще", index + 1)
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


