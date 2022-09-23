function SpecComplexesMonth() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [
        ["Пресс ЧПУ для ступиц", "Пресс ЧПУ для ступиц"],
        ["ЭПП", "ЭПП"],
        ["СТП13М", "СТП13М"],
        ['Стенд для ресурсных испытаний', 'cтенд для ресурсных испытаний', null, null, null, 'cтенд', 'cтенд'],
    ]

    let complexImg = ["../images/press.png", "../images/epp.png", "../images/stp13m.png", "../images/stendResource.png"]
    let complexRequest = ['press', 'epp', 'stp13m', 'stend_resources']

    let buttonsVrs = [
        [-480, 765, 'url(../images/press.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        [-825, 220, 'url(../images/epp.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
    ]

    let size = ["2ploshadka", "ceh6", "sborCeh", "sborCeh"]

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
            <MenuStanki menuSelected="specComplexes"/>
            <div className="buttons-otchet">

                <Link to="/stanki/specComplexes">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesSmena">
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



