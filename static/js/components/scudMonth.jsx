function getDateFromIndex(date, index) {
    index = (index < 10) ? `0${index}` : `${index}`
    return `${date}-${index}`
}

function msToTimeHours(duration) {

    if (duration == 0) return 0

    let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)))

    minutes = minutes < 10 ? '0' + minutes : minutes
    hours = hours < 10 ? '0' + hours : hours

    if ((hours + minutes) != '') {
        return hours + ':' + minutes
    } else if ((hours) == '' && duration != 0) {
        return hours
    } else return '00:' + minutes

}

function nameSort(a, b, obj) {
    let nameA = obj[a].name.toLowerCase(),
        nameB = obj[b].name.toLowerCase()

    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
}

// function msToTimeFloat(duration, date = 200) {
//     date = +date
//     let minutes = parseInt((duration / (1000 * 60)) % 60),
//         hours = parseInt((duration / (1000 * 60 * 60)) % date)
//
//     minutes = +(minutes / 60).toFixed(1)
//
//
//
//     return +hours + minutes
//
// }

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

function getThisYearMonth() {
    let monthsNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let year = new Date().getFullYear()
    let month = monthsNumber[new Date().getMonth()]
    return `${year}-${month}`
}


function ScudMonth({scudMonthMemory, setScudMonthMemory}) {

    function setAllDataThisMonth(allData) {

        let objectToArray = []
        Object.keys(allData).forEach(e => {
            objectToArray.push(...allData[e])
        })
        setThisMonthData(objectToArray)
    }

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
                // Иначе если это текущий месяц, то данные будут обновляться только раз в 3 часа(10800000)
            } else if (dateMonth == getThisYearMonth()) {
                let lastTime = new Date(dayTimeNow()).getTime()
                let thisMonthLastTime = new Date(scudMonthMemory[dateMonth].lastTime).getTime()
                // Если данные записанные больше 3 часов назад
                console.log(lastTime, '-', thisMonthLastTime, '=', lastTime - thisMonthLastTime)
                if (lastTime - thisMonthLastTime > 10800000) {
                    alert(`Данные устарели за 3 часа, обновляю новыми за ${dateMonth}`)
                    let promise = fetchRequestScudMonth(dateMonth)
                    fetchRequestScudMonthThen(promise)
                } else {
                    switchTableState(scudMonthMemory[dateMonth].data)
                }
            } else {
                switchTableState(scudMonthMemory[dateMonth].data)
            }

        }
    }

    function fetchRequestScudMonthThen(promise) {
        promise.then(data => {
            console.log(data)
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
                } else {
                    let lastTime = new Date(dayTimeNow()).getTime()
                    let thisMonthLastTime = new Date(scudMonthMemory[dateMonth].lastTime).getTime()
                    console.log('Последнее время данных', thisMonthLastTime)
                    console.log('Текущее время', dayTimeNow())
                    // Если данные записанные больше часа назад
                    if (lastTime - thisMonthLastTime > 10800000) {
                        console.log('Перезапись с истечением часа', dateMonth)
                        setScudMonthMemory(prevState => ({
                            ...prevState,
                            [dateMonth]: {lastTime: dayTimeNow(), data: allData}
                        }));
                    }
                }

                console.log('Выбранный тип смены', smenaState)
                switchTableState(allData)
            }
        })
    }

    function switchTableState(allData) {
        switch (smenaState) {
            case '7':
                setTableState(allData.smena_7)
                break
            case '8и':
                setTableState(allData.smena_8i)
                break
            case '8':
                setTableState(allData.smena_8)
                break
            case '11':
                setTableState(allData.smena_11)
                break
            case '24':
                setTableState(allData.smena_24)
                break
            default:
                setTableState(allData.hiddens)
        }

        setAllDataThisMonth(allData)
        setLoading(false)
    }

    let [dateMonth, setDateMonth] = useState(getThisYearMonth());
    let [smenaState, setSmenaState] = useState('8и')
    let [tableState, setTableState] = useState(null)

    let [loadingState, setLoading] = useState(true)
    let [sortState, setSortState] = useState('name')
    let [findState, setFindState] = useState('')

    let [thisMonthData, setThisMonthData] = useState([])

    useEffect(() => {
        setLoading(true)
        saveMemoryMonth()
    }, [dateMonth, smenaState]);

    function newDate(dateInput) {
        setDateMonth(dateInput)
    }

    function changeFind(e) {
        const {value} = e.target;
        setFindState(value);
    };

    return (
        <div>
            <div className="buttons-otchet marginToSmenaMenu cancelMargin">
                <LinkMonth smenaState={smenaState} setSmenaState={setSmenaState}/>
            </div>
            <div className="energyCalendarContainer">
                <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>
                <div className={'findWrapper'}>
                    <p>Поиск</p>
                    <input id="find" name="find" className={'scudMonthFind'} value={findState}
                           onChange={(e) => {
                               changeFind(e)
                           }}>
                    </input>
                </div>
            </div>
            <FindTable findState={findState} thisMonthData={thisMonthData}/>
            <ScudMonthTable tableState={tableState} sortState={sortState} setSortState={setSortState}
                            loadingState={loadingState}/>
        </div>
    );
}

function LinkMonth({smenaState, setSmenaState}) {

    return (
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
                            }}>Скрытые
                        </span>
                    </div>
                </div>
            </Link>

        </div>
    )
}

function Loader() {

    return (
        <div className="loaderWrapper">
            <div className="loaderText">IoT Sespel</div>
            <div className="loader"></div>
        </div>
    )

}

function ScudMonthTable({tableState, sortState, setSortState, loadingState}) {

    let [sortedStateTable, setSortedStateTable] = useState(tableState)

    useEffect(() => {
        console.log('Табличные данные', tableState)
        let keysSorted = null
        let sortedTable = null

        if (tableState != null) {
            if (sortState == 'name') {
                keysSorted = Object.keys(tableState).sort((a, b) => {
                    return nameSort(a, b, tableState)
                })
                sortedTable = keysSorted.map(e => {
                    return tableState[e]
                })
                sortedTable = sortedTable.length == 0 ? null : sortedTable
                setSortedStateTable(sortedTable)
            } else if (sortState == 'tabid') {
                keysSorted = Object.keys(tableState).sort(function (a, b) {
                    return tableState[a]['tabid'] - tableState[b]['tabid']
                })
                sortedTable = keysSorted.map(e => {
                    return tableState[e]
                })
                sortedTable = sortedTable.length == 0 ? null : sortedTable
                setSortedStateTable(sortedTable)
            } else {
                keysSorted = Object.keys(tableState).sort(function (a, b) {
                    return tableState[b]['monthTotalTime'] - tableState[a]['monthTotalTime']
                })
                sortedTable = keysSorted.map(e => {
                    return tableState[e]
                })
                sortedTable = sortedTable.length == 0 ? null : sortedTable
                setSortedStateTable(sortedTable)
            }
        }


    }, [sortState, tableState])
    return (
        <>
            {(sortedStateTable == null || loadingState) ? <Loader/> : <table className='scudMonthTable'>
                <thead>
                <tr>
                    <th>№</th>
                    <th className={`sortedIcon ${sortState == 'tabid' ? 'activeSortedIcon' : null}`}
                        onClick={() => {
                            setSortState('tabid')
                        }}>Таб.
                    </th>
                    <th className={`sortedIcon ${sortState == 'name' ? 'activeSortedIcon' : null}`}
                        onClick={() => {
                            setSortState('name')
                        }}>ФИО
                    </th>
                    <th>Должность</th>
                    {Object.keys(sortedStateTable[0]['monthObject']).map((day, thKey) => {
                        return <th key={thKey}>{day}</th>
                    })}
                    <th className={`sortedIcon ${sortState == 'monthTime' ? 'activeSortedIcon' : null}`}
                        onClick={() => {
                            setSortState('monthTime')
                        }}>Итого
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedStateTable.map((user, i) => {
                    return <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{user.tabid}</td>
                        <td>{user.name}</td>
                        <td>{user.POS}</td>
                        {Object.keys(user.monthObject).map((day, tdKey) => {
                            return (<td key={tdKey}>{msToTimeHours(user.monthObject[day])}</td>)
                        })}
                        <td>{msToTimeHours(user.monthTotalTime)}</td>
                    </tr>
                })}
                </tbody>
            </table>
            }
        </>
    )
}

function FindTable({findState, thisMonthData}) {

    let [foundedArray, setFoundedArray]= useState([])

    useEffect(() => {
        if (thisMonthData.length !== 0 || findState.length !== 0) {
            // if (scudMonthMemory[dateMonth] !== undefined) {
            //     console.log('Поисковые данные этого месяца', scudMonthMemory[dateMonth].data)
            //
            //     let objectToArray = []
            //     Object.keys(scudMonthMemory[dateMonth].data).forEach(e => {
            //         objectToArray.push(...scudMonthMemory[dateMonth].data[e])
            //     })
            console.log('Данные этого месяца',thisMonthData)

                let foundedArray = thisMonthData.map(e => {
                    if (e.name.toLowerCase().includes(findState) || e.tabid.includes(findState)) return e
                })

                foundedArray = foundedArray.filter(word => word !== undefined);
                setFoundedArray(foundedArray)
                console.log('Соответсвующие данные', foundedArray)
            }

    }, [findState, thisMonthData])


    return (
        <div>

        </div>
    )
}


