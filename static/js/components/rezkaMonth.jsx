function RezkaMonth() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [
        ["Навигатор 1","Навигатор 1",  null,"Навигатор 1", "Навигатор 1"],
        ["Навигатор 2", 'Навигатор 2', null, "Навигатор 2", "Навигатор 2"],
        ["Навигатор 3", "Навигатор 3", null, "Навигатор 3", "Навигатор 3"],
        ["TruLaser",  'TruLaser'],
        ["Комета 1", "Комета 1"],
        ["Комета 2", "Комета 2"],
        ["Комета 3", "Комета 3"],
    ]

    let complexImg = ["../images/navigator.png", "../images/navigator.png", "../images/navigator.png", "../images/trulaser.png", "../images/kometa.png", "../images/kometa.png", "../images/kometa.png"]
    let complexRequest = ['navigator_1', 'navigator_2_golova_2', 'navigator_3', 'trulaser', 'kometa_1', 'kometa_2', 'kometa_3']

    let buttonsVrs = [
        [-110, 900, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-100, 540, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-200, 220, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        [-420, 740, 'url(../images/trulaser.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-382, 190, 'url(../images/kometa.png) no-repeat', "../images/ceh_5.png", 60, "unset"],
        [-300, 948, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        [-340, 870, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
    ]

    let size = ["sborCeh", "sborCeh", "sborCeh", "sborCeh", "ceh5", "sborCeh", "sborCeh"]


    // Массив номеров всех станков
    let values = complexRequest.map((e, i) => i)


    // Состояние даты
    let [dateMonth, setDateMonth] = useState(0);

    let [valuesState, setValuesState] = useState(values)

    let [valuesStateWait, setValuesStateWait] = useState(values)


    useEffect(() => {
        let dateInput = monthNow()
        setDateMonth(dateInput)

        let fetchNames = valuesState.map(i => {
            return complexRequest[i]
        })

        let complexNames = valuesState.map(i => {
            return complexName[i]
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequestMonth(dateInput, item)
        }));

        updateLoadDataMonth(stankiRequest, dateInput, complexNames, fetchNames)

    }, [])

    function newDate(dateInput) {
        setDateMonth(dateInput)
        setValuesStateWait(valuesState)

        let fetchNames = valuesState.map(i => {
            return complexRequest[i]
        })

        let complexNames = valuesState.map(i => {
            return complexName[i]
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequestMonth(dateInput, item)
        }));
        updateLoadDataMonth(stankiRequest, dateInput, complexNames, fetchNames)
    }

    return (
        <div>

            <MenuStanki menuSelected="rezka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/rezka">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <div className="energyCalendarContainer">
                <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>
                <ListDevices date={dateMonth} values={values} setValuesState={setValuesState} complexName={complexName}
                             complexRequest={complexRequest} newDate={newDate}/>
            </div>

            <ComplexTotalMonthInfo/>

            {valuesStateWait.map((e, i) => {
                return <ComplexSutkiAllInfo key={i} complexName={complexName[e][0]} complexImg={complexImg[e]}
                                            complexMesto={buttonsVrs[e]} size={size[e]} idContainer={i + 1}
                                            service={complexName[e][1]} alarm={complexName[e][2]}
                                            programs={complexName[e][3]} laser={complexName[e][4]}
                                            report={complexName[e][5]} current={complexName[e][6]}/>
            })}

        </div>
    )
}



