// fetch запрос для суточных отчетов
function fetchRequest(dateCalendar, complexName) {
    return fetch(`/api/complexData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

// fetch запрос для сменных отчетов
function fetchRequestSmena(dateCalendar, complexName) {
    return fetch(`/api/smenaData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

// fetch запрос для месячных отчетов
function fetchRequestMonth(dateCalendar, complexName) {
    return fetch(`../api/monthData/${complexName}_month_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

// Получение данных для страницы сервис выбранного станка
function fetchRequestServiceInfo(complexName) {
    let url = `http://${getUrlService()}/api/serviceInfo/${complexName}`
    console.log(url)
    return fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

// Провести новое тех обслуживание
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

// Текущее состояние стенда ресурсных испытаний
function fetchRequestCurrent(complexName, setDataReportState) {
    let serverDomain = window.location.hostname
    let url = `http://${serverDomain}:8087/api/${complexName}`

    fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            let Name = data.drawNum == '2' ? '4977.06.008-5001' : 'C50L25RS-5.0001'
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

// Отчеты стенда ресурсных испытаний
function fetchRequestReport(complexName, setDataReportState) {

    let serverDomain = window.location.hostname
    let url = `http://${serverDomain}:8087/api/${complexName}`

    fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            let dataReport = data.map(e => {
                let fix = e.numberDrawing == 2 ? '4977.06.008-5001' : 'C50L25RS-5.0001'
                let Goden = e.valid == 2 ? 'Годен' : 'Не годен'
                return [e.numberAct, fix, e.numberProd, e.requiredForce, e.actualForce, e.actualForce2, e.maxDeformation, e.ostDeformation, Goden, e.authorId, e.dateTime]
            })
            setDataReportState(dataReport)
        })
}

// Получить список пользователей, в админке стенда ресурсных испытаний
function fetchGetReSourceUsers() {
    let serverDomain = window.location.hostname
    let serverPort = window.location.port
    let url = `http://${serverDomain}:${serverPort}/api/operatorInfo`

    return fetch(url, {method: 'POST'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

// Добавить нового пользователя в админке стенда ресурсных испытаний
function fetchAddReSourceUser(authorId, fio, tabel, userRole = 'user') {
    if (userRole == "ROLE_ADMIN") {

        let serverDomain = window.location.hostname
        let serverPort = window.location.port
        let url = `http://${serverDomain}:${serverPort}/api/addOperator/authorId:${authorId}_tabel:${tabel}_operatorName:${fio}`

        fetch(url, {method: 'POST'})
            .then(response => response.text())
            .then(result => {
                if (result === 'ok') {
                    console.log('Новый пользователь добавлен')
                }
            })
            .catch(error => console.log('Ошибка при отправке запроса', error));
    } else alert('Недостаточно прав')
}

// Удалить ользователя в админке стенда ресурсных испытаний
function fetchDeleteReSourceUser(authorId, userRole = 'user') {
    if (userRole == "ROLE_ADMIN") {

        let serverDomain = window.location.hostname
        let serverPort = window.location.port
        let url = `http://${serverDomain}:${serverPort}/api/deleteOperator/authorId:${authorId}`

        fetch(url, {method: 'DELETE'})
            .then(response => response.text())
            .then(result => {
                if (result === 'ok') {
                    console.log('Пользователь удален')
                }
            })
            .catch(error => console.log('Ошибка при отправке запроса', error));
    } else alert('Недостаточно прав')
}

function fetchRequestScud(date = '2022-10-25', place = 'Ленинградская 36, Дверь', smenaState = '8и') {
    if (smenaState == '8и') {
        return fetch(`/api/scud/beginDate:${date} 00:00:00_endDate:${date} 23:59:59_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '8') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scud/beginDate:${dateYesterday} 07:00:00_endDate:${date} 07:00:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '7') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scud/beginDate:${dateYesterday} 06:50:00_endDate:${date} 06:50:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '11') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scud/beginDate:${dateYesterday} 06:45:00_endDate:${date} 06:45:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '24') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scud/beginDate:${dateYesterday} 07:00:00_endDate:${date} 08:00:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }

}

function fetchSkudImage(date = '2022-10-25', place = 'Ленинградская 36, Дверь', smenaState = '8и') {
    if (place == 'all') place = '2ploshadka'
    if (smenaState == '8и') {
        return fetch(`/api/scudImage/beginDate:${date} 00:00:00_endDate:${date} 23:59:59_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '8') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scudImage/beginDate:${dateYesterday} 07:00:00_endDate:${date} 07:00:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '7') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scudImage/beginDate:${dateYesterday} 06:50:00_endDate:${date} 06:50:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '11') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scudImage/beginDate:${dateYesterday} 06:45:00_endDate:${date} 06:45:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '24') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scudImage/beginDate:${dateYesterday} 07:00:00_endDate:${date} 08:00:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }
}

function fetchRequestAdminUserInfo() {
    return fetch(`/api/adminpanel/userList`, {method: 'POST'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

function fetchRequestAdminAddUser(user) {
    let base64 = document.querySelectorAll('.outputImage')[1].src
    return urltoFile(base64, base64.slice(10, 20))
        .then(function (file) {
            let data = new FormData()
            data.append('image', file)
            data.append('username', user.username)
            data.append('password', user.password)
            data.append('role', user.role)
            data.append('enabled', user.enabled)
            data.append('email', user.email)

            return fetch('/api/adminpanel/addUser', {
                method: 'POST',
                body: data
            })
                .then(response => response.text())
        });
}

function fetchRequestAdminChangeUser(user) {
    let base64 = document.querySelectorAll('.outputImage')[1].src
    return urltoFile(base64, base64.slice(10, 20))
        .then(function (file) {
            let data = new FormData()
            data.append('image', file)
            data.append('username', user.username)
            data.append('role', user.role)
            data.append('enabled', user.enabled)
            data.append('email', user.email)

            return fetch('/api/adminpanel/updateUser', {
                method: 'POST',
                body: data
            })
                .then(response => response.text())
        });
}

function fetchRequestAdminDeleteUser(login) {
    return fetch(`/api/adminpanel/deleteUser-${login}`, {method: 'DELETE'})
        .then(response => response.text())
        .then((result) => {
            return result
        })
        .catch(error => console.log('Ошибка при отправке запроса', error));
}


function fetchRequestScudMonth(date = '2022-12') {
    let lastMonthDay = 32 - new Date(date.slice(0, 4), date.slice(5, 7), 32).getDate();
    return fetch(`/api/scud/beginDate:${date}-01 00:00:00_endDate:${date}-${lastMonthDay} 23:59:59_mesto:all`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return [data, date]
        })
}

function getDateFromIndex(date, index) {
    index = (index < 10) ? `0${index}` : `${index}`
    return `${date}-${index}`
}

function msToTimeHours(duration, date = 200) {
    date = +date
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % date)

    if (hours == 0) hours = ''
    else {
        hours = hours + " ч. "
    }

    if (minutes == 0) minutes = ''
    else {
        minutes = minutes + " мин. "
    }

    if (seconds == 0) seconds = ''
    else {
        seconds = seconds + ' с.'
    }

    if ((hours + minutes + seconds) != '') {
        return '— ' + hours + minutes + seconds;
    } else if ((hours + minutes + seconds) == '' && duration != 0) {
        return `— ${date} д.`
    } else return '— 0 с.'

}

function applyMonthFilters(usersData, userNames, date) {
    let lastMonthDay = 32 - new Date(date.slice(0, 4), date.slice(5, 7), 32).getDate();

    userNames.forEach(testName => {
        // Формирую месячный объект пользователя
        usersData[testName].monthObject = {}

        // Создаю в нем столько массивов сколько дней в месяце
        // Для текущего месяца
        if (dayNow().slice(0, 7) == date) {
            for (let i = 1; i < +dayNow().slice(8, 10) + 1; i++) {
                usersData[testName].monthObject[i] = [[], []]
            }
            // Для предыдущего месяца
        } else {
            for (let i = 1; i < lastMonthDay + 1; i++) {
                usersData[testName].monthObject[i] = [[], []]
            }
        }

        // Удаляю дубликаты
        let noDublicateArrays = dublicateDeleteFilter(usersData[testName].logtime, usersData[testName].statusInOut)

        // Вставляю в массивы дней соответсвующие значения
        noDublicateArrays[0].forEach((d, i) => {
            usersData[testName].monthObject[+d.slice(8, 10)][0].push(d)
            usersData[testName].monthObject[+d.slice(8, 10)][1].push(noDublicateArrays[1][i])
        })

        // Общий счетчик часов
        let totalMonthTime = 0

        // Применяю фильтры
        for (let i = 1; i <= Object.keys(usersData[testName].monthObject).length; i++) {
            let indexDate = getDateFromIndex(date, i)
            let arrayAddStartOrEnd = addStartOrEnd(usersData[testName].monthObject[i], '8и', indexDate)
            let arrayWithOutLunch = filterLunchMonth(arrayAddStartOrEnd, indexDate, usersData[testName].smenaInfo)
            let workTime = getWorkTime(arrayWithOutLunch)
            totalMonthTime += workTime
            usersData[testName].monthObject[i] = [arrayWithOutLunch, msToTime(workTime)]
        }
        usersData[testName].monthTotalTime = totalMonthTime
        console.log(testName, 'работал в этом месяце', msToTimeHours(totalMonthTime))
    })

    return usersData
}

function filterLunchMonth(dateArray, date, smenaState) {

    let startLunch = null
    let endLunch = null

    let startLunch2 = null
    let endLunch2 = null

    let startLunch3 = null
    let endLunch3 = null

    let startLunch4 = null
    let endLunch4 = null

    let arraySave = []

    switch (smenaState) {
        case '8и':
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            break;
        case '8':

            startLunch = date + ' 03:00:00'
            endLunch = date + ' 03:30:00'

            startLunch2 = date + ' 11:30:00'
            endLunch2 = date + ' 12:00:00'

            startLunch3 = date + ' 19:30:00'
            endLunch3 = date + ' 20:00:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        case '7':
            startLunch = date + ' 03:00:00'
            endLunch = date + ' 04:00:00'

            startLunch2 = date + ' 11:30:00'
            endLunch2 = date + ' 12:30:00'

            startLunch3 = date + ' 19:30:00'
            endLunch3 = date + ' 20:30:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        case '11':
            startLunch = date + ' 03:30:00'
            endLunch = date + ' 04:00:00'

            startLunch2 = date + ' 11:30:00'
            endLunch2 = date + ' 12:00:00'

            startLunch3 = date + ' 16:00:00'
            endLunch3 = date + ' 16:30:00'

            startLunch4 = date + ' 23:00:00'
            endLunch4 = date + ' 23:30:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            arraySave = insideFilterLunch(startLunch4, endLunch4, arraySave)
            break;
        case '24':
            startLunch = date + ' 04:00:00'
            endLunch = date + ' 04:30:00'

            startLunch2 = date + ' 12:30:00'
            endLunch2 = date + ' 13:00:00'

            startLunch3 = date + ' 20:00:00'
            endLunch3 = date + ' 20:30:00'

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

// let globalAllData = {}
//
// let promise = fetchRequestScudMonth()
// promise.then(data => {
//     let usersData = data[0]
//     let date = data[1]
//
//     if (!Object.keys(usersData).includes('error')) {
//         usersData = createUserDataStructure(usersData)
//
//         let userNames = Object.keys(usersData)
//         usersData = applyMonthFilters(usersData, userNames, date)
//
//         globalAllData = usersData
//     }
// })



