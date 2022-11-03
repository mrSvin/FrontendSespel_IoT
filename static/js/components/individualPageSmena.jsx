function StankiSmena() {

    let places = ['ОТК', 'Мех.уч.2 пл.', 'Резка', 'Мех.уч.1 пл.', 'Роботы', 'Спец. комплексы', 'Склады', 'Литьё', 'Гибка', 'Все']

    let razdel = 'stankiSmena'

    let pageNew = 0
    places.forEach((e, i) => {
        if (e == parseNameUrl(window.location.href)) pageNew = i
    })

    const [page, setPage] = useState(pageNew)

    const placesObject = getAllStankiData()

    let placeKeys = []

    if (page == 9) {
        placeKeys = Object.keys(placesObject).map(e => {
            return e
        })
    } else placeKeys.push(places[page])

    let stankiObject = {}
    let stankiKeys = []
    if (page == 9) {
        Object.keys(placesObject).forEach(e => {
            Object.keys(placesObject[e].stanki).forEach(i => {
                stankiObject[i] = placesObject[e].stanki[i]
                stankiKeys.push(i)
            })
        })
    } else {
        placeKeys.forEach(e => {
            Object.keys(placesObject[e].stanki).map(i => {
                stankiObject[i] = placesObject[e].stanki[i]
                stankiKeys.push(i)
            })
        })
    }

    if (page == 9) {
        if (localStorage['places'] == undefined) {
            localStorage['places'] = Object.keys(placesObject).map(e => {
                return [e, false]
            })
        }

        if (localStorage['stanki'] == undefined) {
            localStorage['stanki'] = Object.keys(stankiObject).map(e => {
                return [e, false]
            })
        }
    }

    // Состояние даты
    let [date, setDate] = useState(dayNow());

    // Состояние переменной мульти Диаграммы
    let [stateLineHC, setStateLineHC] = useState("multiLine");

    const [valuesCategories, setValuesCategories] = useState(
        (localStorage['places'] !== undefined && page == 9) ? getObjectFromLocal(localStorage['places']) :
            getCategoriesState(placeKeys, placesObject)
    )

    const [valuesStanki, setValuesStanki] = useState(
        (localStorage['stanki'] !== undefined && page == 9) ? getObjectFromLocal(localStorage['stanki']) :
            getStankiState(placeKeys, placesObject)
    )

    const [updateList, setUpdateList] = useState(false)

    let forWait = []

    Object.keys(valuesStanki).forEach(e => {
        if (valuesStanki[e]) {
            forWait.push(e)
        }
    })

    const [valuesStankiWait, setValuesStankiWait] = useState(forWait)

    const history = useHistory()

    useEffect(() => {
        let dateInput = date
        let stankiState = {}

        Object.keys(valuesStanki).forEach(e => {
            if (valuesStanki[e]) {
                stankiState[e] = stankiObject[e]
            }
        })

        let stankiKeysState = Object.keys(stankiState).map(e => {
            return e
        })

        let fetchNames = stankiKeysState.map(name => {
            return stankiState[name].complexRequest
        })

        let complexNames = stankiKeysState.map(name => {
            return stankiState[name].buttonNames
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequestSmena(dateInput, item)
        }));

        updateLoadDataIndividualSmena(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

        return history.listen((location) => {
            let check = 0

            let pathName = parseNameUrl(location.pathname)
            let thisPage = location.pathname.slice(0, 13)

            places.forEach((e, i) => {
                if (e == pathName) check = i
            })

            if (thisPage == '/stankiSmena/') {
                setPage(check)

                let valuesWait = []

                if (check == 9) {
                    if (localStorage['stanki'] !== undefined && localStorage['places'] !== undefined) {
                        setValuesCategories(getObjectFromLocal(localStorage['places']))
                        let local = getObjectFromLocal(localStorage['stanki'])
                        setValuesStanki(local)
                        Object.keys(local).forEach(e => {
                            if (local[e]) {
                                valuesWait.push(e)
                            }
                        })

                    } else {
                        Object.keys(placesObject).forEach(e => {
                            setValuesCategories(prevState => ({
                                ...prevState,
                                [e]: false
                            }));
                            Object.keys(placesObject[e].stanki).forEach(k => {
                                valuesWait.push(k)
                                setValuesStanki(prevState => ({
                                    ...prevState,
                                    [k]: false
                                }));
                            })
                        })
                    }
                } else {
                    setValuesCategories(prevState => ({
                        ...prevState,
                        [places[check]]: true
                    }));

                    Object.keys(placesObject).forEach(e => {
                        Object.keys(placesObject[e].stanki).forEach(k => {
                            if (e !== places[check]) {
                                setValuesStanki(prevState => ({
                                    ...prevState,
                                    [k]: false
                                }));
                            } else {
                                valuesWait.push(k)
                                setValuesStanki(prevState => ({
                                    ...prevState,
                                    [k]: true
                                }));
                            }
                        })
                    })

                }
                setValuesStankiWait(valuesWait)
                updatePageSmena(date, valuesWait, stateLineHC, placesObject)
            }
        })

    }, [history, date, stateLineHC, updateList])

    function newDate(dateInput) {
        setDate(dateInput)
    }


    return (
        <div>

            <MenuStankiIndividual razdel={razdel} menuSelected={page}/>

            <div className="buttons-otchet">

                <Link to={`/stanki/${places[page]}`}>
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to={`/stankiMonth/${places[page]}`}>
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to={`/stankiSmena/${places[page]}`}>
                    <div className="menuSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
                <ListDevicesCategoryIndividual updateList={updateList} setUpdateList={setUpdateList}
                                               placesObject={placesObject} placeKeys={placeKeys}
                                               valuesStanki={valuesStanki} setValuesStanki={setValuesStanki}
                                               setValuesStankiWait={setValuesStankiWait}
                                               valuesCategories={valuesCategories}
                                               setValuesCategories={setValuesCategories}
                                               page={page} stankiObject={stankiObject}/>

            </div>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>
                <div className='countOperations' id='containerOperations'></div>
            </div>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal2"></div>
                <div className='countOperations' id='containerOperations2'></div>
            </div>

            <SwitchLineHCIndividual stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}/>

            {valuesStankiWait.map((e, i) => {
                let stanok = stankiObject[e]

                if (stanok !== undefined) {
                    if (Object.keys(stanok).length !== 0) {
                        return <ComplexSmenaAllIngo key={i} complexName={stanok.buttonNames.name}
                                                    complexImg={stanok.complexImg}
                                                    complexMesto={stanok.buttonsVrs} size={stanok.size}
                                                    idContainer={i * 2 + 1}
                                                    service={stanok.buttonNames.serviceName}
                                                    alarm={stanok.buttonNames.alarm}
                                                    programs={stanok.buttonNames.programsName + 'smena'}
                                                    laser={stanok.buttonNames.laser}
                                                    report={stanok.buttonNames.report}
                                                    current={stanok.buttonNames.current}/>
                    } else return null
                } else return null


            })}
        </div>
    )

}
