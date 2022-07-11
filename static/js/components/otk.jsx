function OtkInfo() {

    let complexName = ["CRYSTA-Apex S9168", "НК600"]
    let complexImg = ["../images/crystal_apex.png", "../images/nk600.png"]

    let buttonsVrs1 = [-145, 680, 'url(../images/crystal_apex.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs2 = [-463, 1183, 'url(../images/nk600.png) no-repeat', "../images/ceh2.png", 40, "100%"]

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

        updateLoadData(dateInput)

    }

    function updateLoadData(dateInput) {

        let roundKim = fetchRequestBuildHC(dateInput, kimData, 'kim', 1)
        let roundNK600 = fetchRequestBuildHC(dateInput, nk600Data, 'nk600', 2)


        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        //Общая загрузка и Количество операций
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                let intKimArray = value.roundArray.map(Number)
                let intNK600Array = value1.roundArray.map(Number)

                highChartTotal(complexName, [intKimArray[0], intNK600Array[0]], [intKimArray[1], intNK600Array[1]],
                    [intKimArray[2], intNK600Array[2]], [intKimArray[3], intNK600Array[3]], [intKimArray[4], intNK600Array[4]], 'ручной')

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
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"meh1"}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"ceh2"}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

        </div>
    )

}

function Otk() {

    return (
        <div>

            <MenuStanki menuSelected="otk"/>

            <div className="buttons-otchet">

                <Link to="/stanki/otk">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/otkMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <OtkInfo/>

        </div>
    )
}