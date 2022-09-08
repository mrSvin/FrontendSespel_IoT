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
                if(complexName[i][3] !== null && complexName[i][3] !== undefined) highChartProgram(getTimeProgramNameGraph(data[i], 'sutki', day1),i + 1)
                highChartRound(e[5][0], e[5][1], e[5][2], e[5][3], e[5][4], nagruzkaName[i], i + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
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

            parserDataArray.forEach((e, i)=>{
                let idContainer = (i * 2) + 1

                // Первая смена
                highChartSutkiLine(e[0][0], e[0][1], e[0][2], e[0][3], e[0][4], nagruzkaName[i], idContainer)
                if(complexName[i][3] !== null && complexName[i][3] !== undefined)  highChartProgram(getTimeProgramNameGraph(smenaArrays[i][0], 'smena',day2+' 19:00'),idContainer)
                highChartRound(e[0][5][0], e[0][5][1], e[0][5][2], e[0][5][3], e[0][5][4], nagruzkaName[i], idContainer)

                // Первая вторая
                highChartSutkiLine(e[1][0], e[1][1], e[1][2], e[1][3], e[1][4], nagruzkaName[i], idContainer + 1)
                if(complexName[i][3] !== null && complexName[i][3] !== undefined)  highChartProgram(getTimeProgramNameGraph(smenaArrays[i][1], 'smena', day1 + ' 07:00'),idContainer + 1)
                highChartRound(e[1][5][0], e[1][5][1], e[1][5][2], e[1][5][3], e[1][5][4], nagruzkaName[i], idContainer + 1)

            })
        })
        .catch(err => {
            console.error(err);
        });
}

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



            highChartTotal(complexName, totalArray[0], totalArray[1], totalArray[2], totalArray[3], totalArray[4], names, date)
            highChartRound(averageMonthdata(totalArray[0]), averageMonthdata(totalArray[1]), averageMonthdata(totalArray[2]),
                averageMonthdata(totalArray[3]), totalArray[4], nagruzkaName, 'Total')
        })
        .catch(err => {
            console.error(err);
        });
}