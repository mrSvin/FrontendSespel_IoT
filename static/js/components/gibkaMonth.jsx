function GibkaMonth() {

    let complexName = ["FACCIN 4", "FACCIN 10"]
    let complexImg = ["../images/faccin.png", "../images/faccin_2.png"]

    let complexRequest = ['faccin_1','faccin_2']
    let nagruzkaName = complexRequest.map(e => {
        return exceptionManualNagruzka(e)
    })

    let buttonsVrs1 = [-390, 175, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs2 = [-410, 360, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]

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
                    [nagruzkaKimArray,nagruzkaNK600Array], nagruzkaName, dateInput)

                highChartRound(averageMonthdata([workKimArray,workNK600Array]),averageMonthdata([pauseKimArray,pauseNK600Array]),
                    averageMonthdata([offKimArray,offNK600Array]),averageMonthdata([avarKimArray,avarNK600Array]),
                    averageMonthdata([nagruzkaKimArray,nagruzkaNK600Array]),'Нагрузка', 'Total')
            })
        })

    }

    return (
        <div>

            <MenuStanki menuSelected="gibka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/gibka">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/gibkaMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/gibkaSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"sborCeh"} idContainer = {1} service={complexName[0]}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"sborCeh"} idContainer = {2} service={complexName[1]}/>

        </div>
    )
}