function RobotsInfo() {
    let complexName = [
            ["МАКС 1", "МАКС 1"],
            ["МАКС 2", 'МАКС 2'],
            ["М710", "М710"],
            ["РТК12C", 'РТК12C'],
            ["P250", "P250"],
            ["КРОТ", 'КРОТ'],
            ["ПРАНС", "ПРАНС"],
    ]

    let complexImg = ["../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot_p250.png", "../images/robot.png", "../images/robot.png"]
    let complexRequest = ['maks_1', 'maks_2', 'm710', 'rtk12c', 'p250', 'krot', 'prans']

    let buttonsVrs = [
        [-255, 620, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        [-450, 210, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        [-920, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"],
        [-750, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        [-820, 270, 'url(../images/robot_p250.png) no-repeat', "../images/ceh_5.png", 60, "unset"],
        [-920, 890, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"],
        [-655, 820, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
    ]

    let size = ['ceh6', 'ceh6', 'sborCeh', 'sborCeh', 'ceh5', 'sborCeh', 'ceh6']

    // Массив номеров всех станков
    let values = complexRequest.map((e, i) => i)

    // Состояния чекбоксов станков
    let [selectedObjects, setSelectedObjects] = useState(
        new Array(complexRequest.length).fill(true)
    );

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

    return (
        <div>
            <div className="energyCalendarContainer">
                <DayCalendar newDate={newDateSutki} date={date}/>
                <div className="listComplex"><span onClick={toggleClassSutki}>Выбор оборудования</span>
                    <ul className='toppings-list'
                        className={isActive ? 'toppings-list toppings-list-visible' : 'toppings-list'}>
                        {complexName.map((name, index) => {
                            return (
                                <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={name[0]}
                                                value={index}
                                                checked={selectedObjects[index]}
                                                onChange={() => handleOnChange(index)}
                                            />
                                            <label htmlFor={`custom-checkbox-${index}`}></label><span
                                            className='spanList'>{name[0]}</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <ComplexTotalSutkiInfo/>

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
                          complexName={complexName} complexRequest={complexRequest} valuesState={valuesStateWait}/>

            {valuesStateWait.map((e, i) => {
                return <ComplexSutkiAllInfo key={i} complexName={complexName[e][0]} complexImg={complexImg[e]}
                                            complexMesto={buttonsVrs[e]} size={size[e]} idContainer={i + 1}
                                            programs={complexName[e][1]} service={complexName[e][0]}/>
            })}
        </div>
    )

}

function Robots() {

    return (
        <div>

            <MenuStanki menuSelected="robots"/>

            <div className="buttons-otchet">

                <Link to="/stanki/robots">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <RobotsInfo/>

        </div>
    )
}
