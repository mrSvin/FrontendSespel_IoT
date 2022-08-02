function ScladsInfo() {

    let complexName = ["Склад Мех. цеха"]
    let complexImg = ["../images/sklad.png"]
    let complexRequest = ['sclad_meh']

    let buttonsVrs1 = [-485, 680, 'url(../images/sklad.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]

    let bufferData = bufferDataArrays(1)

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

            <ComplexTotalSutkiInfo/>

            <SwitchLineHC date={date} stateLineHC={stateLineHC} setStateLineHC={setStateLineHC} bufferData={bufferData} complexRequest={complexRequest}/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"meh1"} idContainer = {1}/>

        </div>
    )

}

function Sclads() {

    return (
        <div>

            <MenuStanki menuSelected="sclads"/>

            <MenuOtchet select="sutki" page='sclads'/>

            <ScladsInfo/>

        </div>
    )
}