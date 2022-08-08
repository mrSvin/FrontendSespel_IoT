function GazInfo() {

    let [dateMonth, setDateMonth] = useState(0);
    let complexName = ["Котельная 2 площадки", "Котельная #1,#2", "Котельная #7,#8,#10,ОСК#2"]
    let complexImg = ["../images/gazStation.png"]

    let buttonsVrs1 = [-80,608,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/1_ploshadka_outside.png",60,"unset"]
    let buttonsVrs2 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]
    let buttonsVrs3 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]

    let [dataVrs1, setDataVrs1] = useState(0);
    let [dataVrs2, setDataVrs2] = useState(0);
    let [dataVrs3, setDataVrs3] = useState(0);

    function newDate(dateInput) {
        console.log(dateInput)
        setDateMonth(dateInput)
        updateLoadData(dateInput)
    }

    function updateLoadData(dateInput) {
        fetch(`/api/energy/gaz/date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setDataVrs1(data[0].kot_1_2)
                setDataVrs2(data[0].kot_7_8_10)
                setDataVrs3(data[0].kot_2_ploshadka)

                highChartEnergy(data[0].kot_1_2, "container")
                highChartEnergy(data[0].kot_7_8_10, "container2")
                highChartEnergy(data[0].kot_2_ploshadka, "container3")

            })
    }

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth()+1
        if (monthNow<10) {
            monthNow = '0' + monthNow
        }

        updateLoadData(`${yearNow}-${monthNow}`)

    }, [])

    return (
        <div className='vrsInfoAlign'>

            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>

            <div className='flex'>
                <ComplexInfo complexName={complexName[0]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs1} service={"Котельная 2 площадки"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container">
                    </div>
                    <TableDays data={dataVrs1}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[1]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs2} service={"Котельная 1,2"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container2">
                    </div>
                    <TableDays data={dataVrs2}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[2]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs3} service={"Котельная 7,8,10,ОСК2"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container3">
                    </div>
                    <TableDays data={dataVrs3}/>
                </div>
            </div>


        </div>

    )
}

function EnergyGas() {

    return (
        <div>

            <MenuEnergy select="gas"/>

            <GazInfo/>

        </div>
    )
}