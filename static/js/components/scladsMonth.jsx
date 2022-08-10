function ScladsMonth() {

    let complexName = ["CRYSTA-Apex S9168"]
    let complexImg = ["../images/sklad.png"]

    let buttonsVrs1 = [-485, 680, 'url(../images/sklad.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]

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

        let roundKim = fetchMonthHighCharts('sclad_meh', dateInput,1)

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
                [nagruzkaKimArray], 'Нагрузка', dateInput)

            highChartRound(averageMonthdata([workKimArray]),averageMonthdata([pauseKimArray]),
                averageMonthdata([offKimArray]),averageMonthdata([avarKimArray]),
                averageMonthdata([nagruzkaKimArray]),'Нагрузка','Total')

        })

    }

    return (
        <div>

            <MenuStanki menuSelected="sclads"/>

            <div className="buttons-otchet">

                <Link to="/stanki/sclads">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/scladsMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/scladsSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"meh1"} idContainer = {1} service={"Склад Мех. цеха"}/>

        </div>
    )
}