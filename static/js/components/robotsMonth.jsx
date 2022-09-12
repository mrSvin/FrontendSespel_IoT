function RobotsMonth() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [
        ["МАКС 1", "МАКС 1", null, "МАКС 1"],
        ["МАКС 2", 'МАКС 2', null, 'МАКС 2'],
        ["М710", "М710", null, "М710"],
        ["РТК12C", 'РТК12C', null, 'РТК12C'],
        ["P250", "P250", null, "P250"],
        ["КРОТ", 'КРОТ', null, 'КРОТ'],
        ["ПРАНС", "ПРАНС", null, "ПРАНС"],
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

    // Состояние даты
    let [dateMonth, setDateMonth] = useState(0);

    // Состояния чекбоксов станков
    let [selectedObjects, setSelectedObjects] = useState(
        new Array(complexRequest.length).fill(true)
    );

    let [valuesState, setValuesState] = useState(values)

    let [valuesStateWait, setValuesStateWait] = useState(values)

    const [isActive, setActive] = useState(false);

    function toggleClass() {
        setActive(!isActive);
        if (isActive) newDate(dateMonth)
    };

    const innerRef = useOuterClick(ev => {
        if (isActive) {
            setActive(!isActive);
            newDate(dateMonth)
        }
    });

    const handleOnChange = (position) => {
        const updatedCheckedState = selectedObjects.map((item, index) => {
            return index === position ? !item : item;
        });

        setSelectedObjects(updatedCheckedState)

        const activeValues = []
        updatedCheckedState.forEach(
            (currentState, index) => {
                if (currentState) {
                    activeValues.push(values[index]);
                }
            }
        );
        setValuesState(activeValues);

    };

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

            <MenuStanki menuSelected="robots"/>

            <div className="buttons-otchet">

                <Link to="/stanki/robots">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <div className="energyCalendarContainer">
                <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>
                <div
                    ref={innerRef}
                    className='menuSelect selectDevice'>
                    <span onClick={toggleClass}>Выбор оборудования</span>
                    <div className="listComplex">
                        <span>▼</span>
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



