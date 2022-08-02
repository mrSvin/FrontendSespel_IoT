function RezkaSmena() {

    let complexName = ["Навигатор #1", "Навигатор #2", "Навигатор #3", "TruLaser", "Комета #1", "Комета #2", "Комета #3"]
    let complexImg = ["../images/navigator.png", "../images/navigator.png", "../images/navigator.png", "../images/trulaser.png", "../images/kometa.png", "../images/kometa.png", "../images/kometa.png"]

    let buttonsVrs1 = [-110, 900, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs2 = [-100, 540, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs3 = [-200, 220, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs4 = [-420, 740, 'url(../images/trulaser.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs5 = [-382, 190, 'url(../images/kometa.png) no-repeat', "../images/ceh_5.png", 60, "unset"]
    let buttonsVrs6 = [-300, 948, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs7 = [-340, 870, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]

    let [date, setDate] = useState(0);

    let bufferData = bufferDataArrays(13)

    useEffect(() => {


        setDate(dayNow())
        let date1 = dayNow()
        let date2 = dayYesterday(new Date())
        updateLoadSmenaData(date1, date2)

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)

        updateLoadSmenaData(dateInput, dayYesterday(dateInput))

    }

    function updateLoadSmenaData(day1, day2) {

        let complex1day1 = fetchRequest(day1, bufferData[0], 'navigator_1')
        let complex1day2 = fetchRequest(day2, bufferData[1], 'navigator_1')

        let complex2day1 = fetchRequest(day1, bufferData[2], 'navigator_2_golova_2')
        let complex2day2 = fetchRequest(day2, bufferData[3], 'navigator_2_golova_2')

        let complex3day1 = fetchRequest(day1, bufferData[4], 'navigator_3')
        let complex3day2 = fetchRequest(day2, bufferData[5], 'navigator_3')

        let complex4day1 = fetchRequest(day1, bufferData[6], 'trulaser')
        let complex4day2 = fetchRequest(day2, bufferData[7], 'trulaser')

        let complex5day1 = fetchRequest(day1, bufferData[8], 'kometa_1')
        let complex5day2 = fetchRequest(day2, bufferData[9], 'kometa_1')

        let complex6day1 = fetchRequest(day1, bufferData[10], 'kometa_2')
        let complex6day2 = fetchRequest(day2, bufferData[11], 'kometa_2')

        let complex7day1 = fetchRequest(day1, bufferData[12], 'kometa_3')
        let complex7day2 = fetchRequest(day2, bufferData[13], 'kometa_3')

        let promiseDataComplex1 = Promise.resolve(complex1day1);
        let promiseDataComplex2 = Promise.resolve(complex1day2);

        let promiseDataComplex3 = Promise.resolve(complex2day1);
        let promiseDataComplex4 = Promise.resolve(complex2day2);

        let promiseDataComplex5 = Promise.resolve(complex3day1);
        let promiseDataComplex6 = Promise.resolve(complex3day2);

        let promiseDataComplex7 = Promise.resolve(complex4day1);
        let promiseDataComplex8 = Promise.resolve(complex4day2);

        let promiseDataComplex9 = Promise.resolve(complex5day1);
        let promiseDataComplex10 = Promise.resolve(complex5day2);

        let promiseDataComplex11 = Promise.resolve(complex6day1);
        let promiseDataComplex12 = Promise.resolve(complex6day2);

        let promiseDataComplex13 = Promise.resolve(complex7day1);
        let promiseDataComplex14 = Promise.resolve(complex7day2);

        promiseDataComplex1.then(value => {
            promiseDataComplex2.then(value1 => {
                promiseDataComplex3.then(value3 => {
                    promiseDataComplex4.then(value4 => {
                        promiseDataComplex5.then(value5 => {
                            promiseDataComplex6.then(value6 => {
                                promiseDataComplex7.then(value7 => {
                                    promiseDataComplex8.then(value8 => {
                                        promiseDataComplex9.then(value9 => {
                                            promiseDataComplex10.then(value10 => {
                                                promiseDataComplex11.then(value11 => {
                                                    promiseDataComplex12.then(value12 => {
                                                        promiseDataComplex13.then(value13 => {
                                                            promiseDataComplex14.then(value14 => {

                                                                smenaBuildHighcharts(value, value1, day1, day2, 1)
                                                                smenaBuildHighcharts(value3, value4, day1, day2, 3)
                                                                smenaBuildHighcharts(value5, value6, day1, day2, 5)
                                                                smenaBuildHighcharts(value7, value8, day1, day2, 7)
                                                                smenaBuildHighcharts(value9, value10, day1, day2, 9)
                                                                smenaBuildHighcharts(value11, value12, day1, day2, 11)
                                                                smenaBuildHighcharts(value13, value14, day1, day2, 13)

                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    }

    function smenaBuildHighcharts(value, value1, day1, day2, idContainer) {
        let complex1Smena = convertDaysToSmena(value, value1, day1)
        let convertDataRuchnoi = parseLinearSutki(complex1Smena[0][4], 0, day1)
        let convertDataWork = parseLinearSutki(complex1Smena[0][0], 1, day1, complex1Smena[0][5])
        let convertDataPause = parseLinearSutki(complex1Smena[0][1], 2, day1)
        let convertDataOff = parseLinearSutki(complex1Smena[0][2], 3, day1)
        let convertDataAvar = parseLinearSutki(complex1Smena[0][3], 4, day1)

        highChartSutkiLine(convertDataWork, convertDataPause, convertDataOff, convertDataAvar, convertDataRuchnoi, 'Нагрузка', idContainer)
        highChartRound(complex1Smena[0][6][0], complex1Smena[0][6][1], complex1Smena[0][6][2], complex1Smena[0][6][3], complex1Smena[0][6][4], 'Нагрузка', idContainer)

        let convertDataRuchnoi2 = parseLinearSutki(complex1Smena[1][4], 0, day2)
        let convertDataWork2 = parseLinearSutki(complex1Smena[1][0], 1, day2, complex1Smena[1][5])
        let convertDataPause2 = parseLinearSutki(complex1Smena[1][1], 2, day2)
        let convertDataOff2 = parseLinearSutki(complex1Smena[1][2], 3, day2)
        let convertDataAvar2 = parseLinearSutki(complex1Smena[1][3], 4, day2)
        highChartSutkiLine(convertDataWork2, convertDataPause2, convertDataOff2, convertDataAvar2, convertDataRuchnoi2, 'Нагрузка', idContainer + 1)
        highChartRound(complex1Smena[1][6][0], complex1Smena[1][6][1], complex1Smena[1][6][2], complex1Smena[1][6][3], complex1Smena[1][6][4], 'Нагрузка', idContainer + 1)
    }

    return (
        <div>

            <MenuStanki menuSelected="rezka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/rezka">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaSmena">
                    <div className="menuSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <DayCalendar newDate={newDate} date={date}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>

                <div className='countOperations' id='containerOperations'></div>

            </div>

            <ComplexSmenaAllIngo complexName={complexName[0]} complexImg={complexImg[0]}
                                 complexMesto={buttonsVrs1} programs={complexName[0]+'smena'}
                                 size={"sborCeh"} idContainer={1} laser={complexName[0]}/>

            <ComplexSmenaAllIngo complexName={complexName[1]} complexImg={complexImg[1]}
                                 complexMesto={buttonsVrs2} programs={complexName[1]+'smena'}
                                 size={"sborCeh"} idContainer={3} laser={complexName[1]}/>

            <ComplexSmenaAllIngo complexName={complexName[2]} complexImg={complexImg[2]}
                                 complexMesto={buttonsVrs3} programs={complexName[2]+'smena'}
                                 size={"sborCeh"} idContainer={5} laser={complexName[2]}/>

            <ComplexSmenaAllIngo complexName={complexName[3]} complexImg={complexImg[3]}
                                 complexMesto={buttonsVrs4} programs={complexName[3]+'smena'}
                                 size={"sborCeh"} idContainer={7} laser={complexName[3]}/>

            <ComplexSmenaAllIngo complexName={complexName[4]} complexImg={complexImg[4]}
                                 complexMesto={buttonsVrs5}
                                 size={"ceh5"} idContainer={9} laser={complexName[4]}/>

            <ComplexSmenaAllIngo complexName={complexName[5]} complexImg={complexImg[5]}
                                 complexMesto={buttonsVrs6}
                                 size={"sborCeh"} idContainer={11} laser={complexName[5]}/>

            <ComplexSmenaAllIngo complexName={complexName[6]} complexImg={complexImg[6]}
                                 complexMesto={buttonsVrs7}
                                 size={"sborCeh"} idContainer={13} laser={complexName[6]}/>

        </div>
    )

}