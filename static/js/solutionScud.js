function getWorkTime(dateArray) {
    let time = 0

    let msArray = dateArray.map(e => {
        return new Date(e).getTime()
    })

    for (let i = 1; i < msArray.length; i += 2) {
        time += msArray[i] - msArray[i - 1]
    }

    // time = msToTimeDays(time)
    return time
}

//new
function getOutWorkTimeArray(array, date, smenaState) {
    let outArray = array.slice();
    const shiftValues = {
        '8': ['07:00:00', '07:00:00'],
        '7': ['06:50:00', '06:50:00'],
        '11': ['06:45:00', '06:45:00'],
        '24': ['07:00:00', '08:00:00'],
        '8и': ['00:00:00', date == dayNow() ? timeNow() : '23:59:59'],
    };

    const [startTime, endTime] = shiftValues[smenaState];
    const start = smenaState == '8и' ? `${date} 00:00:00` : `${dayYesterday(date)} ${startTime}`;
    const end = `${date} ${endTime}`;

    if (outArray[0] !== start) outArray.unshift(start);
    else outArray.splice(0, 1);
    if (outArray[outArray.length - 1] !== end) outArray.push(end);

    return outArray;
}

//new
function createUserDataStructure(data) {
    let userData = {}

    data.username.forEach((username, i) => {
        userData[data.username[i]] = {
            name: data.username[i],
            tabid: data.tabid[i],
            POS: data.POS[i],
            logtime: [],
            statusInOut: [],
            smenaInfo: data.typeSmena[i],
            photo: data.photo[data.tabid[i]]
        }
    })

    data.logtime.forEach((e, i) => {
        userData[data.username[i]].logtime.push(e)
        userData[data.username[i]].statusInOut.push(data.statusInOut[i])
    })

    return userData
}

//new
function getLastDate(inWork, outWork, y, smenaState) {
    let date = dayTimeNow()
    let lastInWork = inWork[inWork.length - 1]
    let lastoutWork = outWork[outWork.length - 1]
    let last = (new Date(lastInWork) >= lastoutWork) ? lastInWork : lastoutWork

    return (date.slice(0, 10) == last.slice(0, 10) && (smenaState == '8и'))
        ? parseScudForHighcharts([last, `${last.slice(0, 10)} 23:59:59`], y)
        : null;
}

function applyFilters(userData, smenaState, date) {

    Object.keys(userData).forEach((e, i) => {
        let noDublicateArrays = dublicateDeleteFilter(userData[e].logtime, userData[e].statusInOut)

        let arrayAddStartOrEnd = addStartOrEnd(noDublicateArrays, smenaState, date)

        let arrayWithOutLunch = filterLunch(arrayAddStartOrEnd, date, smenaState)
        userData[e].workTime = getWorkTime(arrayWithOutLunch)

        let inWork = arrayAddStartOrEnd
        let outWork = getOutWorkTimeArray(arrayAddStartOrEnd, date, smenaState)

        parseScudLunches(smenaState, date, i)

        userData[e].highchartsWork = parseScudForHighcharts(inWork, i)
        userData[e].highchartsOutWork = parseScudForHighcharts(outWork, i)
        userData[e].highchartsBlack = getLastDate(inWork, outWork, i, smenaState)
        userData[e].highchartsLunch = parseScudLunches(smenaState, date, i)
    })
    return userData
}

//new
function dublicateDeleteFilter(arrayData, arrayInOut) {
    let filterData = []
    let filterInOut = []

    for (let i = 0; i < arrayInOut.length; i++) {
        if (i == arrayInOut.length - 1 || arrayInOut[i] != arrayInOut[i + 1]) {
            filterData.push(arrayData[i])
            filterInOut.push(arrayInOut[i])
        }
    }
    return [filterData, filterInOut]
}

//new
function addStartOrEnd(filterArrays, typeTime = '8и', date) {

    let [filterData, filterInOut] = filterArrays

    let timeMap = {
        '8и': [date + ' 00:00:00', (date == dayNow()) ? date + ' ' + timeNow() : date + ' 23:59:59'],
        '8': [dayYesterday(date) + ' 07:00:00', date + ' 07:00:00'],
        '7': [dayYesterday(date) + ' 06:50:00', date + ' 06:50:00'],
        '11': [dayYesterday(date) + ' 06:45:00', date + ' 06:45:00'],
        '24': [dayYesterday(date) + ' 07:00:00', date + ' 08:00:00']
    }

    let [startTime, endTime] = timeMap[typeTime]

    if (filterInOut[0] == 'output') {
        filterData.unshift(startTime)
    }
    if (filterInOut[filterInOut.length - 1] == 'input') {
        filterData.push(endTime)
    }

    return filterData
}

//new
function insideFilterLunch(startLunch, endLunch, dateArray) {

    let arrayClear = []
    let arraySave = []
    let timeStartLunch = new Date(startLunch).getTime()
    let timeEndLunch = new Date(endLunch).getTime()

    for (let i = 0; i < dateArray.length; i++) {
        let timeArray = new Date(dateArray[i]).getTime()
        if (timeArray >= timeStartLunch && timeArray < timeEndLunch) {
            continue
        }
        arrayClear.push(dateArray[i])
    }

    arraySave = arrayClear.slice()
    let lengthArray = arrayClear.length

    for (let i = 0; i < lengthArray; i++) {
        let timeArray = new Date(arrayClear[i]).getTime()
        if (lengthArray == 1) {
            (timeArray < timeStartLunch) ? arraySave.push(startLunch) : arraySave.unshift(endLunch)
        } else if (timeArray < timeStartLunch && new Date(arrayClear[i + 1]).getTime() > timeEndLunch) {
            if (lengthArray % 2 == 0) {
                if (i % 2 == 0) arraySave.splice(i + 1, 0, ...[startLunch, endLunch])
            } else if (i % 2 == 0) {
                arraySave.splice(i + 1, 0, startLunch)
            } else arraySave.splice(i + 1, 0, endLunch)
        } else if (i % 2 == 0 && lengthArray - 1 == i && timeArray < timeEndLunch) {
            arraySave.push(startLunch)
        } else if (i == 0 && lengthArray % 2 == 1 && timeArray > timeEndLunch) {
            arraySave.unshift(endLunch)
        }
    }
    return arraySave
}

//new
function filterLunch(dateArray, date, smenaState) {
    let yesterday = dayYesterday(date);
    let lunchPeriods = [];
    switch (smenaState) {
        case '8и':
            lunchPeriods = [[date + ' 12:00:00', date + ' 13:00:00']];
            break;
        case '8':
            lunchPeriods = [
                [yesterday + ' 11:30:00', yesterday + ' 12:00:00'],
                [yesterday + ' 19:30:00', yesterday + ' 20:00:00'],
                [date + ' 03:00:00', date + ' 03:30:00']
            ];
            break;
        case '7':
            lunchPeriods = [
                [yesterday + ' 11:30:00', yesterday + ' 12:30:00'],
                [yesterday + ' 19:30:00', yesterday + ' 20:30:00'],
                [date + ' 03:00:00', date + ' 04:00:00']
            ];
            break;
        case '11':
            lunchPeriods = [
                [yesterday + ' 11:30:00', yesterday + ' 12:00:00'],
                [yesterday + ' 16:00:00', yesterday + ' 16:30:00'],
                [yesterday + ' 23:00:00', yesterday + ' 23:30:00'],
                [date + ' 03:30:00', date + ' 04:00:00']
            ];
            break;
        case '24':
            lunchPeriods = [
                [yesterday + ' 12:30:00', yesterday + ' 13:00:00'],
                [yesterday + ' 20:00:00', yesterday + ' 20:30:00'],
                [date + ' 04:00:00', date + ' 04:30:00']
            ];
            break;
        default:
            lunchPeriods = [[date + ' 12:00:00', date + ' 13:00:00']];
    }

    return lunchPeriods.reduce((filteredArray, period) => {
        return insideFilterLunch(period[0], period[1], filteredArray);
    }, dateArray);
}

//new
function parseScudForHighcharts(arrayParse, y) {
    return arrayParse.map((date, i) => i % 2 && {
        x: new Date(arrayParse[i - 1]).getTime(),
        x2: new Date(date).getTime(),
        y
    })
}

//new
function parseScudLunches(smenaState, date, y) {
    let yesterday = dayYesterday(date);
    let lunches = {
        '8и': [
            {start: `${date} 12:00:00`, end: `${date} 13:00:00`}
        ],
        '8': [
            {start: `${yesterday} 11:30:00`, end: `${yesterday} 12:00:00`},
            {start: `${yesterday} 19:30:00`, end: `${yesterday} 20:00:00`},
            {start: `${date} 03:00:00`, end: `${date} 03:30:00`}
        ],
        '7': [
            {start: `${yesterday} 11:30:00`, end: `${yesterday} 12:30:00`},
            {start: `${yesterday} 19:30:00`, end: `${yesterday} 20:30:00`},
            {start: `${date} 03:00:00`, end: `${date} 04:00:00`}
        ],
        '11': [
            {start: `${yesterday} 11:30:00`, end: `${yesterday} 12:00:00`},
            {start: `${yesterday} 16:00:00`, end: `${yesterday} 16:30:00`},
            {start: `${yesterday} 23:00:00`, end: `${yesterday} 23:30:00`},
            {start: `${date} 03:30:00`, end: `${date} 04:00:00`}
        ],
        '24': [
            {start: `${yesterday} 12:30:00`, end: `${yesterday} 13:00:00`},
            {start: `${yesterday} 20:00:00`, end: `${yesterday} 20:30:00`},
            {start: `${date} 04:00:00`, end: `${date} 04:30:00`}
        ]
    };

    let lunchArray = lunches[smenaState];
    if (!lunchArray) return [];

    return lunchArray.map(({start, end}) => ({
        x: new Date(start).getTime(),
        x2: new Date(end).getTime(),
        y
    }));
}

function getHighchartSeriesAndNames(userData) {

    let arrayNames = []
    let arrayData = []
    let workTime = []
    let tabelArray = []

    let blackArrayTrigger = false
    let sortTrigger = true

    if (sortTrigger) {
        // Сортировка ключей по времени работы
        let keysSorted = Object.keys(userData).sort(function (a, b) {
            return userData[b]['workTime'] - userData[a]['workTime']
        })

        keysSorted.forEach((e, i) => {
            arrayNames.push(`${i + 1}. таб. ${userData[e]['tabid']} - ${e} (${userData[e]['POS'] == '' ? 'должность не указана' : userData[e]['POS']})`)
            if (userData[e]['highchartsBlack'] != null) {
                blackArrayTrigger = true
                arrayData.push(filterY(userData[e]['highchartsBlack'], i))
            }
            arrayData.push(filterY(userData[e]['highchartsWork'], i))
            arrayData.push(filterY(userData[e]['highchartsOutWork'], i))
            arrayData.push(filterY(userData[e]['highchartsLunch'], i))
            workTime.push(userData[e]['workTime'])
            tabelArray.push(userData[e]['tabid'])
        })
    } else {
        Object.keys(userData).forEach((e, i) => {
            arrayNames.push(`${i + 1}. таб. ${userData[e]['tabid']} - ${e} (${userData[e]['POS'] == '' ? 'должность не указана' : userData[e]['POS']})`)
            arrayData.push(userData[e]['highchartsWork'])
            arrayData.push(userData[e]['highchartsOutWork'])
            arrayData.push(userData[e]['highchartsLunch'], i)
            workTime.push(userData[e]['workTime'])
            tabelArray.push(userData[e]['tabid'])
            if (userData[e]['highchartsBlack'] != null) {
                blackArrayTrigger = true
                arrayData.push(userData[e]['highchartsBlack'])
            }
        })
    }

    let series = []

    if (blackArrayTrigger) {
        for (let i = 0; i < arrayData.length; i += 4) {
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: '#252734',
                tooltip: {
                    enabled: false,
                    pointFormatter: function () {
                        return '<p></p>'
                    },
                },
                borderColor: '#252734',
                data: arrayData[i],
            })
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: '#38e817',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTimeDays(this.x2 - this.x)
                        return '<b>Работает </b>' + timer
                    },
                },
                data: arrayData[i + 1],
            })
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: '#ffea32',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTimeDays(this.x2 - this.x)
                        return '<b>Нет на месте </b>' + timer
                    },
                },
                data: arrayData[i + 2],
            })
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: 'rgba(26, 170, 229, 0.6)',
                tooltip: {
                    enabled: false,
                    pointFormatter: function () {
                        return '<p></p>'
                    },
                },
                borderColor: 'rgba(26, 170, 229, 0.6)',
                data: arrayData[i + 3],
            })
        }
    } else {
        for (let i = 0; i < arrayData.length; i += 3) {
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: '#38e817',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTimeDays(this.x2 - this.x)
                        return '<b>Работает </b>' + timer
                    },
                },
                data: arrayData[i],
            })
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: '#ffea32',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTimeDays(this.x2 - this.x)
                        return '<b>Нет на месте </b>' + timer
                    },
                },
                data: arrayData[i + 1],
            })
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: 'rgba(26, 170, 229, 0.6)',
                tooltip: {
                    enabled: false,
                    pointFormatter: function () {
                        return '<p></p>'
                    },
                },
                borderColor: 'rgba(26, 170, 229, 0.6)',
                data: arrayData[i + 2],
            })
        }
    }

    return [series, arrayNames, workTime, tabelArray]
}

//new
function getLunchHeight(heightHighchartContainer) {
    const addHeightLookup = {
        1: 210,
        2: 105,
        3: 70,
        4: 52,
        5: 42,
        6: 38,
        7: 39.5,
        8: 40.875,
        10: 43,
    }

    let addHeight = addHeightLookup[heightHighchartContainer] || 52
    let height = (heightHighchartContainer > 10) ? 52 * (heightHighchartContainer - 2) + 13 :
        (heightHighchartContainer > 0) ? addHeight * heightHighchartContainer : 0
    return height
}

//new
function getOtklonHeight(heightHighchartContainer) {
    const addHeightLookup = {
        1: '210px',
        2: '105px',
        3: '70px',
        4: '52px',
        5: '42px',
        6: '38px',
        7: '39.5px',
        8: '40.875px',
        10: '43px',
    }
    return addHeightLookup[heightHighchartContainer]
}

function msToTimeScud(duration, date = 24) {

    let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    if (hours <= 9) hours = '0' + hours

    if (minutes <= 9) minutes = '0' + minutes

    return `${hours}:${minutes}`
}

//new
function getSmenaTime(typeSmena) {
    let smenaType = {
        '8и': 28800000,
        '8': 28800000,
        '7': 26400000,
        '11': 39600000,
        '24': 81000000
    }
    return smenaType[typeSmena]
}

//new
function selectObjectsWithSmena(userData, smenaState) {
    let obj = {}
    Object.keys(userData).forEach(name => {
        if (userData[name].smenaInfo !== '' && userData[name].smenaInfo == smenaState) {
            obj[name] = userData[name]
        }
    })
    return obj
}

//new
function changeLunchOpacity() {

    let highchartsTracker = document.getElementsByClassName('highcharts-tracker')
    let lunchTimes = document.getElementsByClassName('lunchTime')

    for (let i = 0; i < lunchTimes.length; i++) {
        for (let j = 0; j < highchartsTracker.length; j++) {
            let lastChild = highchartsTracker[j].lastChild.lastChild
            if (lastChild !== undefined && lastChild.getAttribute('fill') == 'rgba(26, 170, 229, 0.6)') {
                highchartsTracker[j].style.pointerEvents = "none";
            }
        }
    }
}

function filterY(data, y) {
    data.forEach((e, i) => {
        data[i]['y'] = y
    })
    return data
}

function defenseFromManyRequest(setFunction) {
    setFunction(true)
    let interval = setTimeout(() => {
        setFunction(false)
        clearInterval(interval)
    }, 2000)
}

function getScudBotUrl() {

    let pathName

    if (location.pathname.includes('1ploshadka')) {
        pathName = '1ploshadka'
    } else if (location.pathname.includes('2ploshadka')) {
        pathName = '2ploshadka'
    } else {
        pathName = 'office'
    }

    let form_path = decodeURIComponent(location.pathname);
    let searchIndex = form_path.lastIndexOf("-") + 1;
    form_path = form_path.substr(searchIndex, form_path.length)

    return [pathName, form_path]
}

function setSize(left, width) {
    return {
        left: left,
        width: width
    }
}

function setHeight(heightHighchartContainer) {
    return {
        height: 52 * heightHighchartContainer
    }
}

function getLunchArrays(smenaState, date) {

    const times = {
        '03:00': date + ' 03:00:00',
        '03:30': date + ' 03:30:00',
        '04:00': date + ' 04:00:00',
        '04:30': date + ' 04:30:00',
        '11:30': date + ' 11:30:00',
        '12:00': date + ' 12:00:00',
        '12:30': date + ' 12:30:00',
        '13:00': date + ' 13:00:00',
        '16:00': date + ' 16:00:00',
        '16:30': date + ' 16:30:00',
        '19:30': date + ' 19:30:00',
        '20:00': date + ' 20:00:00',
        '23:00': date + ' 23:00:00',
        '23:30': date + ' 23:30:00',
    }

    let lunchArrays = []

    switch (smenaState) {
        case '8и':
            lunchArrays.push([times['12:00'], times['13:00']])
            return lunchArrays
        case '8':
            lunchArrays.push([times['03:00'], times['03:30']])
            lunchArrays.push([times['11:30'], times['12:00']])
            lunchArrays.push([times['19:30'], times['20:00']])
            return lunchArrays
        case '7':
            lunchArrays.push([times['03:00'], times['04:00']])
            lunchArrays.push([times['11:30'], times['12:30']])
            lunchArrays.push([times['19:30'], times['20:30']])
            return lunchArrays
        case '11':
            lunchArrays.push([times['03:30'], times['04:00']])
            lunchArrays.push([times['11:30'], times['12:00']])
            lunchArrays.push([times['16:00'], times['16:30']])
            lunchArrays.push([times['23:00'], times['23:30']])
            return lunchArrays
        case '24':
            lunchArrays.push([times['04:00'], times['04:30']])
            lunchArrays.push([times['12:30'], times['13:00']])
            lunchArrays.push([times['20:00'], times['20:30']])
            return lunchArrays
        case '':
            lunchArrays.push([times['12:00'], times['12:30']])
            return lunchArrays
        default:
            lunchArrays.push([times['12:00'], times['12:30']])
            return lunchArrays
    }

}

function filterLunchMonth(dateArray, date, smenaState) {

    let arraySave = dateArray

    let lunchArrays = getLunchArrays(smenaState, date)

    lunchArrays.forEach(lunchArray => {
        arraySave = insideFilterLunch(lunchArray[0], lunchArray[1], dateArray)
    })
    return arraySave
}

//new
function applyMonthFilters(usersData, userNames, date) {
    let lastMonthDay = countDaysInMonth(date);;

    userNames.forEach(userName => {
        // Формирую месячный объект пользователя
        usersData[userName].monthObject = {}

        // Создаю в нем столько массивов сколько дней в месяце
        // Для текущего месяца
        if (dayNow().slice(0, 7) == date) {
            for (let i = 1; i < +dayNow().slice(8, 10) + 1; i++) {
                usersData[userName].monthObject[i] = [[], []]
            }
            // Для предыдущего месяца
        } else {
            for (let i = 1; i < lastMonthDay + 1; i++) {
                usersData[userName].monthObject[i] = [[], []]
            }
        }

        // Удаляю дубликаты
        let noDublicateArrays = dublicateDeleteFilter(usersData[userName].logtime, usersData[userName].statusInOut)

        // Вставляю в массивы дней соответсвующие значения
        noDublicateArrays[0].forEach((d, i) => {
            usersData[userName].monthObject[+d.slice(8, 10)][0].push(d)
            usersData[userName].monthObject[+d.slice(8, 10)][1].push(noDublicateArrays[1][i])
        })

        // Общий счетчик часов
        let totalMonthTime = 0

        // Применяю фильтры
        for (let i = 1; i <= Object.keys(usersData[userName].monthObject).length; i++) {
            let indexDate = getDateFromIndex(date, i)
            let arrayAddStartOrEnd = addStartOrEnd(usersData[userName].monthObject[i], '8и', indexDate)
            let arrayWithOutLunch = filterLunchMonth(arrayAddStartOrEnd, indexDate, usersData[userName].smenaInfo)
            let workTime = getWorkTime(arrayWithOutLunch)
            // тут может стоит написать преобразования времени до десятичого числа без секунд

            totalMonthTime += workTime
            // Закомменченный вариант сохранения данных и массив и время, пока оставлю только время.
            // usersData[userName].monthObject[i] = [arrayWithOutLunch, msToTime(workTime)]
            usersData[userName].monthObject[i] = workTime
        }
        usersData[userName].monthTotalTime = totalMonthTime

        // Очистка ненужных полей
        usersData[userName].statusInOut = null
        usersData[userName].logtime = null
    })
    return usersData
}

function nameSort(a, b, obj) {
    let nameA = obj[a].name.toLowerCase(),
        nameB = obj[b].name.toLowerCase()

    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
}

function getDateFromIndex(date, index) {
    index = (index < 10) ? `0${index}` : `${index}`
    return `${date}-${index}`
}

function countDaysInMonth(dateString) {
    let year = parseInt(dateString.slice(0, 4));
    let month = parseInt(dateString.slice(5, 7));
    return new Date(year, month, 0).getDate();
}