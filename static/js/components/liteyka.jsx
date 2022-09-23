function LiteykaInfo() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [["Печь Индукционная", "Печь Индукционная"],]
    let complexImg = ["../images/pech.png"]
    let complexRequest = ['pech_nerg']

    let buttonsVrs = [[-125, 180, 'url(../images/pech.png) no-repeat', "../images/ceh_1.png", 70, "100%"],]
    let size = ["ceh1"]



    // Массив номеров всех станков
    let values = complexRequest.map((e, i) => i)

    // Состояние даты
    let [date, setDate] = useState(0);

    // Состояние переменной мульти Диаграммы
    let [stateLineHC, setStateLineHC] = useState("multiLine");

    let [valuesState, setValuesState] = useState(values)

    let [valuesStateWait, setValuesStateWait] = useState(values)

    useEffect(() => {
        let dateInput = dayNow()
        setDate(dateInput)

        let fetchNames = valuesState.map(i => {
            return complexRequest[i]
        })

        let complexNames = valuesState.map(i => {
            return complexName[i]
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));

        updateLoadData(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        setValuesStateWait(valuesState)

        let fetchNames = valuesState.map(i => {
            return complexRequest[i]
        })

        let complexNames = valuesState.map(i => {
            return complexName[i]
        })

        let stankiRequest = Promise.all(fetchNames.map((item) => {
            return fetchRequest(dateInput, item)
        }));
        updateLoadData(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }

    return (
        <div>
            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDate} date={date}/>
                <ListDevices date={date} values={values} setValuesState={setValuesState} complexName={complexName}
                             complexRequest={complexRequest} newDate={newDate}/>
            </div>
            <ComplexTotalSutkiInfo/>

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
                          complexName={complexName} complexRequest={complexRequest} valuesState={valuesStateWait}/>

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

function Liteyka() {

    return (
        <div>

            <MenuStanki menuSelected="liteyka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/liteyka">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/liteykaMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/liteykaSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <LiteykaInfo/>

        </div>
    )
}