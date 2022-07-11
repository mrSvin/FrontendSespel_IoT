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

    let [stateButtonUpdate, setStateButtonUpdate] = useState([false,"buttonUpdateMonth"])
    let timeout=null;

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

            fetch(`/api/energy/electro/date:${dateMonth}`, {method: 'GET'})
                .then((response) => response.json())
                .then((data) => {
                    setDataVrs1(data[0].ktp400)
                    setDataVrs2(data[0].ktp630_2)
                    setDataVrs3(data[0].ktp630_3)
                    setDataVrs4(data[0].ktp630_4)
                    setDataVrs5(data[0].ktp630_5)
                    setDataVrs6(data[0].ktp2500)
                    setDataVrs7(data[0].ktp630_7)
                    highChartData(data[0].ktp400, "container")
                    highChartData(data[0].ktp630_2, "container2")
                    highChartData(data[0].ktp630_3, "container3")
                    highChartData(data[0].ktp630_4, "container4")
                    highChartData(data[0].ktp630_5, "container5")
                    highChartData(data[0].ktp2500, "container6")
                    highChartData(data[0].ktp630_7, "container7")
                })
        }

        setStateButtonUpdate([true,"buttonUpdateMonth load"])
        timeout= setTimeout(disabledButton, 1000)


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
                    text: 'Расход энергии по дням',
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
                        text: 'кВт/ч',
                        style: {
                            color: '#FFF'
                        }
                    }
                },
                tooltip: {
                    valueSuffix: ' кВт/ч'
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
        let monthNow = new Date().getMonth()+1
        if (monthNow<10) {
            monthNow = '0' + monthNow
        }

        fetch(`/api/energy/electro/date:${yearNow}-${monthNow}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                setDataVrs1(data[0].ktp400)
                setDataVrs2(data[0].ktp630_2)
                setDataVrs3(data[0].ktp630_3)
                setDataVrs4(data[0].ktp630_4)
                setDataVrs5(data[0].ktp630_5)
                setDataVrs6(data[0].ktp2500)
                setDataVrs7(data[0].ktp630_7)
                highChartData(data[0].ktp400, "container")
                highChartData(data[0].ktp630_2, "container2")
                highChartData(data[0].ktp630_3, "container3")
                highChartData(data[0].ktp630_4, "container4")
                highChartData(data[0].ktp630_5, "container5")
                highChartData(data[0].ktp2500, "container6")
                highChartData(data[0].ktp630_7, "container7")
            })


    }, [])

    return (
        <div className='vrsInfoAlign'>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate = {stateButtonUpdate}/>

            <div>
                <ComplexInfo complexName={complexName[0]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs1} />
                <div className="vrsHighChart" id="container">
                </div>
                <TableDays data={dataVrs1}/>
            </div>

            <div>
                <ComplexInfo complexName={complexName[1]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs2} />
                <div className="vrsHighChart" id="container2">
                </div>
                <TableDays data={dataVrs2}/>
            </div>

            <div>
                <ComplexInfo complexName={complexName[2]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs3} />
                <div className="vrsHighChart" id="container3">
                </div>
                <TableDays data={dataVrs3}/>
            </div>

            <div>
                <ComplexInfo complexName={complexName[3]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs4} />
                <div className="vrsHighChart" id="container4">
                </div>
                <TableDays data={dataVrs4}/>
            </div>

            <div>
                <ComplexInfo complexName={complexName[4]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs5} />
                <div className="vrsHighChart" id="container5">
                </div>
                <TableDays data={dataVrs5}/>
            </div>

            <div>
                <ComplexInfo complexName={complexName[5]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs6} />
                <div className="vrsHighChart" id="container6">
                </div>
                <TableDays data={dataVrs6}/>
            </div>

            <div>
                <ComplexInfo complexName={complexName[6]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs7} />
                <div className="vrsHighChart" id="container7">
                </div>
                <TableDays data={dataVrs7}/>
            </div>


        </div>

    )
}

function EnergyElectro() {

    return (
        <div>

            <div className="menuButtons">

                <Link to="/energyWater" className="container-home">
                    <div className="menuNoSelect">ВОДОСНАБЖЕНИЕ</div>
                </Link>

                <Link to="/energyGas" className="container-home">
                    <div className="menuNoSelect">ГАЗ</div>
                </Link>

                <Link to="/energyElectro" className="container-home">
                    <div className="menuSelect">ЭЛЕКТРОЭНЕРГИЯ</div>
                </Link>

            </div>

            <ElectroInfo/>

        </div>
    )
}