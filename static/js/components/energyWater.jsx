const MonthCalendar = ({onClick, dateMonth}) => {

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
            monthsNumber
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
                            <tbody onClick={onClick(`${monthNumber}-${year}`)}>
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

        </div>


    )
}

function VrsInfo() {

    let [dateMonth, setDateMonth] = useState(0);

    function newDate(input) {
        useEffect(() => {
            setDateMonth(input)

            if (dateMonth != "0") {
                console.log(dateMonth)

                fetch(`/api/energy/vrs/date:${dateMonth}`, {method: 'GET'})
                    .then((response) => response.json())
                    .then((data) => {
                        highChartData(data[0].vrs1)
                    })
            }
        })
    }


    function highChartData(inputData) {
        Highcharts.chart('container',
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
                highChartData(data[0].vrs1)
            })


    }, [])

    return (
        <div className='VrsInfoAlign'>

            <MonthCalendar onClick={newDate} dateMonth={dateMonth}/>

            <div className="parent_image">

                <img
                    className="stanok_img"
                    src='../images/nasos.png'/>

                <figcaption className="comlexInfo">
                    ВРС1
                </figcaption>

            </div>

            <div className="vrsHighSchart">

                <div>
                    <div
                        id="container"
                    >
                    </div>
                </div>

            </div>

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