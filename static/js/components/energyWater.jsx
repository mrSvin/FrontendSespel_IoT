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
                <td>Кубов</td>
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

const MonthCalendar = ({newDate, updateData}) => {

    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const monthsNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let [month, setMonth] = useState(months[new Date().getMonth()]);
    let [year, setYear] = useState(new Date().getFullYear());
    let [monthNumber, setMonthNumber] = useState(monthsNumber[new Date().getMonth()]);
    const [dropDown, setDropdown] = useState("none");

    function changeYear(e, param) {
        if (param == "-") {
            year--
            setYear(year)
        } else {
            year++
            setYear(year)
        }
    }

    function changeBackground(month) {
        for (var i = 0; i < months.length; i++) {
            document.getElementById(months[i]).style.backgroundColor = 'white'
        }
        document.getElementById(month).style.backgroundColor = 'red'
    }

    function changeMonth(e, param) {
        if (param == "янв") {
            setMonth("Январь")
            setMonthNumber("01")
            changeBackground("Январь")
            setDropdown("none")

        }
        if (param == "фев") {
            setMonth("Февраль")
            setMonthNumber("02")
            changeBackground("Февраль")
            setDropdown("none")
        }
        if (param == "мар") {
            setMonth("Март")
            setMonthNumber("03")
            changeBackground("Март")
            setDropdown("none")
        }
        if (param == "апр") {
            setMonth("Апрель")
            setMonthNumber("04")
            changeBackground("Апрель")
            setDropdown("none")
        }
        if (param == "май") {
            setMonth("Май")
            setMonthNumber("05")
            changeBackground("Май")
            setDropdown("none")
        }
        if (param == "июн") {
            setMonth("Июнь")
            setMonthNumber("06")
            changeBackground("Июнь")
            setDropdown("none")
        }
        if (param == "июл") {
            setMonth("Июль")
            setMonthNumber("07")
            changeBackground("Июль")
            setDropdown("none")
        }
        if (param == "авг") {
            setMonth("Август")
            setMonthNumber("08")
            changeBackground("Август")
            setDropdown("none")
        }
        if (param == "сен") {
            setMonth("Сентябрь")
            setMonthNumber("09")
            changeBackground("Сентябрь")
            setDropdown("none")
        }
        if (param == "окт") {
            setMonth("Октябрь")
            setMonthNumber("10")
            changeBackground("Октябрь")
            setDropdown("none")
        }
        if (param == "ноя") {
            setMonth("Ноябрь")
            setMonthNumber("11")
            changeBackground("Ноябрь")
            setDropdown("none")
        }
        if (param == "дек") {
            setMonth("Декабрь")
            setMonthNumber("12")
            changeBackground("Декабрь")
            setDropdown("none")
        }

    }

    function changeDropdown() {
        dropDown == "none" ? setDropdown("block") : setDropdown("none")
        changeBackground(month)
    }

    //Закрытие dropdown на клик вне поля
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, dropDown, setDropdown);

    return (
        <div className="energyCalendarContainer">

            <h1 className="infoChange">Выберете месяц:</h1>

            <div className="calendarMonthForm">
                <input
                    className="inputCalendarMonth"
                    type='text'
                    ref={wrapperRef}
                    onClick={changeDropdown}
                    value={`${month} ${year}`}
                    onChange={e => e.target.value}
                />

                <div
                    className="master-container"
                    style={{display: dropDown}}
                    ref={wrapperRef}
                >
                    <div className="year">
                        <div>
                            <a className="prev"
                               onClick={(e) => {
                                   changeYear(e, "-")
                               }}
                            > « </a>
                            <b id="year">{year}</b>
                            <a className="forw"
                               onClick={(e) => {
                                   changeYear(e, "+")
                               }}
                            > » </a>
                        </div>
                        <div id="month">{month}</div>
                    </div>

                    <div className="months">
                        <table className="calendarMonth">
                            <tbody onClick={newDate(`${year}-${monthNumber}`)}>
                            <tr>
                                <td
                                    className="tdMonth"
                                    id='Январь'
                                    onClick={(e) => {
                                        changeMonth(e, "янв")
                                    }}
                                >Янв
                                </td>
                                <td
                                    className="tdMonth"
                                    id='Февраль'
                                    onClick={(e) => {
                                        changeMonth(e, "фев")
                                    }}
                                >Фев
                                </td>
                                <td className="tdMonth"
                                    id='Март'
                                    onClick={(e) => {
                                        changeMonth(e, "мар")
                                    }}
                                >Мар
                                </td>
                                <td className="tdMonth"
                                    id='Апрель'
                                    onClick={(e) => {
                                        changeMonth(e, "апр")
                                    }}
                                >Апр
                                </td>
                            </tr>
                            <tr>
                                <td className="tdMonth"
                                    id='Май'
                                    onClick={(e) => {
                                        changeMonth(e, "май")
                                    }}
                                >Май
                                </td>
                                <td className="tdMonth"
                                    id='Июнь'
                                    onClick={(e) => {
                                        changeMonth(e, "июн")
                                    }}
                                >Июн
                                </td>
                                <td className="tdMonth"
                                    id='Июль'
                                    onClick={(e) => {
                                        changeMonth(e, "июл")
                                    }}
                                >Июл
                                </td>
                                <td className="tdMonth"
                                    id='Август'
                                    onClick={(e) => {
                                        changeMonth(e, "авг")
                                    }}
                                >Авг
                                </td>
                            </tr>
                            <tr>
                                <td className="tdMonth"
                                    id='Сентябрь'
                                    onClick={(e) => {
                                        changeMonth(e, "сен")
                                    }}
                                >Сен
                                </td>
                                <td className="tdMonth"
                                    id='Октябрь'
                                    onClick={(e) => {
                                        changeMonth(e, "окт")
                                    }}
                                >Окт
                                </td>
                                <td className="tdMonth"
                                    id='Ноябрь'
                                    onClick={(e) => {
                                        changeMonth(e, "ноя")
                                    }}
                                >Ноя
                                </td>
                                <td className="tdMonth"
                                    id='Декабрь'
                                    onClick={(e) => {
                                        changeMonth(e, "дек")
                                    }}
                                >Дек
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

            <UpdateData updateData={updateData}/>

        </div>


    )
}

function ComplexInfo({complexName, complexImg, complexMesto}) {



    return (
        <div className="parent_image">

            <img
                className="stanok_img"
                src={complexImg}/>

            <figcaption className="comlexInfo">
                {complexName}
            </figcaption>

            <ComplexButtons complexMesto ={complexMesto}/>

        </div>
    )
}

function ComplexButtons({complexMesto}) {

    let mesto = (parameter) => (event) => {

        window.localStorage['mestoParams'] = parameter
        window.open("../mesto/mestoNew", '', 'scrollbars=1,height='+Math.min(1000, screen.availHeight)+
            ',width='+Math.min(1002, screen.availWidth))
    }

    return (

        <div className='parentIcons'>
            <a className="icon_mesto"
               onClick={mesto(complexMesto)}>
                <div className="label_mesto">Место</div>
            </a>
            <a className="icon_personal"
               href="../personal/personal_vrs"
            >
                <div className="label_personal">Персонал</div>
            </a>
        </div>

    )
}

function VrsInfo() {

    let [dateMonth, setDateMonth] = useState(0);
    let complexName = ["ВРС1", "ВРС2"]
    let complexImg = ["../images/nasos.png", "../images/nasos_vrs2.png"]

    let buttonsVrs1 = [-80,608,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/1_ploshadka_outside.png",60,"unset"]
    let buttonsVrs2 = [-1000,308,'url("../images/nasos.png") 0% 0% / 60px no-repeat',"../images/2_ploshadka_outside.png",60,"unset"]

    let [dataVrs1, setDataVrs1] = useState(0);
    let [dataVrs2, setDataVrs2] = useState(0);

    function newDate(input) {
        useEffect(() => {
            setDateMonth(input)


        })
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

        fetch('/api/energy/vrs/date:06-2022', {method: 'GET'})
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

            <MonthCalendar newDate={newDate} updateData={updateData}/>

            <div>
                <ComplexInfo complexName={complexName[0]} complexImg ={complexImg[0]} complexMesto = {buttonsVrs1} />
                <div className="vrsHighChart" id="container">
                </div>
                <TableDays data={dataVrs1}/>
            </div>

            <div>
                <ComplexInfo complexName={complexName[1]} complexImg ={complexImg[1]} complexMesto = {buttonsVrs2} />
                <div className="vrsHighChart" id="container2">
                </div>
                <TableDays data={dataVrs2}/>
            </div>
        </div>

    )
}

const UpdateData = ({updateData}) => {
    function buttonLoaded() {
        document.getElementsByClassName('buttonUpdateMonth')[0].setAttribute('disabled', null)
        document.getElementsByClassName('buttonUpdateMonth')[0].classList.remove('load')
        console.log(timeOut)
        clearInterval(timeOut)
    }


    function buttonLoading() {
        document.getElementsByClassName('buttonUpdateMonth')[0].setAttribute('disabled', 'true')
        document.getElementsByClassName('buttonUpdateMonth')[0].classList.add('load')
        timeOut = setTimeout(buttonLoaded,500)
    }

    let timeOut = null

    return (

        <div>
            <button
                className="buttonUpdateMonth"
                onClick={function(event){ updateData(); buttonLoading()}}
            >
                <span>Обновить</span>
            </button>
        </div>

    )

}

function EnergyWater() {

    return (
        <div>

            <Header/>

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