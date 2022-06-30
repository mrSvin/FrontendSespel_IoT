function ScladsMonth() {

    let complexName = ["CRYSTA-Apex S9168"]
    let complexImg = ["../images/sklad.png"]

    let buttonsVrs1 = [-80, 608, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/1_ploshadka_outside.png", 60, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false,"buttonUpdateMonth"])
    let timeout=null;

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth()+1
        if (monthNow<10) {
            monthNow = '0' + monthNow
        }

        let roundKim = fetchHighCharts('sclad_meh', `${yearNow}-${monthNow}`,1)

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
                    [nagruzkaKimArray], 'ручной')

                highChartTotalRound(averageMonthdata([workKimArray]),averageMonthdata([pauseKimArray]),
                    averageMonthdata([offKimArray]),averageMonthdata([avarKimArray]),
                    averageMonthdata([nagruzkaKimArray]),'Ручной')

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

            let roundKim = fetchHighCharts('sclad_meh', dateMonth,1)

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
                    [nagruzkaKimArray], 'ручной')

                highChartTotalRound(averageMonthdata([workKimArray]),averageMonthdata([pauseKimArray]),
                    averageMonthdata([offKimArray]),averageMonthdata([avarKimArray]),
                    averageMonthdata([nagruzkaKimArray]),'Ручной')

            })

        }

        setStateButtonUpdate([true,"buttonUpdateMonth load"])
        timeout= setTimeout(disabledButton, 1000)

    }

    function fetchHighCharts(complexName, dateInput, idContainer) {
        return fetch(`../api/monthData/${complexName}_month_date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                highChartMonthLine(data.work, data.pause, data.off, data.avar, data.nagruzka, idContainer)
                highChartMonthRound(averageMonthdata(data.work), averageMonthdata(data.pause), averageMonthdata(data.off),
                    averageMonthdata(data.avar),  averageMonthdata(data.nagruzka), 'Ручной', idContainer)
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
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

        </div>
    )
}