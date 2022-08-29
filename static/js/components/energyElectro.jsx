function ElectroInfo() {

    let [dateMonth, setDateMonth] = useState(0);
    let complexName = ["КТП400", "КТП630 #2", "КТП630 #3", "КТП630 #4", "КТП630 #5", "КТП2500", "КТП630 #7"]
    let complexImg = ["../images/electroStation.png"]

    let buttonsVrs1 = [-80,608,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/1_ploshadka_outside.png",60,"unset"]
    let buttonsVrs2 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]
    let buttonsVrs3 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]
    let buttonsVrs4 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]
    let buttonsVrs5 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]
    let buttonsVrs6 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]
    let buttonsVrs7 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]

    let [dataVrs1, setDataVrs1] = useState(0);
    let [dataVrs2, setDataVrs2] = useState(0);
    let [dataVrs3, setDataVrs3] = useState(0);
    let [dataVrs4, setDataVrs4] = useState(0);
    let [dataVrs5, setDataVrs5] = useState(0);
    let [dataVrs6, setDataVrs6] = useState(0);
    let [dataVrs7, setDataVrs7] = useState(0);

    function newDate(dateInput) {
        console.log(dateInput)
        setDateMonth(dateInput)
        updateLoadData(dateInput)
    }

    function updateLoadData(dateInput) {

        fetch(`/api/energy/electro/date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setDataVrs1(data.ktp400)
                setDataVrs2(data.ktp630_2)
                setDataVrs3(data.ktp630_3)
                setDataVrs4(data.ktp630_4)
                setDataVrs5(data.ktp630_5)
                setDataVrs6(data.ktp2500)
                setDataVrs7(data.ktp630_7)
                highChartEnergy(data.ktp400, "container")
                highChartEnergy(data.ktp630_2, "container2")
                highChartEnergy(data.ktp630_3, "container3")
                highChartEnergy(data.ktp630_4, "container4")
                highChartEnergy(data.ktp630_5, "container5")
                highChartEnergy(data.ktp2500, "container6")
                highChartEnergy(data.ktp630_7, "container7")
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
                <ComplexInfo complexName={complexName[0]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs1} service={"КТП400"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container">
                    </div>
                    <TableDays data={dataVrs1}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[1]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs2} service={"КТП630 2"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container2">
                    </div>
                    <TableDays data={dataVrs2}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[2]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs3} service={"КТП630 3"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container3">
                    </div>
                    <TableDays data={dataVrs3}/>
                </div>

            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[3]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs4} service={"КТП630 4"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container4">
                    </div>
                    <TableDays data={dataVrs4}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[4]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs5} service={"КТП630 5"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container5">
                    </div>
                    <TableDays data={dataVrs5}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[5]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs6} service={"КТП2500"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container6">
                    </div>
                    <TableDays data={dataVrs6}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[6]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs7} service={"КТП630 7"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container7">
                    </div>
                    <TableDays data={dataVrs7}/>
                </div>
            </div>


        </div>

    )
}

function EnergyElectro() {

    return (
        <div>

            <MenuEnergy select="electro"/>

            <ElectroInfo/>

        </div>
    )
}