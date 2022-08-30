// Суточные переделываю
function updateLoadData(promiseVariable, day1, complexName, fetchNames, typeLine = "multiLine") {
    promiseVariable
        .then(result => {
            let data = result.map(e => {
                return [e.work.slice(), e.pause.slice(), e.off.slice(), e.avar.slice(), e.nagruzka.slice(), e.programName.slice(), e.roundData.slice()]
            })
            let arrayLine;
            if (typeLine == 'multiLine') {
                arrayLine = [0, 1, 2, 3, 4]
            } else {
                arrayLine = [0, 0, 0, 0, 0]
            }

            let totalArray = []
            let kolOpArray = []

            let parserDataArray = data.map(value => {
                let convertDataWork = parseLinearSutki(value[0], arrayLine[1], day1, value[5])
                let convertDataPause = parseLinearSutki(value[1], arrayLine[2], day1)
                let convertDataOff = parseLinearSutki(value[2], arrayLine[3], day1)
                let convertDataAvar = parseLinearSutki(value[3], arrayLine[4], day1)
                let convertDataRuchnoi = parseLinearSutki(value[4], arrayLine[0], day1)
                let roundArray = value[6].map(Number)

                totalArray.push(roundArray.slice())
                kolOpArray.push(kolOperations(value[0]).slice())

                return [convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, roundArray]
            })

            let nagruzkaName = fetchNames.map(e => {
                return exceptionManualNagruzka(e)
            })

            highChartTotalKolOp(totalArray, kolOpArray, complexName, day1, nagruzkaName)

            parserDataArray.forEach((e, i) => {
                // Первая смена
                highChartSutkiLine(e[0], e[1], e[2], e[3], e[4], nagruzkaName[i], i + 1)
                highChartRound(e[5][0], e[5][1], e[5][2], e[5][3], e[5][4], nagruzkaName[i], i + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

// fetch запрос объекта в форме объектов
function fetchRequest(dateCalendar, complexName) {
    return fetch(`/api/complexData/${complexName}_days_date:${dateCalendar}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

function highChartTotalKolOp(total, kolOp, complexName, day1, nagruzkaName) {

    // переменные для переформирования данных 2-х смен
    let work = []
    let pause = []
    let off = []
    let avar = []
    let nagruzka = []

    let shortOp = []
    let longOp = []

    // переформирования данных
    total.forEach((e, i) => {
        if (!Array.isArray(e) || e.includes(undefined)) {
            work.push(0)
            pause.push(0)
            off.push(0)
            avar.push(0)
            nagruzka.push(0)
        } else {
            e = e.map(Number)
            work.push(e[0])
            pause.push(e[1])
            off.push(e[2])
            avar.push(e[3])
            nagruzka.push(e[4])
        }
    })

    kolOp.forEach((e, i) => {
        if (!Array.isArray(e) || e.includes(undefined)) {
            shortOp.push(0)
            longOp.push(0)
        } else {
            e = e.map(Number)
            shortOp.push(e[0])
            longOp.push(e[1])
        }
    })

    // вторая смена, всегда за предыдущий день, date всегда 12 часов
    highChartTotal(complexName, work, pause, off, avar, nagruzka, nagruzkaName, day1)
    highChartCountOperations(complexName, shortOp, longOp)
}

//Суточный и месячный
function highChartTotal(generalDiagramNames, work, pause, off, avar, nagruzka, fetchNames, date = 24, chartName = '') {
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
        for (var i = 0; i < work.length; i++) {
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

// Функция получения из массивов времени и общего процента
function highchartsPercentTime(generalDiagramNames, workNoNagruzka, pause, off, avar, nagruzka, ruchoi = null, date) {

    let data = []
    generalDiagramNames.forEach((e, i) => {
        if (ruchoi == null) {
            data.push([workNoNagruzka[i], pause[i], off[i], avar[i], nagruzka[i]])
        } else data.push([workNoNagruzka[i], pause[i], off[i], avar[i], nagruzka[i], ruchoi[i]])

    })

    let dataSumArray = data.map(e => {
        let red = e.reduce((val1, val2) => {
            return val1 + val2
        })
        return red
    })

    let dataTime = data.map(e => {
        return getTimeTotalArray(e, date)
    })

    let dataPercent = data.map((e, i) => {
        if (ruchoi == null) {
            return [(e[0] / dataSumArray[i] * 100).toFixed(1),
                (e[1] / dataSumArray[i] * 100).toFixed(1),
                (e[2] / dataSumArray[i] * 100).toFixed(1),
                (e[3] / dataSumArray[i] * 100).toFixed(1),
                (e[4] / dataSumArray[i] * 100).toFixed(1),]
        } else {
            return [(e[0] / dataSumArray[i] * 100).toFixed(1),
                (e[1] / dataSumArray[i] * 100).toFixed(1),
                (e[2] / dataSumArray[i] * 100).toFixed(1),
                (e[3] / dataSumArray[i] * 100).toFixed(1),
                (e[4] / dataSumArray[i] * 100).toFixed(1),
                (e[5] / dataSumArray[i] * 100).toFixed(1),
            ]
        }
    })

    return dataPercent.map((e, i) => {
        return [e, dataTime[i],]
    })
}

function RobotsInfo() {

    let complexName = ["МАКС 1", "МАКС 2", "М710", "РТК12C", "P250", "КРОТ", "ПРАНС"]
    let complexNameProgram = ["МАКС 1", "МАКС 2", "М710", "РТК12C", "P250", "КРОТ", "ПРАНС"]
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

    let bufferData = bufferDataArrays(6)

    let [date, setDate] = useState(0);

    let [stateLineHC, setStateLineHC] = useState("line");

    let [selectedObjects, setselectedObjects] = useState(complexName.map((e, i) => i))

    useEffect(() => {
        setDate(dayNow())
        // selectedObjects = [0, 2, 4, 6]
        let dateInput = dayNow()
        let stankiRequest = Promise.all(namesToFetch.map((item)=>{
            return fetchRequest(dateInput, item)
        }));
        updateLoadData(stankiRequest, dateInput, complexName, namesToFetch)

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)

        let stankiRequest = Promise.all(namesToFetch.map((item)=>{
            return fetchRequest(dateInput, item)
        }));
        updateLoadData(dateInput)
        updateLoadData(stankiRequest, dateInput, complexName, namesToFetch)

    }

    return (
        <div>
            <DayCalendar newDate={newDate} date={date}/>

            <ComplexTotalSutkiInfo/>

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC} bufferData={bufferData}
                          complexRequest={complexRequest}/>

            {selectedObjects.map((e, i) => {
                return <ComplexSutkiAllInfo key={i} complexName={complexName[e]} complexImg={complexImg[e]}
                                            complexMesto={buttonsVrs[e]} size={size[e]} idContainer={i + 1}
                                            programs={complexNameProgram[e]} service={complexName[e]}/>
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