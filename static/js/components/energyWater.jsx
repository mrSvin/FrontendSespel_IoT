function TableDays(data) {


    var total = 0;
    for (var i in data.data) {
        total += data.data[i];
    }
    total = total.toFixed(2)

    return (
        <table className="tableEnergy" id="vrs_1_days"
        >
            <thead>
            <tr>
                <th>Дни</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
                <th>16</th>
                <th>17</th>
                <th>18</th>
                <th>19</th>
                <th>20</th>
                <th>21</th>
                <th>22</th>
                <th>23</th>
                <th>24</th>
                <th>25</th>
                <th>26</th>
                <th>27</th>
                <th>28</th>
                <th>29</th>
                <th>30</th>
                <th>31</th>
                <th>Итого</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Расход</td>
                <td>{data.data[0]}</td>
                <td>{data.data[1]}</td>
                <td>{data.data[2]}</td>
                <td>{data.data[3]}</td>
                <td>{data.data[4]}</td>
                <td>{data.data[5]}</td>
                <td>{data.data[6]}</td>
                <td>{data.data[7]}</td>
                <td>{data.data[8]}</td>
                <td>{data.data[9]}</td>
                <td>{data.data[10]}</td>
                <td>{data.data[11]}</td>
                <td>{data.data[12]}</td>
                <td>{data.data[13]}</td>
                <td>{data.data[14]}</td>
                <td>{data.data[15]}</td>
                <td>{data.data[16]}</td>
                <td>{data.data[17]}</td>
                <td>{data.data[18]}</td>
                <td>{data.data[19]}</td>
                <td>{data.data[20]}</td>
                <td>{data.data[21]}</td>
                <td>{data.data[22]}</td>
                <td>{data.data[23]}</td>
                <td>{data.data[24]}</td>
                <td>{data.data[25]}</td>
                <td>{data.data[26]}</td>
                <td>{data.data[27]}</td>
                <td>{data.data[28]}</td>
                <td>{data.data[29]}</td>
                <td>{data.data[30]}</td>
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

    let [stateButtonUpdate, setStateButtonUpdate] = useState([false, "buttonUpdateMonth"])
    let timeout = null;

    function newDate(input) {
        useEffect(() => {
            setDateMonth(input)
        })
    }

    function disabledButton() {
        setStateButtonUpdate([false, "buttonUpdateMonth"])
        clearInterval(timeout)
    }

    function updateData() {
        if (dateMonth != "0") {
            console.log(dateMonth)

            fetch(`/api/energy/vrs/date:${dateMonth}`, {method: 'GET'})
                .then((response) => response.json())
                .then((data) => {
                    setDataVrs1(data[0].vrs1)
                    setDataVrs2(data[0].vrs2)
                    highChartData(data[0].vrs1, "container")
                    highChartData(data[0].vrs2, "container2")
                })
        }

        setStateButtonUpdate([true, "buttonUpdateMonth load"])
        timeout = setTimeout(disabledButton, 1000)


    }

    function highChartData(inputData, containerName) {
        Highcharts.chart(containerName,
            {
                lang: {
                    loading: 'Загрузка...',
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
                    exportButtonTitle: "Экспорт",
                    printButtonTitle: "Печать",
                    rangeSelectorFrom: "С",
                    rangeSelectorTo: "По",
                    rangeSelectorZoom: "Период",
                    downloadPNG: 'Скачать PNG',
                    downloadJPEG: 'Скачать JPEG',
                    downloadPDF: 'Скачать PDF',
                    downloadSVG: 'Скачать SVG',
                    printChart: 'Напечатать график',
                    viewFullscreen: 'На весь экран'
                },
                plotOptions: {
                    xrange: {
                        grouping: false
                    }
                },
                global: {
                    timezoneOffset: new Date().getTimezoneOffset()
                },

                chart: {
                    type: 'column'
                },
                colors: ['#5c7ed0'],

                title: {
                    text: 'Расход воды по дням',
                    style: {
                        color: '#FFF',
                        fontWeight: 'bold',
                        fontSize: '22px',
                    }
                },
                xAxis: {
                    title: {
                        text: 'Дни месяца',
                        align: 'high',
                        style: {
                            color: '#FFF'
                        }
                    },
                    labels: {
                        style: {
                            color: '#FFF',
                            fontSize: '18px',
                        }
                    },
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                },
                credits: {
                    enabled: false
                },
                yAxis: {
                    labels: {
                        style: {
                            color: '#FFF'
                        },
                    },
                    min: 0,
                    title: {
                        text: 'кубов',
                        style: {
                            color: '#FFF'
                        }
                    }
                },
                tooltip: {
                    valueSuffix: ' кубов'
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                legend: {
                    enabled: false
                },

                series: [{
                    name: 'Расход',
                    data: inputData
                }]
            }
        );
    }

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth() + 1
        if (monthNow < 10) {
            monthNow = '0' + monthNow
        }

        fetch(`/api/energy/vrs/date:${yearNow}-${monthNow}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setDataVrs1(data[0].vrs1)
                setDataVrs2(data[0].vrs2)
                highChartData(data[0].vrs1, "container")
                highChartData(data[0].vrs2, "container2")
            })


    }, [])

    return (
        <div className='vrsInfoAlign'>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate={stateButtonUpdate}/>

            <div className='flex'>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container">
                    </div>
                    <TableDays data={dataVrs1}/>
                </div>
            </div>

            <div className='flex'>
                <ComplexInfo complexName={complexName[1]} complexImg={complexImg[1]} complexMesto={buttonsVrs2}/>
                <div className='energyGraphTable'>
                    <div className="vrsHighChart" id="container2">
                    </div>
                    <TableDays data={dataVrs2}/>
                </div>
            </div>
        </div>

    )
}

const UpdateData = ({updateData, stateButtonUpdate}) => {

    return (

        <div>
            <button
                className={stateButtonUpdate[1]}
                disabled={stateButtonUpdate[0]}
                onClick={updateData}
            >
                <span>Обновить</span>
            </button>
        </div>

    )

}

function EnergyWater() {

    return (
        <div>

            <div className="menuButtons">

                <Link to="/energyWater" className="container-home">
                    <div className="menuSelect">ВОДОСНАБЖЕНИЕ</div>
                </Link>

                <Link to="/energyGas" className="container-home">
                    <div className="menuNoSelect">ГАЗ</div>
                </Link>

                <Link to="/energyElectro" className="container-home">
                    <div className="menuNoSelect">ЭЛЕКТРОЭНЕРГИЯ</div>
                </Link>

            </div>

            <VrsInfo/>


        </div>


    )
}