function GibkaInfo() {

    let complexName = ["FACCIN 4", "FACCIN 10"]
    let complexImg = ["../images/faccin.png", "../images/faccin_2.png"]

    let buttonsVrs1 = [-390, 175, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs2 = [-410, 360, 'url(../images/faccin.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]

    let [kimData, setKimData] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [nk600Data, setNk600Data] = useState({
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

        updateLoadData(`${dateInput}`)

    }

    function updateLoadData(dateInput) {
        let roundKim = fetchRequestBuildHC(dateInput, kimData, 'faccin_1', 1)
        let roundNK600 = fetchRequestBuildHC(dateInput, nk600Data, 'faccin_2', 2)

        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        //Общая загрузка и Количество операций
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                let intKimArray = value.roundArray.map(Number)
                let intNK600Array = value1.roundArray.map(Number)

                highChartTotal(complexName, [intKimArray[0], intNK600Array[0]], [intKimArray[1], intNK600Array[1]],
                    [intKimArray[2], intNK600Array[2]], [intKimArray[3], intNK600Array[3]], [intKimArray[4], intNK600Array[4]], 'Нагрузка')

                let kolKim = kolOperations(value.workArray)
                let kolNK600 = kolOperations(value1.workArray)
                highChartCountOperations(complexName, [kolKim[0], kolNK600[0]], [kolKim[1], kolNK600[1]])

            })
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
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

        </div>
    )

}

function Gibka() {

    return (
        <div>

            <MenuStanki menuSelected="gibka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/gibka">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/gibkaMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <GibkaInfo/>

        </div>
    )
}