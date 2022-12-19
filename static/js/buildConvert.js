// Изменение состояние линейных графиков из 5-ти строк в одну
function changeTypeLine(date, stateLineHC, setStateLineHC, complexName, complexRequest, valuesState) {

    let fetchNames = valuesState.map(i => {
        return complexRequest[i]
    })
    let complexNames = valuesState.map(i => {
        return complexName[i]
    })
    let stankiRequest = Promise.all(fetchNames.map((item) => {
        return fetchRequest(date, item)
    }));

    if (stateLineHC == 'line') {
        setStateLineHC('multiLine')
        updateLoadData(stankiRequest, date, complexNames, fetchNames, 'multiLine')
    } else {
        setStateLineHC('line')
        updateLoadData(stankiRequest, date, complexNames, fetchNames, 'line')
    }


}

// Изменение состояние линейных графиков из 5-ти строк в одну
function changeTypeLineIndividual(date, stateLineHC, setStateLineHC, stankiObject, valuesStanki, setValuesStankiWait) {

    let stankiState = {}

    Object.keys(valuesStanki).forEach(e => {
        if (valuesStanki[e]) {
            stankiState[e] = stankiObject[e]
        }
    })

    setValuesStankiWait(Object.keys(stankiState))

    let stankiKeysState = Object.keys(stankiState).map(e => {
        return e
    })

    let fetchNames = stankiKeysState.map(name => {
        return stankiState[name].complexRequest
    })

    let complexNames = stankiKeysState.map(name => {
        return stankiState[name].buttonNames
    })

    let stankiRequest = Promise.all(fetchNames.map((item) => {
        return fetchRequest(date, item)
    }));

    if (stateLineHC == 'line') {
        setStateLineHC('multiLine')
        updateLoadDataIndividual(stankiRequest, date, complexNames, fetchNames, 'multiLine')
    } else {
        setStateLineHC('line')
        updateLoadDataIndividual(stankiRequest, date, complexNames, fetchNames, 'line')
    }


}


// Изменение состояние линейных графиков из 5-ти строк в одну для смены
function changeTypeLineSmena(date, stateLineHC, setStateLineHC, complexName, complexRequest, valuesState) {

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

// Обработка данных из запроса для отрисовки графиков
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

            let names = complexName.map(e => {
                return e[0]
            })

            highChartTotalKolOp(totalArray, kolOpArray, names, day1, nagruzkaName)

            parserDataArray.forEach((e, i) => {
                // Первая смена
                highChartSutkiLine(e[0], e[1], e[2], e[3], e[4], nagruzkaName[i], i + 1)
                if (complexName[i][3] !== null && complexName[i][3] !== undefined) highChartProgram(getTimeProgramNameGraph(data[i], 'sutki', day1), i + 1)
                highChartRound(e[5][0], e[5][1], e[5][2], e[5][3], e[5][4], nagruzkaName[i], i + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

// Обработка данных из запроса для отрисовки графиков для сменных отчетов
function updateLoadSmenaData(promiseVariable, day1, complexName, fetchNames, typeLine = "multiLine") {
    promiseVariable
        .then(result => {
            let data = result.map(e => {
                return [[e.work.slice(), e.pause.slice(), e.off.slice(), e.avar.slice(), e.nagruzka.slice(), e.programName.slice()],
                    [e.work2.slice(), e.pause2.slice(), e.off2.slice(), e.avar2.slice(), e.nagruzka2.slice(), e.programName2.slice()]]
            })
            let smenaArrays = data.map(e => {
                return convertDaysToSmena(e[0], e[1], day1, typeLine)
            })

            let totalArray = []
            let kolOpArray = []
            let arrayLine;

            if (typeLine == 'multiLine') {
                arrayLine = [0, 1, 2, 3, 4]
            } else {
                arrayLine = [0, 0, 0, 0, 0]
            }

            let day2 = dayYesterday(day1)

            let parserDataArray = smenaArrays.map(smena => {
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

            let nagruzkaName = fetchNames.map(e => {
                return exceptionManualNagruzka(e)
            })

            let names = complexName.map(e => {
                return e[0]
            })

            highChartSmenaTotalKolOp(totalArray, kolOpArray, names, day1, nagruzkaName)

            parserDataArray.forEach((e, i) => {
                let idContainer = (i * 2) + 1

                // Первая смена
                highChartSutkiLine(e[0][0], e[0][1], e[0][2], e[0][3], e[0][4], nagruzkaName[i], idContainer)
                if (complexName[i][3] !== null && complexName[i][3] !== undefined) highChartProgram(getTimeProgramNameGraph(smenaArrays[i][0], 'smena', day2 + ' 19:00'), idContainer)
                highChartRound(e[0][5][0], e[0][5][1], e[0][5][2], e[0][5][3], e[0][5][4], nagruzkaName[i], idContainer)

                // Первая вторая
                highChartSutkiLine(e[1][0], e[1][1], e[1][2], e[1][3], e[1][4], nagruzkaName[i], idContainer + 1)
                if (complexName[i][3] !== null && complexName[i][3] !== undefined) highChartProgram(getTimeProgramNameGraph(smenaArrays[i][1], 'smena', day1 + ' 07:00'), idContainer + 1)
                highChartRound(e[1][5][0], e[1][5][1], e[1][5][2], e[1][5][3], e[1][5][4], nagruzkaName[i], idContainer + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

// Обработка данных из запроса для отрисовки графиков для месячных отчетов
function updateLoadDataMonth(promiseVariable, date, complexName, fetchNames) {
    promiseVariable
        .then(result => {

            let nagruzkaName = fetchNames.map(e => {
                return exceptionManualNagruzka(e)
            })

            let names = complexName.map(e => {
                return e[0]
            })

            let totalArray = [[], [], [], [], [], []]

            result.forEach((e, i) => {
                highChartMonthLine(e.work, e.pause, e.off, e.avar, e.nagruzka, nagruzkaName[i], i + 1)
                highChartRound(averageMonthdata(e.work), averageMonthdata(e.pause), averageMonthdata(e.off),
                    averageMonthdata(e.avar), averageMonthdata(e.nagruzka), nagruzkaName[i], i + 1)

                totalArray[0].push(averageMonthdata(e.work.map(Number)))
                totalArray[1].push(averageMonthdata(e.pause.map(Number)))
                totalArray[2].push(averageMonthdata(e.off.map(Number)))
                totalArray[3].push(averageMonthdata(e.avar.map(Number)))
                totalArray[4].push(averageMonthdata(e.nagruzka.map(Number)))
            })

            highChartTotal(names, totalArray[0], totalArray[1], totalArray[2], totalArray[3], totalArray[4], nagruzkaName, date)
            highChartRound(averageMonthdata(totalArray[0]), averageMonthdata(totalArray[1]), averageMonthdata(totalArray[2]),
                averageMonthdata(totalArray[3]), totalArray[4], nagruzkaName, 'Total')
        })
        .catch(err => {
            console.error(err);
        });
}

// Обработка нажатия вне компонента, аргумент функции функция callback c необходимой логикой
function useOuterClick(callback) {
    const callbackRef = useRef(); // initialize mutable ref, which stores callback
    const innerRef = useRef(); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value
    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

        function handleClick(e) {
            if (innerRef.current && callbackRef.current &&
                !innerRef.current.contains(e.target)
            ) callbackRef.current(e);
        }
    }, []); // no dependencies -> stable click listener

    return innerRef; // convenience for client (doesn't need to init ref himself)
}

// Обработка данных из запроса для отрисовки графиков
function updateLoadDataIndividual(promiseVariable, day1, complexName, fetchNames, typeLine = "multiLine") {
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
                let convertDataRuchnoi = parseLinearSutki(value[4], arrayLine[0], day1, null, value[1].length)
                let convertDataWork = parseLinearSutki(value[0], arrayLine[1], day1, value[5], value[1].length)
                let convertDataPause = parseLinearSutki(value[1], arrayLine[2], day1)
                let convertDataOff = parseLinearSutki(value[2], arrayLine[3], day1)
                let convertDataAvar = parseLinearSutki(value[3], arrayLine[4], day1)
                let roundArray = value[6].map(Number)

                totalArray.push(roundArray.slice())
                kolOpArray.push(kolOperations(value[0]).slice())

                return [convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, roundArray]
            })

            let nagruzkaName = fetchNames.map(e => {
                return exceptionManualNagruzka(e)
            })

            let names = complexName.map(e => {
                return e.name
            })

            let programNames = complexName.map(e => {
                return e.programsName
            })

            highChartTotalKolOp(totalArray, kolOpArray, names, day1, nagruzkaName)

            parserDataArray.forEach((e, i) => {
                // Первая смена
                highChartSutkiLine(e[0], e[1], e[2], e[3], e[4], nagruzkaName[i], i + 1)
                if (programNames[i] !== null && programNames[i] !== undefined) highChartProgram(getTimeProgramNameGraph(data[i], 'sutki', day1), i + 1)
                highChartRound(e[5][0], e[5][1], e[5][2], e[5][3], e[5][4], nagruzkaName[i], i + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

function updateLoadDataIndividualMonth(promiseVariable, date, complexName, fetchNames) {
    promiseVariable
        .then(result => {

            let nagruzkaName = fetchNames.map(e => {
                return exceptionManualNagruzka(e)
            })

            let names = complexName.map(e => {
                return e.name
            })

            let totalArray = [[], [], [], [], [], []]

            result.forEach((e, i) => {
                highChartMonthLine(e.work, e.pause, e.off, e.avar, e.nagruzka, nagruzkaName[i], i + 1)
                highChartRound(averageMonthdata(e.work), averageMonthdata(e.pause), averageMonthdata(e.off),
                    averageMonthdata(e.avar), averageMonthdata(e.nagruzka), nagruzkaName[i], i + 1)

                totalArray[0].push(averageMonthdata(e.work.map(Number)))
                totalArray[1].push(averageMonthdata(e.pause.map(Number)))
                totalArray[2].push(averageMonthdata(e.off.map(Number)))
                totalArray[3].push(averageMonthdata(e.avar.map(Number)))
                totalArray[4].push(averageMonthdata(e.nagruzka.map(Number)))
            })

            highChartTotal(names, totalArray[0], totalArray[1], totalArray[2], totalArray[3], totalArray[4], nagruzkaName, date)
            highChartRound(averageMonthdata(totalArray[0]), averageMonthdata(totalArray[1]), averageMonthdata(totalArray[2]),
                averageMonthdata(totalArray[3]), totalArray[4], nagruzkaName, 'Total')
        })
        .catch(err => {
            console.error(err);
        });
}

// Обработка данных из запроса для отрисовки графиков для сменных отчетов
function updateLoadDataIndividualSmena(promiseVariable, day1, complexName, fetchNames, typeLine = "multiLine") {
    promiseVariable
        .then(result => {
            console.log('Иной смена')
            let data = result.map(e => {
                return [[e.work.slice(), e.pause.slice(), e.off.slice(), e.avar.slice(), e.nagruzka.slice(), e.programName.slice()],
                    [e.work2.slice(), e.pause2.slice(), e.off2.slice(), e.avar2.slice(), e.nagruzka2.slice(), e.programName2.slice()]]
            })
            let smenaArrays = data.map(e => {
                return convertDaysToSmena(e[0], e[1], day1, typeLine)
            })

            let totalArray = []
            let kolOpArray = []
            let arrayLine;

            if (typeLine == 'multiLine') {
                arrayLine = [0, 1, 2, 3, 4]
            } else {
                arrayLine = [0, 0, 0, 0, 0]
            }

            let day2 = dayYesterday(day1)

            let parserDataArray = smenaArrays.map(smena => {
                let convertDataWork = parseLinearSutki(smena[0][0], arrayLine[1], day1, smena[0][5], smena[0][1].length)
                let convertDataPause = parseLinearSutki(smena[0][1], arrayLine[2], day1)
                let convertDataOff = parseLinearSutki(smena[0][2], arrayLine[3], day1)
                let convertDataAvar = parseLinearSutki(smena[0][3], arrayLine[4], day1)
                let convertDataRuchnoi = parseLinearSutki(smena[0][4], arrayLine[0], day1, smena[0][1].length)

                let convertDataWork2 = parseLinearSutki(smena[1][0], arrayLine[1], day2, smena[1][5], smena[1][1].length)
                let convertDataPause2 = parseLinearSutki(smena[1][1], arrayLine[2], day2)
                let convertDataOff2 = parseLinearSutki(smena[1][2], arrayLine[3], day2)
                let convertDataAvar2 = parseLinearSutki(smena[1][3], arrayLine[4], day2)
                let convertDataRuchnoi2 = parseLinearSutki(smena[1][4], arrayLine[0], day2, smena[1][1].length)

                let roundArray = smena[0][6]
                let roundArray2 = smena[1][6]

                totalArray.push(smena[0][6].slice())
                totalArray.push(smena[1][6].slice())
                kolOpArray.push(kolOperations(smena[0][0]).slice())
                kolOpArray.push(kolOperations(smena[1][0]).slice())

                return [[convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, roundArray],
                    [convertDataWork2, convertDataPause2, convertDataOff2, convertDataAvar2, convertDataRuchnoi2, roundArray2]]

            })

            let nagruzkaName = fetchNames.map(e => {
                return exceptionManualNagruzka(e)
            })

            let names = complexName.map(e => {
                return e.name
            })

            let programNames = complexName.map(e => {
                return e.programsName
            })

            highChartSmenaTotalKolOp(totalArray, kolOpArray, names, day1, nagruzkaName)

            parserDataArray.forEach((e, i) => {
                let idContainer = (i * 2) + 1

                // Первая смена
                highChartSutkiLine(e[0][0], e[0][1], e[0][2], e[0][3], e[0][4], nagruzkaName[i], idContainer)
                if (programNames[i] !== null && programNames[i] !== undefined) highChartProgram(getTimeProgramNameGraph(smenaArrays[i][0], 'smena', day2 + ' 19:00'), idContainer)
                highChartRound(e[0][5][0], e[0][5][1], e[0][5][2], e[0][5][3], e[0][5][4], nagruzkaName[i], idContainer)

                // Первая вторая
                highChartSutkiLine(e[1][0], e[1][1], e[1][2], e[1][3], e[1][4], nagruzkaName[i], idContainer + 1)
                if (programNames[i] !== null && programNames[i] !== undefined) highChartProgram(getTimeProgramNameGraph(smenaArrays[i][1], 'smena', day1 + ' 07:00'), idContainer + 1)
                highChartRound(e[1][5][0], e[1][5][1], e[1][5][2], e[1][5][3], e[1][5][4], nagruzkaName[i], idContainer + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

function updatePage(date, valuesWait, stateLineHC, placesObject) {

    let stankiObject = {}
    Object.keys(placesObject).forEach(e => {
        Object.keys(placesObject[e].stanki).forEach(i => {
            stankiObject[i] = placesObject[e].stanki[i]
        })
    })

    let stankiState = {}

    valuesWait.forEach(e => {
        stankiState[e] = stankiObject[e]
    })

    let stankiKeysState = Object.keys(stankiState).map(e => {
        return e
    })

    let fetchNames = stankiKeysState.map(name => {
        return stankiState[name].complexRequest
    })

    let complexNames = stankiKeysState.map(name => {
        return stankiState[name].buttonNames
    })

    let stankiRequest = Promise.all(fetchNames.map((item) => {
        return fetchRequest(date, item)
    }));

    updateLoadDataIndividual(stankiRequest, date, complexNames, fetchNames, stateLineHC)
}

function updatePageMonth(date, valuesWait, placesObject) {

    let stankiObject = {}
    Object.keys(placesObject).forEach(e => {
        Object.keys(placesObject[e].stanki).forEach(i => {
            stankiObject[i] = placesObject[e].stanki[i]
        })
    })

    let stankiState = {}

    valuesWait.forEach(e => {
        stankiState[e] = stankiObject[e]
    })

    let stankiKeysState = Object.keys(stankiState).map(e => {
        return e
    })

    let fetchNames = stankiKeysState.map(name => {
        return stankiState[name].complexRequest
    })

    let complexNames = stankiKeysState.map(name => {
        return stankiState[name].buttonNames
    })

    let stankiRequest = Promise.all(fetchNames.map((item) => {
        return fetchRequestMonth(date, item)
    }));

    updateLoadDataIndividualMonth(stankiRequest, date, complexNames, fetchNames)
}

function updatePageSmena(date, valuesWait, stateLineHC, placesObject) {

    let stankiObject = {}
    Object.keys(placesObject).forEach(e => {
        Object.keys(placesObject[e].stanki).forEach(i => {
            stankiObject[i] = placesObject[e].stanki[i]
        })
    })

    let stankiState = {}

    valuesWait.forEach(e => {
        stankiState[e] = stankiObject[e]
    })

    let stankiKeysState = Object.keys(stankiState).map(e => {
        return e
    })

    let fetchNames = stankiKeysState.map(name => {
        return stankiState[name].complexRequest
    })

    let complexNames = stankiKeysState.map(name => {
        return stankiState[name].buttonNames
    })

    let stankiRequest = Promise.all(fetchNames.map((item) => {
        return fetchRequestSmena(date, item)
    }));

    updateLoadDataIndividualSmena(stankiRequest, date, complexNames, fetchNames, stateLineHC)
}

function getAllStankiData() {
    let kim = {
        buttonNames: {
            name: "CRYSTA-Apex S9168",
            serviceName: "CRYSTA-Apex S9168",
            programsName: "CRYSTA-Apex S9168",
        },
        complexImg: "../images/crystal_apex.png",
        complexRequest: 'kim',
        buttonsVrs: [-145, 680, 'url(../images/crystal_apex.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: "meh1",
        state: true,
    }

    let nk600 = {
        buttonNames: {
            name: "НК600",
            serviceName: "НК600",
        },
        complexImg: "../images/nk600.png",
        complexRequest: 'nk600',
        buttonsVrs: [-463, 1183, 'url(../images/nk600.png) no-repeat', "../images/ceh2.png", 40, "100%"],
        size: "ceh1",
        state: true,
    }

    let uvf5220 = {
        buttonNames: {
            name: "УФ5220",
            serviceName: "УФ5220",
        },
        complexImg: "../images/UVF_5220.png",
        complexRequest: 'uvf5220',
        buttonsVrs: [-115, 875, 'url(../images/UVF_5220.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let progress = {
        buttonNames: {
            name: "СТП Сеспель",
            serviceName: "СТП Сеспель",
        },
        complexImg: "../images/progress.png",
        complexRequest: 'progress',
        buttonsVrs: [-105, 494, 'url(../images/progress.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let ntx1000_2 = {
        buttonNames: {
            name: "NTX1000 2",
            serviceName: "NTX1000 2",
        },
        complexImg: "../images/ntx1000.png",
        complexRequest: 'ntx1000_2',
        buttonsVrs: [-100, 295, 'url(../images/ntx1000.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let sk50 = {
        buttonNames: {
            name: "SK50",
            serviceName: "SK50",
        },
        complexImg: "../images/sk50.png",
        complexRequest: 'sk50',
        buttonsVrs: [-100, 597, 'url(../images/sk50.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let apec = {
        buttonNames: {
            name: "APEC",
            serviceName: "APEC",
            programsName: "APEC",
        },
        complexImg: "../images/apec.png",
        complexRequest: 'apec',
        buttonsVrs: [-106, 780, 'url(../images/apec.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_dmu50_3 = {
        buttonNames: {
            name: "DMU50 3",
            serviceName: "DMU50 3",
        },
        complexImg: "../images/dmg_dmu50.png",
        complexRequest: 'dmg_dmu50_3',
        buttonsVrs: [-65, 295, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_dmu50_4 = {
        buttonNames: {
            name: "DMU50 4",
            serviceName: "DMU50 4",
        },
        complexImg: "../images/dmg_dmu50.png",
        complexRequest: 'dmg_dmu50_4',
        buttonsVrs: [-65, 270, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_ctx310_2 = {
        buttonNames: {
            name: "CTX310 2",
            serviceName: "CTX310 2",
            alarm: 'CTX310 2',
        },
        complexImg: "../images/dmg_ctx310.png",
        complexRequest: 'dmg_ctx310_2',
        buttonsVrs: [-65, 270, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_ctx510_2 = {
        buttonNames: {
            name: "CTX510 2",
            serviceName: "CTX510 2",
        },
        complexImg: "../images/dmg_ctx510.png",
        complexRequest: 'dmg_ctx510_2',
        buttonsVrs: [-101, 106, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_ctx510_3 = {
        buttonNames: {
            name: "CTX510 3",
            serviceName: "CTX510 3",
        },
        complexImg: "../images/dmg_ctx510.png",
        complexRequest: 'dmg_ctx510_3',
        buttonsVrs: [-101, 85, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_ctx310_3 = {
        buttonNames: {
            name: "CTX310 3",
            serviceName: "CTX310 3",
        },
        complexImg: "../images/dmg_ctx310.png",
        complexRequest: 'dmg_ctx310_3',
        buttonsVrs: [-105, 210, 'url(../images/dmg_ctx310.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_ctx510_4 = {
        buttonNames: {
            name: "CTX510 4",
            serviceName: "CTX510 4",
        },
        complexImg: "../images/dmg_ctx510.png",
        complexRequest: 'dmg_ctx510_4',
        buttonsVrs: [-105, 235, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_ctx510_5 = {
        buttonNames: {
            name: "CTX510 5",
            serviceName: "CTX510 5",
        },
        complexImg: "../images/dmg_ctx510.png",
        complexRequest: 'dmg_ctx510_5',
        buttonsVrs: [-65, 210, 'url(../images/dmg_ctx510.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_dmc1035_2 = {
        buttonNames: {
            name: "DMC1035 2",
            serviceName: "DMC1035 2",
        },
        complexImg: "../images/dmg_dmc1035.png",
        complexRequest: 'dmg_dmc1035_2',
        buttonsVrs: [-103, 171, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_dmu50_5 = {
        buttonNames: {
            name: "DMU50 5",
            serviceName: "DMU50 5",
        },
        complexImg: "../images/dmg_dmu50.png",
        complexRequest: 'dmg_dmu50_5',
        buttonsVrs: [-65, 171, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_dmu50_6 = {
        buttonNames: {
            name: "DMU50 6",
            serviceName: "DMU50 6",
        },
        complexImg: "../images/dmg_dmu50.png",
        complexRequest: 'dmg_dmu50_6',
        buttonsVrs: [-103, 171, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let dmg_dmu50_7 = {
        buttonNames: {
            name: "DMU50 7",
            serviceName: "DMU50 7",
        },
        complexImg: "../images/dmg_dmu50.png",
        complexRequest: 'dmg_dmu50_7',
        buttonsVrs: [-65, 141, 'url(../images/dmg_dmu50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let ar55 = {
        buttonNames: {
            name: "AR55",
            serviceName: "AR55",
        },
        complexImg: "../images/ar55.png",
        complexRequest: 'ar55',
        buttonsVrs: [-98, 268, 'url(../images/ar50.png) no-repeat', "../images/ii_ploshadka.png", 25, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let navigator_1 = {
        buttonNames: {
            name: "Навигатор 1",
            serviceName: "Навигатор 1",
            programsName: "Навигатор 1",
            laser: "Навигатор 1",
        },
        complexImg: "../images/navigator.png",
        complexRequest: 'navigator_1',
        buttonsVrs: [-110, 900, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let navigator_2_golova_2 = {
        buttonNames: {
            name: "Навигатор 2",
            serviceName: "Навигатор 2",
            programsName: "Навигатор 2",
            laser: "Навигатор 2",
        },
        complexImg: "../images/navigator.png",
        complexRequest: 'navigator_2_golova_2',
        buttonsVrs: [-100, 540, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let navigator_3 = {
        buttonNames: {
            name: "Навигатор 3",
            serviceName: "Навигатор 3",
            programsName: "Навигатор 3",
            laser: "Навигатор 3",
        },
        complexImg: "../images/navigator.png",
        complexRequest: 'navigator_3',
        buttonsVrs: [-200, 220, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let trulaser = {
        buttonNames: {
            name: "TruLaser",
            serviceName: "TruLaser",
            programsName: "TruLaser",
        },
        complexImg: "../images/trulaser.png",
        complexRequest: 'trulaser',
        buttonsVrs: [-420, 740, 'url(../images/trulaser.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let kometa_1 = {
        buttonNames: {
            name: "Комета 1",
            serviceName: "Комета 1",
        },
        complexImg: "../images/kometa.png",
        complexRequest: 'kometa_1',
        buttonsVrs: [-382, 190, 'url(../images/kometa.png) no-repeat', "../images/ceh_5.png", 60, "unset"],
        size: 'ceh5',
        state: true,
    }

    let kometa_2 = {
        buttonNames: {
            name: "Комета 2",
            serviceName: "Комета 2",
        },
        complexImg: "../images/kometa.png",
        complexRequest: 'kometa_2',
        buttonsVrs: [-300, 948, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let kometa_3 = {
        buttonNames: {
            name: "Комета 3",
            serviceName: "Комета 3",
        },
        complexImg: "../images/kometa.png",
        complexRequest: 'kometa_3',
        buttonsVrs: [-340, 870, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let uvf_1 = {
        buttonNames: {
            name: "УВФ-1 1",
            serviceName: "УВФ-1 1",
        },
        complexImg: "../images/uvf_1_2.png",
        complexRequest: 'uvf_1',
        buttonsVrs: [-340, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let uvf_2 = {
        buttonNames: {
            name: "УВФ-1 2",
            serviceName: "УВФ-1 2",
        },
        complexImg: "../images/uvf_1_2.png",
        complexRequest: 'uvf_2',
        buttonsVrs: [-180, 280, 'url(../images/uvf_1_2.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let ntx1000 = {
        buttonNames: {
            name: "NTX1000",
            serviceName: "NTX1000",
            alarm: 'NTX1000'
        },
        complexImg: "../images/ntx1000.png",
        complexRequest: 'ntx1000',
        buttonsVrs: [-670, 490, 'url(../images/ntx1000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let nlx3000 = {
        buttonNames: {
            name: "NLX3000",
            serviceName: "NLX3000",
            alarm: 'NLX3000'
        },
        complexImg: "../images/NLX3000.png",
        complexRequest: 'nlx3000',
        buttonsVrs: [-590, 310, 'url(../images/NLX3000.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_gamma2000 = {
        buttonNames: {
            name: "GAMMA2000",
            serviceName: "GAMMA2000",
            alarm: 'GAMMA2000'
        },
        complexImg: "../images/gamma2000.png",
        complexRequest: 'dmg_gamma2000',
        buttonsVrs: [-840, 520, 'url(../images/gamma2000.png) no-repeat', "../images/meh_ceh.png", 60, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_ctx650 = {
        buttonNames: {
            name: "CTX650",
            serviceName: "CTX650",
            alarm: 'CTX650'
        },
        complexImg: "../images/dmg_ctx650.png",
        complexRequest: 'dmg_ctx650',
        buttonsVrs: [-500, 310, 'url(../images/dmg_ctx650.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_dmf260 = {
        buttonNames: {
            name: "DMF260",
            serviceName: "DMF260",
            alarm: 'DMF260'
        },
        complexImg: "../images/dmg_dmf260.png",
        complexRequest: 'dmg_dmf260',
        buttonsVrs: [-780, 200, 'url(../images/dmg_dmf260.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_dmu50_1 = {
        buttonNames: {
            name: "DMU50 1",
            serviceName: "DMU50 1",
            alarm: 'DMU50 1'
        },
        complexImg: "../images/dmg_dmu50.png",
        complexRequest: 'dmg_dmu50_1',
        buttonsVrs: [-500, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_dmu50_2 = {
        buttonNames: {
            name: "DMU50 2",
            serviceName: "DMU50 2",
            alarm: 'DMU50 2'
        },
        complexImg: "../images/dmg_dmu50.png",
        complexRequest: 'dmg_dmu50_2',
        buttonsVrs: [-410, 115, 'url(../images/dmg_dmu50.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_dmc1035 = {
        buttonNames: {
            name: "DMC1035",
            serviceName: "DMC1035",
            alarm: 'DMC1035',
        },
        complexImg: "../images/dmg_dmc1035.png",
        complexRequest: 'dmg_dmc1035',
        buttonsVrs: [-590, 115, 'url(../images/dmg_dmc1035.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_ctx310_1 = {
        buttonNames: {
            name: "CTX310 1",
            serviceName: "CTX310 1",
            alarm: 'CTX310 1',
        },
        complexImg: "../images/dmg_ctx310.png",
        complexRequest: 'dmg_ctx310_1',
        buttonsVrs: [-590, 470, 'url(../images/dmg_ctx310.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let dmg_ctx510_1 = {
        buttonNames: {
            name: "CTX510 1",
            serviceName: "CTX510 1",
            alarm: 'CTX510 1',
        },
        complexImg: "../images/dmg_ctx510.png",
        complexRequest: 'dmg_ctx510_1',
        buttonsVrs: [-490, 470, 'url(../images/dmg_ctx510.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let maks_1 = {
        buttonNames: {
            name: "МАКС 1",
            serviceName: "МАКС 1",
            programsName: 'МАКС 1',
        },
        complexImg: "../images/robot.png",
        complexRequest: 'maks_1',
        buttonsVrs: [-255, 620, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        size: 'ceh6',
        state: true,
    }

    let maks_2 = {
        buttonNames: {
            name: "МАКС 2",
            serviceName: "МАКС 2",
            programsName: 'МАКС 2',
        },
        complexImg: "../images/robot.png",
        complexRequest: 'maks_2',
        buttonsVrs: [-450, 210, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        size: 'ceh6',
        state: true,
    }

    let m710 = {
        buttonNames: {
            name: "М710",
            serviceName: "М710",
            programsName: 'М710',
        },
        complexImg: "../images/robot.png",
        complexRequest: 'm710',
        buttonsVrs: [-920, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let rtk12c = {
        buttonNames: {
            name: "РТК12C",
            serviceName: "РТК12C",
            programsName: 'РТК12C',
        },
        complexImg: "../images/robot.png",
        complexRequest: 'rtk12c',
        buttonsVrs: [-750, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let p250 = {
        buttonNames: {
            name: "P250",
            serviceName: "P250",
            programsName: 'P250',
        },
        complexImg: "../images/robot_p250.png",
        complexRequest: 'p250',
        buttonsVrs: [-820, 270, 'url(../images/robot_p250.png) no-repeat', "../images/ceh_5.png", 60, "unset"],
        size: 'ceh5',
        state: true,
    }

    let krot = {
        buttonNames: {
            name: "КРОТ",
            serviceName: "КРОТ",
            programsName: 'КРОТ',
        },
        complexImg: "../images/robot.png",
        complexRequest: 'krot',
        buttonsVrs: [-920, 890, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let prans = {
        buttonNames: {
            name: "ПРАНС",
            serviceName: "ПРАНС",
            programsName: 'ПРАНС',
        },
        complexImg: "../images/robot.png",
        complexRequest: 'prans',
        buttonsVrs: [-655, 820, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        size: 'ceh6',
        state: true,
    }

    let press = {
        buttonNames: {
            name: "Пресс ЧПУ для ступиц",
            serviceName: "Пресс ЧПУ для ступиц",
        },
        complexImg: "../images/press.png",
        complexRequest: 'press',
        buttonsVrs: [-480, 765, 'url(../images/press.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"],
        size: '2ploshadka',
        state: true,
    }

    let epp = {
        buttonNames: {
            name: "ЭПП",
            serviceName: "ЭПП",
        },
        complexImg: "../images/epp.png",
        complexRequest: 'epp',
        buttonsVrs: [-825, 220, 'url(../images/epp.png) no-repeat', "../images/ceh_6.png", 40, "unset"],
        size: 'ceh6',
        state: true,
    }

    let stp13m = {
        buttonNames: {
            name: "СТП13М",
            serviceName: "СТП13М",
        },
        complexImg: "../images/stp13m.png",
        complexRequest: 'stp13m',
        buttonsVrs: [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let stend_resources = {
        buttonNames: {
            name: "Стенд для ресурсных испытаний",
            serviceName: "Стенд для ресурсных испытаний",
            report: 'Стенд',
            current: 'Стенд',
        },
        complexImg: "../images/stendResource.png",
        complexRequest: 'stend_resources',
        buttonsVrs: [-560, 15, 'url(../images/stendResource.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let sclad_meh = {
        buttonNames: {
            name: "Склад Мех. цеха",
            serviceName: "Склад Мех. цеха",
        },
        complexImg: "../images/sklad.png",
        complexRequest: 'sclad_meh',
        buttonsVrs: [-485, 680, 'url(../images/sklad.png) no-repeat', "../images/meh_ceh.png", 40, "unset"],
        size: 'meh1',
        state: true,
    }

    let pech_nerg = {
        buttonNames: {
            name: "Печь Индукционная",
            serviceName: "Печь Индукционная",
        },
        complexImg: "../images/pech.png",
        complexRequest: 'pech_nerg',
        buttonsVrs: [-125, 180, 'url(../images/pech.png) no-repeat', "../images/ceh_1.png", 70, "100%"],
        size: 'ceh1',
        state: true,
    }

    let liteyka_big = {
        buttonNames: {
            name: "Литейная машина большая",
            serviceName: "Литейная машина большая",
        },

        complexImg: "../images/liteyka.png",
        complexRequest: 'liteyka_big',
        buttonsVrs: [-255, 1015, 'url(../images/liteyka.png) no-repeat', "../images/ceh_1.png", 70, "100%"],
        size: 'ceh1',
        state: true,
    }

    let liteyka_medium = {
        buttonNames: {
            name: "Литейная машина средняя",
            serviceName: "Литейная машина средняя",
        },
        complexImg: "../images/liteyka.png",
        complexRequest: 'liteyka_medium',
        buttonsVrs: [-222, 839, 'url(../images/liteyka.png) no-repeat', "../images/ceh_1.png", 70, "100%"],
        size: 'ceh1',
        state: true,
    }

    let faccin_1 = {
        buttonNames: {
            name: "FACCIN 4",
            serviceName: "FACCIN 4",
        },
        complexImg: "../images/faccin.png",
        complexRequest: 'faccin_1',
        buttonsVrs: [-390, 175, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let faccin_2 = {
        buttonNames: {
            name: "FACCIN 10",
            serviceName: "FACCIN 10",
        },
        complexImg: "../images/faccin_2.png",
        complexRequest: 'faccin_2',
        buttonsVrs: [-410, 360, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let trubend = {
        buttonNames: {
            name: "Trubend 5230S",
            serviceName: "Trubend 5230S",
        },
        complexImg: "../images/trubend.png",
        complexRequest: 'trubend',
        buttonsVrs: [-210, 850, 'url(../images/trubend.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let liefeld110 = {
        buttonNames: {
            name: "LEIFELD PNC 110",
            serviceName: "LEIFELD PNC 110",
        },
        complexImg: "../images/pnc-110.png",
        complexRequest: 'liefeld110',
        buttonsVrs: [-645, 705, 'url(../images/pnc-135.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let liefeld135 = {
        buttonNames: {
            name: "LEIFELD PNC 135",
            serviceName: "LEIFELD PNC 135",
        },
        complexImg: "../images/pnc-135.png",
        complexRequest: 'liefeld135',
        buttonsVrs: [-615, 800, 'url(../images/pnc-135.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"],
        size: 'sborCeh',
        state: true,
    }

    let placesObject = {
        'ОТК': {
            stanki: {kim, nk600},
            placeState: true,
        },
        'Мех.уч.2 пл.': {
            stanki: {
                uvf5220, progress, ntx1000_2, sk50, apec, dmg_dmu50_3,
                dmg_dmu50_4, dmg_ctx310_2, dmg_ctx510_2, dmg_ctx510_3,
                dmg_ctx310_3, dmg_ctx510_4, dmg_ctx510_5, dmg_dmc1035_2,
                dmg_dmu50_5, dmg_dmu50_6, dmg_dmu50_7, ar55
            },
            placeState: true,
        },
        'Резка': {
            stanki: {
                navigator_1, navigator_2_golova_2, navigator_3,
                trulaser, kometa_1, kometa_2, kometa_3
            },
            placeState: true,
        },
        'Мех.уч.1 пл.': {
            stanki: {
                uvf_1, uvf_2, ntx1000, nlx3000, dmg_gamma2000,
                dmg_ctx650, dmg_dmf260, dmg_dmu50_1, dmg_dmu50_2,
                dmg_dmc1035, dmg_ctx310_1, dmg_ctx510_1
            },
            placeState: true,
        },
        'Роботы': {
            stanki: {maks_1, maks_2, m710, rtk12c, p250, krot, prans},
            placeState: true,
        },
        'Спец. комплексы': {
            stanki: {press, epp, stp13m, stend_resources},
            placeState: true,
        },
        'Склады': {
            stanki: {sclad_meh},
            placeState: true,
        },
        'Литьё': {
            stanki: {pech_nerg, liteyka_big, liteyka_medium},
            placeState: true,
        },
        'Гибка': {
            stanki: {faccin_1, faccin_2, trubend, liefeld110, liefeld135},
            placeState: true,
        },
    }

    return placesObject

}