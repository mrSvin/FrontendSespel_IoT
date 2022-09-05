// Функия обработки массива обещаний для смен
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

            highChartSmenaTotalKolOp(totalArray, kolOpArray, names, complexName, day1, nagruzkaName)

            // console.log('Проверка, два массивая с данными',parserDataArray)

            parserDataArray.forEach((e, i)=>{
                let idContainer = (i * 2) + 1

                // Первая смена
                highChartSutkiLine(e[0][0], e[0][1], e[0][2], e[0][3], e[0][4], nagruzkaName[i], idContainer)
                if(complexName[i][1] !== null) highChartProgram(getTimeProgramNameGraph(e[0]),i + 1)
                highChartRound(e[0][5][0], e[0][5][1], e[0][5][2], e[0][5][3], e[0][5][4], nagruzkaName[i], idContainer)

                // Первая вторая
                highChartSutkiLine(e[1][0], e[1][1], e[1][2], e[1][3], e[1][4], nagruzkaName[i], idContainer + 1)
                if(complexName[i][1] !== null) highChartProgram(getTimeProgramNameGraph(e[1]),i + 2)
                highChartRound(e[1][5][0], e[1][5][1], e[1][5][2], e[1][5][3], e[1][5][4], nagruzkaName[i], idContainer + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

//Суточный и месячный
function highChartTotal(generalDiagramNames, work, pause, off, avar, nagruzka, fetchNames, date = 24, chartName = '') {
    work = Array.isArray(work) ? work : [work]
    pause = Array.isArray(pause) ? pause : [pause]
    off = Array.isArray(off) ? off : [off]
    avar = Array.isArray(avar) ? avar : [avar]
    nagruzka = Array.isArray(nagruzka) ? nagruzka : [nagruzka]

    let colorNagruzka;
    let workNoNagruzka = work.slice();

    let ruchoi = null

    let seriesArray = [{
        name: 'Авария',
        data: avar,
        color: '#e81e1d'
    }, {
        name: 'Выключен',
        data: off,
        color: '#000000'
    }, {
        name: 'Ожидание',
        color: '#ffea32',
        data: pause
    }, {
        name: 'Нагрузка',
        data: nagruzka,
        color: '#207210'
    }, {
        name: 'Работа',
        color: '#38e817',
        data: workNoNagruzka

    },]

    if (fetchNames.includes('Ручной')) {
        ruchoi = []
        fetchNames.forEach((e, i) => {
            if (e == 'Ручной') {
                ruchoi.push(nagruzka[i])
                nagruzka[i] = 0
            } else {
                ruchoi.push(0)
            }
        })

        seriesArray.splice(4, 0, {
            name: 'Ручной',
            color: '#5c7ed0',
            data: ruchoi

        })
    }

    fetchNames.forEach((e, i) => {
        if (e == 'Нагрузка') {
            workNoNagruzka[i] = workNoNagruzka[i] - nagruzka[i]
        }
    })


    if (fetchNames == 'Нагрузка') {
        colorNagruzka = '#207210'
        for (var i = 0; i < work.length - 1; i++) {
            workNoNagruzka[i] = workNoNagruzka[i] - nagruzka[i]
        }
    }

    // Данные для
    let graphData = highchartsPercentTime(generalDiagramNames, workNoNagruzka, pause, off, avar, nagruzka, ruchoi, date)

    Highcharts.chart(`containerTotal${chartName}`, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Общая загрузка оборудования',
            style: {
                color: '#FFF'
            }
        },
        xAxis: {
            labels: {
                style: {
                    fontSize: '18px',
                    color: '#FFF'
                }
            },
            categories: generalDiagramNames,
        },
        credits: {
            enabled: false
        },
        yAxis: {
            min: 0,
            title: {
                text: '%'
            },
            labels: {
                style: {
                    color: '#FFF'
                },
            }
        },
        tooltip: {
            pointFormatter: function () {
                if (ruchoi == null) {
                    return `<span style="color: #e81e1d;">Авария</span>: ${graphData[this.index][0][3]}%   <b>${graphData[this.index][1][3]}</b><br/>` +
                        `<span style="color: #000000;">Выключен</span>: ${graphData[this.index][0][2]}%   <b>${graphData[this.index][1][2]}</b><br/>` +
                        `<span style="color: #ffea32;">Ожидание</span>: ${graphData[this.index][0][1]}%   <b>${graphData[this.index][1][1]}</b><br/>` +
                        `<span style="color: #207210;">Нагрузка</span>: ${graphData[this.index][0][4]}%   <b>${graphData[this.index][1][4]}</b><br/>` +
                        `<span style="color: #38e817;">Работа</span>: ${graphData[this.index][0][0]}%   <b>${graphData[this.index][1][0]}</b><br/>`
                } else {
                    return `<span style="color: #e81e1d;">Авария</span>: ${graphData[this.index][0][3]}%   <b>${graphData[this.index][1][3]}</b><br/>` +
                        `<span style="color: #000000;">Выключен</span>: ${graphData[this.index][0][2]}%   <b>${graphData[this.index][1][2]}</b><br/>` +
                        `<span style="color: #ffea32;">Ожидание</span>: ${graphData[this.index][0][1]}%   <b>${graphData[this.index][1][1]}</b><br/>` +
                        `<span style="color: #207210;">Нагрузка</span>: ${graphData[this.index][0][4]}%   <b>${graphData[this.index][1][4]}</b><br/>` +
                        `<span style="color: #5c7ed0;">Ручной</span>: ${graphData[this.index][0][5]}%   <b>${graphData[this.index][1][5]}</b><br/>` +
                        `<span style="color: #38e817;">Работа</span>: ${graphData[this.index][0][0]}%   <b>${graphData[this.index][1][0]}</b><br/>`
                }
            },
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        legend: {
            itemStyle: {
                color: '#FFF'
            }
        },
        series: seriesArray
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

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC}
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
