// Функия обработки массива обещаний для смен
function changeTypeLineSmena(date, stateLineHC, setStateLineHC, complexName, complexRequest, valuesState) {

    // valuesState = valuesState.map((e,i, array)=>{
    //     let save = [e,e]
    //     return save
    // }).flat()
    //
    console.log('Тут',valuesState)


    let fetchNames = valuesState.map(i => {
        return complexRequest[i]
    })
    let complexNames = valuesState.map(i => {
        return complexName[i]
    })
    let stankiRequest = Promise.all(fetchNames.map((item) => {
        return fetchRequestSmena(date, item)
    }));

    if (stateLineHC == 'line') {
        setStateLineHC('multiLine')
        updateLoadSmenaData(stankiRequest, date, complexNames, fetchNames, 'multiLine')
    } else {
        setStateLineHC('line')
        updateLoadSmenaData(stankiRequest, date, complexNames, fetchNames, 'line')
    }
}

function SwitchLineSmenaHC({date, stateLineHC, setStateLineHC, complexName, complexRequest, valuesState}) {
    return (
        <div className="energyCalendarContainer">
            <label className="switch">
                <input type="checkbox" onChange={() => {
                    changeTypeLineSmena(date, stateLineHC, setStateLineHC, complexName, complexRequest, valuesState)
                }}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}


function updateLoadSmenaData(promiseVariable, day1, complexName, fetchNames, typeLine = "multiLine") {
    promiseVariable
        .then(result => {
            let data = result.map(e=>{
                return [[e.work.slice(), e.pause.slice(), e.off.slice(), e.avar.slice(), e.nagruzka.slice(), e.programName.slice()],
                    [e.work2.slice(), e.pause2.slice(), e.off2.slice(), e.avar2.slice(), e.nagruzka2.slice(),  e.programName2.slice()]]
            })
            let smenaArrays = data.map(e=>{
                return convertDaysToSmena(e[0], e[1], day1, typeLine)
            })

            let totalArray = []
            let kolOpArray = []
            let arrayLine;

            if (typeLine == 'multiLine') {
                arrayLine =[0,1,2,3,4]
            } else {
                arrayLine =[0,0,0,0,0]
            }

            let day2 = dayYesterday(day1)

            let parserDataArray =  smenaArrays.map(smena=>{
                let convertDataWork = parseLinearSutki(smena[0][0], arrayLine[1], day1, smena[0][5])
                let convertDataPause = parseLinearSutki(smena[0][1], arrayLine[2], day1)
                let convertDataOff = parseLinearSutki(smena[0][2], arrayLine[3], day1)
                let convertDataAvar = parseLinearSutki(smena[0][3], arrayLine[4], day1)
                let convertDataRuchnoi = parseLinearSutki(smena[0][4], arrayLine[0], day1)

                let convertDataWork2 = parseLinearSutki(smena[1][0], arrayLine[1], day2, smena[1][5])
                let convertDataPause2 = parseLinearSutki(smena[1][1], arrayLine[2], day2)
                let convertDataOff2 = parseLinearSutki(smena[1][2], arrayLine[3], day2)
                let convertDataAvar2 = parseLinearSutki(smena[1][3], arrayLine[4], day2)
                let convertDataRuchnoi2 = parseLinearSutki(smena[1][4], arrayLine[0], day2)

                let roundArray = smena[0][6]
                let roundArray2 = smena[1][6]

                totalArray.push(smena[0][6].slice())
                totalArray.push(smena[1][6].slice())
                kolOpArray.push(kolOperations(smena[0][0]).slice())
                kolOpArray.push(kolOperations(smena[1][0]).slice())

                return [[convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, roundArray],
                    [convertDataWork2, convertDataPause2, convertDataOff2, convertDataAvar2, convertDataRuchnoi2, roundArray2]]

            })

            let nagruzkaName = fetchNames.map(e=>{
                return exceptionManualNagruzka(e)
            })

            let names = complexName.map(e => {
                return e[0]
            })

            highChartSmenaTotalKolOp(totalArray, kolOpArray, names, day1, nagruzkaName)

             console.log('Проверка, два массивая с данными',smenaArrays)

            parserDataArray.forEach((e, i)=>{
                let idContainer = (i * 2) + 1

                // Первая смена
                highChartSutkiLine(e[0][0], e[0][1], e[0][2], e[0][3], e[0][4], nagruzkaName[i], idContainer)
                if(complexName[i][1] !== null) highChartProgram(getTimeProgramNameGraph(smenaArrays[i][0]),i + 1)
                highChartRound(e[0][5][0], e[0][5][1], e[0][5][2], e[0][5][3], e[0][5][4], nagruzkaName[i], idContainer)

                // Первая вторая
                highChartSutkiLine(e[1][0], e[1][1], e[1][2], e[1][3], e[1][4], nagruzkaName[i], idContainer + 1)
                if(complexName[i][1] !== null) highChartProgram(getTimeProgramNameGraph(smenaArrays[i][1]),i + 2)
                highChartRound(e[1][5][0], e[1][5][1], e[1][5][2], e[1][5][3], e[1][5][4], nagruzkaName[i], idContainer + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

function RobotsSmena() {

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

            <MenuStanki menuSelected="robots"/>

            <div className="buttons-otchet">

                <Link to="/stanki/robots">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsSmena">
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
                                            programs={complexName[e][1]+'smena'} service={complexName[e][0]}/>
                }
            )}
        </div>
    )

}
