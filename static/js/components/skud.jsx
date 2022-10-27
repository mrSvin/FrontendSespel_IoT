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

    // let places = ['1ploshadka', '2ploshadka', 'office']

    const history = useHistory()
    const [heightHighchartContainer, setHeightHighchartContainer] = useState(3);
    let [date, setDate] = useState(dayNow());
    let [place, setPlace] = useState('2ploshadka')

    let height = {
        height: 52 * heightHighchartContainer
    };

    useEffect(() => {

        let promise = fetchRequestSkud(date, place)
        promise.then(data=>{
            let userData = createUserDataStructure(data)
            let filteredData = applyFilters(userData)

            setHeightHighchartContainer(Object.keys(filteredData).length);

            let series = getHighchartSeriesAndNames(filteredData)

            highChartSkud(...series)
        })

        return history.listen((location) => {
            let pathName = parseNameUrl(location.pathname)

            let address = ['1ploshadka', '2ploshadka', 'office']

            let index = address.findIndex(rank => rank === pathName);

            console.log('Сравнение индекса и состояния ',place, index)

            //setPlaceIndex()
            //console.log('pathName',pathName)
        })

    }, [date, place, history]);

    function newDate(dateInput) {
        setDate(dateInput)
    }

    return (
        <div>

            <div className="buttons-otchet">

                <Link to={`/skud/1ploshadka`}>
                    <div className={placeIndex=='1ploshadka'?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlace('1ploshadka')
                    }}>Первая площадка</div>
                </Link>

                <Link to={`/skud/2ploshadka`}>
                    <div className={placeIndex=='2ploshadka'?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlace('2ploshadka')
                    }}>Вторая площадка</div>
                </Link>

                <Link to={`/skud/office`}>
                    <div className={placeIndex=='office'?'menuSelect':'menuNoSelect'} onClick={()=>{
                        setPlace('office')
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