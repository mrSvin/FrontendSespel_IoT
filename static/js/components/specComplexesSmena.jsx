function SpecComplexesSmena() {

    //  [0]     [1]         [2]          [3]         [4]         [5]          [6]
    // Name, serviceName, alarmName, programsName, laserName,  reportName, currentName
    let complexName = [
        ["Пресс ЧПУ для ступиц","Пресс ЧПУ для ступиц"],
        ["ЭПП","ЭПП"],
        ["СТП13М","СТП13М"],
        ['Стенд для ресурсных испытаний','Стенд для ресурсных испытаний', null, null, null, 'Стенд','Стенд'],
    ]

    let complexImg = ["../images/press.png", "../images/epp.png", "../images/stp13m.png", "../images/stendResource.png"]
    let complexRequest = ['press', 'epp', 'stp13m', 'trulaser']

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

        let stankiRequest = Promise.all(fetchNames.map((item)=>{
            return fetchRequestSmena(dateInput, item)
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)

    }, [])

    // Функция для изменения даты в календаре
    function newDate(dateInput) {
        setDate(dateInput)
        setValuesStateWait(valuesState)

        let fetchNames = valuesState.map(i => {
            return complexRequest[i]
        })

        let complexNames = valuesState.map(i => {
            return complexName[i]
        })

        let stankiRequest = Promise.all(fetchNames.map((item)=>{
            return fetchRequestSmena(dateInput, item)
        }));

        updateLoadSmenaData(stankiRequest, dateInput, complexNames, fetchNames, stateLineHC)
    }

    return (
        <div>

            <MenuStanki menuSelected="specComplexes"/>

            <div className="buttons-otchet">

                <Link to="/stanki/specComplexes">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesSmena">
                    <div className="menuSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

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

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>
                <div className='countOperations' id='containerOperations'></div>
            </div>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal2"></div>
                <div className='countOperations' id='containerOperations2'></div>
            </div>

            <SwitchLineSmenaHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
                               complexName={complexName} complexRequest={complexRequest} valuesState={valuesStateWait}/>

            {valuesStateWait.map((e, i) => {
                return <ComplexSmenaAllIngo key={i} complexName={complexName[e][0]} complexImg={complexImg[e]}
                                            complexMesto={buttonsVrs[e]} size={size[e]} idContainer={i*2+1}
                                            service={complexName[e][1]} alarm={complexName[e][2]}
                                            programs={complexName[e][3]} laser={complexName[e][4]}
                                            report={complexName[e][5]} current={complexName[e][6]}/>
            })}
        </div>
    )

}