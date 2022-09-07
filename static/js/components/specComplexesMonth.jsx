function SpecComplexesMonth() {

    let complexName = ["Пресс ЧПУ для ступиц", "ЭПП", "СТП13М", 'Стенд для ресурсных испытаний']
    let complexImg = ["../images/press.png", "../images/epp.png", "../images/stp13m.png", "../images/stendResource.png"]

    let complexRequest = ['press', 'epp', 'stp13m', 'stend_resources']
    let nagruzkaName = complexRequest.map(e => {
        return exceptionManualNagruzka(e)
    })

    let buttonsVrs1 = [-480, 765, 'url(../images/press.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs2 = [-825, 220, 'url(../images/epp.png) no-repeat', "../images/ceh_6.png", 40, "unset"]
    let buttonsVrs3 = [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]

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

        let roundKim = fetchMonthHighCharts('press', dateInput, 1)
        let roundNK600 = fetchMonthHighCharts('epp', dateInput, 2)
        let roundStp13m = fetchMonthHighCharts('stp13m', dateInput, 3)
        let roundStendResources = fetchMonthHighCharts('stend_resources', dateInput, 4)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        let promiseStendResources = Promise.resolve(roundStendResources);

        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {
                    promiseStendResources.then(value3 => {
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

                        let workStendResourcesArray = averageMonthdata(value3.work.map(Number))
                        let pauseStendResourcesArray = averageMonthdata(value3.pause.map(Number))
                        let offStendResourcesArray = averageMonthdata(value3.off.map(Number))
                        let avarStendResourcesArray = averageMonthdata(value3.avar.map(Number))
                        let nagruzkaStendResourcesArray = averageMonthdata(value3.nagruzka.map(Number))

                        highChartTotal(complexName, [workKimArray, workNK600Array, workStp13mArray, workStendResourcesArray],
                            [pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseStendResourcesArray],
                            [offKimArray, offNK600Array, offStp13mArray, offStendResourcesArray],
                            [avarKimArray, avarNK600Array, avarStp13mArray, avarStendResourcesArray],
                            [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStendResourcesArray], nagruzkaName, dateInput)

                        highChartRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray, workStendResourcesArray]), averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray, pauseStendResourcesArray]),
                            averageMonthdata([offKimArray, offNK600Array, offStp13mArray, offStendResourcesArray]), averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray, avarStendResourcesArray]),
                            averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray, nagruzkaStendResourcesArray]), 'Ручной','Total')
                    })
                })
            })
        })

    }

    return (
        <div>

            <MenuStanki menuSelected="specComplexes"/>

            <div className="buttons-otchet">

                <Link to="/stanki/specComplexes">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/specComplexesSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"2ploshadka"} idContainer = {1} service={"Пресс ЧПУ для ступиц"}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"ceh6"} idContainer = {2} service={"ЭПП"}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"sborCeh"} idContainer = {3} service={"СТП13М"}/>
            <ComplexSutkiAllInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs3} size={"sborCeh"} idContainer = {4} service={"cтенд"} report={'cтенд'} current={'cтенд'}/>

        </div>
    )
}