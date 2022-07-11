function RobotsMonth() {

    let complexName = ["МАКС #1", "МАКС #2", "М710", "РТК12C", "P250", "КРОТ", "ПРАНС"]
    let complexImg = ["../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot_p250.png", "../images/robot.png", "../images/robot.png"]

    let buttonsVrs1 = [-255, 620, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"]
    let buttonsVrs2 = [-450, 210, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"]
    let buttonsVrs3 = [-920, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"]
    let buttonsVrs4 = [-750, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs5 = [-820, 270, 'url(../images/robot_p250.png) no-repeat', "../images/ceh_5.png", 60, "unset"]
    let buttonsVrs6 = [-920, 890, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"]
    let buttonsVrs7 = [-655, 820, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false, "buttonUpdateMonth"])
    let timeout = null;

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth() + 1
        if (monthNow < 10) {
            monthNow = '0' + monthNow
        }

        let roundKim = fetchMonthHighCharts('maks_1', `${yearNow}-${monthNow}`, 1)
        let roundNK600 = fetchMonthHighCharts('maks_2', `${yearNow}-${monthNow}`, 2)
        let roundStp13m = fetchMonthHighCharts('m710', `${yearNow}-${monthNow}`, 3)
        let roundComplex4 = fetchMonthHighCharts('rtk12c', `${yearNow}-${monthNow}`, 4)
        let roundComplex5 = fetchMonthHighCharts('p250', `${yearNow}-${monthNow}`, 5)
        let roundComplex6 = fetchMonthHighCharts('krot', `${yearNow}-${monthNow}`, 6)
        let roundComplex7 = fetchMonthHighCharts('prans', `${yearNow}-${monthNow}`, 7)

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
                                        [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array], 'Нагрузка')

                                    highChartRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray,workComplex4Array,workComplex5Array,workComplex6Array,workComplex7Array]),
                                        averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray,pauseComplex4Array,pauseComplex5Array,pauseComplex6Array,pauseComplex7Array]),
                                        averageMonthdata([offKimArray, offNK600Array, offStp13mArray,offComplex4Array,offComplex5Array,offComplex6Array,offComplex7Array]),
                                        averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray,avarComplex4Array,avarComplex5Array,avarComplex6Array,avarComplex7Array]),
                                        averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array]),
                                        'Нагрузка','Total')

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

            let roundKim = fetchMonthHighCharts('maks_1', dateMonth, 1)
            let roundNK600 = fetchMonthHighCharts('maks_2', dateMonth, 2)
            let roundStp13m = fetchMonthHighCharts('m710', dateMonth, 3)
            let roundComplex4 = fetchMonthHighCharts('rtk12c', dateMonth, 4)
            let roundComplex5 = fetchMonthHighCharts('p250', dateMonth, 5)
            let roundComplex6 = fetchMonthHighCharts('krot', dateMonth, 6)
            let roundComplex7 = fetchMonthHighCharts('prans', dateMonth, 7)

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
                                            [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array], 'Нагрузка')

                                        highChartRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray,workComplex4Array,workComplex5Array,workComplex6Array,workComplex7Array]),
                                            averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray,pauseComplex4Array,pauseComplex5Array,pauseComplex6Array,pauseComplex7Array]),
                                            averageMonthdata([offKimArray, offNK600Array, offStp13mArray,offComplex4Array,offComplex5Array,offComplex6Array,offComplex7Array]),
                                            averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray,avarComplex4Array,avarComplex5Array,avarComplex6Array,avarComplex7Array]),
                                            averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array]),
                                            'Нагрузка','Total')

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

    return (
        <div>

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
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"ceh6"}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"ceh6"}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine3"></div>
                <div className="roundSukiHighChart" id="containerRound3"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine4"></div>
                <div className="roundSukiHighChart" id="containerRound4"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5} size={"ceh5"}/>
                <div className="lineSukiHighChart" id="containerLine5"></div>
                <div className="roundSukiHighChart" id="containerRound5"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine6"></div>
                <div className="roundSukiHighChart" id="containerRound6"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7} size={"ceh6"}/>
                <div className="lineSukiHighChart" id="containerLine7"></div>
                <div className="roundSukiHighChart" id="containerRound7"></div>
            </div>

        </div>
    )
}