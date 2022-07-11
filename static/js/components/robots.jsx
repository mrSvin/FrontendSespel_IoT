function RobotsInfo() {

    let complexName = ["МАКС #1", "МАКС #2", "М710", "РТК12C", "P250", "КРОТ", "ПРАНС"]
    let complexImg = ["../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot.png", "../images/robot_p250.png", "../images/robot.png", "../images/robot.png"]

    let buttonsVrs1 = [-255, 620, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"]
    let buttonsVrs2 = [-450, 210, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"]
    let buttonsVrs3 = [-920, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"]
    let buttonsVrs4 = [-750, 800, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]
    let buttonsVrs5 = [-820, 270, 'url(../images/robot_p250.png) no-repeat', "../images/ceh_5.png", 60, "unset"]
    let buttonsVrs6 = [-920, 890, 'url(../images/robot.png) no-repeat', "../images/sbor_ceh.png", 40, "unset"]
    let buttonsVrs7 = [-655, 820, 'url(../images/robot.png) no-repeat', "../images/ceh_6.png", 40, "unset"]

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

    let [stp13m, setStp13m] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [rtk12c, setRtk12c] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [p250, setP250] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [krot, setKrot] = useState({
        workArray: [],
        pauseArray: [],
        offArray: [],
        avarArray: [],
        ruchnoyArray: [],
        roundArray: []
    });

    let [prans, setPrans] = useState({
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

        let roundKim = fetchRequestBuildHC(dateInput, kimData, 'maks_1', 1)
        let roundNK600 = fetchRequestBuildHC(dateInput, nk600Data, 'maks_2', 2)
        let roundStp13m = fetchRequestBuildHC(dateInput, stp13m, 'm710', 3)
        let roundRtc12c = fetchRequestBuildHC(dateInput, rtk12c, 'rtk12c', 4)
        let roundP250 = fetchRequestBuildHC(dateInput, p250, 'p250', 5)
        let roundKrot = fetchRequestBuildHC(dateInput, krot, 'krot', 6)
        let roundPrans = fetchRequestBuildHC(dateInput, prans, 'prans', 7)


        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        let promiseComplex4 = Promise.resolve(roundRtc12c);
        let promiseComplex5 = Promise.resolve(roundP250);
        let promiseComplex6 = Promise.resolve(roundKrot);
        let promiseComplex7 = Promise.resolve(roundPrans);


        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {
                    promiseComplex4.then(value3 => {
                        promiseComplex5.then(value4 => {
                            promiseComplex6.then(value5 => {
                                promiseComplex7.then(value6 => {

                                    let intKimArray = value.roundArray.map(Number)
                                    let intNK600Array = value1.roundArray.map(Number)
                                    let intStp13mArray = value2.roundArray.map(Number)
                                    let intComplex4 = value3.roundArray.map(Number)
                                    let intComplex5 = value4.roundArray.map(Number)
                                    let intComplex6 = value5.roundArray.map(Number)
                                    let intComplex7 = value6.roundArray.map(Number)

                                    if (value.roundArray.length == 0) {
                                        intKimArray = [0, 0, 0, 0, 0, 0]
                                    }
                                    if (value1.roundArray.length == 0) {
                                        intNK600Array = [0, 0, 0, 0, 0, 0]
                                    }
                                    if (value2.roundArray.length == 0) {
                                        intStp13mArray = [0, 0, 0, 0, 0, 0]
                                    }
                                    if (value3.roundArray.length == 0) {
                                        intComplex4 = [0, 0, 0, 0, 0, 0]
                                    }
                                    if (value4.roundArray.length == 0) {
                                        intComplex5 = [0, 0, 0, 0, 0, 0]
                                    }
                                    if (value5.roundArray.length == 0) {
                                        intComplex6 = [0, 0, 0, 0, 0, 0]
                                    }
                                    if (value6.roundArray.length == 0) {
                                        intComplex7 = [0, 0, 0, 0, 0, 0]
                                    }

                                    highChartTotal(complexName, [intKimArray[0], intNK600Array[0], intStp13mArray[0], intComplex4[0], intComplex5[0], intComplex6[0], intComplex7[0]],
                                        [intKimArray[1], intNK600Array[1], intStp13mArray[1], intComplex4[1], intComplex5[1], intComplex6[1], intComplex7[1]],
                                        [intKimArray[2], intNK600Array[2], intStp13mArray[2], intComplex4[2], intComplex5[2], intComplex6[2], intComplex7[2]],
                                        [intKimArray[3], intNK600Array[3], intStp13mArray[3], intComplex4[3], intComplex5[3], intComplex6[3], intComplex7[3]],
                                        [intKimArray[4], intNK600Array[4], intStp13mArray[4], intComplex4[4], intComplex5[4], intComplex6[4], intComplex7[4]],
                                        'Нагрузка')

                                    //Количество операций
                                    let kolKim = kolOperations(value.workArray)
                                    let kolNK600 = kolOperations(value1.workArray)
                                    let kolStp13m = kolOperations(value2.workArray)
                                    let kolComplex4 = kolOperations(value3.workArray)
                                    let kolComplex5 = kolOperations(value4.workArray)
                                    let kolComplex6 = kolOperations(value5.workArray)
                                    let kolComplex7 = kolOperations(value6.workArray)

                                    highChartCountOperations(complexName, [kolKim[0], kolNK600[0], kolStp13m[0],kolComplex4[0],kolComplex5[0],kolComplex6[0],kolComplex7[0]],
                                        [kolKim[1], kolNK600[1], kolStp13m[1],kolComplex4[1],kolComplex5[1],kolComplex6[1],kolComplex7[1]])

                                })
                            })
                        })
                    })
                })

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
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"ceh6"}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"ceh6"}/>
                <div className="lineSukiHighChart" id="containerLine2"></div>
                <div className="roundSukiHighChart" id="containerRound2"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine3"></div>
                <div className="roundSukiHighChart" id="containerRound3"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine4"></div>
                <div className="roundSukiHighChart" id="containerRound4"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5} size={"ceh5"}/>
                <div className="lineSukiHighChart" id="containerLine5"></div>
                <div className="roundSukiHighChart" id="containerRound5"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6} size={"sborCeh"}/>
                <div className="lineSukiHighChart" id="containerLine6"></div>
                <div className="roundSukiHighChart" id="containerRound6"></div>
            </div>

            <div className='complexAllInfo'>
                <ComplexInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7} size={"ceh6"}/>
                <div className="lineSukiHighChart" id="containerLine7"></div>
                <div className="roundSukiHighChart" id="containerRound7"></div>
            </div>

        </div>
    )

}

function Robots() {

    return (
        <div>

            <MenuStanki menuSelected="robots"/>

            <div className="buttons-otchet">

                <Link to="/stanki/robots">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/robotsMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <RobotsInfo/>

        </div>
    )
}