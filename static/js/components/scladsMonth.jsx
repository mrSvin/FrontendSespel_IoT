function ScladsMonth() {

    let complexName = ["CRYSTA-Apex S9168"]
    let complexImg = ["../images/sklad.png"]

    let buttonsVrs1 = [-485, 680, 'url(../images/sklad.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false,"buttonUpdateMonth"])
    let timeout=null;

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth()+1
        if (monthNow<10) {
            monthNow = '0' + monthNow
        }

        let roundKim = fetchMonthHighCharts('sclad_meh', `${yearNow}-${monthNow}`,1)

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
                    [nagruzkaKimArray], 'Нагрузка')

                highChartRound(averageMonthdata([workKimArray]),averageMonthdata([pauseKimArray]),
                    averageMonthdata([offKimArray]),averageMonthdata([avarKimArray]),
                    averageMonthdata([nagruzkaKimArray]),'Нагрузка','Total')

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

            let roundKim = fetchMonthHighCharts('sclad_meh', dateMonth,1)

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
                    [nagruzkaKimArray], 'Нагрузка')

                highChartRound(averageMonthdata([workKimArray]),averageMonthdata([pauseKimArray]),
                    averageMonthdata([offKimArray]),averageMonthdata([avarKimArray]),
                    averageMonthdata([nagruzkaKimArray]),'Нагрузка','Total')

            })

        }

        setStateButtonUpdate([true,"buttonUpdateMonth load"])
        timeout= setTimeout(disabledButton, 1000)

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

            </div>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate = {stateButtonUpdate}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>
                <div className="totalRound" id="containerRoundTotal"></div>
            </div>

            <div className='complexAllInfo' id={'containerTotal'}>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"meh1"}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

        </div>
    )
}