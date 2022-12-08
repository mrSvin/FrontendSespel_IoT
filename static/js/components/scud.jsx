function Scud() {

    const history = useHistory()
    const [heightHighchartContainer, setHeightHighchartContainer] = useState(0);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState(parseNameUrl(location.pathname))
    let [smenaState, setSmenaState] = useState('8и')
    let [usersWithSmena, setUsersWithSmena] = useState('line')
    let [workTime, setWorkTime] = useState([])
    let [photoArray, setPhotoArray] = useState([])
    let [loadManyRequest, setLoadManyRequest] = useState(false)
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
                        if (tabel == '') {
                            return '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'
                        } else return e.photo[tabel]
                    })
                    let highchartsLen = document.getElementsByClassName('highcharts-axis-labels highcharts-yaxis-labels')[1].querySelectorAll('span').length
                    if(arrayPhotos.length == highchartsLen){
                        setPhotoArray(arrayPhotos)
                    }
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

                <Link to={`/scud/1ploshadka`} className={`${loadManyRequest ? 'noActiveButton' : null}`}
                      onClick={() => {
                          defenseFromManyRequest(setLoadManyRequest)
                      }}>
                    <div className={`${place == '1ploshadka' ? 'menuSelect' : 'menuNoSelect'}`} onClick={() => {
                        setPlace('1ploshadka')
                    }}>Первая площадка
                        {place !== '1ploshadka' ? null :
                            <div className={`smenaScud ${loadManyRequest ? 'noActiveButton' : null}`}>
                                <span className={smenaState == '8' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('8')
                                      }}>8 часов</span>
                                <span className={smenaState == '7' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          setSmenaState('7')
                                      }}>7.2 часа</span>
                                <span className={smenaState == '11' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('11')
                                      }}>11 часов</span>
                                <span className={smenaState == '24' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('24')
                                      }}>24 часа</span>
                                <span className={smenaState == '8и' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('8и')
                                      }}>ИТР</span>
                            </div>
                        }
                    </div>
                </Link>

                <Link to={`/scud/2ploshadka`} className={`${loadManyRequest ? 'noActiveButton' : null}`}
                      onClick={() => {
                          defenseFromManyRequest(setLoadManyRequest)
                      }}>
                    <div className={`${place == '2ploshadka' ? 'menuSelect' : 'menuNoSelect'}`} onClick={() => {
                        setPlace('2ploshadka')
                    }}>Вторая площадка
                        {place !== '2ploshadka' ? null :
                            <div className={`smenaScud ${loadManyRequest ? 'noActiveButton' : null}`}>
                                <span className={smenaState == '8' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('8')
                                      }}>8 часов</span>
                                <span className={smenaState == '7' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('7')
                                      }}>7.2 часа</span>
                                <span className={smenaState == '11' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('11')
                                      }}>11 часов</span>
                                <span className={smenaState == '24' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('24')
                                      }}>24 часа</span>
                                <span className={smenaState == '8и' ? 'scudSelect' : 'scudSelectNoSelect'}
                                      onClick={() => {
                                          defenseFromManyRequest(setLoadManyRequest)
                                          setSmenaState('8и')
                                      }}>ИТР</span>
                            </div>
                        }
                    </div>
                </Link>

                <Link to={`/scud/office`} className={`${loadManyRequest ? 'noActiveButton' : null}`} onClick={() => {
                    defenseFromManyRequest(setLoadManyRequest)
                }}>
                    <div className={`${place == 'office' ? 'menuSelect' : 'menuNoSelect'}`} onClick={() => {
                        defenseFromManyRequest(setLoadManyRequest)
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

            {smenaState == '11' ? <LunchTwelveHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '24' ? <LunchTwentyFourHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '8и' ? <LunchItr heightHighchartContainer={heightHighchartContainer}/> : null}

            <Otklon heightHighchartContainer={heightHighchartContainer} workTime={workTime} smenaState={smenaState}/>
            <WorkTime heightHighchartContainer={heightHighchartContainer} workTime={workTime}/>
        </div>
    );
}

function ScudBot() {

    const [heightHighchartContainer, setHeightHighchartContainer] = useState(0);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState(getScudBotUrl()[0])
    let [smenaState, setSmenaState] = useState(getScudBotUrl()[1])
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

                highChartScudBot(series[0], series[1])

                setWorkTime(series[2])
                changeLunchOpacity()

                let imagePromise = fetchSkudImage(date, place, smenaState)
                imagePromise.then(e => {

                    let arrayPhotos = series[3].map(tabel => {
                        if (tabel == '') {
                            return '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'
                        } else return e.photo[tabel]
                    })
                    setPhotoArray(arrayPhotos)
                    setLoading(false)

                    let botClassList = document.querySelectorAll('.otklon')
                    for(let i = 0; i < botClassList.length; i++){
                        botClassList[i].classList.add('scudBotMargin')
                    }
                })

            }
        })
    }, [date, place, smenaState, usersWithSmena]);

    function newDate(dateInput) {
        setDate(dateInput)
    }

    return (
        <div className='scudBot'>
            <div className="energyCalendarContainer hideIndividualAll">
                <DayCalendar newDate={newDate} date={date}/>
                <div>
                    <SwitchLineHCIndividual stateLineHC={usersWithSmena} setStateLineHC={setUsersWithSmena}
                                            text={'Привязка по смене'}/>
                </div>
            </div>

            <Photo heightHighchartContainer={heightHighchartContainer} photoArray={photoArray} loading={loading}/>

            {smenaState == '8' ? <LunchEightHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '7' ? <LunchSevenHours heightHighchartContainer={heightHighchartContainer}/> : null}

            {smenaState == '11' ? <LunchTwelveHoursBot heightHighchartContainer={heightHighchartContainer}/> : null}

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
        left: '33.3%',
        width: '1.175%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '53.95%',
        width: '1.175%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '73.30%',
        width: '1.175%'
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
        left: '33.35%',
        width: '2.55%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '54.25%',
        width: '2.55%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '73.7%',
        width: '2.55%'
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
        left: '33.5%',
        width: '1.175%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '45.6%',
        width: '1.175%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '64%',
        width: '1.175%'
    }

    let lunchSettings4 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '75.8%',
        width: '1.175%'
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

function LunchTwelveHoursBot({heightHighchartContainer}) {
    let height = {
        height: 52 * heightHighchartContainer
    };

    let lunchSettings1 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '53.8%',
        width: '1.15%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '61.95%',
        width: '1.15%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '71.5%',
        width: '1.15%'
    }

    let lunchSettings4 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '80%',
        width: '1.15%'
    }

    let pWidth = {
        width: 'max-content',
        left: '-33px'
    }

    return (
        <div className='wrapperScud'>
            <div className={'lunchTime'} style={lunchSettings1}>
                <p style={pWidth}>11:30-12:00</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings2}>
                <p style={pWidth}>16:00-16:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings3}>
                <p style={pWidth}>23:00-23:30</p>
                <div className='strokelunchTime'></div>
            </div>
            <div className={'lunchTime'} style={lunchSettings4}>
                <p style={pWidth}>03:30-4:00</p>
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
        left: '34.2%',
        width: '1.175%'
    }

    let lunchSettings2 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '54%',
        width: '1.175%'
    }

    let lunchSettings3 = {
        height: getLunchHeight(heightHighchartContainer),
        left: '74%',
        width: '1.175%'
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
        left: '52.9%',
        width: '2.4%',
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
                        t = msToTimeScud(t + 60000)
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
        height: getLunchHeight(heightHighchartContainer) == '70%' ? 210 : getLunchHeight(heightHighchartContainer),
        right: '10.5%'
    }

    let style = {
        height: getLunchHeight(heightHighchartContainer) == '70%' ? 210 / heightHighchartContainer : getLunchHeight(heightHighchartContainer) / heightHighchartContainer,
        width: getLunchHeight(heightHighchartContainer) == '70%' ? 210 / heightHighchartContainer : getLunchHeight(heightHighchartContainer) / heightHighchartContainer,
    }

    let undefImg = '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'

    return (
        <div>
            <div className={`otklon ${loading ? 'hideScudAvatar' : null}`} style={lunchSettings}>
                {photoArray.map((e, i) => {
                    return (
                        <div key={i} className='otklonTime' style={style}>
                            <img className='skudAvatar' style={style}
                                 src={`data:image/jpeg;base64,${e == undefined ? undefImg : e}`}
                                 alt=""/>
                        </div>)
                })
                }
            </div>
        </div>
    )
}

