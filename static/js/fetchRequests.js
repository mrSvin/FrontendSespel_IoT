// fetch запрос объекта в форме объектов
function fetchRequest(dateCalendar, complexName) {
    return fetch(`/api/complexData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

// fetch запрос объекта в форме объектов
function fetchRequestSmena(dateCalendar, complexName) {
    return fetch(`/api/smenaData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

function fetchRequestMonth(dateCalendar, complexName) {
    return fetch(`../api/monthData/${complexName}_month_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
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

            // highChartProgram(getTimeProgramNameGraph(data), idContainer)

            let arrayLine;
            if (typeLine == 'multiLine') {
                arrayLine = [0, 1, 2, 3, 4]
            } else {
                arrayLine = [0, 0, 0, 0, 0]
            }
            let convertDataRuchnoi = parseLinearSutki(complexObject.ruchnoyArray, arrayLine[0], dateCalendar)
            let convertDataWork = parseLinearSutki(complexObject.workArray, arrayLine[1], dateCalendar, complexObject.programName)
            let convertDataPause = parseLinearSutki(complexObject.pauseArray, arrayLine[2], dateCalendar)
            let convertDataOff = parseLinearSutki(complexObject.offArray, arrayLine[3], dateCalendar)
            let convertDataAvar = parseLinearSutki(complexObject.avarArray, arrayLine[4], dateCalendar)
            highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, nagruzkaType, idContainer)

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
                averageMonthdata(data.avar), averageMonthdata(data.nagruzka), 'Нагрузка', idContainer)
            return data
        })
}

function fetchRequestServiceInfo(complexName) {
    let url = `http://${getUrlService()}/api/serviceInfo/${complexName}`
    console.log(url)
    return fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

function fetchRequestAddService(userName, userRole, complexName, infoWorks, periodService, setFormAddService, errorService, setErrorService) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    infoWorks = infoWorks.replaceAll(`'`, '').replaceAll(`"`, '').replaceAll(`{`, '').replaceAll(`}`, '')

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
    if (userRole == "ROLE_SERVICE" || userRole == "ROLE_ADMIN" && infoWorks.length > 10) {

        fetch(`http://${getUrlService()}/api/addService`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result === 'ok') {
                    let newDataTable = setFormAddService.dataService;

                    if (newDataTable.length !== 0) {
                        newDataTable.unshift({
                            info_works: infoWorks,
                            user_name: userName,
                            time_service: dayTimeNow(),
                            period_service: msToTimeDays(new Date(dayTimeNow()) - new Date(newDataTable[0].time_service), 365),
                            timeNext: periodService
                        })
                    } else newDataTable.unshift({
                        info_works: infoWorks,
                        user_name: userName,
                        time_service: dayTimeNow(),
                        period_service: '-',
                        timeNext: periodService
                    })


                    setFormAddService.setDataService(newDataTable)
                    setFormAddService.setFormAddService(false)

                    let allServiceArray = newDataTable.map(e => {
                        return e.time_service
                    })

                    let info = newDataTable.map(e => {
                        return [e.user_name, e.info_works]
                    })

                    highChartServiceHistory(allServiceArray.reverse(), info.reverse())
                    highChartServiceNow(allServiceArray.reverse(), periodService)
                }
            })
            .catch(error => console.log('Ошибка при отправке запроса', error));
    } else if (infoWorks.length <= 10) {
        setErrorService("Сообщение о проведенных работах слишком короткое.")
    } else {
        setErrorService("Недостаточно прав. Для осуществления операции вы должны обладать правами \"Сервис\" или \"Администратор\".")
    }

}

function fetchRequestCurrent(complexName, setDataReportState) {
    let serverDomain = window.location.hostname
    let url = `http://${serverDomain}:8087/api/${complexName}`

    fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            let Name = data.actNum == '1' ? '4977.06.008-5001' : 'C435064S-5.0301'
            let date = (new Date(data.lastRequest).getTime() + 10800000)
            date = new Date(date).toISOString().slice(0, 10) + ' ' + new Date(date).toISOString().slice(11, 19)


            let dataReport = [data.requestWriteDB, data.prodNum, data.actNum, data.resultR, Name, data.authorId, data.workMode, data.maxDeformation, data.ostDeformation, data.actForce1R, data.actForce2R, data.needForce, date]
            setDataReportState([
                [
                    'Регистр состояния записи на сервер', 'Номер изделия', 'Номер акта', 'Результат',
                    'Номер чертежа', 'ID автора', 'Состояние работы', 'Максимальная деформация',
                    'Остаточная деформация', 'Фактическая сила (датчик 1), Т', 'Фактическая сила (датчик 2), Т',
                    'Требуемая сила (датчик 2), Т', 'Последнее время получения данных с оборудования'
                ],
                dataReport])
        })
}

function fetchRequestReport(complexName, setDataReportState) {

    let serverDomain = window.location.hostname
    let url = `http://${serverDomain}:8087/api/${complexName}`

    fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            let dataReport = data.map(e => {
                let fix = e.numberDrawing == '1' ? '4977.06.008-5001' : 'C435064S-5.0301'
                let Goden = e.valid == '1' ? 'Годен' : 'Негоден'
                return [e.numberAct, fix, e.numberProduct, e.requiredForce, e.actualForce, e.maxDeformation, e.ostDeformation, Goden, e.author, e.dateTime]
            })
            setDataReportState(dataReport)
        })
}