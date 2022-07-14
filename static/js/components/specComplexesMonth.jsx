function SpecComplexesMonth() {

    let complexName = ["Пресс ЧПУ для ступиц", "ЭПП", "СТП13М"]
    let complexImg = ["../images/press.png", "../images/epp.png", "../images/stp13m.png"]

    let buttonsVrs1 = [-480, 765, 'url(../images/press.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs2 = [-825, 220, 'url(../images/epp.png) no-repeat', "../images/ceh_6.png", 40, "unset"]
    let buttonsVrs3 = [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false, "buttonUpdateMonth"])
    let timeout = null;

    useEffect(() => {

        updateLoadDataMonth( monthNow())

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

            updateLoadData(dateMonth)

        }

        setStateButtonUpdate([true, "buttonUpdateMonth load"])
        timeout = setTimeout(disabledButton, 1000)

    }

    function updateLoadDataMonth(dateInput) {

        let roundKim = fetchMonthHighCharts('press', dateInput, 1)
        let roundNK600 = fetchMonthHighCharts('epp', dateInput, 2)
        let roundStp13m = fetchMonthHighCharts('stp13m', dateInput, 3)

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
                        [nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray], 'Нагрузка')

                    highChartRound(averageMonthdata([workKimArray, workNK600Array, workStp13mArray]), averageMonthdata([pauseKimArray, pauseNK600Array, pauseStp13mArray]),
                        averageMonthdata([offKimArray, offNK600Array, offStp13mArray]), averageMonthdata([avarKimArray, avarNK600Array, avarStp13mArray]),
                        averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array, nagruzkaStp13mArray]), 'Ручной','Total')

                })
            })
        })

    }

    return (
        <div>

            <MenuStanki menuSelected="specComplexes"/>

            <MenuOtchet select="month" page='specComplexes'/>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate={stateButtonUpdate}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"2ploshadka"} idContainer = {1}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"ceh6"} idContainer = {2}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"sborCeh"} idContainer = {3}/>

        </div>
    )
}