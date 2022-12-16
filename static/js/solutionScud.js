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

function getOutWorkTimeArray(array, date, smenaState) {

    let outArray = array.slice()

    if (smenaState == '8') {
        if (outArray[0] !== `${dayYesterday(date)} 07:00:00`) {
            outArray.unshift(`${dayYesterday(date)} 07:00:00`)
        } else outArray.splice(0, 1)
        if (outArray[outArray.length - 1] !== `${date} 07:00:00`) outArray.push(`${date} 07:00:00`)
    }

    if (smenaState == '7') {
        if (outArray[0] !== `${dayYesterday(date)} 06:50:00`) {
            outArray.unshift(`${dayYesterday(date)} 06:50:00`)
        } else outArray.splice(0, 1)
        if (outArray[outArray.length - 1] !== `${date} 06:50:00`) outArray.push(`${date} 06:50:00`)
    }

    if (smenaState == '11') {
        if (outArray[0] !== `${dayYesterday(date)} 06:45:00`) {
            outArray.unshift(`${dayYesterday(date)} 06:45:00`)
        } else outArray.splice(0, 1)
        if (outArray[outArray.length - 1] !== `${date} 06:45:00`) outArray.push(`${date} 06:45:00`)
    }

    if (smenaState == '24') {
        if (outArray[0] !== `${dayYesterday(date)} 07:00:00`) {
            outArray.unshift(`${dayYesterday(date)} 07:00:00`)
        } else outArray.splice(0, 1)
        if (outArray[outArray.length - 1] !== `${date} 08:00:00`) outArray.push(`${date} 08:00:00`)
    }

    if (smenaState == '8и') {
        if (outArray[0] !== `${date} 00:00:00`) {
            outArray.unshift(`${date} 00:00:00`)
        } else outArray.splice(0, 1)

        if (date == dayNow()) {
            if (outArray[outArray.length - 1] !== `${date} ${timeNow()}`) outArray.push(`${date} ${timeNow()}`)
        } else if (outArray[outArray.length - 1] !== `${date} 23:59:59`) outArray.push(`${date} 23:59:59`)
    }

    return outArray
}

function createUserDataStructure(data) {
    let userData = {}

    for (let i = 0; i < data.username.length; i++) {
        userData[data.username[i]] = {
            name: data.username[i],
            tabid: data.tabid[i],
            POS: data.POS[i],
            logtime: [],
            statusInOut: [],
            smenaInfo: data.typeSmena[i],
            photo: data.photo[data.tabid[i]]
        }
    }

    data.logtime.forEach((e, i) => {
        userData[data.username[i]].logtime.push(e)
        userData[data.username[i]].statusInOut.push(data.statusInOut[i])
    })

    return userData
}

function getLastDate(inWork, outWork, y, smenaState) {
    let date = dayTimeNow()

    let lastInWork = inWork[inWork.length - 1]
    let lastoutWork = outWork[outWork.length - 1]

    let last = (new Date(lastInWork) >= lastoutWork) ? lastInWork : lastoutWork

    if (date.slice(0, 10) == last.slice(0, 10) && (smenaState == '8и')) {
        return parseScudForHighcharts([last, `${last.slice(0, 10)} 23:59:59`], y)
    } else return null
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

function dublicateDeleteFilter(arrayData, arrayInOut) {
    let filterData = []
    let filterInOut = []

    for (let i = 0; i < arrayInOut.length; i++) {
        if (i == arrayInOut.length - 1) {
            filterData.push(arrayData[i])
            filterInOut.push(arrayInOut[i])
        } else if (arrayInOut[i] != arrayInOut[i + 1]) {
            filterData.push(arrayData[i])
            filterInOut.push(arrayInOut[i])
        }
    }

    return [filterData, filterInOut]
}

function addStartOrEnd(filterArrays, typeTime = '8и', date) {

    let filterData = filterArrays[0]
    let filterInOut = filterArrays[1]

    let currentDate = dayNow()

    let startTime = null
    let endTime = null

    switch (typeTime) {
        case '8и':
            startTime = date + ' 00:00:00'
            endTime = (currentDate == date) ? date + ' ' + timeNow() : date + ' 23:59:59'
            break;
        case '8':
            startTime = dayYesterday(date) + ' 07:00:00'
            endTime = date + ' 07:00:00'
            break;
        case '7':
            startTime = dayYesterday(date) + ' 06:50:00'
            endTime = date + ' 06:50:00'
            break;
        case '11':
            startTime = dayYesterday(date) + ' 06:45:00'
            endTime = date + ' 06:45:00'
            break;
        case '24':
            startTime = dayYesterday(date) + ' 07:00:00'
            endTime = date + ' 08:00:00'
            break;
        default:
            startTime = date + ' 00:00:00'
            endTime = (currentDate == date) ? date + ' ' + timeNow() : date + ' 23:59:59'
            break
    }

    if (filterInOut[0] == 'output') {
        filterData.unshift(startTime)
    }
    if (filterInOut[filterInOut.length - 1] == 'input') {
        filterData.push(endTime)
    }

    return filterData
}

function insideFilterLunch(startLunch, endLunch, dateArray) {

    let arrayClear = []
    let arraySave = []

    for (let i = 0; i < dateArray.length; i++) {
        if (
            new Date(dateArray[i]).getTime() >= new Date(startLunch).getTime() &&
            new Date(dateArray[i]).getTime() < new Date(endLunch).getTime()
        ) {
        } else arrayClear.push(dateArray[i])
    }
    arraySave = arrayClear.slice()

    for (let i = 0; i < arrayClear.length; i++) {
        if (arrayClear.length == 1) {
            if (new Date(arrayClear[i]).getTime() < new Date(startLunch).getTime()) {
                arraySave.push(startLunch)
            } else arraySave.unshift(endLunch)

        } else if (
            new Date(arrayClear[i]).getTime() < new Date(startLunch).getTime() &&
            new Date(arrayClear[i + 1]).getTime() > new Date(endLunch).getTime()
        ) {
            if (arrayClear.length % 2 == 0) {
                if (i % 2 == 0) arraySave.splice(i + 1, 0, ...[startLunch, endLunch])
            } else if (i % 2 == 0) {
                arraySave.splice(i + 1, 0, startLunch)
            } else arraySave.splice(i + 1, 0, endLunch)
        } else if (
            i % 2 == 0 &&
            arrayClear.length - 1 == i &&
            new Date(arrayClear[i]).getTime() < new Date(startLunch).getTime()
        ) {
            arraySave.push(startLunch)
        } else if (
            i == 0 &&
            arrayClear.length % 2 == 1 &&
            new Date(arrayClear[i]).getTime() > new Date(endLunch).getTime()
        ) {
            arraySave.unshift(endLunch)
        }
    }
    return arraySave
}

function filterLunch(dateArray, date, smenaState) {

    let startLunch = null
    let endLunch = null

    let startLunch2 = null
    let endLunch2 = null

    let startLunch3 = null
    let endLunch3 = null

    let startLunch4 = null
    let endLunch4 = null

    let yesterday = dayYesterday(date)

    let arraySave = []

    switch (smenaState) {
        case '8и':
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            break;
        case '8':
            startLunch = yesterday + ' 11:30:00'
            endLunch = yesterday + ' 12:00:00'

            startLunch2 = yesterday + ' 19:30:00'
            endLunch2 = yesterday + ' 20:00:00'

            startLunch3 = date + ' 03:00:00'
            endLunch3 = date + ' 03:30:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        case '7':
            startLunch = yesterday + ' 11:30:00'
            endLunch = yesterday + ' 12:30:00'

            startLunch2 = yesterday + ' 19:30:00'
            endLunch2 = yesterday + ' 20:30:00'

            startLunch3 = date + ' 03:00:00'
            endLunch3 = date + ' 04:00:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        case '11':
            startLunch = yesterday + ' 11:30:00'
            endLunch = yesterday + ' 12:00:00'

            startLunch2 = yesterday + ' 16:00:00'
            endLunch2 = yesterday + ' 16:30:00'

            startLunch3 = yesterday + ' 23:00:00'
            endLunch3 = yesterday + ' 23:30:00'

            startLunch4 = date + ' 03:30:00'
            endLunch4 = date + ' 04:00:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            arraySave = insideFilterLunch(startLunch4, endLunch4, arraySave)
            break;
        case '24':
            startLunch = yesterday + ' 12:30:00'
            endLunch = yesterday + ' 13:00:00'

            startLunch2 = yesterday + ' 20:00:00'
            endLunch2 = yesterday + ' 20:30:00'

            startLunch3 = date + ' 04:00:00'
            endLunch3 = date + ' 04:30:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        default:
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
    }
    return arraySave
}

function parseScudForHighcharts(arrayParse, y) {
    let arraySave = []

    let msArray = arrayParse.map(e => {
        return new Date(e).getTime()
    })

    for (let i = 1; i < msArray.length; i += 2) {
        arraySave.push({
            x: msArray[i - 1],
            x2: msArray[i],
            y: y,
        })
    }
    return arraySave
}

function parseScudLunches(smenaState, date,  y) {

    let arraySave = []
    let yesterday = dayYesterday(date)

    let startLunch = null
    let endLunch = null

    let startLunch2 = null
    let endLunch2 = null

    let startLunch3 = null
    let endLunch3 = null

    let startLunch4 = null
    let endLunch4 = null

    switch (smenaState) {
        case '8и':
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'

            arraySave.push({
                x: new Date(startLunch).getTime(),
                x2: new Date(endLunch).getTime(),
                y: y,
            })

            break;
        case '8':
            startLunch = yesterday + ' 11:30:00'
            endLunch = yesterday + ' 12:00:00'

            startLunch2 = yesterday + ' 19:30:00'
            endLunch2 = yesterday + ' 20:00:00'

            startLunch3 = date + ' 03:00:00'
            endLunch3 = date + ' 03:30:00'

            arraySave.push({
                x: new Date(startLunch).getTime(),
                x2: new Date(endLunch).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch2).getTime(),
                x2: new Date(endLunch2).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch3).getTime(),
                x2: new Date(endLunch3).getTime(),
                y: y,
            })
            break;
        case '7':
            startLunch = yesterday + ' 11:30:00'
            endLunch = yesterday + ' 12:30:00'

            startLunch2 = yesterday + ' 19:30:00'
            endLunch2 = yesterday + ' 20:30:00'

            startLunch3 = date + ' 03:00:00'
            endLunch3 = date + ' 04:00:00'

            arraySave.push({
                x: new Date(startLunch).getTime(),
                x2: new Date(endLunch).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch2).getTime(),
                x2: new Date(endLunch2).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch3).getTime(),
                x2: new Date(endLunch3).getTime(),
                y: y,
            })
            break;
        case '11':
            startLunch = yesterday + ' 11:30:00'
            endLunch = yesterday + ' 12:00:00'

            startLunch2 = yesterday + ' 16:00:00'
            endLunch2 = yesterday + ' 16:30:00'

            startLunch3 = yesterday + ' 23:00:00'
            endLunch3 = yesterday + ' 23:30:00'

            startLunch4 = date + ' 03:30:00'
            endLunch4 = date + ' 04:00:00'

            arraySave.push({
                x: new Date(startLunch).getTime(),
                x2: new Date(endLunch).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch2).getTime(),
                x2: new Date(endLunch2).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch3).getTime(),
                x2: new Date(endLunch3).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch4).getTime(),
                x2: new Date(endLunch4).getTime(),
                y: y,
            })
            break;
        case '24':
            startLunch = yesterday + ' 12:30:00'
            endLunch = yesterday + ' 13:00:00'

            startLunch2 = yesterday + ' 20:00:00'
            endLunch2 = yesterday + ' 20:30:00'

            startLunch3 = date + ' 04:00:00'
            endLunch3 = date + ' 04:30:00'

            arraySave.push({
                x: new Date(startLunch).getTime(),
                x2: new Date(endLunch).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch2).getTime(),
                x2: new Date(endLunch2).getTime(),
                y: y,
            })
            arraySave.push({
                x: new Date(startLunch3).getTime(),
                x2: new Date(endLunch3).getTime(),
                y: y,
            })
            break;
        default:
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'

            arraySave.push({
                x: new Date(startLunch).getTime(),
                x2: new Date(endLunch).getTime(),
                y: y,
            })
    }
    return arraySave
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
                arrayData.push(filterY(userData[e]['highchartsBlack'],i))
            }
            arrayData.push(filterY(userData[e]['highchartsWork'], i))
            arrayData.push(filterY(userData[e]['highchartsOutWork'], i))
            arrayData.push(filterY(userData[e]['highchartsLunch'],i))
            workTime.push(userData[e]['workTime'])
            tabelArray.push(userData[e]['tabid'])
        })
    } else {
        Object.keys(userData).forEach((e, i) => {
            arrayNames.push(`${i + 1}. таб. ${userData[e]['tabid']} - ${e} (${userData[e]['POS'] == '' ? 'должность не указана' : userData[e]['POS']})`)
            arrayData.push(userData[e]['highchartsWork'])
            arrayData.push(userData[e]['highchartsOutWork'])
            arrayData.push(userData[e]['highchartsLunch'],i)
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
                    data: arrayData[i+1],
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
                    data: arrayData[i+2],
                })
        }
    }

    return [series, arrayNames, workTime, tabelArray]
}

function getLunchHeight(heightHighchartContainer) {
    let addHeight = 52
    switch (heightHighchartContainer) {
        case 1:
            addHeight = 210
            break
        case 2:
            addHeight = 105
            break
        case 3:
            addHeight = 70
            break
        case 4:
            addHeight = 52
            break
        case 5:
            addHeight = 42
            break
        case 6:
            addHeight = 38
            break
        case 7:
            addHeight = 39.5
            break
        case 8:
            addHeight = 40.875
            break
        case 10:
            addHeight = 43
            break
        default:
            addHeight = 52
            break
    }

    let height = (heightHighchartContainer > 10) ? 52 * (heightHighchartContainer - 2) + 13 :
        (heightHighchartContainer > 0) ? addHeight * heightHighchartContainer : 0
    return height
}

function getOtklonHeight(heightHighchartContainer) {
    let height = '52px'

    switch (heightHighchartContainer) {
        case 1:
            height = '210px'
            break
        case 2:
            height = '105px'
            break
        case 3:
            height = '70px'
            break
        case 4:
            height = '52px'
            break
        case 5:
            height = '42px'
            break
        case 6:
            height = '38px'
            break
        case 7:
            height = '39.5px'
            break
        case 8:
            height = '40.875px'
        case 10:
            height = '43px'
            break
        default:
            height = '52px'
            break
    }
    return height
}

function msToTimeScud(duration, date = 24) {

    let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);


    if (hours <= 9) hours = '0' + hours

    if (minutes <= 9) minutes = '0' + minutes

    return `${hours}:${minutes}`
}

function getSmenaTime(typeSmena) {
    let smenaTime = 0

    switch (typeSmena) {
        case '8и':
            smenaTime = 28800000
            break;
        case '8':
            smenaTime = 28800000
            break;
        case '7':
            smenaTime = 26400000
            break;
        case '11':
            smenaTime = 39600000
            break;
        case '24':
            smenaTime = 81000000
            break;
        default:
            smenaTime = 28800000
            break
    }
    return smenaTime
}

function selectObjectsWithSmena(userData, smenaState) {
    let obj = {}
    Object.keys(userData).forEach(name => {
        if (userData[name].smenaInfo !== '') {
            if (userData[name].smenaInfo == smenaState) {
                obj[name] = userData[name]
            }
        }
    })
    return obj
}

function changeLunchOpacity() {

    let highchartsTracker = document.getElementsByClassName('highcharts-tracker')
    let lunchTimes = document.getElementsByClassName('lunchTime')

    for (let i = 0; i < lunchTimes.length; i++) {
        for (let j = 0; j < highchartsTracker.length; j++) {

            if(highchartsTracker[j].lastChild.lastChild !== undefined){
                if(highchartsTracker[j].lastChild.lastChild.getAttribute('fill') == 'rgba(26, 170, 229, 0.6)'){
                    highchartsTracker[j].style.pointerEvents = "none";
                }
            }
            //
            // highchartsTracker[j].addEventListener('mouseover', (event) => {
            //     lunchTimes[i].classList.add('lunchTimeHide')
            // });
            // highchartsTracker[j].addEventListener('mouseleave', (event) => {
            //     lunchTimes[i].classList.remove('lunchTimeHide')
            // });
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

    let pathName = 'office'

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