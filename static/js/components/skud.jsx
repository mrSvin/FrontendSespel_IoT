function Skud() {

    let placesAll = [
        'Ленинградская 36, Дверь',
        'Ленинградская 36, турникет',
        'База1, КПП-1, Турникет1',
        'База1, КПП-1, Турникет2',
        'База 2, КПП2-1',
        'База 2, КПП2-2',
        'База 2, КПП-1-1',
        'База 2, КПП-1-2',
        'отдел кадров',
        'пластиковая дверь',
    ]

    let places = ['1ploshadka', 'База 2, КПП2-1', 'Ленинградская 36, Дверь']

    const history = useHistory()
    const [heightState, setHeightState] = useState(3);
    let [date, setDate] = useState(dayNow());
    let [placeIndex, setPlaceIndex] = useState(1)

    let height = {
        height: 52 * heightState
    };

    useEffect(() => {

        let promise = fetchRequestSkud(date, places[placeIndex])
        promise.then(data=>{
            let userData = createInterface(data)
            userData = applyFilters(userData)

            let len = Object.keys(userData).length
            setHeightState(len);

            let arrayNames = []
            let arrayData = []

            Object.keys(userData).forEach((e) => {
                arrayNames.push(e + ' ' + userData[e]['workTime'])
                arrayData.push(userData[e]['highchartsWork'])
                arrayData.push(userData[e]['highchartsOutWork'])
            })

            let series = buildHighchartSeries(arrayData)

            highChartSkud(series, arrayNames)
        })

        return history.listen((location) => {
            let pathName = parseNameUrl(location.pathname)

            let address = ['1ploshadka', '2ploshadka', 'office']

            let index = address.findIndex(rank => rank === pathName);

            console.log('Сравнение индекса и состояния ',placeIndex, index)

            //setPlaceIndex()
            //console.log('pathName',pathName)
        })

    }, [date, placeIndex, history]);

    function newDate(dateInput) {
        setDate(dateInput)
    }

    return (
        <div>

            <div className="buttons-otchet">

                <Link to={`/skud/1ploshadka`}>
                    <div className={placeIndex==0?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlaceIndex(0)
                    }}>Первая площадка</div>
                </Link>

                <Link to={`/skud/2ploshadka`}>
                    <div className={placeIndex==1?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlaceIndex(1)
                    }}>Вторая площадка</div>
                </Link>

                <Link to={`/skud/office`}>
                    <div className={placeIndex==2?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlaceIndex(2)
                    }}>Офис</div>
                </Link>

            </div>

            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
            </div>

            <div id={"containerSkud"} style={height} className="skudHigcharts"></div>

        </div>
    );
}