function OtkMonth() {

    let complexName = ["CRYSTA-Apex S9168", "НК600"]
    let complexImg = ["../images/crystal_apex.png", "../images/nk600.png"]

    let buttonsVrs1 = [-145, 680, 'url(../images/crystal_apex.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs2 = [-463, 1183, 'url(../images/nk600.png) no-repeat', "../images/ceh2.png", 40, "100%"]

    let [dateMonth, setDateMonth] = useState(0);


    useEffect(() => {

        updateLoadDataMonth(monthNow())

    }, [])

    function newDate(dateInput) {
        console.log(dateInput)
        setDateMonth(dateInput)
        updateLoadDataMonth(dateInput)
    }


    function updateLoadDataMonth(dateInput) {

        let roundKim = fetchMonthHighCharts('kim', dateInput, 1, 'Ручной')
        let roundNK600 = fetchMonthHighCharts('nk600', dateInput, 2)

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


                highChartTotal(complexName, [workKimArray, workNK600Array],
                    [pauseKimArray, pauseNK600Array],
                    [offKimArray, offNK600Array],
                    [avarKimArray, avarNK600Array],
                    [nagruzkaKimArray, nagruzkaNK600Array], 'Ручной', dateInput)

                highChartRound(averageMonthdata([workKimArray, workNK600Array]), averageMonthdata([pauseKimArray, pauseNK600Array]),
                    averageMonthdata([offKimArray, offNK600Array]), averageMonthdata([avarKimArray, avarNK600Array]),
                    averageMonthdata([nagruzkaKimArray, nagruzkaNK600Array]), 'Ручной', 'Total')
            })
        })

    }

    return (
        <div>

            <MenuStanki menuSelected="otk"/>

            <div className="buttons-otchet">

            <Link to="/stanki/otk">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/otkMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/otkSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

           </div>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <ComplexTotalMonthInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}
                                 size={"meh1"} idContainer={1} programs={complexName[0]} service={complexName[0]}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}
                                 size={"ceh2"} idContainer={2} service={complexName[1]}/>

        </div>
    )
}