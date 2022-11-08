function getNotNullData(userData) {
    let obj = {}

    Object.keys(userData).forEach(name => {
        if (userData[name].smenaInfo !== null) {
            obj[name] = userData[name]
        }
    })
    return obj
}

function Scud() {

    const history = useHistory()
    const [heightHighchartContainer, setHeightHighchartContainer] = useState(0);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState(parseNameUrl(location.pathname))
    let [smenaState, setSmenaState] = useState('1')

    let height = {
        height: 52 * heightHighchartContainer
    };

    let heightLunch = {
        height: getLunchHeight(heightHighchartContainer)
    }

    useEffect(() => {
        let promise = fetchRequestScud(date, place)
        promise.then(data => {
            let userData = createUserDataStructure(data)
            console.log('Получение не пустых типов', getNotNullData(userData))
            let filteredData = applyFilters(userData)

            setHeightHighchartContainer(Object.keys(filteredData).length);

            let series = getHighchartSeriesAndNames(filteredData)

            highChartScud(...series)
        })
    }, [date, place]);

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
            <div className="buttons-otchet">

                <Link to={`/scud/1ploshadka`}>
                    <div className={place == '1ploshadka' ? 'menuSelect' : 'menuNoSelect'} onClick={() => {
                        setPlace('1ploshadka')
                    }}>Первая площадка
                        {place !== '1ploshadka'? null:
                        <div className='smenaSkud'>
                            <span>Первая смена</span>
                            <span>Вторая смена</span>
                            <span>Третья смена</span>
                            <span>ИТР</span>
                        </div>
                        }
                    </div>
                </Link>

                <Link to={`/scud/2ploshadka`}>
                    <div className={place == '2ploshadka' ? 'menuSelect' : 'menuNoSelect'} onClick={() => {
                        setPlace('2ploshadka')
                    }}>Вторая площадка
                    </div>
                </Link>

                <Link to={`/scud/office`}>
                    <div className={place == 'office' ? 'menuSelect' : 'menuNoSelect'} onClick={() => {
                        setPlace('office')
                    }}>Офис
                    </div>
                </Link>

            </div>

            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
            </div>

            <div className='wrapperScud'>
                <div className={'lunchTime'} style={heightLunch}>
                    <p>Обед</p>
                    <div className='strokelunchTime'></div>
                </div>
                <div id={"containerScud"} style={height} className="scudHigcharts"></div>
            </div>
        </div>
    );
}