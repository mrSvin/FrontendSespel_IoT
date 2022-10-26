function Skud() {

    function parseLinearSkud(arrayParse, y, date, inOut) {
        var arraySave = [] // Массив, который будет заполняться

        date = (dayNow() == date)? dayTimeNow() : `${date} 23:59:59`

        if (arrayParse.length == 1) {
            arraySave.push({
                // x: arrayParse[0],
                // x2: date,
                x: new Date(arrayParse[0].slice(0,10)+' 00:00:00').getTime(),
                x2: (new Date(arrayParse[0])).getTime(),
                y: y,
                status: 'output'
            })
            arraySave.push({
                // x: arrayParse[0],
                // x2: date,
                x: (new Date(arrayParse[0])).getTime(),
                x2: (new Date(date)).getTime(),
                y: y,
                status: inOut[0]
            })
        } else {
            arraySave.push({
                // x: arrayParse[0],
                // x2: date,
                x: new Date(arrayParse[0].slice(0,10)+' 00:00:00').getTime(),
                x2: (new Date(arrayParse[0])).getTime(),
                y: y,
                status: 'output'
            })
            for (let i = 0; i < arrayParse.length; i++) {
                if (i == arrayParse.length - 1) {
                    arraySave.push({
                        // x: arrayParse[i],
                        // x2: date,
                        x: (new Date(arrayParse[i])).getTime(),
                        x2: (new Date(date)).getTime(),
                        y: y,
                        status: inOut[i]
                    })
                } else {
                    arraySave.push({
                        // x: arrayParse[i],
                        // x2: arrayParse[i + 1],
                        x: (new Date(arrayParse[i])).getTime(),
                        x2: (new Date(arrayParse[i + 1])).getTime(),
                        y: y,
                        status: inOut[i]
                    })
                }
            }
        }
        // Иначе в массив парсится переданный массив с именем программы

        // Функция возвращает массив коллекциями, содержащими 2 или 3 объекта.
        return arraySave
    }

    function fetchRequestSkud(date = '2022-10-25', place = 'Ленинградская 36, Дверь') {

        return fetch(`/api/scud/beginDate:${date} 00:00:00_endDate:${date} 23:59:59_device:${place}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                let userData = {}

                for (let i = 0; i < data.username.length; i++) {
                    userData[data.username[i]] = {
                        name: data.username[i],
                        tabid: data.tabid[i],
                        POS: data.POS[i],
                        logtime: [],
                        statusInOut: [],
                        workTime:0,
                    }
                }

                data.logtime.forEach((e, i) => {
                    userData[data.username[i]].logtime.push(e)
                    userData[data.username[i]].statusInOut.push(data.statusInOut[i])
                })

                Object.keys(userData).forEach((e, i) => {
                    userData[e].logtime = parseLinearSkud(userData[e].logtime, i, date, userData[e].statusInOut)
                    userData[e].logtime.forEach(parsedDate=>{
                        userData[e]['workTime'] += parsedDate.status == 'input'? new Date(parsedDate.x2).getTime()-new Date(parsedDate.x).getTime(): 0
                    })
                    userData[e]['workTime'] = msToTime(userData[e]['workTime'])
                })
                console.log('Возвращаю', userData)
                return userData
            })
    }

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

    let places = ['База1, КПП-1, Турникет1', 'База 2, КПП2-1', 'Ленинградская 36, Дверь']

    const [humans, setHumans] = useState({});
    let [date, setDate] = useState(dayNow());
    let [placeIndex, setPlaceIndex] = useState(1)

    let height = {
        height: 52 * Object.keys(humans).length
    };

    useEffect(() => {
        let promise = fetchRequestSkud(date, places[placeIndex])
        promise.then(data=>{
            setHumans(data);
            return data
        })
        .then(data=>{
            let arrayNames = []
            let arrayData = []
            Object.keys(data).forEach((e, i) => {
                arrayNames.push(e)
                arrayData.push(data[e]['logtime'])
                // highChartSkud(e, data[e]['logtime'], "container" + (i + 1))
            })

            let series = []
                arrayData.forEach((e,i)=>{

                    let input = []
                    let output = []

                    e.forEach(k=>{
                        if(k.status == 'input') input.push(k)
                        else output.push(k)
                    })

                    series.push({
                        pointWidth: 30,
                        colorByPoint: false,
                        color: '#38e817',
                        tooltip: {
                            pointFormat: '<b>Работает</b>'
                        },
                        data: input,
                    })
                    series.push({
                        pointWidth: 30,
                        colorByPoint: false,
                        color: '#ffea32',
                        tooltip: {
                            pointFormat: '<b>Нет на месте</b>'
                        },
                        data: output,
                    })
            })

            document.getElementsByClassName('skudHigcharts')
            highChartSkud(series, arrayNames)
        })

    }, [date, placeIndex]);

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

            {Object.keys(humans).length !== 0 ?
                Object.keys(humans).map((e, i) => {
                    return (
                        <div key={i}>
                            <p>{e}{humans[e]['workTime']}</p>
                        </div>
                    );
                }) : null
            }
        </div>
    );
}