function RobotsMonth() {

    let complexName = ["МАКС #1", "МАКС #2", "М710", "РТК12C", "P250", "КРОТ", "ПРАНС"]
    let complexImg = ["../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot_p250.png", "../images/robot.png", "../images/robot.png"]

    let buttonsVrs1 = [-80, 608, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/1_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs2 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs3 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs4 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs5 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs6 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs7 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false, "buttonUpdateMonth"])
    let timeout = null;

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth() + 1
        if (monthNow < 10) {
            monthNow = '0' + monthNow
        }

        let roundKim = fetchHighCharts('maks_1', `${yearNow}-${monthNow}`, 1)
        let roundNK600 = fetchHighCharts('maks_2', `${yearNow}-${monthNow}`, 2)
        let roundStp13m = fetchHighCharts('m710', `${yearNow}-${monthNow}`, 3)
        let roundComplex4 = fetchHighCharts('rtk12c', `${yearNow}-${monthNow}`, 4)
        let roundComplex5 = fetchHighCharts('p250', `${yearNow}-${monthNow}`, 5)
        let roundComplex6 = fetchHighCharts('krot', `${yearNow}-${monthNow}`, 6)
        let roundComplex7 = fetchHighCharts('prans', `${yearNow}-${monthNow}`, 7)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        let promiseComplex4 = Promise.resolve(roundComplex4);
        let promiseComplex5 = Promise.resolve(roundComplex5);
        let promiseComplex6 = Promise.resolve(roundComplex6);
        let promiseComplex7 = Promise.resolve(roundComplex7);

        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {
                    promiseComplex4.then(value3 => {
                        promiseComplex5.then(value4 => {
                            promiseComplex6.then(value5 => {
                                promiseComplex7.then(value6 => {
                                    let workKimArray = averageMonthdata(value.work.map(Number))
                                    let pauseKimArray = averageMonthdata(value.pause.map(Number))
                                    let offKimArray = averageMonthdata(value.off.map(Number))
                                    let avarKimArray = averageMonthdata(value.avar.map(Number))
                                    let nagruzkaKimArray = averageMonthdata(value.nagruzka.map(Number))

                                    let workNK600Array = averageMonthdata(value1.work.map(Number))
                                    let pauseNK600Array = averageMonthdata(value1.pause.map(Number))
                                    let offNK600Array = averageMonthdata(value1.off.map(Number))
                                    let avarNK600Array = averageMonthdata(value1.avar.map(Number))
                                    let nagruzkaNK600Array = averageMonthdata(value1.nagruzka.map(Number))

                                    let workStp13mArray = averageMonthdata(value2.work.map(Number))
                                    let pauseStp13mArray = averageMonthdata(value2.pause.map(Number))
                                    let offStp13mArray = averageMonthdata(value2.off.map(Number))
                                    let avarStp13mArray = averageMonthdata(value2.avar.map(Number))
                                    let nagruzkaStp13mArray = averageMonthdata(value2.nagruzka.map(Number))

                                    let workComplex4Array = averageMonthdata(value3.work.map(Number))
                                    let pauseComplex4Array = averageMonthdata(value3.pause.map(Number))
                                    let offComplex4Array = averageMonthdata(value3.off.map(Number))
                                    let avarComplex4Array = averageMonthdata(value3.avar.map(Number))
                                    let nagruzkaComplex4Array = averageMonthdata(value3.nagruzka.map(Number))

                                    let workComplex5Array = averageMonthdata(value4.work.map(Number))
                                    let pauseComplex5Array = averageMonthdata(value4.pause.map(Number))
                                    let offComplex5Array = averageMonthdata(value4.off.map(Number))
                                    let avarComplex5Array = averageMonthdata(value4.avar.map(Number))
                                    let nagruzkaComplex5Array = averageMonthdata(value4.nagruzka.map(Number))

                                    let workComplex6Array = averageMonthdata(value5.work.map(Number))
                                    let pauseComplex6Array = averageMonthdata(value5.pause.map(Number))
                                    let offComplex6Array = averageMonthdata(value5.off.map(Number))
                                    let avarComplex6Array = averageMonthdata(value5.avar.map(Number))
                                    let nagruzkaComplex6Array = averageMonthdata(value5.nagruzka.map(Number))

                                    let workComplex7Array = averageMonthdata(value6.work.map(Number))
                                    let pauseComplex7Array = averageMonthdata(value6.pause.map(Number))
                                    let offComplex7Array = averageMonthdata(value6.off.map(Number))
                                    let avarComplex7Array = averageMonthdata(value6.avar.map(Number))
                                    let nagruzkaComplex7Array = averageMonthdata(value6.nagruzka.map(Number))


                                    highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray,workComplex4Array,workComplex5Array,workComplex6Array,workComplex7Array],
                                        [pauseKimArray, pauseNK600Array, pauseStp13mArray,pauseComplex4Array,pauseComplex5Array,pauseComplex6Array,pauseComplex7Array],
                                        [offKimArray, offNK600Array, offStp13mArray,offComplex4Array,offComplex5Array,offComplex6Array,offComplex7Array],
                                        [avarKimArray, avarNK600Array, avarStp13mArray,avarComplex4Array,avarComplex5Array,avarComplex6Array,avarComplex7Array],
                                        [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array], 'ручной')

                                    highChartTotalRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray,workComplex4Array,workComplex5Array,workComplex6Array,workComplex7Array]),
                                        averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray,pauseComplex4Array,pauseComplex5Array,pauseComplex6Array,pauseComplex7Array]),
                                        averageMonthdata([offKimArray, offNK600Array, offStp13mArray,offComplex4Array,offComplex5Array,offComplex6Array,offComplex7Array]),
                                        averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray,avarComplex4Array,avarComplex5Array,avarComplex6Array,avarComplex7Array]),
                                        averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array]), 'Ручной')

                                })
                            })
                        })
                    })
                })
            })
        })

    }, [])

    function newDate(input) {
        useEffect(() => {
            setDateMonth(input)
        })
    }

    function disabledButton() {
        setStateButtonUpdate([false, "buttonUpdateMonth"])
        clearInterval(timeout)
    }

    function updateData() {
        if (dateMonth != "0") {
            console.log(dateMonth)

            let roundKim = fetchHighCharts('maks_1', dateMonth, 1)
            let roundNK600 = fetchHighCharts('maks_2', dateMonth, 2)
            let roundStp13m = fetchHighCharts('m710', dateMonth, 3)
            let roundComplex4 = fetchHighCharts('rtk12c', dateMonth, 4)
            let roundComplex5 = fetchHighCharts('p250', dateMonth, 5)
            let roundComplex6 = fetchHighCharts('krot', dateMonth, 6)
            let roundComplex7 = fetchHighCharts('prans', dateMonth, 7)

            let promiseDataKim = Promise.resolve(roundKim);
            let promiseDataNK600 = Promise.resolve(roundNK600);
            let promiseDataStp13m = Promise.resolve(roundStp13m);
            let promiseComplex4 = Promise.resolve(roundComplex4);
            let promiseComplex5 = Promise.resolve(roundComplex5);
            let promiseComplex6 = Promise.resolve(roundComplex6);
            let promiseComplex7 = Promise.resolve(roundComplex7);

            //Общая загрузка
            promiseDataKim.then(value => {
                promiseDataNK600.then(value1 => {
                    promiseDataStp13m.then(value2 => {
                        promiseComplex4.then(value3 => {
                            promiseComplex5.then(value4 => {
                                promiseComplex6.then(value5 => {
                                    promiseComplex7.then(value6 => {
                                        let workKimArray = averageMonthdata(value.work.map(Number))
                                        let pauseKimArray = averageMonthdata(value.pause.map(Number))
                                        let offKimArray = averageMonthdata(value.off.map(Number))
                                        let avarKimArray = averageMonthdata(value.avar.map(Number))
                                        let nagruzkaKimArray = averageMonthdata(value.nagruzka.map(Number))

                                        let workNK600Array = averageMonthdata(value1.work.map(Number))
                                        let pauseNK600Array = averageMonthdata(value1.pause.map(Number))
                                        let offNK600Array = averageMonthdata(value1.off.map(Number))
                                        let avarNK600Array = averageMonthdata(value1.avar.map(Number))
                                        let nagruzkaNK600Array = averageMonthdata(value1.nagruzka.map(Number))

                                        let workStp13mArray = averageMonthdata(value2.work.map(Number))
                                        let pauseStp13mArray = averageMonthdata(value2.pause.map(Number))
                                        let offStp13mArray = averageMonthdata(value2.off.map(Number))
                                        let avarStp13mArray = averageMonthdata(value2.avar.map(Number))
                                        let nagruzkaStp13mArray = averageMonthdata(value2.nagruzka.map(Number))

                                        let workComplex4Array = averageMonthdata(value3.work.map(Number))
                                        let pauseComplex4Array = averageMonthdata(value3.pause.map(Number))
                                        let offComplex4Array = averageMonthdata(value3.off.map(Number))
                                        let avarComplex4Array = averageMonthdata(value3.avar.map(Number))
                                        let nagruzkaComplex4Array = averageMonthdata(value3.nagruzka.map(Number))

                                        let workComplex5Array = averageMonthdata(value4.work.map(Number))
                                        let pauseComplex5Array = averageMonthdata(value4.pause.map(Number))
                                        let offComplex5Array = averageMonthdata(value4.off.map(Number))
                                        let avarComplex5Array = averageMonthdata(value4.avar.map(Number))
                                        let nagruzkaComplex5Array = averageMonthdata(value4.nagruzka.map(Number))

                                        let workComplex6Array = averageMonthdata(value5.work.map(Number))
                                        let pauseComplex6Array = averageMonthdata(value5.pause.map(Number))
                                        let offComplex6Array = averageMonthdata(value5.off.map(Number))
                                        let avarComplex6Array = averageMonthdata(value5.avar.map(Number))
                                        let nagruzkaComplex6Array = averageMonthdata(value5.nagruzka.map(Number))

                                        let workComplex7Array = averageMonthdata(value6.work.map(Number))
                                        let pauseComplex7Array = averageMonthdata(value6.pause.map(Number))
                                        let offComplex7Array = averageMonthdata(value6.off.map(Number))
                                        let avarComplex7Array = averageMonthdata(value6.avar.map(Number))
                                        let nagruzkaComplex7Array = averageMonthdata(value6.nagruzka.map(Number))


                                        highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray,workComplex4Array,workComplex5Array,workComplex6Array,workComplex7Array],
                                            [pauseKimArray, pauseNK600Array, pauseStp13mArray,pauseComplex4Array,pauseComplex5Array,pauseComplex6Array,pauseComplex7Array],
                                            [offKimArray, offNK600Array, offStp13mArray,offComplex4Array,offComplex5Array,offComplex6Array,offComplex7Array],
                                            [avarKimArray, avarNK600Array, avarStp13mArray,avarComplex4Array,avarComplex5Array,avarComplex6Array,avarComplex7Array],
                                            [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array], 'ручной')

                                        highChartTotalRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray,workComplex4Array,workComplex5Array,workComplex6Array,workComplex7Array]),
                                            averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray,pauseComplex4Array,pauseComplex5Array,pauseComplex6Array,pauseComplex7Array]),
                                            averageMonthdata([offKimArray, offNK600Array, offStp13mArray,offComplex4Array,offComplex5Array,offComplex6Array,offComplex7Array]),
                                            averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray,avarComplex4Array,avarComplex5Array,avarComplex6Array,avarComplex7Array]),
                                            averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array]), 'Ручной')

                                    })
                                })
                            })
                        })
                    })
                })
            })

        }

        setStateButtonUpdate([true, "buttonUpdateMonth load"])
        timeout = setTimeout(disabledButton, 1000)

    }

    function fetchHighCharts(complexName, dateInput, idContainer) {
        return fetch(`../api/monthData/${complexName}_month_date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                highChartMonthLine(data.work, data.pause, data.off, data.avar, data.nagruzka, idContainer)
                highChartMonthRound(averageMonthdata(data.work), averageMonthdata(data.pause), averageMonthdata(data.off),
                    averageMonthdata(data.avar), averageMonthdata(data.nagruzka), 'Ручной', idContainer)
                return data
            })
    }

    function averageMonthdata(inputArray) {
        let sum = inputArray.reduce((a, b) => a + b, 0);
        return (sum / inputArray.length) || 0;

    }


    return (
        <div>

            <Header/>

            <MenuStanki menuSelected="robots"/>

            <div className="buttons-otchet">

                <Link to="/stanki/robots">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate={stateButtonUpdate}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>
                <div className="totalRound" id="containerRoundTotal"></div>
            </div>

            <div className='complexAllInfo' id={'containerTotal'}>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3}/>
                <div className="lineSukiHighChart" id="containerLine3"></div>
                <div className="roundSukiHighChart" id="containerRound3"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4}/>
                <div className="lineSukiHighChart" id="containerLine4"></div>
                <div className="roundSukiHighChart" id="containerRound4"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5}/>
                <div className="lineSukiHighChart" id="containerLine5"></div>
                <div className="roundSukiHighChart" id="containerRound5"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6}/>
                <div className="lineSukiHighChart" id="containerLine6"></div>
                <div className="roundSukiHighChart" id="containerRound6"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7}/>
                <div className="lineSukiHighChart" id="containerLine7"></div>
                <div className="roundSukiHighChart" id="containerRound7"></div>
            </div>

        </div>
    )
}