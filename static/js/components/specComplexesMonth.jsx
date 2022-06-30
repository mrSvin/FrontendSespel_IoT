function SpecComplexesMonth() {

    let complexName = ["Пресс ЧПУ для ступиц", "ЭПП", "СТП13М"]
    let complexImg = ["../images/press.png", "../images/epp.png", "../images/stp13m.png"]

    let buttonsVrs1 = [-80, 608, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/1_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs2 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs3 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false, "buttonUpdateMonth"])
    let timeout = null;

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth() + 1
        if (monthNow < 10) {
            monthNow = '0' + monthNow
        }

        let roundKim = fetchHighCharts('press', `${yearNow}-${monthNow}`, 1)
        let roundNK600 = fetchHighCharts('epp', `${yearNow}-${monthNow}`, 2)
        let roundStp13m = fetchHighCharts('stp13m', `${yearNow}-${monthNow}`, 3)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);

        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {
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


                    highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray],
                        [pauseKimArray, pauseNK600Array, pauseStp13mArray],
                        [offKimArray, offNK600Array, offStp13mArray],
                        [avarKimArray, avarNK600Array, avarStp13mArray],
                        [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray], 'ручной')

                    highChartTotalRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray]), averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray]),
                        averageMonthdata([offKimArray, offNK600Array, offStp13mArray]), averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray]),
                        averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray]), 'Ручной')

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

            let roundKim = fetchHighCharts('kim', dateMonth, 1)
            let roundNK600 = fetchHighCharts('nk600', dateMonth, 2)
            let roundStp13m = fetchHighCharts('stp13m', dateMonth, 3)

            let promiseDataKim = Promise.resolve(roundKim);
            let promiseDataNK600 = Promise.resolve(roundNK600);
            let promiseDataStp13m = Promise.resolve(roundStp13m);

            //Общая загрузка
            promiseDataKim.then(value => {
                promiseDataNK600.then(value1 => {
                    promiseDataStp13m.then(value2 => {
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


                        highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray],
                            [pauseKimArray, pauseNK600Array, pauseStp13mArray],
                            [offKimArray, offNK600Array, offStp13mArray],
                            [avarKimArray, avarNK600Array, avarStp13mArray],
                            [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray], 'ручной')

                        highChartTotalRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray]), averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray]),
                            averageMonthdata([offKimArray, offNK600Array, offStp13mArray]), averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray]),
                            averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray]), 'Ручной')

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

            <MenuStanki menuSelected="specComplexes"/>

            <div className="buttons-otchet">

                <Link to="/stanki/specComplexes">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesMonth">
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

        </div>
    )
}