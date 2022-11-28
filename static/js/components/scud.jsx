function fetchSkudImage(date = '2022-10-25', place = 'Ленинградская 36, Дверь', smenaState = '8и') {
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
        return fetch(`/api/scudImage/beginDate:${dateYesterday} 07:00:00_endDate:${date} 06:50:00_mesto:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    } else if (smenaState == '12') {
        let dateYesterday = dayYesterday(date)
        return fetch(`/api/scudImage/beginDate:${dateYesterday} 07:00:00_endDate:${date} 06:30:00_mesto:${place}`, {method: 'GET'})
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

function Scud() {

    const history = useHistory()
    const [heightHighchartContainer, setHeightHighchartContainer] = useState(0);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState(parseNameUrl(location.pathname))
    let [smenaState, setSmenaState] = useState('8и')
    let [usersWithSmena, setUsersWithSmena] = useState('line')
    let [workTime, setWorkTime] = useState([])
    let [photoArray, setPhotoArray] = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        let promise = fetchRequestScud(date, place, smenaState)
        setLoading(true)
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

                let imagePromise = fetchSkudImage(date, place, smenaState)
                imagePromise.then(e => {

                    let arrayPhotos = series[3].map(tabel => {
                        return e.photo[tabel]
                    })
                    setPhotoArray(arrayPhotos)
                    setLoading(false)
                })

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

                <Link to={`/adminpanel/userscontrolNew`} className={'hideIndividualAll'}>
                    <div className={place == 'admin' ? 'menuSelect hideMessage' : 'menuNoSelect'}>АДМИН
                    </div>
                </Link>

            </div>
            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
                <div className='hideIndividualAll'>
                    <SwitchLineHCIndividual stateLineHC={usersWithSmena} setStateLineHC={setUsersWithSmena}
                                            text={'Привязка по смене'}/>
                </div>
            </div>
            <p className='switchButtonMessage'>{usersWithSmena == 'line' ? 'Отображение сотрудников по выбранного графику' : 'Все сотрудники'}</p>

            <Photo heightHighchartContainer={heightHighchartContainer} photoArray={photoArray} loading={loading}/>

            {smenaState == '8' ? <LunchEightHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '7' ? <LunchSevenHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '12' ? <LunchTwelveHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '24' ? <LunchTwentyFourHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '8и' ? <LunchItr heightHighchartContainer={heightHighchartContainer}/> : null}

            <Otklon heightHighchartContainer={heightHighchartContainer} workTime={workTime} smenaState={smenaState}/>
            <WorkTime heightHighchartContainer={heightHighchartContainer} workTime={workTime}/>
        </div>
    );
}

function LunchEightHours({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings1 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '29%',
        width: '1.325%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '51.45%',
        width: '1.325%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '72.45%',
        width: '1.325%'
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
        left: '29.15%',
        width: '2.7%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '51.75%',
        width: '2.7%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '72.9%',
        width: '2.7%'
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
        left: '29.3%',
        width: '1.325%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '42.3%',
        width: '1.325%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '62.25%',
        width: '1.325%'
    }

    let lunchSettings4 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '75.1%',
        width: '1.325%'
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
        left: '31.2%',
        width: '1.325%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '51.6',
        width: '1.325%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '73.1%',
        width: '1.325%'
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
        left: '50.2%',
        width: '2.65%',
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
        height: heightHighchartContainer > 7 ? '52px' : getOtklonHeight(heightHighchartContainer)
    }

    let colorGreen = {
        color: '#19b319',
        height: heightHighchartContainer > 7 ? '52px' : getOtklonHeight(heightHighchartContainer)
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

function WorkTime({heightHighchartContainer, workTime}) {

    let lunchSettings = {
        height: getLunchHeight(heightHighchartContainer),
        right: '20px',
        color: 'white',
    }

    let pSetting = {
        right: '0px',
    }


    let style = {
        color: '#white',
        height: heightHighchartContainer > 7 ? '52px' : getOtklonHeight(heightHighchartContainer)
    }

    return (
        <div>
            <div className={'otklon'} style={lunchSettings}>
                <p style={pSetting}>Время</p>
                {workTime.map((e, i) => {
                    return <div key={i} className='otklonTime' style={style}>{msToTimeScud(e)}</div>
                })
                }
            </div>
        </div>
    )
}

function Photo({heightHighchartContainer, photoArray, loading}) {

    let lunchSettings = {
        height: getLunchHeight(heightHighchartContainer),
        right: '10.5%'
    }

    let style = {
        height: heightHighchartContainer > 7 ? '52px' : getOtklonHeight(heightHighchartContainer)
    }

    return (
        <div>
            <div className={`otklon ${loading ? 'hideScudAvatar' : null}`} style={lunchSettings}>
                {photoArray.map((e, i) => {
                    return (
                        <div key={i} className='otklonTime' style={style}>
                            <img className='skudAvatar' src={`data:image/jpeg;base64,${e}`} alt=""/>
                        </div>)
                })
                }
            </div>
        </div>
    )
}