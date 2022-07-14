function SpecComplexesInfo() {

    let complexName = ["Пресс ЧПУ для ступиц", "ЭПП", "СТП13М"]
    let complexImg = ["../images/press.png", "../images/epp.png", "../images/stp13m.png"]

    let buttonsVrs1 = [-480, 765, 'url(../images/press.png) no-repeat', "../images/ii_ploshadka.png", 40, "unset"]
    let buttonsVrs2 = [-825, 220, 'url(../images/epp.png) no-repeat', "../images/ceh_6.png", 40, "unset"]
    let buttonsVrs3 = [-310, 550, 'url(../images/stp13m.png) no-repeat', "../images/sbor_ceh.png", 60, "unset"]

    let bufferData = bufferDataArrays(3)


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

        let roundKim = fetchRequestBuildHC(dateInput, bufferData[0], 'press', 1)
        let roundNK600 = fetchRequestBuildHC(dateInput, bufferData[1], 'epp', 2)
        let roundStp13m = fetchRequestBuildHC(dateInput, bufferData[2], 'stp13m', 3)


        let promiseDataKim = Promise.resolve(roundKim);
        let promiseDataNK600 = Promise.resolve(roundNK600);
        let promiseDataStp13m = Promise.resolve(roundStp13m);
        //Общая загрузка
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                promiseDataStp13m.then(value2 => {

                    let intKimArray = value.roundArray.map(Number)
                    let intNK600Array = value1.roundArray.map(Number)
                    let intStp13mArray = value2.roundArray.map(Number)

                    if (value.roundArray.length == 0) {
                        intKimArray = [0, 0, 0, 0, 0, 0]
                    }
                    if (value1.roundArray.length == 0) {
                        intNK600Array = [0, 0, 0, 0, 0, 0]
                    }
                    if (value2.roundArray.length == 0) {
                        intStp13mArray = [0, 0, 0, 0, 0, 0]
                    }

                    highChartTotal(complexName, [intKimArray[0], intNK600Array[0], intStp13mArray[0]], [intKimArray[1], intNK600Array[1], intStp13mArray[1]],
                        [intKimArray[2], intNK600Array[2], intStp13mArray[2]], [intKimArray[3], intNK600Array[3], intStp13mArray[3]],
                        [intKimArray[4], intNK600Array[4], intStp13mArray[4]], 'Нагрузка')


                    //Количество операций
                    let kolKim = kolOperations(value.workArray)
                    let kolNK600 = kolOperations(value1.workArray)
                    let kolStp13m = kolOperations(value2.workArray)
                    highChartCountOperations(complexName, [kolKim[0], kolNK600[0], kolStp13m[0]], [kolKim[1], kolNK600[1], kolStp13m[1]])


                })

            })
        })

    }

    return (
        <div>

            <DayCalendar newDate={newDate} date={date}/>

            <ComplexTotalSutkiInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"2ploshadka"} idContainer = {1}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2} size={"ceh6"} idContainer = {2}/>
            <ComplexSutkiAllInfo complexName={complexName[2]} complexImg={complexImg[2]} complexMesto={buttonsVrs3} size={"sborCeh"} idContainer = {3}/>

        </div>
    )

}

function SpecComplexes() {

    return (
        <div>

            <MenuStanki menuSelected="specComplexes"/>

            <MenuOtchet select="sutki" page='specComplexes'/>

            <SpecComplexesInfo/>

        </div>
    )
}