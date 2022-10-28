function Skud() {

    const history = useHistory()
    const [heightHighchartContainer, setHeightHighchartContainer] = useState(3);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState(parseNameUrl(location.pathname))

    let height = {
        height: 52 * heightHighchartContainer
    };

    let heightLunch = {
        height: 52 * (heightHighchartContainer-2) + 13
    }

    useEffect(() => {
        let promise = fetchRequestSkud(date, place)
        promise.then(data=>{
            let userData = createUserDataStructure(data)
            let filteredData = applyFilters(userData)

            setHeightHighchartContainer(Object.keys(filteredData).length);

            let series = getHighchartSeriesAndNames(filteredData)

            highChartSkud(...series)
        })
    }, [date, place]);

    useEffect(() => {

        return history.listen((location) => {
            let pathName = parseNameUrl(location.pathname)
            let thisPage = location.pathname.slice(0,6)

            if(thisPage == '/skud/') {
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

                <Link to={`/skud/1ploshadka`}>
                    <div className={place=='1ploshadka'?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlace('1ploshadka')
                    }}>Первая площадка</div>
                </Link>

                <Link to={`/skud/2ploshadka`}>
                    <div className={place=='2ploshadka'?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlace('2ploshadka')
                    }}>Вторая площадка</div>
                </Link>

                <Link to={`/skud/office`}>
                    <div className={place=='office'?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlace('office')
                    }}>Офис</div>
                </Link>

            </div>

            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
            </div>

            <div className='wrapperSkud'>
                <div className={'lunchTime'} style={heightLunch}></div>
                <div id={"containerSkud"} style={height} className="skudHigcharts"></div>
            </div>
        </div>
    );
}