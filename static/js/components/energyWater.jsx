function FormExcel(printTable) {

    let data = printTable
    console.log('Формирование 2',data)

    data = {"vrs2":[14.01,16.42,13.51,14.12,0.0,0.0,0.0,0.0,14.72,0.0,15.92,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.97,1.07,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],
        "vrs1":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]}

    let keys = Object.keys(data)

    let table = document.getElementById('printEnergy')

    for(let i=0; i<keys.length; i++){
        table.querySelector('thead').querySelector('tr').appendChild(document.createElement('th')).textContent = keys[i]

        let sum = 0;
        for(let j=0; j<data[keys[i]].length; j++){
            table.querySelector('tbody').querySelectorAll('tr')[j].appendChild(document.createElement('td')).textContent = data[keys[i]][j]
            sum += data[keys[i]][j]
        }
        table.querySelector('tbody').querySelectorAll('tr')[data[keys[i]].length].appendChild(document.createElement('td')).textContent = sum
    }
}

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

    let [printTable, setPrintTable] = useState(0);

    function newDate(dateInput) {
        console.log(dateInput)
        setDateMonth(dateInput)
        updateLoadData(dateInput)
    }

    function updateLoadData(dateInput) {

        fetch(`/api/energy/vrs/date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setPrintTable(data)
                setDataVrs1(data.vrs1)
                setDataVrs2(data.vrs2)

                highChartEnergy(data.vrs1, "container")
                highChartEnergy(data.vrs2, "container2")
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
                <PrintEnergy dataPrint={printTable}/>
                <button id='printEnergy'
                        onClick={() => {
                            FormExcel(printTable)
                            let table = document.getElementById('printEnergy')
                            TableToExcel.convert(table);
                        }}
                >Печать</button>
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