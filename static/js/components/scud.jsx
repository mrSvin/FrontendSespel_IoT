function selectObjectsWithSmena(userData, smenaState) {
    let obj = {}
    console.log('Выбранный тип смены', smenaState)
    Object.keys(userData).forEach(name => {
        if (userData[name].smenaInfo !== '') {
            if (userData[name].smenaInfo == smenaState) {
                obj[name] = userData[name]
            }
        }
    })
    console.log('Объекты ', obj)
    return obj
}

function Scud() {

    const history = useHistory()
    const [heightHighchartContainer, setHeightHighchartContainer] = useState(0);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState(parseNameUrl(location.pathname))
    let [smenaState, setSmenaState] = useState('8и')

    useEffect(() => {
        let promise = fetchRequestScud(date, place, smenaState)
        promise.then(data => {
            let userData = createUserDataStructure(data)

            let objectsWithSmena = selectObjectsWithSmena(userData, smenaState)

            // let filteredData = applyFilters(objectsWithSmena, smenaState, date)
            let filteredData = applyFilters(userData, smenaState, date)

            setHeightHighchartContainer(Object.keys(filteredData).length);

            let series = getHighchartSeriesAndNames(filteredData)

            highChartScud(...series)
        })
    }, [date, place, smenaState]);

    useEffect(() => {

        return history.listen((location) => {
            let pathName = parseNameUrl(location.pathname)
            let thisPage = location.pathname.slice(0, 6)

            if (thisPage == '/scud/') {
                setPlace(pathName)
            }
        })
    }, [history]);

    function newDate(dateInput) {
        setDate(dateInput)
    }

    return (
        <div>
            <div className="buttons-otchet marginToSmenaMenu">

                <Link to={`/scud/1ploshadka`}>
                    <div className={place == '1ploshadka' ? 'menuSelect' : 'menuNoSelect'} onClick={() => {
                        setPlace('1ploshadka')
                    }}>Первая площадка
                        {place !== '1ploshadka' ? null :
                            <div className='smenaSkud'>
                                <span className={smenaState == '8' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8')
                                      }}>8 часов</span>
                                <span className={smenaState == '7' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('7')
                                      }}>7.2 часа</span>
                                <span className={smenaState == '12' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('12')
                                      }}>12 часов</span>
                                <span className={smenaState == '24' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('24')
                                      }}>24 часа</span>
                                <span className={smenaState == '8и' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8и')
                                      }}>ИТР</span>
                            </div>
                        }
                    </div>
                </Link>

                <Link to={`/scud/2ploshadka`}>
                    <div className={place == '2ploshadka' ? 'menuSelect' : 'menuNoSelect'} onClick={() => {
                        setPlace('2ploshadka')
                    }}>Вторая площадка
                        {place !== '2ploshadka' ? null :
                            <div className='smenaSkud'>
                                <span className={smenaState == '8' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8')
                                      }}>8 часов</span>
                                <span className={smenaState == '7' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('7')
                                      }}>7.2 часа</span>
                                <span className={smenaState == '12' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('12')
                                      }}>12 часов</span>
                                <span className={smenaState == '24' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('24')
                                      }}>24 часа</span>
                                <span className={smenaState == '8и' ? 'skudSelect' : 'skudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8и')
                                      }}>ИТР</span>
                            </div>
                        }
                    </div>
                </Link>

                <Link to={`/scud/office`}>
                    <div className={place == 'office' ? 'menuSelect' : 'menuNoSelect'} onClick={() => {
                        setPlace('office')
                        setSmenaState('8и')
                    }}>Офис
                    </div>
                </Link>

            </div>

            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
            </div>

            {smenaState == '8' ? <СontainerEightHours heightHighchartContainer={heightHighchartContainer}/> : null}


            {smenaState == '8и' ? <СontainerItr heightHighchartContainer={heightHighchartContainer}/> : null}


        </div>
    );
}

function СontainerEightHours({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings = {
        height: getLunchHeight(heightHighchartContainer),
        left: '57.6%',
        width: '3%',
    }

    return (
        <div className='wrapperScud'>
            {/*<div className={'lunchTime'} style={lunchSettings}>*/}
            {/*    <p>Обед</p>*/}
            {/*    <div className='strokelunchTime'></div>*/}
            {/*</div>*/}
            <div id="containerScud" style={height} className="scudHigcharts"></div>
        </div>
    )
}

function СontainerItr({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings = {
        height: getLunchHeight(heightHighchartContainer),
        left: '57.6%',
        width: '3%',
    }

    return (
        <div className='wrapperScud'>
            <div className={'lunchTime'} style={lunchSettings}>
                <p>Обед</p>
                <div className='strokelunchTime'></div>
            </div>
            <div id="containerScud" style={height} className="scudHigcharts"></div>
        </div>
    )
}
