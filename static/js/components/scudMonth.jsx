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
            let promise = fetchRequestScudMonth(dateMonth)
            fetchRequestScudMonthThen(promise)
        } else {
            // Иначе, если память не пустая,но выбранный месяц отсутсвует
            if (scudMonthMemory[dateMonth] == undefined) {
                // То запрос и сохранить состояние
                let promise = fetchRequestScudMonth(dateMonth)
                fetchRequestScudMonthThen(promise)
                // Иначе если это текущий месяц, то данные будут обновляться только раз в 3 часа(10800000)
            } else if (dateMonth == getThisYearMonth()) {
                let lastTime = new Date(dayTimeNow()).getTime()
                let thisMonthLastTime = new Date(scudMonthMemory[dateMonth].lastTime).getTime()
                // Если данные записанные больше 60 минут часов назад
                if (lastTime - thisMonthLastTime > 36000000) {
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
                    // Если данные записанные больше часа назад
                    if (lastTime - thisMonthLastTime > 10800000) {
                        setScudMonthMemory(prevState => ({
                            ...prevState,
                            [dateMonth]: {lastTime: dayTimeNow(), data: allData}
                        }));
                    }
                }

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
    let [tableState, setTableState] = useState([])

    let [loadingState, setLoading] = useState(true)
    let [sortState, setSortState] = useState('name')

    const findRef = useRef(null);
    let [findStateDefalut, setFindStateDefalut] = useState('')
    let [findState, setFindState] = useState('')
    let [foundedArray, setFoundedArray] = useState([])

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
        setFindStateDefalut(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setFindState(findRef.current.value);
        }
    };

    return (
        <div>
            <div className="buttons-otchet marginToSmenaMenu cancelMargin">
                <LinkMonth smenaState={smenaState} setSmenaState={setSmenaState}/>
            </div>
            <div className="energyCalendarContainer">
                <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>
                <div className={'findWrapper'}>
                    <input id="find" name="find" placeholder={'Введите ФИО или табель через запятую...'}
                           className={'scudMonthFind'}
                           ref={findRef}
                           value={findStateDefalut}
                           onChange={(e) => {
                               changeFind(e)
                           }}
                           onKeyDown={handleKeyDown}>
                    </input>
                    <div className={'searchButton'} onClick={() => {
                        setFindState(findStateDefalut);
                    }}>
                        <img src="../../images/searchIcon.png" alt=""/>
                    </div>
                </div>
            </div>
            {findState == '' ? null :
                <>
                    <FindTable findState={findState} thisMonthData={thisMonthData}
                               foundedArray={foundedArray} setFoundedArray={setFoundedArray}/>
                    {foundedArray.length == 0 ? null :
                        <ButtonExcel smenaState={smenaState} dateMonth={dateMonth} tableState={tableState}
                                     tableId={'scudMonthTableFilter'} buttonClass={'scudExcelSlave'}/>
                    }

                </>
            }
            <ScudMonthTable tableState={tableState} sortState={sortState} setSortState={setSortState}
                            loadingState={loadingState}/>
            <ButtonExcel smenaState={smenaState} dateMonth={dateMonth} tableState={tableState}
                         tableId={'scudMonthTable'} buttonClass={'scudExcelMain'}/>
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
        let keysSorted = null
        let sortedTable = null

        if (tableState.length != 0) {
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
        } else setSortedStateTable(tableState)


    }, [sortState, tableState])
    return (
        <>
            {(loadingState) ? <Loader/> : sortedStateTable.length == 0 ? null :
                <div>
                    <p className={'tableMessage'}>Отчет за выбранный месяц</p>
                    <table className='scudMonthTable scudMonthMainTable' id='scudMonthTable'>
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
                </div>

            }
        </>
    )
}

function FindTable({findState, thisMonthData, foundedArray, setFoundedArray}) {

    useEffect(() => {
        if (thisMonthData.length !== 0 && findState.length !== 0) {

            let findArray = findState.toLowerCase().split(',')
            findArray = findArray.map(space => {
                return space.trim()
            })
            findArray = findArray.filter(word => word !== '');

            let foundedData = thisMonthData.map(e => {
                let founded = false
                findArray.forEach(find => {
                    if (e.name.toLowerCase().includes(find) || e.tabid.includes(find)) founded = true
                })
                if (founded) return e
            })

            foundedData = foundedData.filter(word => word !== undefined);
            setFoundedArray(foundedData)
        }

    }, [findState, thisMonthData])


    return (
        <> {(foundedArray.length == 0 || thisMonthData.length == 0)? null :
            <div>
                <p className={'tableMessage'}>Отчет по найденным сотрудникам</p>
                <table className='scudMonthTable' id='scudMonthTableFilter'>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Таб.</th>
                        <th>ФИО</th>
                        <th>Должность</th>
                        {Object.keys(foundedArray[0]['monthObject']).map((day, thKey) => {
                            return <th key={thKey}>{day}</th>
                        })}
                        <th>Итого</th>
                    </tr>
                    </thead>
                    <tbody>
                    {foundedArray.map((user, i) => {
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
            </div>
        }
        </>
    )
}

function ButtonExcel({smenaState, dateMonth, tableState, tableId, buttonClass}) {
    useEffect(() => {

    }, [tableState])
    return (
        <> {tableState.length == 0 ? null :
            <img src={'../../images/excel_icon.png'} alt={null} className={`scudExcel ${buttonClass}`} onClick={() => {
                TableToExcel.convert(document.getElementById(tableId), {
                    name: `${dateMonth}_${smenaState}.xlsx`,
                    sheet: {
                        name: "Sheet 1"
                    }
                });
            }}/>}

        </>
    )
}


