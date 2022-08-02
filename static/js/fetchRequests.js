// fetch запрос объекта в форме объектов
function fetchRequest(dateCalendar, complexName, complexObject = {} ) {
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

function fetchRequestBuildHC(dateCalendar, complexObject, complexName, idContainer, nagruzkaType = 'Нагрузка', typeLine = "multiLine") {
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

            let arrayLine;
            if (typeLine == 'multiLine') {
                arrayLine =[0,1,2,3,4]
            } else {
                arrayLine =[0,0,0,0,0]
            }
            let convertDataRuchnoi = parseLinearSutki(complexObject.ruchnoyArray, arrayLine[0], dateCalendar)
            let convertDataWork = parseLinearSutki(complexObject.workArray, arrayLine[1], dateCalendar,complexObject.programName)
            let convertDataPause = parseLinearSutki(complexObject.pauseArray, arrayLine[2], dateCalendar)
            let convertDataOff = parseLinearSutki(complexObject.offArray, arrayLine[3], dateCalendar)
            let convertDataAvar = parseLinearSutki(complexObject.avarArray, arrayLine[4], dateCalendar)
            highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, nagruzkaType,idContainer)

            let workRound = parseInt(complexObject.roundArray[0]);
            let passRound = parseInt(complexObject.roundArray[1]);
            let offRound = parseInt(complexObject.roundArray[2]);
            let avarRound = parseInt(complexObject.roundArray[3]);
            let nagruzkaRound = parseInt(complexObject.roundArray[4]);
            highChartRound(workRound, passRound, offRound, avarRound, nagruzkaRound, nagruzkaType, idContainer)

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
    let serverDomain=window.location.hostname
    let url = `http://${serverDomain}:8086/api/serviceInfo/${complexName}`
    console.log(url)
    return fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

function fetchRequestAddService(userName, userRole,complexName, infoWorks, periodService,setFormAddService, errorService, setErrorService) {
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
    if ( userRole == "ROLE_SERVICE" || userRole == "ROLE_ADMIN" && infoWorks.length>10) {
        let serverDomain=window.location.hostname
        fetch(`http://${serverDomain}:8086/api/addService`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log('Запрос прошел', result)
                if (result === 'ok') {
                    let newDataTable = setFormAddService.dataService;

                    if (newDataTable.length !== 0) {
                        newDataTable.unshift({info_works: infoWorks, user_name:userName, time_service:getTimeToday(), period_service:msToTimeDays(new Date(getTimeToday()) - new Date(newDataTable[0].time_service))})
                    }
                    else newDataTable.unshift({info_works: infoWorks, user_name:userName, time_service:getTimeToday(), period_service:'-'})

                    console.log(newDataTable)
                    setFormAddService.setDataService(newDataTable)
                    setFormAddService.setFormAddService(false)

                    let allServiceArray = newDataTable.map(e=> {
                        return e.time_service
                    })

                    let info = newDataTable.map(e=> {
                        return [e.user_name, e.info_works]
                    })

                    highChartServiceHistory(allServiceArray.reverse(), info.reverse())
                    highChartServiceNow(allServiceArray.reverse(),periodService)
                }
            })
            .catch(error => alert('Ошибка при отправке запроса', error));
    } else if (infoWorks.length<=10) {
        setErrorService("Сообщение о проведенных работах слишком короткое.")
    } else {
        setErrorService("Недостаточно прав. Для осуществления операции вы должны обладать правами \"Сервис\" или \"Администратор\".")
    }

}