function msToTimeScud(duration, date = 24) {

    let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);


    if (hours <= 9) hours = '0' + hours

    if (minutes <= 9) minutes = '0' + minutes

    return `${hours}:${minutes}`
}

function getSmenaTime(typeSmena) {
    let smenaTime = 0

    switch (typeSmena) {
        case '8и':
            smenaTime = 28800000
            break;
        case '8':
            smenaTime = 28800000
            break;
        case '7':
            smenaTime = 26400000
            break;
        case '12':
            smenaTime = 39600000
            break;
        case '24':
            smenaTime = 81000000
            break;
        default:
            smenaTime = 28800000
            break
    }
    return smenaTime
}

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

function changeLunchOpacity() {

    let highchartsTracker = document.getElementsByClassName('highcharts-tracker')
    let lunchTimes = document.getElementsByClassName('lunchTime')

    for (let i = 0; i < lunchTimes.length; i++) {
        for (let j = 0; j < highchartsTracker.length; j++) {
            highchartsTracker[j].addEventListener('mouseover', (event) => {
                lunchTimes[i].classList.add('lunchTimeHide')
            });
            highchartsTracker[j].addEventListener('mouseleave', (event) => {
                lunchTimes[i].classList.remove('lunchTimeHide')
            });
        }
    }
}

function filterY(data, y) {
    data.forEach((e, i) => {
        data[i]['y'] = y
    })
    return data
}

function Scud() {

    const history = useHistory()
    const [heightHighchartContainer, setHeightHighchartContainer] = useState(0);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState(parseNameUrl(location.pathname))
    let [smenaState, setSmenaState] = useState('8и')
    let [usersWithSmena, setUsersWithSmena] = useState('multiline')
    let [workTime, setWorkTime] = useState([])

    useEffect(() => {
        let promise = fetchRequestScud(date, place, smenaState)
        promise.then(data => {

            if (!Object.keys(data).includes('error')) {
                let userData = createUserDataStructure(data)

                let objectsWithSmena = selectObjectsWithSmena(userData, smenaState)

                let filteredData = []

                if (usersWithSmena == 'line') {
                    filteredData = applyFilters(objectsWithSmena, smenaState, date)
                } else filteredData = applyFilters(userData, smenaState, date)

                setHeightHighchartContainer(Object.keys(filteredData).length);

                let series = getHighchartSeriesAndNames(filteredData)

                highChartScud(series[0], series[1])
                setWorkTime(series[2])
                changeLunchOpacity()
            }
        })
    }, [date, place, smenaState, usersWithSmena]);

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
                            <div className='smenaScud'>
                                <span className={smenaState == '8' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8')
                                      }}>8 часов</span>
                                <span className={smenaState == '7' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('7')
                                      }}>7.2 часа</span>
                                <span className={smenaState == '12' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('12')
                                      }}>11 часов</span>
                                <span className={smenaState == '24' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('24')
                                      }}>24 часа</span>
                                <span className={smenaState == '8и' ? 'scudSelect' : 'scudSelectNoSelect'}
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
                            <div className='smenaScud'>
                                <span className={smenaState == '8' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('8')
                                      }}>8 часов</span>
                                <span className={smenaState == '7' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('7')
                                      }}>7.2 часа</span>
                                <span className={smenaState == '12' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('12')
                                      }}>11 часов</span>
                                <span className={smenaState == '24' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('24')
                                      }}>24 часа</span>
                                <span className={smenaState == '8и' ? 'scudSelect' : 'scudSelectNoSelect'}
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

                <Link to={`/adminpanel/userscontrolNew`}>
                    <div className={place == 'admin' ? 'menuSelect' : 'menuNoSelect'}>АДМИН
                    </div>
                </Link>

            </div>
            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
                <SwitchLineHCIndividual stateLineHC={usersWithSmena} setStateLineHC={setUsersWithSmena}
                                        text={'Привязка по смене'}/>
            </div>

            {smenaState == '8' ? <LunchEightHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '7' ? <LunchSevenHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '12' ? <LunchTwelveHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '24' ? <LunchTwentyFourHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '8и' ? <LunchItr heightHighchartContainer={heightHighchartContainer}/> : null}

            <Otklon heightHighchartContainer={heightHighchartContainer} workTime={workTime} smenaState={smenaState}/>
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
        left: '33.05%',
        width: '3%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '59.3%',
        width: '3%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '81.9%',
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
        left: '35.2%',
        width: '1.5%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '49.3%',
        width: '1.5%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '69.25%',
        width: '1.5%'
    }

    let lunchSettings4 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '84.3%',
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
        left: '37.4%',
        width: '1.5%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '59%',
        width: '1.5%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '82.2%',
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

function Otklon({heightHighchartContainer, workTime, smenaState}) {

    let lunchSettings = {
        height: getLunchHeight(heightHighchartContainer),
    }

    let colorRed = {
        color: '#df1919',
        height: heightHighchartContainer > 10? '52px' : '105px'
    }

    let colorGreen = {
        color: '#19b319',
        height: heightHighchartContainer > 10? '52px' : '105px'
    }

    let smenaTime = getSmenaTime(smenaState)

    return (
        <div>
            <div className={'otklon'} style={lunchSettings}>
                <p>Откл-е</p>
                {workTime.map((e, i) => {
                        let t = null
                        t = smenaTime - e
                        if (t >= 0) {
                            t = msToTimeScud(t)
                            return <div key={i} className='otklonTime' style={colorRed}>-{t}</div>
                        } else {
                            t = msToTimeScud(-t)
                            return <div key={i} className='otklonTime' style={colorGreen}>+{t}</div>
                        }
                    })
                }
            </div>
        </div>
    )
}
