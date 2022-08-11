function OtkInfo() {

    let complexName = ["CRYSTA-Apex S9168", "НК600"]
    let complexImg = ["../images/crystal_apex.png", "../images/nk600.png"]
    let complexRequest = ['kim', 'nk600']

    let buttonsVrs1 = [-145, 680, 'url(../images/crystal_apex.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]
    let buttonsVrs2 = [-463, 1183, 'url(../images/nk600.png) no-repeat', "../images/ceh2.png", 40, "100%"]

    let bufferData = bufferDataArrays(2)

    let [date, setDate] = useState(0);

    let [stateLineHC, setStateLineHC] = useState("line");

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

        let roundComplex =switchLineSutki(stateLineHC,complexRequest,dateInput,bufferData)

        let promiseDataKim = Promise.resolve(roundComplex[0]);
        let promiseDataNK600 = Promise.resolve(roundComplex[1]);
        //Общая загрузка и Количество операций
        promiseDataKim.then(value => {
            promiseDataNK600.then(value1 => {
                let intKimArray = value.roundArray.map(Number)
                let intNK600Array = value1.roundArray.map(Number)

                highChartTotal(complexName, [intKimArray[0], intNK600Array[0]], [intKimArray[1], intNK600Array[1]],
                    [intKimArray[2], intNK600Array[2]], [intKimArray[3], intNK600Array[3]], [intKimArray[4], intNK600Array[4]], 'Ручной', dateInput)

                let kolKim = kolOperations(value.workArray)
                let kolNK600 = kolOperations(value1.workArray)
                highChartCountOperations(complexName, [kolKim[0], kolNK600[0]], [kolKim[1], kolNK600[1]])
            })
        })

    }


    return (
        <div>

            <DayCalendar newDate={newDate} date={date}/>

            <ComplexTotalSutkiInfo/>

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC} bufferData={bufferData} complexRequest={complexRequest}/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}
                                 size={"meh1"} idContainer={1} programs={complexName[0]} service={"CRYSTA-Apex S9168"}/>
            <ComplexSutkiAllInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}
                                 size={"ceh2"} idContainer={2} service={"НК600"}/>

        </div>
    )

}

function Otk() {

    return (
        <div>

            <MenuStanki menuSelected="otk"/>

            <Link to="/stanki/otk">
                    <div className="menuSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/otkMonth">
                    <div className="menuNoSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/otkSmena">
                    <div className="menuNoSelect">СМЕННЫЙ ОТЧЕТ</div>
                </Link>

            <OtkInfo/>

        </div>
    )
}