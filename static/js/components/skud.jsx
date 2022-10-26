function Skud() {

    function parseLinearSkud(arrayParse, y, date, inOut) {
        var arraySave = [] // Массив, который будет заполняться

        date = (dayNow() == date)? dayTimeNow() : `${date} 23:59:59`

        if (arrayParse.length == 1) {
            arraySave.push({
                x: arrayParse[0].slice(0,10)+' 00:00:00',
                x2: arrayParse[0],
                // x: new Date(arrayParse[0].slice(0,10)+' 00:00:00').getTime(),
                // x2: (new Date(arrayParse[0])).getTime(),
                y: y,
                status: 'output'
            })
            arraySave.push({
                x: arrayParse[0],
                x2: date,
                // x: (new Date(arrayParse[0])).getTime(),
                // x2: (new Date(date)).getTime(),
                y: y,
                status: inOut[0]
            })
        } else {
            arraySave.push({
                x: arrayParse[0].slice(0,10)+' 00:00:00',
                x2: arrayParse[0],
                // x: new Date(arrayParse[0].slice(0,10)+' 00:00:00').getTime(),
                // x2: (new Date(arrayParse[0])).getTime(),
                y: y,
                status: 'output'
            })
            for (let i = 0; i < arrayParse.length; i++) {
                if (i == arrayParse.length - 1) {
                    arraySave.push({
                        x: arrayParse[i],
                        x2: date,
                        // x: (new Date(arrayParse[i])).getTime(),
                        // x2: (new Date(date)).getTime(),
                        y: y,
                        status: inOut[i]
                    })
                } else {
                    arraySave.push({
                        x: arrayParse[i],
                        x2: arrayParse[i + 1],
                        // x: (new Date(arrayParse[i])).getTime(),
                        // x2: (new Date(arrayParse[i + 1])).getTime(),
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

    function countTimeWithOutLunch(parsedDate, startLunch='12:00:00', endLunch='13:00:00'){
        if(parsedDate.status == 'input') {
            let date = parsedDate.x.slice(0,10)
            if (
                new Date(parsedDate.x).getTime() < new Date(date + ' ' + startLunch).getTime() &&
                new Date(parsedDate.x2).getTime() > new Date(date + ' ' + startLunch).getTime() &&
                new Date(parsedDate.x2).getTime() < new Date(date + ' ' + endLunch).getTime()
            ){
                console.log('Условие 1, счет до 12')
                console.log(parsedDate.x, ' - ', parsedDate.x2)
            }
            else if(
                new Date(parsedDate.x).getTime() > new Date(date + ' ' + startLunch).getTime() &&
                new Date(parsedDate.x).getTime() < new Date(date + ' ' + endLunch).getTime() &&
                new Date(parsedDate.x2).getTime() < new Date(date + ' ' + endLunch).getTime()
            ){
                console.log('Условие 2, не считать обед')
                console.log(parsedDate.x, ' - ', parsedDate.x2)
            }
            else if(
                new Date(parsedDate.x).getTime() > new Date(date + ' ' + startLunch).getTime() &&
                new Date(parsedDate.x).getTime() < new Date(date + ' ' + endLunch).getTime() &&
                new Date(parsedDate.x2).getTime() > new Date(date + ' ' + endLunch).getTime()
            ){
                console.log('Условие 3, считать с 13')
                console.log(parsedDate.x, ' - ', parsedDate.x2)
            }
            else if(
                new Date(parsedDate.x).getTime() < new Date(date + ' ' + startLunch).getTime() &&
                new Date(parsedDate.x2).getTime() > new Date(date + ' ' + endLunch).getTime()
            ){
                console.log('Условие 4, считать с 8-12 и с 13 до точки')
                console.log(parsedDate.x, ' - ', parsedDate.x2)
            }
            else {
                console.log('Остальные случаи, считать весь промежуток')
                console.log(parsedDate.x, ' - ', parsedDate.x2)
            }
        }
    }

    function dublicateFilter(arrayData, arrayInOut){
        let filterData = []
        let filterInOut = []

        for (let i=0; i<arrayInOut.length; i++){
            if(i == arrayInOut.length-1){
                filterData.push(arrayData[i])
                filterInOut.push(arrayInOut[i])
            } else if(arrayInOut[i] != arrayInOut[i+1]){
                filterData.push(arrayData[i])
                filterInOut.push(arrayInOut[i])
            }
        }

        return [filterData, filterInOut]
    }

    function addStartOrEnd(filterArrays, typeTime=8){

        let filterData = filterArrays[0]
        let filterInOut = filterArrays[1]

        let currentDate = dayNow()

        let startTime = ''
        let endTime = ''

        switch (typeTime) {
            case 8:
                startTime = '00:00:00'
                endTime = (currentDate == filterData[filterData.length-1].slice(0,10))? timeNow() :'23:59:59'
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                startTime = '00:00:00'
                endTime = (currentDate == filterData[filterData.length-1].slice(0,10))? timeNow() :'23:59:59'
                break
        }

        if(filterInOut[0] =='output'){
            filterData.unshift(filterData[0].slice(0,10) + ' ' + startTime)
        }
        if(filterInOut[filterInOut.length-1] == 'input'){
            filterData.push(filterData[0].slice(0,10) + ' ' + endTime)
        }

        return filterData
    }

    function filterLunch(){
        let array = ['2022-10-25 08:17:35', '2022-10-25 08:37:17', '2022-10-25 08:43:27', '2022-10-25 12:33:40', '2022-10-25 13:39:02', '2022-10-25 18:51:09']

        let date = array[0].slice(0,10)

        let arraySave = array.slice()

        for (let i=0; i<array.length-1; i++){
            if(
                new Date(array[i]) < new Date(date + ' ' +'12:00:00') &&
                new Date(array[i+1]) > new Date(date + ' ' +'13:00:00')
            ){
                arraySave.splice(i+1,0,...[`${date} 12:00:00`, `${date} 13:00:00`])
            } else if (
                new Date(array[i]) < new Date(date + ' ' +'12:00:00') &&
                new Date(array[i+1]) > new Date(date + ' ' +'12:00:00') &&
                new Date(array[i+1]) < new Date(date + ' ' +'13:00:00')
            ){
                arraySave.splice(i+1, 0, `${date} 12:00:00`)
                arraySave.splice(i+2, 1, `${date} 13:00:00`)

            }
        }

        console.log(array)
        console.log(arraySave)
        // return arraySave
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

                    let filterArrays = dublicateFilter(userData[e].logtime, userData[e].statusInOut)
                    let startOrEndArray = addStartOrEnd(filterArrays)

                    console.log('Тест',startOrEndArray )

                    console.log('голые данные этого пользователя', userData[e])

                    // userData[e].logtime = parseLinearSkud(userData[e].logtime, i, date, userData[e].statusInOut)

                    // console.log('Данные после', userData[e].logtime)


                    // userData[e].logtime.forEach(parsedDate=>{
                    //     // countTimeWithOutLunch(parsedDate)
                    //     userData[e]['workTime'] += parsedDate.status == 'input'? new Date(parsedDate.x2).getTime()-new Date(parsedDate.x).getTime(): 0
                    // })
                    // userData[e]['workTime'] = msToTime(userData[e]['workTime'])
                })
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
                arrayNames.push(e + ' ' + data[e]['workTime'])
                arrayData.push(data[e]['logtime'])
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
            // highChartSkud(series, arrayNames)
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

            {/*{Object.keys(humans).length !== 0 ?*/}
            {/*    Object.keys(humans).map((e) => {*/}
            {/*        return (*/}
            {/*                <p className='fioTime'>{e}{humans[e]['workTime']}</p>*/}
            {/*        );*/}
            {/*    }) : null*/}
            {/*}*/}
        </div>
    );
}