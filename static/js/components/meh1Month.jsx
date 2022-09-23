function Meh1Month() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [
        ["УВФ-1 1", "УВФ-1 1"],
        ["УВФ-1 2", "УВФ-1 2"],
        ["NTX1000", "NTX1000", "NTX1000"],
        ["NLX3000", "NLX3000", "NLX3000"],
        ["GAMMA2000", "GAMMA2000", "GAMMA2000"],
        ["CTX650", "CTX650", "CTX650"],
        ["DMF260", "DMF260", "DMF260"],
        ["DMU50 1", "DMU50 1", "DMU50 1"],
        ["DMU50 2", "DMU50 2", "DMU50 2"],
        ["DMC1035", "DMC1035", "DMC1035"],
        ["CTX310 1", "CTX310 1", "CTX310 1"],
        ["CTX510 1", "CTX510 1", "CTX510 1"],
    ]
    let complexImg = ["../images/uvf_1_2.png", "../images/uvf_1_2.png", "../images/ntx1000.png", "../images/NLX3000.png", "../images/gamma2000.png", "../images/dmg_ctx650.png",
        "../images/dmg_dmf260.png", "../images/dmg_dmu50.png", "../images/dmg_dmu50.png", "../images/dmg_dmc1035.png", "../images/dmg_ctx310.png", "../images/dmg_ctx510.png"]

    let complexRequest = ['uvf_1', 'uvf_2', 'ntx1000', 'nlx3000', 'dmg_gamma2000', 'dmg_ctx650', 'dmg_dmf260', 'dmg_dmu50_1', 'dmg_dmu50_2', 'dmg_dmc1035', 'dmg_ctx310_1',
        'dmg_ctx510_1']

    let buttonsVrs = [
        [-340, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-180, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-670, 490, 'url(../images/ntx1000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-590, 310, 'url(../images/NLX3000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-840, 520, 'url(../images/gamma2000.png) no-repeat', "../images/meh_ceh.png", 60, "unset"],
        [-500, 310, 'url(../images/dmg_ctx650.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-780, 200, 'url(../images/dmg_dmf260.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-500, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-410, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-590, 115, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-590, 470, 'url(../images/dmg_ctx310.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        [-490, 470, 'url(../images/dmg_ctx510.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
    ]

    let size = Array(complexName.length).fill("meh1")

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

            <MenuStanki menuSelected="meh1"/>

            <div className="buttons-otchet">

                <Link to="/stanki/meh1">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh1Month">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/meh1Smena">
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



