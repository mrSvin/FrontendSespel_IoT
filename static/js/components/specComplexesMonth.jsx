function useOutsideList(ref, isActive, setActive, foo, date) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log('clickOut')
                setActive(!isActive);
                if (isActive) foo(date)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

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

    // Состояния чекбоксов станков
    let [selectedObjects, setSelectedObjects] = useState(
        new Array(complexRequest.length).fill(true)
    );

    let [valuesState, setValuesState] = useState(values)

    let [valuesStateWait, setValuesStateWait] = useState(values)

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
        if (isActive) newDate(dateMonth)
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

    const wrapperRef = useRef(null);
    useOutsideList(wrapperRef, isActive, setActive, newDate, dateMonth);

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
                <div
                    ref={wrapperRef}
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



