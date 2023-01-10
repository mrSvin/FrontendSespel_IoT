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
            //usersData[userName].monthObject[i] = [arrayWithOutLunch, msToTime(workTime)]
            usersData[userName].monthObject[i] = workTime
        }
        usersData[userName].monthTotalTime = totalMonthTime

        // Очистка ненужных полей
        usersData[userName].statusInOut = null
        usersData[userName].logtime = null
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
        case '':
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            break;
        default:
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
    }
    return arraySave
}

function getThisYearMonth() {
    let monthsNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let year = new Date().getFullYear()
    let month = monthsNumber[new Date().getMonth()]
    return `${year}-${month}`
}

function ScudMonth({scudMonthMemory, setScudMonthMemory}) {

    function saveMemoryMonth() {

        // Если состояние памяти пустое
        if (scudMonthMemory == null) {
            // То запрос и сохранить состояние
            console.log('Отправка запроса на', dateMonth)
            let promise = fetchRequestScudMonth(dateMonth)
            fetchRequestScudMonthThen(promise)
        } else {
            // Иначе, если память не пустая,но выбранный месяц отсутсвует
            if (scudMonthMemory[dateMonth] == undefined) {
                // То запрос и сохранить состояние
                console.log('Отправка запроса на', dateMonth)
                let promise = fetchRequestScudMonth(dateMonth)
                fetchRequestScudMonthThen(promise)
                // Иначе вывести срок время сохранения этих данных
            } else {
                let lastTime = new Date(dayTimeNow()).getTime()
                let thisMonthLastTime = new Date(scudMonthMemory[dateMonth].lastTime).getTime()
                console.log('Последнее время данных', thisMonthLastTime)
                console.log('Текущее время', dayTimeNow())
                // Если данные записанные больше часа назад
                if (lastTime - thisMonthLastTime > 10800000) {
                    console.log('Отправка запроса на', dateMonth)
                    let promise = fetchRequestScudMonth(dateMonth)
                    fetchRequestScudMonthThen(promise)
                } else switchTableState(scudMonthMemory[dateMonth].data)
            }

        }
    }

    function fetchRequestScudMonthThen(promise) {
        promise.then(data => {
            let usersData = data[0]
            let date = data[1]

            if (!Object.keys(usersData).includes('error')) {
                usersData = createUserDataStructure(usersData)

                let userNames = Object.keys(usersData)
                usersData = applyMonthFilters(usersData, userNames, date)

                let allData = {
                    smena_7: [],
                    smena_8i: [],
                    smena_8: [],
                    smena_11: [],
                    smena_24: [],
                    hiddens: []
                }

                Object.keys(usersData).forEach(name => {

                    switch (usersData[name].smenaInfo) {
                        case '7':
                            allData.smena_7.push(usersData[name])
                            break
                        case '8и':
                            allData.smena_8i.push(usersData[name])
                            break
                        case '8':
                            allData.smena_8.push(usersData[name])
                            break
                        case '11':
                            allData.smena_11.push(usersData[name])
                            break
                        case '24':
                            allData.smena_24.push(usersData[name])
                            break
                        default:
                            allData.hiddens.push(usersData[name])
                    }
                })

                if (scudMonthMemory == null) {
                    setScudMonthMemory({[dateMonth]: {lastTime: dayTimeNow(), data: allData},})
                } else if (scudMonthMemory[dateMonth] == undefined) {
                    setScudMonthMemory(prevState => ({
                        ...prevState,
                        [dateMonth]: {lastTime: dayTimeNow(), data: allData}
                    }));
                }

                console.log('Выбранный тип смены', smenaState)
                switchTableState(allData)
            }
        })
    }

    function switchTableState(allData) {
        switch (smenaState) {
            case '7':
                console.log('Данные для таблицы', allData.smena_7)
                setTableState(allData.smena_7)
                break
            case '8и':
                console.log('Данные для таблицы', allData.smena_8i)
                setTableState(allData.smena_8i)
                break
            case '8':
                console.log('Данные для таблицы', allData.smena_8)
                setTableState(allData.smena_8)
                break
            case '11':
                console.log('Данные для таблицы', allData.smena_11)
                setTableState(allData.smena_11)
                break
            case '24':
                console.log('Данные для таблицы', allData.smena_24)
                setTableState(allData.smena_24)
                break
            default:
                console.log('Данные для таблицы', allData.hiddens)
                setTableState(allData.hiddens)
        }
    }

    let [dateMonth, setDateMonth] = useState(getThisYearMonth());
    let [smenaState, setSmenaState] = useState('8и')
    let [tableState, setTableState] = useState(null)

    let [usersWithSmena, setUsersWithSmena] = useState('line')


    useEffect(() => {
        saveMemoryMonth()
    }, [dateMonth, smenaState]);

    function newDate(dateInput) {
        setDateMonth(dateInput)
    }

    return (
        <div>
            <div className="buttons-otchet marginToSmenaMenu cancelMargin">

                <div className="daysMonthWrapper">

                    <Link to={`/scud/1ploshadka`}>
                        <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                    </Link>

                    <Link to={`/scudMonth`}>
                        <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ
                            <div className={`smenaScud`}>
                                <span className={smenaState == '8' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8')
                                      }}>8 часов
                                </span>
                                <span className={smenaState == '7' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('7')
                                      }}>7.2 часа
                                </span>
                                <span className={smenaState == '11' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('11')
                                      }}>11 часов
                                </span>
                                <span className={smenaState == '24' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('24')
                                      }}>24 часа
                                </span>
                                <span className={smenaState == '8и' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8и')
                                      }}>ИТР
                                </span>
                                <span
                                    className={`hideIndividualAll ${(smenaState == 'hiddens') ? 'scudSelect' : 'scudSelectNoSelect'}`}
                                    onClick={() => {
                                        setSmenaState('hiddens')
                                    }}>ИТР
                                </span>
                            </div>
                        </div>
                    </Link>

                </div>


            </div>
            <div className="energyCalendarContainer">
                <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>
                <div className='hideIndividualAll'>
                    <SwitchLineHCIndividual stateLineHC={usersWithSmena} setStateLineHC={setUsersWithSmena}
                                            text={'Привязка по смене'}/>
                </div>
            </div>
            <p className='switchButtonMessage'>{usersWithSmena == 'line' ? 'Отображение сотрудников по выбранного графику' : 'Все сотрудники'}</p>
        </div>
    );
}


