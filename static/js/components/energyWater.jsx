function TableDays(data) {

    var total = 0;
    for (var i in data.data) {
        total += data.data[i];
    }
    total = total.toFixed(2)

    return (
        <table className="tableEnergy" id="vrs_1_days">
            <thead>
            <tr>
                <th>Дни</th>
                {Array(31).fill(1).map((el, i) =>
                    <th key={i}>{i + 1}</th>
                )}
                <th>Итого</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Расход</td>
                {Array(31).fill(1).map((el, i) =>
                    <td key={i}>{data.data[i]}</td>
                )}
                <td>{total}</td>
            </tr>
            </tbody>
        </table>
    )
}

function VrsInfo() {

    let [dateMonth, setDateMonth] = useState(0);
    let complexName = ["ВРС1", "ВРС2"]
    let complexImg = ["../images/nasos.png", "../images/nasos_vrs2.png"]

    let buttonsVrs1 = [-80, 608, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/1_ploshadka_outside.png", 60, "unset"]
    let buttonsVrs2 = [-1000, 308, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/2_ploshadka_outside.png", 60, "unset"]

    let [dataVrs1, setDataVrs1] = useState(0);
    let [dataVrs2, setDataVrs2] = useState(0);

    function newDate(dateInput) {
        console.log(dateInput)
        setDateMonth(dateInput)
        updateLoadData(dateInput)
    }

    function updateLoadData(dateInput) {

        fetch(`/api/energy/vrs/date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setDataVrs1(data[0].vrs1)
                setDataVrs2(data[0].vrs2)
                highChartEnergy(data[0].vrs1, "container")
                highChartEnergy(data[0].vrs2, "container2")
            })

    }

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth() + 1
        if (monthNow < 10) {
            monthNow = '0' + monthNow
        }

        updateLoadData(`${yearNow}-${monthNow}`)


    }, [])

    return (
        <div className='vrsInfoAlign'>

            <div>
            <MonthCalendar newDate={newDate} dateMonth={dateMonth}/>
                <PrintEnergy/>
                <button>Печать</button>
            </div>
            <div className='flex'>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}
                             service={"ВРС1"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container">
                    </div>
                    <TableDays data={dataVrs1}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}
                             service={"ВРС2"}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container2">
                    </div>
                    <TableDays data={dataVrs2}/>
                </div>
            </div>
        </div>

    )
}

function EnergyWater() {

    return (
        <div>

            <MenuEnergy select="water"/>

            <VrsInfo/>


        </div>


    )
}