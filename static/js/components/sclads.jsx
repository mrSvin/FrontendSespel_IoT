function ScladsInfo() {

    let complexName = ["Склад Мех. цеха"]
    let complexImg = ["../images/sklad.png"]

    let buttonsVrs1 = [-485, 680, 'url(../images/sklad.png) no-repeat', "../images/meh_ceh.png", 40, "unset"]

    let bufferData = bufferDataArrays(1)

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

        let roundKim = fetchRequestBuildHC(dateInput, bufferData[0], 'sclad_meh', 1)

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

            <ComplexTotalSutkiInfo/>

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