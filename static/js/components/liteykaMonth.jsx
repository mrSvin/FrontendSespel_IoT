function LiteykaMonth() {

    let complexName = ["Печь Индукционная"]
    let complexImg = ["../images/pech.png"]

    let complexRequest = ['pech_nerg']
    let nagruzkaName = complexRequest.map(e => {
        return exceptionManualNagruzka(e)
    })

    let buttonsVrs1 = [-125, 180, 'url(../images/pech.png) no-repeat', "../images/ceh_1.png", 70, "100%"]

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

        let roundKim = fetchMonthHighCharts('pech_nerg', dateInput, 1)

        let promiseDataKim = Promise.resolve(roundKim);

        //Общая загрузка
        promiseDataKim.then(value => {

            let workKimArray = averageMonthdata(value.work.map(Number))
            let pauseKimArray = averageMonthdata(value.pause.map(Number))
            let offKimArray = averageMonthdata(value.off.map(Number))
            let avarKimArray = averageMonthdata(value.avar.map(Number))
            let nagruzkaKimArray = averageMonthdata(value.nagruzka.map(Number))

            highChartTotal(complexName, [workKimArray],
                [pauseKimArray],
                [offKimArray],
                [avarKimArray],
                [nagruzkaKimArray], nagruzkaName, dateInput)

            highChartRound(averageMonthdata([workKimArray]), averageMonthdata([pauseKimArray]),
                averageMonthdata([offKimArray]), averageMonthdata([avarKimArray]),
                averageMonthdata([nagruzkaKimArray]), 'Нагрузка', 'Total')

        })

    }

    return (
        <div>

            <MenuStanki menuSelected="liteyka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/liteyka">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/liteykaMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/liteykaSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"ceh1"} idContainer = {1} service={complexName[0]}/>

        </div>
    )
}