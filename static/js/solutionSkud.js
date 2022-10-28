function getWorkTime(dateArray){
    let time = 0

    let msArray = dateArray.map(e=>{
        return new Date(e).getTime()
    })

    for(let i=1; i<msArray.length; i+=2){
        time += msArray[i] - msArray[i-1]
    }

    time = msToTime(time)
    return time
}

function getOutWorkTimeArray(array){

    let date = array[0].slice(0,10)

    let outArray = array.slice()

    if(outArray[0] !== `${date} 00:00:00`){
        outArray.unshift(`${date} 00:00:00`)
    }
    else outArray.splice(0,1)

    if(date == dayNow()){
        if(outArray[outArray.length-1] !== `${date} ${timeNow()}`) outArray.push(`${date} ${timeNow()}`)
    } else if(outArray[outArray.length-1] !== `${date} 23:59:59`) outArray.push(`${date} 23:59:59`)

    return outArray
}

function createUserDataStructure(data){
    let userData = {}

    for (let i = 0; i < data.username.length; i++) {
        userData[data.username[i]] = {
            name: data.username[i],
            tabid: data.tabid[i],
            POS: data.POS[i],
            logtime: [],
            statusInOut: [],
        }
    }

    data.logtime.forEach((e, i) => {
        userData[data.username[i]].logtime.push(e)
        userData[data.username[i]].statusInOut.push(data.statusInOut[i])
    })

    return userData
}

function getLastDate(outWork){
    let date = dayTimeNow()

    let lastInWork = inWork[inWork.length-1]
    let lastoutWork = outWork[outWork.length-1]

    let last = (new Date(lastInWork) >= lastoutWork)? lastInWork : lastoutWork

    if(date.slice(0,10) == last.slice(0,10)){
        return [last, `${last.slice(0,10)} 23:59:59`]
    }
    else return null
}

function applyFilters(userData){

    Object.keys(userData).forEach((e, i) => {
        let noDublicateArrays = dublicateDeleteFilter(userData[e].logtime, userData[e].statusInOut)
        let arrayAddStartOrEnd = addStartOrEnd(noDublicateArrays)
        let arrayWithOutLunch = filterLunch(arrayAddStartOrEnd)
        userData[e].workTime = getWorkTime(arrayWithOutLunch)

        let inWork = arrayAddStartOrEnd
        let outWork = getOutWorkTimeArray(arrayAddStartOrEnd)

        userData[e].highchartsWork = parseSkudForHighcharts(inWork, i)
        userData[e].highchartsOutWork = parseSkudForHighcharts(outWork, i)

        userData[e].highchartsBlack = getLastDate(outWork)

        console.log('Black array', userData[e].highchartsBlack)
    })
    return userData
}

function dublicateDeleteFilter(arrayData, arrayInOut){
    let filterData = []
    let filterInOut = []

    for (let i=0; i<arrayInOut.length; i++){
        if(i == arrayInOut.length-1){
            filterData.push(arrayData[i])
            filterInOut.push(arrayInOut[i])
        } else if(arrayInOut[i] != arrayInOut[i+1]){
            filterData.push(arrayData[i])
            filterInOut.push(arrayInOut[i])
        }
    }

    return [filterData, filterInOut]
}

function addStartOrEnd(filterArrays, typeTime='8-17'){

    let filterData = filterArrays[0]
    let filterInOut = filterArrays[1]

    let currentDate = dayNow()

    let startTime = ''
    let endTime = ''

    switch (typeTime) {
        case '8-17':
            startTime = '00:00:00'
            endTime = (currentDate == filterData[filterData.length-1].slice(0,10))? timeNow() :'23:59:59'
            break;
        case '7-19':
            break;
        case '19-7':
            break;
        default:
            startTime = '00:00:00'
            endTime = (currentDate == filterData[filterData.length-1].slice(0,10))? timeNow() :'23:59:59'
            break
    }

    if(filterInOut[0] =='output'){
        filterData.unshift(filterData[0].slice(0,10) + ' ' + startTime)
    }
    if(filterInOut[filterInOut.length-1] == 'input'){
        filterData.push(filterData[0].slice(0,10) + ' ' + endTime)
    }

    return filterData
}

function filterLunch(dateArray, lunchType='8-17'){

    let startLunch = null
    let endLunch = null

    switch (lunchType){
        case '8-17':
            startLunch = '12:00:00'
            endLunch = '13:00:00'
            break;
        case '07-19':
            break;
        case '19-07':
            break;
        default:
            startLunch = '12:00:00'
            endLunch = '13:00:00'
    }

    let date = dateArray[0].slice(0,10)

    let arrayClear = []

    for (let i=0; i<dateArray.length; i++) {
        if (
            new Date(dateArray[i]).getTime() >= new Date(date + ' ' + startLunch).getTime() &&
            new Date(dateArray[i]).getTime() < new Date(date + ' ' + endLunch).getTime()
        ) {
            // arrayClear.splice(i,1)
        } else arrayClear.push(dateArray[i])
    }

    let arraySave = arrayClear.slice()

    // if(arraySave.length == dateArray.length) return arraySave

    for (let i=0; i<arrayClear.length; i++) {
        if(arrayClear.length  == 1) {
            arraySave.push(`${date} ${startLunch}`)
        }
        else if (
            new Date(arrayClear[i]).getTime() < new Date(date + ' ' + startLunch).getTime() &&
            new Date(arrayClear[i+1]).getTime() > new Date(date + ' ' + endLunch).getTime()
        ) {
            if(arrayClear.length%2==0){
                if(i%2==0) arraySave.splice(i+1,0, ...[`${date} ${startLunch}`, `${date} ${endLunch}`])
            } else if(i%2==0){
                arraySave.splice(i+1,0, `${date} ${startLunch}`)
            } else arraySave.splice(i+1,0, `${date} ${endLunch}`)

        }
    }

    return arraySave
}

function parseSkudForHighcharts(arrayParse, y) {
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

function getHighchartSeriesAndNames(userData){

    let arrayNames = []
    let arrayData = []

    let blackArrayTrigger = false

    Object.keys(userData).forEach((e) => {
        arrayNames.push(e + ' ' + userData[e]['workTime'])
        arrayData.push(userData[e]['highchartsWork'])
        arrayData.push(userData[e]['highchartsOutWork'])
        if(userData[e]['highchartsBlack'] != null){
            blackArrayTrigger = true
            arrayData.push(userData[e]['highchartsBlack'])
        }
    })

    let series = []

    // for(let i=0; i < arrayData.length; i+=3){
    //         series.push({
    //             pointWidth: 30,
    //             colorByPoint: false,
    //             color: '#38e817',
    //             tooltip: {
    //                 pointFormatter: function () {
    //                     let timer = msToTime(this.x2 - this.x)
    //                     return '<b>Работает </b>' + timer
    //                 },
    //             },
    //             data: arrayData[i],
    //         })
    //         series.push({
    //             pointWidth: 30,
    //             colorByPoint: false,
    //             color: '#ffea32',
    //             tooltip: {
    //                 pointFormatter: function () {
    //                     let timer = msToTime(this.x2 - this.x)
    //                     return '<b>Нет на месте </b>' + timer
    //                 },
    //             },
    //             data: arrayData[i+1],
    //         })
    //         series.push({
    //             pointWidth: 30,
    //             colorByPoint: false,
    //             color: '#252734',
    //             borderColor: '#252734',
    //             data: arrayData[i+2],
    //         })
    // }

    for(let i=0; i < arrayData.length; i++){
        if(i%2 == 0) {
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: '#38e817',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTime(this.x2 - this.x)
                        return '<b>Работает </b>' + timer
                    },
                },
                data: arrayData[i],
            })
        } else {
            series.push({
                pointWidth: 30,
                colorByPoint: false,
                color: '#ffea32',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTime(this.x2 - this.x)
                        return '<b>Нет на месте </b>' + timer
                    },
                },
                data: arrayData[i],
            })
        }
    }


    return [series,arrayNames]
}