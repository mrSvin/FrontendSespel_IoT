function LiteykaMonth() {

    let complexName = ["Печь Индукционная"]
    let complexImg = ["../images/pech.png"]

    let buttonsVrs1 = [-80, 608, 'url("../images/nasos.png") 0% 0% / 60px no-repeat', "../images/1_ploshadka_outside.png", 60, "unset"]

    let [dateMonth, setDateMonth] = useState(0);
    let [stateButtonUpdate, setStateButtonUpdate] = useState([false, "buttonUpdateMonth"])
    let timeout = null;

    useEffect(() => {
        let yearNow = new Date().getFullYear()
        let monthNow = new Date().getMonth() + 1
        if (monthNow < 10) {
            monthNow = '0' + monthNow
        }

        let roundKim = fetchHighCharts('pech_nerg', `${yearNow}-${monthNow}`, 1)

        let promiseDataKim = Promise.resolve(roundKim);

        //Общая загрузка
        promiseDataKim.then(value => {

            let workKimArray = averageMonthdata(value.work.map(Number))
            let pauseKimArray = averageMonthdata(value.pause.map(Number))
            let offKimArray = averageMonthdata(value.off.map(Number))
            let avarKimArray = averageMonthdata(value.avar.map(Number))
            let nagruzkaKimArray = averageMonthdata(value.nagruzka.map(Number))

            highChartTotal(complexName, [workKimArray],
                [pauseKimArray],
                [offKimArray],
                [avarKimArray],
                [nagruzkaKimArray], 'Нагрзука')

            highChartTotalRound(averageMonthdata([workKimArray]), averageMonthdata([pauseKimArray]),
                averageMonthdata([offKimArray]), averageMonthdata([avarKimArray]),
                averageMonthdata([nagruzkaKimArray]), 'Нагрзука')

        })

    }, [])

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

            let roundKim = fetchHighCharts('pech_nerg', `${dateMonth}`, 1)

            let promiseDataKim = Promise.resolve(roundKim);

            //Общая загрузка
            promiseDataKim.then(value => {

                let workKimArray = averageMonthdata(value.work.map(Number))
                let pauseKimArray = averageMonthdata(value.pause.map(Number))
                let offKimArray = averageMonthdata(value.off.map(Number))
                let avarKimArray = averageMonthdata(value.avar.map(Number))
                let nagruzkaKimArray = averageMonthdata(value.nagruzka.map(Number))

                highChartTotal(complexName, [workKimArray],
                    [pauseKimArray],
                    [offKimArray],
                    [avarKimArray],
                    [nagruzkaKimArray], 'Нагрзука')

                highChartTotalRound(averageMonthdata([workKimArray]), averageMonthdata([pauseKimArray]),
                    averageMonthdata([offKimArray]), averageMonthdata([avarKimArray]),
                    averageMonthdata([nagruzkaKimArray]), 'Нагрзука')

            })

        }

        setStateButtonUpdate([true, "buttonUpdateMonth load"])
        timeout = setTimeout(disabledButton, 1000)

    }

    function fetchHighCharts(complexName, dateInput, idContainer) {
        return fetch(`../api/monthData/${complexName}_month_date:${dateInput}`, {method: 'GET'})
            .then((response) => response.json())
            .then((data) => {
                highChartMonthLine(data.work, data.pause, data.off, data.avar, data.nagruzka, idContainer)
                highChartMonthRound(averageMonthdata(data.work), averageMonthdata(data.pause), averageMonthdata(data.off),
                    averageMonthdata(data.avar), averageMonthdata(data.nagruzka), 'Нагрзука', idContainer)
                return data
            })
    }


    function averageMonthdata(inputArray) {
        let sum = inputArray.reduce((a, b) => a + b, 0);
        return (sum / inputArray.length) || 0;

    }

    function highChartMonthLine(arrayWork, arrayPass, arrayFail, arrayAvar, arrayNagruzka, idContainer) {
        Highcharts.setOptions({
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
            }
        });

        Highcharts.chart(`containerLine${idContainer}`, {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Загрузка оборудования по дням',
                style: {
                    color: '#FFF'
                }
            },
            xAxis: {
                title: {
                    text: 'Дни месяца',
                    style: {
                        color: '#FFF'
                    },
                    align: 'high'
                },
                labels: {
                    style: {
                        color: '#FFF'
                    }
                },
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: '%',
                    style: {
                        color: '#FFF'
                    }
                },
                labels: {
                    style: {
                        color: '#FFF'
                    },
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },

            series: [{
                name: 'Авария',
                color: '#e81e1d',
                data: arrayAvar
            }, {
                name: 'Выключен',
                color: '#000000',
                data: arrayFail
            }, {
                name: 'Ожидание',
                color: '#ffea32',
                data: arrayPass
            }, {
                name: 'Нагрзука',
                color: '#207210',
                data: arrayNagruzka
            }, {
                name: 'Работа',
                color: '#38e817',
                data: arrayWork
            }],
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            }
        });
    }

    function highChartMonthRound(work, pass, off, avar, nagruzka, nagruzkaName = 'Нагрузка', idContainer) {
        Highcharts.chart(`containerRound${idContainer}`, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: 'Загрузка оборудования',
                style: {
                    color: '#FFF'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            colors: ['#38e817', '#ffea32', '#000000', '#e81e1d', '#207210'],
            credits: {
                enabled: false
            },
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            },
            series: [{
                type: 'pie',
                name: 'Показатель',
                data: [['Работа', work], ['Включен', pass], ['Выключен', off], ['В аварии', avar], [nagruzkaName, nagruzka]]
            }]
        });
    }

    function highChartTotal(generalDiagramNames, work, pause, off, avar, nagruzka) {

        Highcharts.chart('containerTotal', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Общая загрузка оборудования',
                style: {
                    color: '#FFF'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        fontSize: '18px',
                        color: '#FFF'
                    }
                },
                categories: generalDiagramNames,
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                title: {
                    text: '%'
                },
                labels: {
                    style: {
                        color: '#FFF'
                    },
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.percentage:.1f}%<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            },
            series: [{
                name: 'Авария',
                data: avar,
                color: '#e81e1d'
            }, {
                name: 'Выключен',
                data: off,
                color: '#000000'
            }, {
                name: 'Нагрзука',
                data: nagruzka,
                color: '#207210'
            }, {
                name: 'Ожидание',
                color: '#ffea32',
                data: pause
            }, {
                name: 'Работа',
                color: '#38e817',
                data: work,

            },]
        });

    }

    function highChartTotalRound(work, pass, off, avar, nagruzka, nagruzkaName = 'Нагрузка') {
        Highcharts.chart(`containerRoundTotal`, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: 'Суммарная загрузка оборудования',
                style: {
                    color: '#FFF'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },

            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            colors: ['#38e817', '#ffea32', '#000000', '#e81e1d', '#207210'],
            credits: {
                enabled: false
            },
            legend: {
                itemStyle: {
                    color: '#FFF'
                }
            },
            series: [{
                type: 'pie',
                name: 'Показатель',
                data: [['Работа', work], ['Включен', pass], ['Выключен', off], ['В аварии', avar], [nagruzkaName, nagruzka]]
            }]
        });
    }


    return (
        <div>

            <Header/>

            <MenuStanki menuSelected="liteyka"/>

            <div className="buttons-otchet">

                <Link to="/stanki/liteyka">
                    <div className="menuNoSelect">СУТОЧНЫЙ ОТЧЕТ</div>
                </Link>

                <Link to="/stanki/liteykaMonth">
                    <div className="menuSelect">МЕСЯЧНЫЙ ОТЧЕТ</div>
                </Link>

            </div>

            <MonthCalendar newDate={newDate} updateData={updateData} stateButtonUpdate={stateButtonUpdate}/>

            <div className='complexAllInfo'>
                <div className='totalRound' id="containerTotal"></div>
                <div className="totalRound" id="containerRoundTotal"></div>
            </div>

            <div className='complexAllInfo' id={'containerTotal'}>
                <ComplexInfo complexName={complexName[0]} complexImg={complexImg[0]} complexMesto={buttonsVrs1}/>
                <div className="lineSukiHighChart" id="containerLine1"></div>
                <div className="roundSukiHighChart" id="containerRound1"></div>
            </div>

        </div>
    )
}