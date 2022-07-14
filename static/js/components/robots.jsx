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

    let bufferData = bufferDataArrays(6)


    let [date, setDate] = useState(0);

    useEffect(() => {

        setDate(dayNow())

        updateLoadData(dayNow())

    }, [])

    function newDate(dateInput) {
        setDate(dateInput)
        console.log(dateInput)

        updateLoadData(dateInput)

    }

    function updateLoadData(dateInput) {

        let roundKim = fetchRequestBuildHC(dateInput, bufferData[0], 'maks_1', 1)
        let roundNK600 = fetchRequestBuildHC(dateInput, bufferData[1], 'maks_2', 2)
        let roundStp13m = fetchRequestBuildHC(dateInput, bufferData[2], 'm710', 3)
        let roundRtc12c = fetchRequestBuildHC(dateInput, bufferData[3], 'rtk12c', 4)
        let roundP250 = fetchRequestBuildHC(dateInput, bufferData[4], 'p250', 5)
        let roundKrot = fetchRequestBuildHC(dateInput, bufferData[5], 'krot', 6)
        let roundPrans = fetchRequestBuildHC(dateInput, bufferData[6], 'prans', 7)


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

            <ComplexTotalSutkiInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"ceh6"} idContainer = {1}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"ceh6"} idContainer = {2}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"sborCeh"} idContainer = {3}/>
            <ComplexSutkiAllInfo complexName={complexName[3]} complexImg={complexImg[3]} complexMesto={buttonsVrs4} size={"sborCeh"} idContainer = {4}/>
            <ComplexSutkiAllInfo complexName={complexName[4]} complexImg={complexImg[4]} complexMesto={buttonsVrs5} size={"ceh5"} idContainer = {5}/>
            <ComplexSutkiAllInfo complexName={complexName[5]} complexImg={complexImg[5]} complexMesto={buttonsVrs6} size={"sborCeh"} idContainer = {6}/>
            <ComplexSutkiAllInfo complexName={complexName[6]} complexImg={complexImg[6]} complexMesto={buttonsVrs7} size={"ceh6"} idContainer = {7}/>

        </div>
    )

}

function Robots() {

    return (
        <div>

            <MenuStanki menuSelected="robots"/>

            <MenuOtchet select="sutki" page='robots'/>

            <RobotsInfo/>

        </div>
    )
}