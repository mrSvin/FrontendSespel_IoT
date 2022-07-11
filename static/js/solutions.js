function msToTimeDays(duration) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24),
        days = parseInt((duration / (1000 * 60 * 60 * 24 )))

    return days + " дней " + hours + " ч. " + minutes + " мин. " + seconds + ' с.';
}

function parseLinearService(arrayParse, y, difference=null) {

    var index_pars = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Если имя программы не передано в функцию, то массив формируется без нее
    if (difference == null){
        if(arrayParse.length == 1){
            arraySave.push({
                x:(new Date(arrayParse[0])).getTime(),
                x2:((new Date(arrayParse[0])).getTime()+86400000),
                y:y
            })
        }
        else if(arrayParse.length % 2 == 0){
            for(let i = 0; i<arrayParse.length-1; i++){
                arraySave.push({
                    x:(new Date(arrayParse[i])).getTime(),
                    x2:(new Date(arrayParse[i+1])).getTime(),
                    y:y
                })
            }
        }
        else {
            for(let i = 0; i<arrayParse.length-1; i++){
                if(i == arrayParse.length-1)
                {
                    arraySave.push({
                        x:(new Date(arrayParse[i])).getTime(),
                        x2:(new Date(arrayParse[i])).getTime(),
                        y:y
                    })
                }
                else {
                    arraySave.push({
                        x: (new Date(arrayParse[i])).getTime(),
                        x2: (new Date(arrayParse[i + 1])).getTime(),
                        y: y
                    })
                }
            }
        }
    }
    // Иначе в массив парсится переданный массив с именем программы
    else {
        while(index_pars < arrayParse.length)
        {   // Парсинг
            arraySave.push({
                x:(new Date(arrayParse[index_pars*2])).getTime(),
                x2:(new Date(arrayParse[index_pars * 2 + 1])).getTime(),
                y:y,
                partialFill: difference})
            index_pars += 1;
        }
    }
    // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
    return arraySave
}

// Функция вычисления часов работы для круговой диаграммы.
function getRoundDiagramData(smena){
    // Создаем пустой массив
    let arrayRound = []

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
            if(arraySmena == null || arraySmena.length <= 1 || arraySmena == undefined){
                arrayRound.push(delta)
                return
            }
            // Иначе
            else{   // Начиная с первого элемента с шагом 2
                for(let i = 1; i < arraySmena.length; i+=2){
                    // старая заглушка
                    if(i==0) continue

                    // Вычисления дельты, сумма всех разниц между началом работы и концом.
                    delta = delta + (new Date(arraySmena[i]).getTime()) - (new Date(arraySmena[i-1]).getTime())
                }
            }
            // После вычисления добавить в массив
            arrayRound.push(delta)
        })

        // После вычисления всех состояний, записать текущий массив в смену
        smena.push(arrayRound)
    }
}

function convertDaysToSmena(today, yesterday, calendarDate=null) {
    // Массив с заполненными данными
    let time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    // Преобразоавние текущего времение в формат '2022-03-21 10:00:35'
    time = time.slice(0, 10) + " " + time.slice(11, 19);

    let startTime = null

    // Дата с календаря(В данный момент, просто текущая дата)
    if(calendarDate == null) {
        startTime = time.slice(0, 10)
    }
    else {
        startTime = calendarDate
    }

    // Перевод в иной формат
    today = [today.workArray, today.pauseArray, today.offArray, today.avarArray, today.ruchnoyArray, today.programName, today.roundArray]
    yesterday = [yesterday.workArray, yesterday.pauseArray, yesterday.offArray, yesterday.avarArray, yesterday.ruchnoyArray, yesterday.programName, yesterday.roundArray]


    // дата предыдущего дня
    let pastTime  = new Date((new Date(startTime)).getTime() - 86400000).toISOString().slice(0, 10)

    // Переменные массивов для двух смен
    let smena_1 = [];
    let smena_2 = [];

    // Переменные массивов для имен программ двух смен
    let programName1 = []
    let programName2 = []

    // Переменная с индексом первого элемента следующего дня имени программы
    let programName2Index = 400

    // Получении объекта с именем текущего станка
    // Хранящий объедененные массивы текущего и предыдущего дня

    let stanok = []
    for (let i=0; 6 > i; i++)
    {   // метод concat объединяет массивы
        if(today[i] != undefined && yesterday[i] != undefined) {
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

    return [smena_1, smena_2]
}

function parseLinearSutki(arrayParse, y, date, arrayName = null) {

    arrayParse = addLastTime(arrayParse, date)

    var index_pars = 0; // Индекс по одному из циклов
    var arraySave = [] // Массив, который будет заполняться

    // Определение длины цикла. Длина парсящего массива делить на 2 - 2. 300 = 148
    var lengh = arrayParse.length
    if (lengh <= 1) {
        return
    }

    if (lengh >= 4) {
        if (lengh % 2 == 1) lengh -= 1
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
    arraySave = addLastTime(arraySave, date)

    return arraySave
}

function addLastTime(stanok, calendarDate) {

    let time = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    time = time.slice(0, 10) + " " + time.slice(11, 19);

    if (stanok.length % 2 == 1) {
        if (calendarDate == time.slice(0, 10)) {   // То добавить во вторую смену текущее время
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
        if (lengh % 2 == 1) lengh -= 1
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

function averageMonthdata(inputArray) {
    let sum = inputArray.reduce((a, b) => a + b, 0);
    return (sum / inputArray.length) || 0;

}