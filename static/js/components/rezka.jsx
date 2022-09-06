function RezkaInfo() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [
        ["Навигатор 1","Навигатор 1",  null,"Навигатор 1", "Навигатор 1"],
        ["Навигатор 2", 'Навигатор 2', null, "Навигатор 2", "Навигатор 2"],
        ["Навигатор 3", "Навигатор 3", null, "Навигатор 3", "Навигатор 3"],
        ["TruLaser",  'TruLaser'],
        ["Комета 1", "Комета 1"],
        ["Комета 2", "Комета 1"],
        ["Комета 3", "Комета 1"],
    ]

    const Colors = Enum({ RED: 'red', GREEN: 'green', BLUE: 'blue' });
    const color = Colors.RED;

    console.log('color === Colors.RED: ',   color === Colors.RED)     // true
    console.log('\'red\' === Colors.RED: ', 'red' === Colors.RED)   // false - строка не равна значению перечисления!!!
    console.log('color === Colors.GREEN: ', color === Colors.GREEN)   // false

    Colors.RED = 'red'; // не меняет значение в перечислении



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
    let [date, setDate] = useState(0);

    // Состояние переменной мульти Диаграммы
    let [stateLineHC, setStateLineHC] = useState("multiLine");

    // Состояния чекбоксов станков
    let [selectedObjects, setSelectedObjects] = useState(
        new Array(complexRequest.length).fill(true)
    );

    let [valuesState, setValuesState] = useState(values)

    let [valuesStateWait, setValuesStateWait] = useState(values)

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
        if (isActive) newDate(date)
    };

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
                <div className="listComplex"><span onClick={toggleClass}>Выбор оборудования</span>
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
                                            service={complexName[e][1]} alarm={complexName[e][2]}
                                            programs={complexName[e][3]} laser={complexName[e][4]}
                                            report={complexName[e][5]} current={complexName[e][6]}/>
            })}
        </div>
    )

}

function Rezka() {

    return (
        <div>

            <MenuStanki menuSelected="rezka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/rezka">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <RezkaInfo/>

        </div>
    )
}