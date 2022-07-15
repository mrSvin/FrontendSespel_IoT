function fetchRequest(dateCalendar, complexObject, complexName) {
    return fetch(`/api/complexData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            complexObject.workArray = data.work
            complexObject.pauseArray = data.pause
            complexObject.offArray = data.off
            complexObject.avarArray = data.avar
            complexObject.ruchnoyArray = data.nagruzka
            complexObject.roundArray = data.roundData
            complexObject.programName = data.programName

            return complexObject
        })
}

function fetchRequestBuildHC(dateCalendar, complexObject, complexName, idContainer) {
    return fetch(`/api/complexData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            complexObject.workArray = data.work
            complexObject.pauseArray = data.pause
            complexObject.offArray = data.off
            complexObject.avarArray = data.avar
            complexObject.ruchnoyArray = data.nagruzka
            complexObject.roundArray = data.roundData
            complexObject.programName = data.programName

            let convertDataRuchnoi = parseLinearSutki(complexObject.ruchnoyArray, 0, dateCalendar)
            let convertDataWork = parseLinearSutki(complexObject.workArray, 1, dateCalendar,complexObject.programName)
            let convertDataPause = parseLinearSutki(complexObject.pauseArray, 2, dateCalendar)
            let convertDataOff = parseLinearSutki(complexObject.offArray, 3, dateCalendar)
            let convertDataAvar = parseLinearSutki(complexObject.avarArray, 4, dateCalendar)
            highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, "Нагрузка",idContainer)

            let workRound = parseInt(complexObject.roundArray[0]);
            let passRound = parseInt(complexObject.roundArray[1]);
            let offRound = parseInt(complexObject.roundArray[2]);
            let avarRound = parseInt(complexObject.roundArray[3]);
            let nagruzkaRound = parseInt(complexObject.roundArray[4]);
            highChartRound(workRound, passRound, offRound, avarRound, nagruzkaRound, 'Нагрузка', idContainer)

            return complexObject
        })
}

function fetchMonthHighCharts(complexName, dateInput, idContainer) {
    return fetch(`../api/monthData/${complexName}_month_date:${dateInput}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            highChartMonthLine(data.work, data.pause, data.off, data.avar, data.nagruzka, 'Нагрузка', idContainer)
            highChartRound(averageMonthdata(data.work), averageMonthdata(data.pause), averageMonthdata(data.off),
                averageMonthdata(data.avar),  averageMonthdata(data.nagruzka), 'Нагрузка', idContainer)
            return data
        })
}

function fetchRequestServiceInfo(complexName) {

    let url = `http://192.168.3.41:8086/api/serviceInfo/${complexName}`

    return fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

function fetchRequestAddService(userName, userRole,complexName, infoWorks, periodService,setFormAddService) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "complexName": complexName,
        "userName": userName,
        "infoWorks": infoWorks,
        "periodSrvice": periodService
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://192.168.3.41:8086/api/addService", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log('Запрос прошел', result)
            if (result === 'ok') {
                let newDataTable = setFormAddService.dataService;

                newDataTable.unshift({info_works: infoWorks, user_name:userName, time_service:getTimeToday(), period_service:periodService})
                console.log(newDataTable)
                setFormAddService.setDataService(newDataTable)
                setFormAddService.setFormAddService(false)

                let lastPeriod = newDataTable.map(e=> {
                    return e.period_service
                })
                lastPeriod = lastPeriod[0];

                let allServiceArray = newDataTable.map(e=> {
                    return e.time_service
                })

                highChartServiceHistory(allServiceArray.reverse())
                highChartServiceNow(allServiceArray.reverse(),lastPeriod)
            }
        })
        .catch(error => console.log('Ошибка, недостаточно прав', error));
}