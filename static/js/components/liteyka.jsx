function LiteykaInfo() {

    let complexName = ["Печь Индукционная"]
    let complexImg = ["../images/pech.png"]

    let buttonsVrs1 = [-125, 180, 'url(../images/pech.png) no-repeat', "../images/ceh_1.png", 70, "100%"]

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

        let roundKim = fetchRequestBuildHC(dateInput, bufferData[0], 'pech_nerg', 1)

        let promiseDataKim = Promise.resolve(roundKim);

        //Общая загрузка и Количество операций
        promiseDataKim.then(value => {
            let intKimArray = value.roundArray.map(Number)

            highChartTotal(complexName, [intKimArray[0]], [intKimArray[1]],
                [intKimArray[2]], [intKimArray[3]], [intKimArray[4]], 'Нагрузка')

            let kolKim = kolOperations(value.workArray)
            highChartCountOperations(complexName, [kolKim[0]], [kolKim[1]])
        })

    }

    return (
        <div>

            <DayCalendar newDate={newDate} date={date}/>

            <ComplexTotalSutkiInfo/>

            <ComplexSutkiAllInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1} size={"ceh1"} idContainer = {1}/>


        </div>
    )

}

function Liteyka() {

    return (
        <div>

            <MenuStanki menuSelected="liteyka"/>

            <MenuOtchet select="sutki" page='liteyka'/>

            <LiteykaInfo/>

        </div>
    )
}