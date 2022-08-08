function RezkaMonth() {

    let complexName = ["Навигатор #1", "Навигатор #2", "Навигатор #3", "TruLaser", "Комета #1", "Комета #2", "Комета #3", "ПРАНС"]
    let complexImg = ["../images/navigator.png", "../images/navigator.png", "../images/navigator.png", "../images/trulaser.png", "../images/kometa.png", "../images/kometa.png", "../images/kometa.png"]

    let buttonsVrs1 = [-110, 900, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs2 = [-100, 540, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs3 = [-200, 220, 'url(../images/navigator.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs4 = [-420, 740, 'url(../images/trulaser.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs5 = [-382, 190, 'url(../images/kometa.png) no-repeat', "../images/ceh_5.png", 60, "unset"]
    let buttonsVrs6 = [-300, 948, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]
    let buttonsVrs7 = [-340, 870, 'url(../images/kometa.png) no-repeat', "../images/sbor_ceh.png", 50, "unset"]

    let [dateMonth, setDateMonth] = useState(0);

    useEffect(() => {

        updateLoadDataMonth( monthNow())

    }, [])

    function newDate(dateInput) {
        console.log(dateInput)
        setDateMonth(dateInput)
        updateLoadDataMonth(dateInput)
    }

    function updateLoadDataMonth(dateInput) {

        let roundKim = fetchMonthHighCharts('navigator_1', dateInput, 1)
        let roundNK600 = fetchMonthHighCharts('navigator_2_golova_2', dateInput, 2)
        let roundStp13m = fetchMonthHighCharts('navigator_3', dateInput, 3)
        let roundComplex4 = fetchMonthHighCharts('trulaser', dateInput, 4)
        let roundComplex5 = fetchMonthHighCharts('kometa_1', dateInput, 5)
        let roundComplex6 = fetchMonthHighCharts('kometa_2', dateInput, 6)
        let roundComplex7 = fetchMonthHighCharts('kometa_3', dateInput, 7)

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
                                        [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray,nagruzkaComplex4Array,nagruzkaComplex5Array,nagruzkaComplex6Array,nagruzkaComplex7Array], 'Нагрузка', dateInput)

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

    return (
        <div>

            <MenuStanki menuSelected="rezka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/rezka">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/rezkaSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"sborCeh"} idContainer={1} programs={complexName[0]} laser={complexName[0]} service={"Навигатор 1"}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"sborCeh"} idContainer = {2} programs={complexName[1]} laser={complexName[1]} service={"Навигатор 2"}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"sborCeh"} idContainer = {3} programs={complexName[2]} laser={complexName[2]} service={"Навигатор 3"}/>
            <ComplexSutkiAllInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4} size={"sborCeh"} idContainer = {4} programs={complexName[3]} service={"TruLaser"}/>
            <ComplexSutkiAllInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5} size={"ceh5"} idContainer = {5} service={"Комета 1"}/>
            <ComplexSutkiAllInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6} size={"sborCeh"} idContainer = {6} service={"Комета 2"}/>
            <ComplexSutkiAllInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7} size={"sborCeh"} idContainer = {7} service={"Комета 3"}/>

        </div>
    )
}