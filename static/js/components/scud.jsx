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

            {smenaState == '8' ? <LunchEightHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '7' ? <LunchSevenHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '12' ? <LunchTwelveHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '24' ? <LunchTwentyFourHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '8и' ? <LunchItr heightHighchartContainer={heightHighchartContainer}/> : null}


        </div>
    );
}

function LunchEightHours({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings1 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '34.9%',
        width: '1.5%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '59%',
        width: '1.5%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '81.5%',
        width: '1.5%'
    }

    let pWidth = {
        width: 'max-content',
        left: '-50px'
    }

    return (
        <div className='wrapperScud'>
            <div className={'lunchTime'} style={lunchSettings1}>
                <p style={pWidth}>Обед 11:30-12:00</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings2}>
                <p style={pWidth}>Обед 19:30-20:00</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings3}>
                <p style={pWidth}>Обед 03:00-3:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div id="containerScud" style={height} className="scudHigcharts"></div>
        </div>
    )
}

function LunchSevenHours({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings1 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '34.9%',
        width: '3%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '59%',
        width: '3%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '81.5%',
        width: '3%'
    }

    let pWidth = {
        width: 'max-content',
        left: '-45px'
    }

    return (
        <div className='wrapperScud'>
            <div className={'lunchTime'} style={lunchSettings1}>
                <p style={pWidth}>Обед 11:30-12:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings2}>
                <p style={pWidth}>Обед 19:30-20:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings3}>
                <p style={pWidth}>Обед 03:00-4:00</p>
                <div className='strokelunchTime'></div>
            </div>
            <div id="containerScud" style={height} className="scudHigcharts"></div>
        </div>
    )
}

function LunchTwelveHours({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings1 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '34.9%',
        width: '1.5%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '48.6%',
        width: '1.5%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '68.2%',
        width: '1.5%'
    }

    let lunchSettings4 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '83%',
        width: '1.5%'
    }

    let pWidth = {
        width: 'max-content',
        left: '-50px'
    }

    return (
        <div className='wrapperScud'>
            <div className={'lunchTime'} style={lunchSettings1}>
                <p style={pWidth}>Обед 11:30-12:00</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings2}>
                <p style={pWidth}>Обед 16:00-16:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings3}>
                <p style={pWidth}>Обед 23:00-23:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings4}>
                <p style={pWidth}>Обед 03:30-4:00</p>
                <div className='strokelunchTime'></div>
            </div>
            <div id="containerScud" style={height} className="scudHigcharts"></div>
        </div>
    )
}

function LunchTwentyFourHours({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings1 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '38.1%',
        width: '1.5%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '60.7%',
        width: '1.5%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '81.5%',
        left: '84.8%',
        width: '1.5%'
    }

    let pWidth = {
        width: 'max-content',
        left: '-50px'
    }

    return (
        <div className='wrapperScud'>
            <div className={'lunchTime'} style={lunchSettings1}>
                <p style={pWidth}>Обед 12:30-13:00</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings2}>
                <p style={pWidth}>Обед 20:00-20:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings3}>
                <p style={pWidth}>Обед 04:00-04:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div id="containerScud" style={height} className="scudHigcharts"></div>
        </div>
    )
}

function LunchItr({heightHighchartContainer}) {
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
