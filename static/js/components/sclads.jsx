function ScladsInfo() {

    let complexName = ["Склад Мех. цеха"]
    let complexImg = ["../images/sklad.png"]

    let buttonsVrs1 = [-485, 680, 'url(../images/sklad.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]

    let [kimData, setKimData] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [date, setDate] = useState(0);

    useEffect(() => {
        let dateNow = new Date()
        let dayNow = dateNow.getDate()
        let monthNow = dateNow.getMonth() + 1
        let yearNow = dateNow.getFullYear()
        if (dayNow < 10) {
            dayNow = "0" + dayNow
        }
        if (monthNow < 10) {
            monthNow = "0" + monthNow
        }
        setDate(`${yearNow}-${monthNow}-${dayNow}`)

        updateLoadData(`${yearNow}-${monthNow}-${dayNow}`)

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        console.log(dateInput)

        updateLoadData(dateInput)

    }

    function updateLoadData(dateInput) {

        let roundKim = fetchRequestBuildHC(dateInput, kimData, 'sclad_meh', 1)

        let promiseDataKim = Promise.resolve(roundKim);

        //Общая загрузка и количество операций
        promiseDataKim.then(value => {
            let intKimArray = value.roundArray.map(Number)

            highChartTotal(complexName, [intKimArray[0]], [intKimArray[1]],
                [intKimArray[2]], [intKimArray[3]], [intKimArray[4]],'Нагрузка')

            let kolKim = kolOperations(value.workArray)

            highChartCountOperations(complexName, [kolKim[0]], [kolKim[1]])

        })

    }

    return (
        <div>

            <DayCalendar newDate={newDate} date={date}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>

                <div className='countOperations' id='containerOperations'></div>

            </div>

            <div className='complexAllInfo' id={'containerTotal'}>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"meh1"}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

        </div>
    )

}

function Sclads() {

    return (
        <div>

            <MenuStanki menuSelected="sclads"/>

            <div className="buttons-otchet">

                <Link to="/stanki/sclads">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/scladsMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <ScladsInfo/>

        </div>
    )
}