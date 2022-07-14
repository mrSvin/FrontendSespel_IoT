function GibkaMonth() {

    let complexName = ["FACCIN 4", "FACCIN 10"]
    let complexImg = ["../images/faccin.png", "../images/faccin_2.png"]

    let buttonsVrs1 = [-390, 175, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs2 = [-410, 360, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false,"buttonUpdateMonth"])
    let timeout=null;

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

            updateLoadDataMonth(dateMonth)

        }

        setStateButtonUpdate([true,"buttonUpdateMonth load"])
        timeout= setTimeout(disabledButton, 1000)

    }

    function updateLoadDataMonth(dateInput) {

        let roundKim = fetchMonthHighCharts('faccin_1', dateInput,1)
        let roundNK600 = fetchMonthHighCharts('faccin_2', dateInput,2)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);

        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
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


                highChartTotal(complexName, [workKimArray,workNK600Array],
                    [pauseKimArray,pauseNK600Array],
                    [offKimArray,offNK600Array],
                    [avarKimArray,avarNK600Array],
                    [nagruzkaKimArray,nagruzkaNK600Array], 'Нагрузка')

                highChartRound(averageMonthdata([workKimArray,workNK600Array]),averageMonthdata([pauseKimArray,pauseNK600Array]),
                    averageMonthdata([offKimArray,offNK600Array]),averageMonthdata([avarKimArray,avarNK600Array]),
                    averageMonthdata([nagruzkaKimArray,nagruzkaNK600Array]),'Нагрузка', 'Total')
            })
        })

    }

    return (
        <div>

            <MenuStanki menuSelected="gibka"/>

            <MenuOtchet select="month" page='gibka'/>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate = {stateButtonUpdate}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"sborCeh"} idContainer = {1}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"sborCeh"} idContainer = {2}/>

        </div>
    )
}