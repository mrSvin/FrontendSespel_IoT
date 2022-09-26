
function IndividualPage() {

    let places = ['ОТК', 'Мех.уч.2 пл.', 'Резка', 'Мех.уч.1 пл.', 'Роботы', 'Спец. комплексы', 'Склады', 'Литьё', 'Гибка', 'Все']

    let pageNew = 0
    places.forEach((e,i)=>{
        if(e== parseNameUrl(window.location.href)) pageNew = i
    })

    const [page, setPage] = useState(pageNew)

    const placesObject = getAllStankiData()

    let placeKeys = []

    if(page == 9) {
        placeKeys = Object.keys(placesObject).map(e => {
            return e
        })
    }
    else placeKeys.push(places[page])


    let stankiObject = {}
    let stankiKeys = []
    if(page == 9) {
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
    let [date, setDate] = useState(0);

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

    let forWait = []

    Object.keys(valuesStanki).forEach(e => {
        if (valuesStanki[e]) {
            forWait.push(e)
        }
    })

    const [valuesStankiWait, setValuesStankiWait] = useState(forWait)

    const history = useHistory()

    useEffect(() => {

        let dateInput = dayNow()
        setDate(dateInput)

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
            return fetchRequest(dateInput, item)
        }));

        updateLoadDataIndividual(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

        return history.listen((location) => {
            let check = 0

            let pathName = parseNameUrl(location.pathname)
            places.forEach((e,i)=>{
                if(e == pathName) check = i
            })

            setPage(check)
            // localStorage['page'] = i

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
            updatePage(date, valuesWait, stateLineHC, placesObject)

        })

    }, [history, date, stateLineHC])

    function newDate(dateInput) {
        setDate(dateInput)

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
            return fetchRequest(dateInput, item)
        }));

        updateLoadDataIndividual(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }

    return (
        <div>

            <MenuStankiIndividual menuSelected={page} setPage={setPage} setValuesStanki={setValuesStanki}
                                  setValuesStankiWait={setValuesStankiWait} setValuesCategories = {setValuesCategories}
                                  placesObject={placesObject} date={date} stateLineHC={stateLineHC}/>

            <div className="buttons-otchet">

                <Link to={`/stanki/individualPage/`}>
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to={`/stanki/individualPageMonth`}>
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to={`/stanki/individualPageSmena`}>
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <div>
                <div className="energyCalendarContainer">
                    <DayCalendar newDate={newDate} date={date}/>
                    <ListDevicesCategoryIndividual date={date} newDate={newDate} placesObject={placesObject} placeKeys={placeKeys}
                                         valuesStanki={valuesStanki} setValuesStanki={setValuesStanki} setValuesStankiWait={setValuesStankiWait}
                                         valuesCategories={valuesCategories} setValuesCategories={setValuesCategories}
                                         page={page} stankiObject={stankiObject}/>

                </div>
                <ComplexTotalSutkiInfo/>

                <SwitchLineHCIndividual date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
                                        stankiObject={stankiObject} valuesStanki={valuesStanki}
                                        setValuesStankiWait={setValuesStankiWait}
                />

                {valuesStankiWait.map((e, i) => {
                    let stanok = stankiObject[e]

                    if(stanok !== undefined){
                        if (Object.keys(stanok).length !== 0) {
                            return <ComplexSutkiAllInfo key={i} complexName={stanok.buttonNames.name}
                                                        complexImg={stanok.complexImg}
                                                        complexMesto={stanok.buttonsVrs} size={stanok.size}
                                                        idContainer={i + 1}
                                                        service={stanok.buttonNames.serviceName}
                                                        alarm={stanok.buttonNames.alarm}
                                                        programs={stanok.buttonNames.programsName}
                                                        laser={stanok.buttonNames.laser}
                                                        report={stanok.buttonNames.report}
                                                        current={stanok.buttonNames.current}/>
                        } else return null
                    } else return null


                })}
            </div>

        </div>
    )
}
