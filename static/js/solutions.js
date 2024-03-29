function getTimeTotalArray(roundArray, date) {

    if (roundArray === null) {
        return ['0 с.', '0 с.', '0 с.', '0 с.', '0 с.',]
    } else if (roundArray === roundArray.length) {
        return ['0 с.', '0 с.', '0 с.', '0 с.', '0 с.',]
    }


    let sumArray = roundArray.reduce((acc, num) => acc + num, 0);

    let arrayPercent = roundArray.map(function (num) {
        return num / sumArray
    });

    let pageName = parseNameUrl(document.location.pathname);

    if (typeof (date) == 'string') {
        // Дата формата 2022-02
        if (date.length === 7) {
            let timeNow = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
            // Если текущий год и месяц совпадают
            if (timeNow.slice(0, 7) === date) {
                // то используем текущий день как 100%
                date = timeNow.slice(8, 10)
            } else date = new Date(date.slice(0, 4), date.slice(5, 7), 0).getDate()
        }
        // Дата формата 2022-02-22
        else if (date.length === 10) {
            let timeNow = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
            // Если текущая дата совпадает
            if (timeNow.slice(0, 10) === date) {
                // то используем текущий час как 100%
                date = +timeNow.slice(11, 13) + (timeNow.slice(14, 16) / 60)
                // Если дата текущая и это страница со сменной, то отчет начинаем на 7 часов позже
                if (pageName.includes('Smena')) date = date - 7
                if (date < 0) date = 0
            } else if (pageName.includes('Smena')) {
                date = 12
            } else date = 24
        }

    } else if (pageName.includes('Month')) date = 30

    return arrayPercent.map(function (num) {
        //Если это страница несодержит в название месяц
        if (!pageName.includes('Month')) {
            let out = num * 3600 * date
            return msToTime(out.toFixed(0) * 1000, date)
        } else {
            let out = num * 86400 * date
            return msToTimeDays(out.toFixed(0) * 1000, date)
        }

    });
}

// Функция перевода миллисекунд в часы в формате  - 1.ч. 1м. 1.с
function msToTime(duration, date = 24) {

    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);


    if (hours === 0) hours = ''
    else {
        hours = hours + " ч. "
    }

    if (minutes === 0) minutes = ''
    else {
        minutes = minutes + " мин. "
    }

    if (seconds === 0) seconds = ''
    else {
        seconds = seconds + ' с.'
    }

    if ((hours + minutes + seconds) !== '') {
        return '— ' + hours + minutes + seconds;
    } else if ((hours + minutes + seconds) === '' && duration !== 0) {
        return `— ${date} ч.`
    } else return '— 0 с.'

}

// Получение времени в формате часы:минуты
function msToTimeHours(duration) {

    if (duration === 0) return 0

    let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)))

    minutes = minutes < 10 ? '0' + minutes : minutes
    hours = hours < 10 ? hours : hours

    if ((hours + minutes) !== '') {
        return hours + ':' + minutes
    } else if ((hours) === '' && duration !== 0) {
        return hours
    } else return '00:' + minutes

}

// Функция перевода миллисекунд в дни в формате  - 1 д. 1.ч. 1м. 1.с
function msToTimeDays(duration, date = 31) {
    date = +date
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = duration / (1000 * 60 * 60) % 24,
        days = duration / (1000 * 60 * 60 * 24) % date

    hours = hours > 1? parseInt(hours) : 0
    days = days > 1? parseInt(days) : 0

    if (days === 0) days = ''
    else {
        days = days + " д. "
    }

    if (hours === 0) hours = ''
    else {
        hours = hours + " ч. "
    }

    if (minutes === 0) minutes = ''
    else {
        minutes = minutes + " мин. "
    }

    if (seconds === 0) seconds = ''
    else {
        seconds = seconds + ' с.'
    }

    if ((hours + minutes + seconds) !== '') {
        return '— ' + days + hours + minutes + seconds;
    } else if ((days + hours + minutes + seconds) === '' && duration > 999) {
        return `— ${date} д.`
    } else return '— 0 с.'

}

// Парсинг массива со свойствами x, x2, y для истории проведенных обслуживаний
function parseLinearServiceHistory(arrayParse, y, difference) {
    var arraySave = [] // Массив, который будет заполняться

    if (arrayParse.length === 1) {
        arraySave.push({
            x: (new Date(arrayParse[0])).getTime(),
            x2: (new Date(dayTimeNow())).getTime() + 10000,
            y: y,
            login: difference[0][0],
            work: difference[0][1]
        })
    } else {
        for (let i = 0; i < arrayParse.length; i++) {
            if (i === arrayParse.length - 1) {
                arraySave.push({
                    x: (new Date(arrayParse[i])).getTime(),
                    x2: (new Date(dayTimeNow())).getTime() + 10000,
                    y: y,
                    login: difference[i][0],
                    work: difference[i][1]
                })
            } else {
                arraySave.push({
                    x: (new Date(arrayParse[i])).getTime(),
                    x2: (new Date(arrayParse[i + 1])).getTime(),
                    y: y,
                    login: difference[i][0],
                    work: difference[i][1]
                })
            }
        }
    }
    // Иначе в массив парсится переданный массив с именем программы

    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}

// Парсинг массива со свойствами x, x2, y для последнего проведенного обслуживания
function parseLinearServiceNow(arrayParse, y, difference = null) {

    var index_pars = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    while (index_pars < arrayParse.length) {   // Парсинг
        arraySave.push({
            x: (new Date(arrayParse[index_pars * 2])).getTime(),
            x2: (new Date(arrayParse[index_pars * 2 + 1])).getTime(),
            y: y,
            partialFill: difference
        })
        index_pars += 1;
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}

// Функция вычисления часов работы для круговой диаграммы.
function getRoundDiagramData(smena) {
    // Создаем пустой массив
    let arrayRound = []

    // если массив смены не undefined, то
    if (smena !== undefined) {
        // Через map пробегаемся по элементам
        smena.map((arraySmena, index) => {

            // Нет смысла пробегаться по массиву с именами программ
            if (index === 5) return;

            // Переменная, которая будет хранить текущую переменную для состояния:
            // работы, паузы, выключен, аварии, нагрузки
            let delta = 0

            // Если массив, оказался пустым или подобным, то в массив запишется ноль.
            if (arraySmena === null || arraySmena.length <= 1 || arraySmena === undefined) {
                arrayRound.push(delta)
                return
            }
            // Иначе
            else {   // Начиная с первого элемента с шагом 2
                for (let i = 1; i < arraySmena.length; i += 2) {
                    // старая заглушка
                    if (i === 0) continue

                    // Вычисления дельты, сумма всех разниц между началом работы и концом.
                    delta = delta + (new Date(arraySmena[i]).getTime()) - (new Date(arraySmena[i - 1]).getTime())
                }
            }
            // После вычисления добавить в массив
            arrayRound.push(delta)
        })

        // После вычисления всех состояний, записать текущий массив в смену
        smena.push(arrayRound)
    }
}

// Функция формирования массивов для смен
function convertDaysToSmena(today, yesterday, calendarDate = null) {
    // Массив с заполненными данными
    let time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    // Преобразоавние текущего времение в формат '2022-03-21 10:00:35'
    time = time.slice(0, 10) + " " + time.slice(11, 19);

    let startTime

    // Дата с календаря(В данный момент, просто текущая дата)
    if (calendarDate == null) {
        startTime = time.slice(0, 10)
    } else {
        startTime = calendarDate
    }

    // Перевод в иной формат
    // today = [today.workArray, today.pauseArray, today.offArray, today.avarArray, today.ruchnoyArray, today.programName]
    //  yesterday = [yesterday.workArray, yesterday.pauseArray, yesterday.offArray, yesterday.avarArray, yesterday.ruchnoyArray, yesterday.programName]


    // дата предыдущего дня
    let pastTime = new Date((new Date(startTime)).getTime() - 86400000).toISOString().slice(0, 10)

    // Переменные массивов для двух смен
    let smena_1 = [];
    let smena_2 = [];

    // Переменные массивов для имен программ двух смен
    let programName1 = []
    let programName2 = []

    // Переменная с индексом первого элемента следующего дня имени программы
    let programName2Index = 400;
    // защита на случай неудачного запроса
    if (today[5] !== undefined) programName2Index = today[5].length

    // Получении объекта с именем текущего станка
    // Хранящий объедененные массивы текущего и предыдущего дня

    let stanok = []
    for (let i = 0; 6 > i; i++) {   // метод concat объединяет массивы
        if (today[i] !== undefined && yesterday[i] !== undefined) {
            if (i === 0 && yesterday[0].length === yesterday[1].length) {
                yesterday[0].pop()
            }
            stanok.push(yesterday[i].concat(today[i]))
        }
    }

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
                if (j === stanok[i].length) {
                    stanok_change[i].push(stanok[i][j])
                    break
                }

                // Если время 00:00 текущего дня меньше следующей переменной и текущая переменная меньше 00:00 текущего дня, и j четная, то
                if ((new Date(startTime + ' 00:00:00') <= new Date(stanok[i][j + 1]).getTime()) && (new Date(startTime + ' 00:00:00') >= new Date(stanok[i][j]).getTime()) && j % 2 === 0) {
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
                if ((new Date(stanok_change[i][j]).getTime() >= new Date(pastTime + ' 19:00:00').getTime()) && (new Date(startTime + ' 07:00:00') >= new Date(stanok_change[i][j]).getTime())) {

                    // Если j нечетный, а смена все еще пустая
                    if (smena_1[i].length === 0 && j % 2 === 1) {
                        // добавить в смену 19:00
                        smena_1[i].push(pastTime + ' 19:00:00')
                        // Если это массив с работой и j нечетный
                        if (i === 0 && j % 2 === 1) {
                            // То добавить ПРОШЛУЮ(-1) программу, которая началась до 19:00
                            programName1.push(stanok[5][(j - 1) / 2])
                        }
                    }
                    // Затем в любом случае записать элемент в смену 1
                    smena_1[i].push(stanok_change[i][j])

                    // Если время больше 00:00 текущей даты
                    if (new Date(stanok_change[i][j]).getTime() >= new Date(startTime + ' 00:00:00').getTime()) {
                        // И данный массив работа и j четный
                        if (i === 0 && j % 2 === 0) {
                            // То пишем имя программы в массив программ для первой смены
                            // по индексу текущего дня для имен программ
                            programName1.push(stanok[5][programName2Index])
                            programName2Index++
                        }
                    } else {   // Иначе записываем имя программы в массив программ для первой смены из массива прошлого дня
                        if (i === 0 && j % 2 === 0) {
                            programName1.push(stanok[5][j / 2])
                        }
                    }
                }
                // Иначе если время входит в промежоток от 07:00 до 19:00 теккущего дня
                else if ((new Date(stanok_change[i][j]).getTime() >= new Date(startTime + ' 07:00:00').getTime()) && (new Date(startTime + ' 19:00:00') >= new Date(stanok_change[i][j]).getTime())) {
                    // Если массив второй смены пустой, но j нечетный
                    if (smena_2[i].length === 0 && j % 2 === 1) {
                        // то записать 07:00
                        smena_2[i].push(startTime + ' 07:00:00')
                        // если это индекс работы и j нечетный
                        if (i === 0 && j % 2 === 1) {
                            // записываем ПРОШЛОЕ(-1) имя программы в массив программ для второй смены
                            programName2.push(stanok[5][(programName2Index - 1)])
                        }
                    }
                    // Затем в любому случае пишем текущий элемент в массив второй смены
                    smena_2[i].push(stanok_change[i][j])

                    // если работа и j четный
                    if (i === 0 && j % 2 === 0) {
                        // записываем имя программы в массив программ для второй смены
                        programName2.push(stanok[5][programName2Index])
                        programName2Index++
                    }
                }
            } // Конец цилка обработки j

            // Если длина массива первой смены нечетная
            if (smena_1[i].length % 2 === 1) {   // То добавить в смену 06:59
                smena_1[i].push(startTime + ' 06:59:00')
            }
            // Если длина массива второй смены нечетная
            if (smena_2[i].length % 2 === 1) {   // Если дата равна сегодняшней
                if (startTime === time.slice(0, 10)) {   // То добавить во вторую смену текущее время
                    smena_2[i].push(startTime + " " + time.slice(11, 19))
                } else {
                    // Иначе добавить во вторую смену 18:59
                    smena_2[i].push(startTime + ' 18:59:00')
                }
            }

            // Если смена 2 пустая, а первая смена не пустая и ее последнее значение 06:59
            if (smena_2[i].length === 0 && smena_1[i][(smena_1[i].length - 1)] === startTime + ' 06:59:00') {
                // то добавить во вторую смену 07:00
                smena_2[i].push(startTime + ' 07:00:00')
                // И в зависимости от текущей даты вставить 18:59 или текущее время
                if (startTime === time.slice(0, 10)) {   // То добавить во вторую смену текущее время
                    smena_2[i].push(startTime + " " + time.slice(11, 19))
                } else {
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

    return [smena_1, smena_2]
}

// Парсинг массива со свойствами x, x2, y для highcharts
function parseLinearSutki(arrayParse, y, date, arrayName = null, pauseLength = 0) {

    if (y !== 1 && y !== 0) {
        arrayParse = addLastTime(arrayParse, date)
    } else if (arrayParse.length !== pauseLength) {
        arrayParse = addLastTime(arrayParse, date)
    }

    var index_pars = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    var lengh = arrayParse.length
    if (lengh <= 1) {
        return [0]
    }

    if (lengh >= 4) {
        if (lengh % 2 === 1) lengh -= 1
        lengh = (lengh - lengh % 2) / 2
    } else lengh = 1

    // Если имя программы не передано в функцию, то массив формируется без нее
    if (arrayName == null) {
        while (index_pars < lengh) {   // Парсинг
            arraySave.push({
                x: (new Date(arrayParse[index_pars * 2])).getTime(),
                x2: (new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                y: y
            })
            index_pars += 1;
        }
    }
    // Иначе в массив парсится переданный массив с именем программы
    else {
        while (index_pars < lengh) {   // Парсинг
            arraySave.push({
                x: (new Date(arrayParse[index_pars * 2])).getTime(),
                x2: (new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                y: y,
                programname: arrayName[index_pars]
            })
            index_pars += 1;
        }
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    //arraySave = addLastTime(arraySave, date)

    return arraySave
}

// Функия добавления в конец нечетного массива 23:59 или текущего времени
function addLastTime(stanok, calendarDate) {

    let time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    time = time.slice(0, 10) + " " + time.slice(11, 19);

    if (stanok.length % 2 === 1) {
        if (calendarDate === time.slice(0, 10)) {   // То добавить во вторую смену текущее время
            stanok.push(calendarDate + " " + time.slice(11, 19))
        } else {
            stanok.push(calendarDate + ' 23:59:59')
        }
    }

    return stanok
}

// Функция вычисляет количества операций, аргумент массив работы
function kolOperations(arrayWork) {

    let index_pars = 0; // Индекс по одному из циклов
    let array_kol_op = [0, 0];

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    let lengh = arrayWork.length
    if (lengh <= 1) {
        return [0, 0]
    }

    if (lengh >= 4) {
        if (lengh % 2 === 1) lengh -= 1
        lengh = (lengh - lengh % 2) / 2
    } else lengh = 1

    while (index_pars < lengh) {   // Условие обычной операции
        if (new Date(arrayWork[index_pars * 2]).getTime() !== (new Date(arrayWork[index_pars * 2 + 1])).getTime()) {
            array_kol_op[0] += 1;
        }

        // Условие обычной больше 180 секунд(3 минуты)
        if ((new Date(arrayWork[index_pars * 2 + 1])).getTime() - (new Date(arrayWork[index_pars * 2])).getTime() > 180000) {
            array_kol_op[1] += 1;
        }

        index_pars += 1;
    }
    return [array_kol_op[0], array_kol_op[1]];
}

// функция получения среднего арифмитического значения для месяцев
function averageMonthdata(inputArray) {
    let sum = inputArray.reduce((a, b) => a + b, 0);
    return (sum / inputArray.length) || 0;

}

// Функция получения текущей даты
function dayNow() {
    let calendarDate = new Date().toLocaleString()
    return `${calendarDate.slice(6, 10)}-${calendarDate.slice(3, 5)}-${calendarDate.slice(0, 2)}`
}

// Функция получения текущего времени
function timeNow() {
    let calendarDate = new Date().toLocaleString()
    return calendarDate.slice(12)
}

// Функция получения текущей даты и времени
function dayTimeNow() {
    let calendarDate = new Date().toLocaleString()
    return `${calendarDate.slice(6, 10)}-${calendarDate.slice(3, 5)}-${calendarDate.slice(0, 2)} ${calendarDate.slice(12)}`
}

// Функция получения текущего дня из предыдущего
function dayYesterday(startTime) {
    if (startTime === '') {
        return null
    }
    return new Date((new Date(startTime)).getTime() - 86400000).toISOString().slice(0, 10)
}

// Функция получения текущего года и месяца
function getThisYearMonth() {
    let monthsNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let year = new Date().getFullYear()
    let month = monthsNumber[new Date().getMonth()]
    return `${year}-${month}`
}

function convertTimeToISO(time) {
    time = time.slice(0, 10) + ' ' + time.slice(11, 19)
    return time
}

// Функция получения текущего года и месяца
function monthNow() {
    let time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    // Преобразоавние текущего времение в формат '2022-03-21 10:00:35'
    return time.slice(0, 7)
}

function bufferDataArrays(count) {
    let arraysData = []
    for (let i = 0; i <= count; i++) {
        arraysData.push({
            workArray: [],
            pauseArray: [],
            offArray: [],
            avarArray: [],
            ruchnoyArray: [],
            roundArray: []
        })

    }
    return arraysData
}

// Функция возвращает последнее слово в url
function parseNameUrl(url) {
    let form_path = decodeURIComponent(url);
    form_path.lastIndexOf("/")
    let searchIndex = form_path.lastIndexOf("/") + 1;
    return form_path.substr(searchIndex, form_path.length)
}

// из массива времен возвращает массив времени между периодами
function getArrayPeriodsBetween(arrayTime) {
    let ArrayPeriod = arrayTime
    ArrayPeriod = ArrayPeriod.map((e, i, array) => {
        if (i === (array.length) - 1) {
            return '-'
        } else {
            return msToTimeDays(new Date(array[i]) - new Date(array[i + 1]), 365)
        }
    })
    return ArrayPeriod
}

function exceptionManualNagruzka(name) {
    if (name === 'kim' || name === 'apec') {
        return 'Ручной'
    } else {
        return 'Нагрузка'
    }
}

// Функция получения из массивов времени и общего процента
function highchartsPercentTime(generalDiagramNames, workNoNagruzka, pause, off, avar, nagruzka, ruchoi = null, date) {

    let data = []
    generalDiagramNames.forEach((e, i) => {
        if (ruchoi == null) {
            data.push([workNoNagruzka[i], pause[i], off[i], avar[i], nagruzka[i]])
        } else data.push([workNoNagruzka[i], pause[i], off[i], avar[i], nagruzka[i], ruchoi[i]])

    })

    let dataSumArray = data.map(e => {
        return e.reduce((val1, val2) => {
            return val1 + val2
        })
    })

    let dataTime = data.map(e => {
        return getTimeTotalArray(e, date)
    })

    let dataPercent = data.map((e, i) => {
        if (ruchoi == null) {
            return [(e[0] / dataSumArray[i] * 100).toFixed(1),
                (e[1] / dataSumArray[i] * 100).toFixed(1),
                (e[2] / dataSumArray[i] * 100).toFixed(1),
                (e[3] / dataSumArray[i] * 100).toFixed(1),
                (e[4] / dataSumArray[i] * 100).toFixed(1),]
        } else {
            return [(e[0] / dataSumArray[i] * 100).toFixed(1),
                (e[1] / dataSumArray[i] * 100).toFixed(1),
                (e[2] / dataSumArray[i] * 100).toFixed(1),
                (e[3] / dataSumArray[i] * 100).toFixed(1),
                (e[4] / dataSumArray[i] * 100).toFixed(1),
                (e[5] / dataSumArray[i] * 100).toFixed(1),
            ]
        }
    })

    return dataPercent.map((e, i) => {
        return [e, dataTime[i],]
    })
}

// Функция подгатавливает данные из fetch и рисует граффик.
function getTimeProgramNameGraph(arrayData, type, date) {
    let timer = 0;
    let programTimeArray = [];
    let startSame = null

    let day = dayNow()

    if (!arrayData) return 0

    if (arrayData[0].length % 2 === 1) {
        let timeNow = dayTimeNow()

        if (timeNow.slice(0, 10) === arrayData[0][0].slice(0, 10)) {
            arrayData[0].push(timeNow)
        } else {
            arrayData[0].push(arrayData[0][0].slice(0, 10) + ' 23:59:59')
        }
    }

    for (let i = 0; i < arrayData[0].length; i += 2) {

        if (arrayData[5][i / 2] === arrayData[5][i / 2 + 1]) {
            if (arrayData[5][i / 2] !== arrayData[5][i / 2 - 1]) {
                startSame = arrayData[0][i]
            }

            timer = timer + (new Date(arrayData[0][i + 1]) - new Date(arrayData[0][i]))
        } else {

            if (arrayData[5][i / 2] === arrayData[5][i / 2 - 1]) {
                timer = timer + (new Date(arrayData[0][i + 1]) - new Date(arrayData[0][i]))
                programTimeArray.push([arrayData[5][i / 2], startSame, arrayData[0][i + 1]])
                timer = 0
            } else {
                timer = (new Date(arrayData[0][i + 1]) - new Date(arrayData[0][i]))
                programTimeArray.push([arrayData[5][i / 2], arrayData[0][i], arrayData[0][i + 1]])
                timer = 0
            }
        }
    }

    let parset = []

    if (type === 'sutki') {
        parset.push({
            x: new Date(date + ' 00:00').getTime(),
            x2: new Date(date + ' 00:00').getTime() + 2000,
            y: 0,
            partialFill: null
        })
    } else {
        parset.push({
            x: new Date(date).getTime(),
            x2: new Date(date).getTime() + 2000,
            y: 0,
            partialFill: null
        })
    }

    programTimeArray.forEach(e => {
        parset.push({
            x: new Date(e[1]).getTime(),
            x2: new Date(e[2]).getTime(),
            y: 0,
            partialFill: e[0]
        })
    })

    if (type === 'sutki') {
        if (day === date.slice(0, 10)) {
            parset.push({
                x: new Date(dayTimeNow()).getTime(),
                x2: new Date(dayTimeNow()).getTime() + 2000,
                y: 0,
                partialFill: null
            })
        } else {
            parset.push({
                x: new Date(date + ' 23:59:55').getTime(),
                x2: new Date(date + ' 23:59:55').getTime() + 2000,
                y: 0,
                partialFill: null
            })
        }
    } else {
        if (date.slice(11) === '19:00') {
            parset.push({
                x: new Date(date).getTime() + 3600000 * 11 + 60000 * 59 + 55000,
                x2: new Date(date).getTime() + 3600000 * 11 + 60000 * 59 + 57000,
                y: 0,
                partialFill: null
            })
        } else {
            if (day === date.slice(0, 10)) {
                parset.push({
                    x: new Date(dayTimeNow()).getTime(),
                    x2: new Date(dayTimeNow()).getTime() + 2000,
                    y: 0,
                    partialFill: null
                })
            } else {
                parset.push({
                    x: new Date(date).getTime() + 3600000 * 11 + 60000 * 59 + 55000,
                    x2: new Date(date).getTime() + 3600000 * 11 + 60000 * 59 + 57000,
                    y: 0,
                    partialFill: null
                })
            }
        }
    }

    return parset
}

function getUrlService() {
    let serverDomain = window.location.hostname
    let serverPort = window.location.port

    if (serverDomain === 'iot.sespel.com') {
        return serverDomain + ':' + 17086
    } else return serverDomain + ':' + serverPort.slice(0, -1) + 6
}

function getStankiState(placeKeys, placesObject) {
    let stankiForState = {}

    placeKeys.forEach(e => {
        Object.keys(placesObject[e].stanki).forEach(i => {
            stankiForState[i] = placesObject[e].stanki[i].state
        })
    })
    return stankiForState
}

function getCategoriesState(placeKeys, placesObject) {
    let placeForState = {}
    placeKeys.forEach(e => {
        placeForState[e] = placesObject[e].placeState
        return placeForState
    })
    return placeForState
}

function getObjectFromLocal(local) {
    local = local.split(',')
    let placeForState = {}

    for (let i = 0; i < local.length; i += 2) {

        placeForState[local[i]] = (local[i + 1] === 'true')
    }
    return placeForState
}

function interceptNetworkRequests(ee) {
    const open = XMLHttpRequest.prototype.open;
    const send = XMLHttpRequest.prototype.send;

    const isRegularXHR = open.toString().indexOf('native code') !== -1;

    if (isRegularXHR) {
        XMLHttpRequest.prototype.open = function () {
            ee.onOpen && ee.onOpen(this, arguments);
            if (ee.onLoad) {
                this.addEventListener('load', ee.onLoad.bind(ee));
            }
            if (ee.onError) {
                this.addEventListener('error', ee.onError.bind(ee));
            }
            return open.apply(this, arguments);
        };
        XMLHttpRequest.prototype.send = function () {
            ee.onSend && ee.onSend(this, arguments);
            return send.apply(this, arguments);
        };
    }

    const fetch = window.fetch || "";
    const isFetchNative = fetch.toString().indexOf('native code') !== -1;
    if (isFetchNative) {
        window.fetch = function () {
            ee.onFetch && ee.onFetch(arguments);
            const p = fetch.apply(this, arguments);
            p.then(ee.onFetchResponse, ee.onFetchError);
            return p;
        };
    }
    return ee;
}

function reloadPageIfLogin(data) {
    if (data.url.slice(-5) === 'login' && window.location.href !== data.url) {
        location.href = `${window.location.origin}/login`
    }
}

function urltoFile(url, filename) {
    return (fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, {type: "image/png"});
            })
    );
}

function classToTypeForm(typeForm) {

    if (typeForm === 'hide') return 'formHideUsersControl'

    if (typeForm === 'add') return 'formUsersControl tableBorderAdd'

    if (typeForm === 'change') return 'formUsersControl tableBorderChange'

}

function lastConnectTime(time, differenceTime) {
    time = new Date() - differenceTime - new Date(time).getTime()
    return msToTimeDays(time).slice(2)
}

function getCorrectIP(ip) {

    let correctIP = '192.168.'
    if (ip.length <= 8) return correctIP.slice(0, ip.length)

    let array = ip.slice(8).split('.')
    let ipNew
    array = array.map(e => {
        if (0 <= +e && +e <= 255) {
            return +e
        } else if (array.length === 1) {
            return (+e > 255) ? '255.' : '0.'
        } else return (+e > 255) ? 255 : 0
    })

    if (array.length === 2 && ip[ip.length - 1] !== '.') {
        ipNew = array[0] + '.' + array[1]
    } else if (array.length > 2) {
        ipNew = array[0] + '.' + array[1]
    } else ipNew = (ip[ip.length - 1] === '.') ? array[0] + '.' : array[0]

    return correctIP + ipNew
}

function checkIP(ip) {

    if (ip.length <= 8) return false

    let array = ip.slice(8).split('.')

    array = array.map(e => {
        if (0 <= +e && +e <= 255) {
            return +e
        } else return false
    })

    return (array.length === 2 && ip[ip.length - 1] !== '.' && !array.includes(false))
}

function decodeJwt(token) {
    const parts = token.split(".");
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return {
        header,
        payload,
        signature: parts[2],
    };
}


function checkTokenValid(token, differenceTime=0){
    return !(token === null || token === undefined || decodeJwt(token).payload.exp * 1000 - (new Date().getTime() - differenceTime) <= 0)
}

