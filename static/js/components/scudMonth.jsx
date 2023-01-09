function getDateFromIndex(date, index) {
    index = (index < 10) ? `0${index}` : `${index}`
    return `${date}-${index}`
}

function msToTimeHours(duration, date = 200) {
    date = +date
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % date)

    if (hours == 0) hours = ''
    else {
        hours = hours + " ч. "
    }

    if (minutes == 0) minutes = ''
    else {
        minutes = minutes + " мин. "
    }

    if (seconds == 0) seconds = ''
    else {
        seconds = seconds + ' с.'
    }

    if ((hours + minutes + seconds) != '') {
        return '— ' + hours + minutes + seconds;
    } else if ((hours + minutes + seconds) == '' && duration != 0) {
        return `— ${date} д.`
    } else return '— 0 с.'

}

function applyMonthFilters(usersData, userNames, date) {
    let lastMonthDay = 32 - new Date(date.slice(0, 4), date.slice(5, 7), 32).getDate();

    userNames.forEach(testName => {
        // Формирую месячный объект пользователя
        usersData[testName].monthObject = {}

        // Создаю в нем столько массивов сколько дней в месяце
        // Для текущего месяца
        if (dayNow().slice(0, 7) == date) {
            for (let i = 1; i < +dayNow().slice(8, 10) + 1; i++) {
                usersData[testName].monthObject[i] = [[], []]
            }
            // Для предыдущего месяца
        } else {
            for (let i = 1; i < lastMonthDay + 1; i++) {
                usersData[testName].monthObject[i] = [[], []]
            }
        }

        // Удаляю дубликаты
        let noDublicateArrays = dublicateDeleteFilter(usersData[testName].logtime, usersData[testName].statusInOut)

        // Вставляю в массивы дней соответсвующие значения
        noDublicateArrays[0].forEach((d, i) => {
            usersData[testName].monthObject[+d.slice(8, 10)][0].push(d)
            usersData[testName].monthObject[+d.slice(8, 10)][1].push(noDublicateArrays[1][i])
        })

        // Общий счетчик часов
        let totalMonthTime = 0

        // Применяю фильтры
        for (let i = 1; i <= Object.keys(usersData[testName].monthObject).length; i++) {
            let indexDate = getDateFromIndex(date, i)
            let arrayAddStartOrEnd = addStartOrEnd(usersData[testName].monthObject[i], '8и', indexDate)
            let arrayWithOutLunch = filterLunchMonth(arrayAddStartOrEnd, indexDate, usersData[testName].smenaInfo)
            let workTime = getWorkTime(arrayWithOutLunch)
            totalMonthTime += workTime
            usersData[testName].monthObject[i] = [arrayWithOutLunch, msToTime(workTime)]
        }
        usersData[testName].monthTotalTime = totalMonthTime
        console.log(testName, 'работал в этом месяце', msToTimeHours(totalMonthTime))
    })

    return usersData
}

function filterLunchMonth(dateArray, date, smenaState) {

    let startLunch = null
    let endLunch = null

    let startLunch2 = null
    let endLunch2 = null

    let startLunch3 = null
    let endLunch3 = null

    let startLunch4 = null
    let endLunch4 = null

    let arraySave = []

    switch (smenaState) {
        case '8и':
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            break;
        case '8':

            startLunch = date + ' 03:00:00'
            endLunch = date + ' 03:30:00'

            startLunch2 = date + ' 11:30:00'
            endLunch2 = date + ' 12:00:00'

            startLunch3 = date + ' 19:30:00'
            endLunch3 = date + ' 20:00:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        case '7':
            startLunch = date + ' 03:00:00'
            endLunch = date + ' 04:00:00'

            startLunch2 = date + ' 11:30:00'
            endLunch2 = date + ' 12:30:00'

            startLunch3 = date + ' 19:30:00'
            endLunch3 = date + ' 20:30:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        case '11':
            startLunch = date + ' 03:30:00'
            endLunch = date + ' 04:00:00'

            startLunch2 = date + ' 11:30:00'
            endLunch2 = date + ' 12:00:00'

            startLunch3 = date + ' 16:00:00'
            endLunch3 = date + ' 16:30:00'

            startLunch4 = date + ' 23:00:00'
            endLunch4 = date + ' 23:30:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            arraySave = insideFilterLunch(startLunch4, endLunch4, arraySave)
            break;
        case '24':
            startLunch = date + ' 04:00:00'
            endLunch = date + ' 04:30:00'

            startLunch2 = date + ' 12:30:00'
            endLunch2 = date + ' 13:00:00'

            startLunch3 = date + ' 20:00:00'
            endLunch3 = date + ' 20:30:00'

            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            arraySave = insideFilterLunch(startLunch2, endLunch2, arraySave)
            arraySave = insideFilterLunch(startLunch3, endLunch3, arraySave)
            break;
        case '':
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
            arraySave = insideFilterLunch(startLunch, endLunch, dateArray)
            break;
        default:
            startLunch = date + ' 12:00:00'
            endLunch = date + ' 13:00:00'
    }
    return arraySave
}

let globalAllData = {}

let promise = fetchRequestScudMonth()
promise.then(data => {
    let usersData = data[0]
    let date = data[1]

    if (!Object.keys(usersData).includes('error')) {
        usersData = createUserDataStructure(usersData)

        let userNames = Object.keys(usersData)
        usersData = applyMonthFilters(usersData, userNames, date)

        let smena_7 = []
        let smena_8i = []
        let smena_8 = []
        let smena_11 = []
        let smena_24 = []

        let hiddens = []

        Object.keys(usersData).forEach(name => {

            switch (usersData[name].smenaInfo) {
                case '7':
                    smena_7.push(usersData[name])
                    break
                case '8и':
                    smena_8i.push(usersData[name])
                    break
                case '8':
                    smena_8.push(usersData[name])
                    break
                case '11':
                    smena_11.push(usersData[name])
                    break
                case '24':
                    smena_24.push(usersData[name])
                    break
                default:
                    hiddens.push(usersData[name])
            }
        })

        console.log('7', smena_7)
        console.log('8и', smena_8i)
        console.log('8', smena_8)
        console.log('11', smena_11)
        console.log('24', smena_24)
        console.log('hiddens', hiddens)

        globalAllData = usersData
    }
})

function ScudMonth({scudMonthMemory, setScudMonthMemory}) {

    function saveMemory() {
        if(scudMonthMemory == null){
            setScudMonthMemory([timeNow()])
        } else {
            scudMonthMemory.push(timeNow())
            setScudMonthMemory(scudMonthMemory)
        }
        // setScudMonthMemory(prevState => ({
        //     ...prevState,
        //     imageUser: imageProfile
        // }));

    }

    function saveMemoryObj() {
        if(scudMonthMemory == null){
            setScudMonthMemory({[timeNow()]:[]})
        } else {
            scudMonthMemory[timeNow()] = []
            setScudMonthMemory(scudMonthMemory)
        }
        // setScudMonthMemory(prevState => ({
        //     ...prevState,
        //     imageUser: imageProfile
        // }));

    }

    let [dateMonth, setDateMonth] = useState(0);
    // let [smenaState, setSmenaState] = useState('8и')
    let [usersWithSmena, setUsersWithSmena] = useState('line')


    useEffect(() => {
        saveMemory()
        console.log('Содержимое памяти', scudMonthMemory)

    }, []);

    function newDate(dateInput) {
        setDateMonth(dateInput)
    }

    return (
        <div>
            <div className="buttons-otchet marginToSmenaMenu cancelMargin">

                <div className="daysMonthWrapper">

                    <Link to={`/scud/1ploshadka`}>
                        <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                    </Link>

                    <Link to={`/scudMonth`}>
                        <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                    </Link>

                </div>

            </div>
            <div className="energyCalendarContainer">
                <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>
                <div className='hideIndividualAll'>
                    <SwitchLineHCIndividual stateLineHC={usersWithSmena} setStateLineHC={setUsersWithSmena}
                                            text={'Привязка по смене'}/>
                </div>
            </div>
            <p className='switchButtonMessage'>{usersWithSmena == 'line' ? 'Отображение сотрудников по выбранного графику' : 'Все сотрудники'}</p>
        </div>
    );
}


