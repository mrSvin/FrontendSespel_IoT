//Сутки
function highChartSutkiLine(arrayWork, arrayPause, arrayOff, arrayAvar, arrayRuchnoi, nagruzkaName = 'Нагрузка', idContainer) {

    let colorNagruzka;
    if (nagruzkaName == 'Нагрузка') {
        colorNagruzka = '#207210'
    } else {
        colorNagruzka = '#5c7ed0'
    }


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
            viewFullscreen: 'На весь экран',

            downloadCSV: "Скачать CSV",
            downloadXLS: "Скачать XLS",
            viewData: 'Режим таблицы',
            hideData: "Скрыть таблицу"
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
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange'
        },
        title: {
            text: 'Работа оборудования',
            style: {
                color: '#FFF'
            }
        },
        colors: ['#e81e1d', '#000000', '#ffea32', '#207210', '#38e817'],


        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#FFF'
                }
            },
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: [nagruzkaName, 'Работа', 'Ожидание', 'Выключен', 'В аварии'],
            reversed: true,
            labels: {
                style: {
                    color: '#FFF'
                },
            }
        },
        credits: {
            enabled: false
        },

        series: [
            {
                name: 'Работа',
                // borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#38e817',
                tooltip: {
                    pointFormat: '<b>Программа: {point.programname}</b>'
                },
                data: arrayWork,
            },
            {
                name: 'Ожидание',
                // borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#ffea32',
                tooltip: {
                    pointFormat: ''
                },
                data: arrayPause,
                dataLabels: {
                    enabled: true
                }
            },
            {
                name: 'Выключен',
                // borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#000000',
                data: arrayOff,
                dataLabels: {
                    enabled: true,
                }
            },
            {
                name: 'В аварии',
                // borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#e81e1d',
                data: arrayAvar,
                dataLabels: {
                    enabled: true
                }
            },
            {
                name: nagruzkaName,
                // borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: colorNagruzka,
                data: arrayRuchnoi,
                dataLabels: {
                    enabled: true
                }
            },
        ],
        legend: {
            itemStyle: {
                color: '#FFF'
            }
        }


    });
}

function highChartCountOperations(generalDiagramNames, countOperation, countLongOperation, chartName = '') {

    let mariginBottomX;
    if (generalDiagramNames.length > 12) {
        mariginBottomX = 0;
    } else {
        mariginBottomX = 20;
    }

    Highcharts.chart(`containerOperations${chartName}`, {
        chart: {
            type: 'bar',
            marginLeft: 110,
            marginBottom: mariginBottomX
        },
        title: {
            text: 'Количество операций',
            style: {
                color: '#FFF'
            }
        },
        xAxis: {
            labels: {
                style: {

                    color: '#FFF'
                }
            },
            categories: generalDiagramNames,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Количество',
                style: {
                    color: '#FFF'
                },
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                style: {
                    color: '#FFF'
                }
            }
        },
        tooltip: {
            valueSuffix: ' операций'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            itemStyle: {
                color: '#FFF'
            }
        },
        series: [{
            name: 'Общее количество операций',
            data: countOperation,
        }, {
            name: 'Количество операций более 3 минут',
            data: countLongOperation,
        }]
    });
}

function highChartEnergy(inputData, containerName, message = 'кубов') {
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
                text: 'Расход',
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
                    text: message,
                    style: {
                        color: '#FFF'
                    }
                }
            },
            tooltip: {
                valueSuffix: ' ' + message,
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

//Месячный
function highChartMonthLine(arrayWork, arrayPass, arrayFail, arrayAvar, arrayNagruzka, nagruzkaName = 'Нагрузка', idContainer) {

    let colorNagruzka;
    let workNoNagruzka = arrayWork.slice();
    if (nagruzkaName == 'Нагрузка') {
        colorNagruzka = '#207210'

        for (var i = 0; i < arrayWork.length; i++) {
            workNoNagruzka[i] = workNoNagruzka[i] - arrayNagruzka[i]
        }

    } else {
        colorNagruzka = '#5c7ed0'
    }

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
            viewFullscreen: 'На весь экран',

            downloadCSV: "Скачать CSV",
            downloadXLS: "Скачать XLS",
            viewData: 'Режим таблицы',
            hideData: "Скрыть таблицу"
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
            name: nagruzkaName,
            color: colorNagruzka,
            data: arrayNagruzka
        }, {
            name: 'Работа',
            color: '#38e817',
            data: workNoNagruzka
        }],
        legend: {
            itemStyle: {
                color: '#FFF'
            }
        }
    });
}

//Суточный и месячный
function highChartTotal(generalDiagramNames, work, pause, off, avar, nagruzka, fetchNames, date = 24, chartName = '') {

    work = Array.isArray(work) ? work : [work]
    pause = Array.isArray(pause) ? pause : [pause]
    off = Array.isArray(off) ? off : [off]
    avar = Array.isArray(avar) ? avar : [avar]
    nagruzka = Array.isArray(nagruzka) ? nagruzka : [nagruzka]

    work = work.map(e => {
        if (typeof (e) === "undefined") {
            return 0;
        } else return e
    })

    pause = pause.map(e => {
        if (typeof (e) === "undefined") {
            return 0;
        } else return e
    })

    off = off.map(e => {
        if (typeof (e) === "undefined") {
            return 0;
        } else return e
    })

    avar = avar.map(e => {
        if (typeof (e) === "undefined") {
            return 0;
        } else return e
    })

    nagruzka = nagruzka.map(e => {
        if (typeof (e) === "undefined") {
            return 0;
        } else return e
    })

    let colorNagruzka;
    let workNoNagruzka = work.slice();

    let ruchoi = null

    let seriesArray = [{
        name: 'Авария',
        data: avar,
        color: '#e81e1d'
    }, {
        name: 'Выключен',
        data: off,
        color: '#000000'
    }, {
        name: 'Ожидание',
        color: '#ffea32',
        data: pause
    }, {
        name: 'Нагрузка',
        data: nagruzka,
        color: '#207210'
    }, {
        name: 'Работа',
        color: '#38e817',
        data: workNoNagruzka

    },]

    if (fetchNames.includes('Ручной')) {
        ruchoi = []
        fetchNames.forEach((e, i) => {
            if (e == 'Ручной') {
                ruchoi.push(nagruzka[i])
                nagruzka[i] = 0
            } else {
                ruchoi.push(0)
            }
        })

        seriesArray.splice(4, 0, {
            name: 'Ручной',
            color: '#5c7ed0',
            data: ruchoi

        })
    }

    fetchNames.forEach((e, i) => {
        if (e == 'Нагрузка') {
            workNoNagruzka[i] = workNoNagruzka[i] - nagruzka[i]
        }
    })


    if (fetchNames == 'Нагрузка') {
        colorNagruzka = '#207210'
        for (var i = 0; i < work.length - 1; i++) {
            workNoNagruzka[i] = workNoNagruzka[i] - nagruzka[i]
        }
    }

    // Данные для
    let graphData = highchartsPercentTime(generalDiagramNames, workNoNagruzka, pause, off, avar, nagruzka, ruchoi, date)

    Highcharts.chart(`containerTotal${chartName}`, {
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
            pointFormatter: function () {
                if (ruchoi == null) {
                    return `<span style="color: #e81e1d;">Авария</span>: ${graphData[this.index][0][3]}%   <b>${graphData[this.index][1][3]}</b><br/>` +
                        `<span style="color: #000000;">Выключен</span>: ${graphData[this.index][0][2]}%   <b>${graphData[this.index][1][2]}</b><br/>` +
                        `<span style="color: #ffea32;">Ожидание</span>: ${graphData[this.index][0][1]}%   <b>${graphData[this.index][1][1]}</b><br/>` +
                        `<span style="color: #207210;">Нагрузка</span>: ${graphData[this.index][0][4]}%   <b>${graphData[this.index][1][4]}</b><br/>` +
                        `<span style="color: #38e817;">Работа</span>: ${graphData[this.index][0][0]}%   <b>${graphData[this.index][1][0]}</b><br/>`
                } else {
                    return `<span style="color: #e81e1d;">Авария</span>: ${graphData[this.index][0][3]}%   <b>${graphData[this.index][1][3]}</b><br/>` +
                        `<span style="color: #000000;">Выключен</span>: ${graphData[this.index][0][2]}%   <b>${graphData[this.index][1][2]}</b><br/>` +
                        `<span style="color: #ffea32;">Ожидание</span>: ${graphData[this.index][0][1]}%   <b>${graphData[this.index][1][1]}</b><br/>` +
                        `<span style="color: #207210;">Нагрузка</span>: ${graphData[this.index][0][4]}%   <b>${graphData[this.index][1][4]}</b><br/>` +
                        `<span style="color: #5c7ed0;">Ручной</span>: ${graphData[this.index][0][5]}%   <b>${graphData[this.index][1][5]}</b><br/>` +
                        `<span style="color: #38e817;">Работа</span>: ${graphData[this.index][0][0]}%   <b>${graphData[this.index][1][0]}</b><br/>`
                }
            },
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
        series: seriesArray
    });

}

function highChartSmenaTotalKolOp(total, kolOp, complexName, day1, nagruzkaName) {

    // переменные для переформирования данных 2-х смен
    let work = [[], [],]
    let pause = [[], [],]
    let off = [[], [],]
    let avar = [[], [],]
    let nagruzka = [[], [],]

    let shortOp = [[], [],]
    let longOp = [[], [],]

    // переформирования данных
    total.forEach((e, i) => {
        if (!Array.isArray(e) || e.includes(undefined)) {
            work[i % 2].push(0)
            pause[i % 2].push(0)
            off[i % 2].push(0)
            avar[i % 2].push(0)
            nagruzka[i % 2].push(0)
        } else {
            work[i % 2].push(e[0])
            pause[i % 2].push(e[1])
            off[i % 2].push(e[2])
            avar[i % 2].push(e[3])
            nagruzka[i % 2].push(e[4])
        }
    })

    kolOp.forEach((e, i) => {
        if (!Array.isArray(e) || e.includes(undefined)) {
            shortOp[i % 2].push(0)
            longOp[i % 2].push(0)
        } else {
            shortOp[i % 2].push(e[0])
            longOp[i % 2].push(e[1])
        }
    })

    // вторая смена, всегда за предыдущий день, date всегда 12 часов
    highChartTotal(complexName, work[0], pause[0], off[0], avar[0], nagruzka[0], nagruzkaName, 12)
    highChartCountOperations(complexName, shortOp[0], longOp[0])

    // первая смена в date передается текущая дата с календаря
    highChartTotal(complexName, work[1], pause[1], off[1], avar[1], nagruzka[1], nagruzkaName, day1, '2')
    highChartCountOperations(complexName, shortOp[1], longOp[1], '2')
}

function highChartTotalKolOp(total, kolOp, complexName, day1, nagruzkaName) {

    // переменные для переформирования данных 2-х смен
    let work = []
    let pause = []
    let off = []
    let avar = []
    let nagruzka = []

    let shortOp = []
    let longOp = []

    // переформирования данных
    total.forEach((e, i) => {
        if (!Array.isArray(e) || e.includes(undefined)) {
            work.push(0)
            pause.push(0)
            off.push(0)
            avar.push(0)
            nagruzka.push(0)
        } else {
            e = e.map(Number)
            work.push(e[0])
            pause.push(e[1])
            off.push(e[2])
            avar.push(e[3])
            nagruzka.push(e[4])
        }
    })

    kolOp.forEach((e, i) => {
        if (!Array.isArray(e) || e.includes(undefined)) {
            shortOp.push(0)
            longOp.push(0)
        } else {
            e = e.map(Number)
            shortOp.push(e[0])
            longOp.push(e[1])
        }
    })

    // вторая смена, всегда за предыдущий день, date всегда 12 часов
    highChartTotal(complexName, work, pause, off, avar, nagruzka, nagruzkaName, day1)
    highChartCountOperations(complexName, shortOp, longOp)
}

function highChartRound(work, pass, off, avar, nagruzka, nagruzkaName = 'Нагрузка', idContainer) {

    let colorNagruzka
    let workNoNagruzka
    let colorArray
    let seriesArray

    let titleInfo
    if (idContainer == 'Total') {
        titleInfo = 'Суммарная загрузка оборудования'

        let ruchnoi = []
        nagruzkaName.forEach((e, i) => {
            if (e == 'Ручной')
                ruchnoi.push(nagruzka.splice(1, i)[0])
        })

        nagruzka = averageMonthdata(nagruzka)
        ruchnoi = averageMonthdata(ruchnoi)

        workNoNagruzka = work - nagruzka
        seriesArray = [{
            type: 'pie',
            name: 'Показатель',
            data: [['Работа', workNoNagruzka], ['Ожидание', pass], ['Выключен', off], ['В аварии', avar], ['Нагрузка', nagruzka]]
        }]
        colorArray = ['#38e817', '#ffea32', '#000000', '#e81e1d', '#207210']
        if (nagruzkaName.includes('Ручной')) {
            seriesArray[0].data.push(['Ручной', ruchnoi])
            colorArray.push('#5c7ed0')
        }
    } else {
        titleInfo = 'Загрузка оборудования'
        if (nagruzkaName == 'Нагрузка') {
            colorNagruzka = '#207210'
            workNoNagruzka = work - nagruzka
        } else {
            colorNagruzka = '#5c7ed0'
            workNoNagruzka = work
        }
        colorArray = ['#38e817', '#ffea32', '#000000', '#e81e1d', colorNagruzka]
        seriesArray = [{
            type: 'pie',
            name: 'Показатель',
            data: [['Работа', workNoNagruzka], ['Ожидание', pass], ['Выключен', off], ['В аварии', avar], [nagruzkaName, nagruzka]]
        }]
    }

    Highcharts.chart(`containerRound${idContainer}`, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },

        title: {
            text: titleInfo,
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
        colors: colorArray,
        credits: {
            enabled: false
        },
        legend: {
            itemStyle: {
                color: '#FFF'
            }
        },
        series: seriesArray
    });
}

//Сервис
function highChartServiceHistory(ArrayTeh, info = null) {
    // Копирования массива со всеми тех. обслуживаниями
    let arrayTeh = ArrayTeh.slice()

    let chet = []
    let nechet = []

    //Массив со всеми тех. обслуживаниями.
    arrayTeh = parseLinearServiceHistory(arrayTeh, 0, info)

    arrayTeh.forEach((e, i) => {
        if (i % 2 == 0) chet.push(e)
        else nechet.push(e)
    })

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
            viewFullscreen: 'На весь экран',

            downloadCSV: "Скачать CSV",
            downloadXLS: "Скачать XLS",
            viewData: 'Режим таблицы',
            hideData: "Скрыть таблицу"
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

    Highcharts.chart('allService', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange'
        },
        title: {
            text: 'История проведенных тех. обслуживаний',
            style: {
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: '22px',
            }
        },

        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#FFF'
                }
            },
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: ['Время'],
            reversed: true,
            labels: {
                style: {
                    color: '#FFF'
                },
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },

        series: [
            {
                name: 'Обслуживания',
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#d8e523',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTimeDays(this.x2 - this.x, 365)
                        return '<b>Времени между обслуживанием:</b> ' + timer +
                            '<br>' + '<b>Ответственный:</b> ' + this.login +
                            '<br>' + '<b>Проведенные работы:</b> ' + this.work;
                    },
                },
                data: chet,
            },
            {
                name: 'Обслуживания',
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#76d739',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTimeDays(this.x2 - this.x, 365)
                        return '<b>Времени между обслуживанием:</b> ' + timer +
                            '<br>' + '<b>Ответственный:</b> ' + this.login +
                            '<br>' + '<b>Проведенные работы:</b> ' + this.work;
                    },
                },
                data: nechet,
            },
        ],

    });
}

function highChartServiceNow(ArrayTeh, timeNext = null) {
    if (timeNext == undefined) {
        return
    }

    timeNext *= 1000
    let timeToday = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
    // Преобразоавние времение в формат '2022-03-21 10:00:35'
    timeToday = timeToday.slice(0, 10) + " " + timeToday.slice(11, 19);

    // Дата последнего обслуживания
    let lastServiceTime = new Date(ArrayTeh[0])

    // Крайняя дата следующего обслуживания
    let nextServiceTime = new Date(lastServiceTime.getTime() + timeNext)

    // Время последнего обслуживания в формате ISO
    let lastServiceIso = new Date(new Date(lastServiceTime).toString().split('GMT')[0] + ' UTC').toISOString();
    // Время следующего запланированного обслуживания в формате ISO
    let nextServiceIso = new Date(new Date(nextServiceTime).toString().split('GMT')[0] + ' UTC').toISOString();

    lastServiceIso = lastServiceIso.slice(0, 10) + " " + lastServiceIso.slice(11, 19);
    nextServiceIso = nextServiceIso.slice(0, 10) + " " + nextServiceIso.slice(11, 19);

    // Массив со временем последнего обслуживания и запланированным временем.
    let timePastArray = [lastServiceIso, nextServiceIso]

    // Переменная отображающаяся на графики планируемого обслуживания.
    let percent = +((new Date(timeToday).getTime() - new Date(lastServiceIso).getTime()) / timeNext).toFixed(2)

    timePastArray = parseLinearServiceNow(timePastArray, 0, percent)

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
            viewFullscreen: 'На весь экран',

            downloadCSV: "Скачать CSV",
            downloadXLS: "Скачать XLS",
            viewData: 'Режим таблицы',
            hideData: "Скрыть таблицу"
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

    Highcharts.chart('timeToLastService', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange'
        },
        title: {
            text: 'Текущее состояние до следующего тех обслуживания',
            style: {
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: '22px',
            }
        },

        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#FFF'
                }
            },
        },
        yAxis: {
            title: {
                text: '',
            },
            categories: ['Время'],
            reversed: true,
            labels: {
                style: {
                    color: '#FFF'
                },
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },

        series: [
            {
                name: 'Прошло времени',
                borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#3c61da',
                tooltip: {
                    pointFormatter: function () {
                        let timer = msToTimeDays(this.x2 - this.x)

                        let TodayTime = (new Date(timeToday)).getTime()

                        let pastTime = msToTimeDays(TodayTime - this.x + 10000, 365)
                        //let per = this.partialFill

                        let leftTime = msToTimeDays(this.x2 - TodayTime, 365)

                        return '<b>Прошло:</b> ' + pastTime + '<br>' +
                            '<b>Осталось:</b> ' + leftTime;
                    },
                    pointFormat: '<b>Прошло времени: {timer}</b>'
                },
                data: timePastArray,
                dataLabels: {
                    enabled: true
                }
            },
        ]
    });
}

function highChartProgram(arrayProgram, idContainer = 1) {

    let arrayTeh = arrayProgram.slice()
    let chet = []
    let nechet = []

    arrayTeh.forEach((e, i) => {
        if (i % 2 == 0) chet.push(e)
        else nechet.push(e)
    })

    let meries = arrayTeh.map((e, i) => {
        return {
            name: `Программа ${i + 1}`,
            borderColor: 'white',
            pointWidth: 30,
            colorByPoint: false,
            color: "#" + ((1 << 24) * Math.random() | 0).toString(16),
            tooltip: {
                pointFormatter: function () {
                    let timer = msToTimeDays(this.x2 - this.x, 365)
                    return '<b>Программа:</b> ' + this.partialFill + '<br>' +
                        '<b>Длительность</b> ' + timer
                },
            },
            data: [e],
        }
    })

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
            viewFullscreen: 'На весь экран',

            downloadCSV: "Скачать CSV",
            downloadXLS: "Скачать XLS",
            viewData: 'Режим таблицы',
            hideData: "Скрыть таблицу"
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

    Highcharts.chart(`containerProgram${idContainer}`, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange'
        },
        title: {
            text: 'Программы',
            style: {
                color: '#FFF'
            }
        },

        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#FFF'
                }
            },
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: ['Программы'],
            reversed: true,
            labels: {
                style: {
                    color: '#FFF'
                },
            }
        },
        credits: {
            enabled: false
        },

        legend: {
            enabled: false
        },
        series: meries,


    });

}

function highChartScud(series, generalDiagramNames) {
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
            viewFullscreen: 'На весь экран',

            downloadCSV: "Скачать CSV",
            downloadXLS: "Скачать XLS",
            viewData: 'Режим таблицы',
            hideData: "Скрыть таблицу"
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

    Highcharts.chart('containerScud', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange',
            marginLeft: 400,
            align: 'left',
        },
        title: {
            text: 'Рабочее время',
            style: {
                color: '#FFF'
            }
        },

        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#FFF'
                }
            },
        },
        yAxis: {
            title: {
                text: '',
            },
            categories: generalDiagramNames,
            reversed: true,
            labels: {
                useHTML: true,
                allowOverlap: true,
                // align: 'left',
                step: 1,
                style: {
                    color: '#f0f8ff',
                    fontWeight: 'bolder',
                    fontSize: '12px',
                    // wordBreak: 'break-all',
                    align: 'left',
                    minWidth: '380px',
                }
            },
        },
        credits: {
            enabled: false
        },

        series: series,
        legend: {
            enabled: false
        },

    });
}

function highChartScudBot(series, generalDiagramNames) {
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
            viewFullscreen: 'На весь экран',

            downloadCSV: "Скачать CSV",
            downloadXLS: "Скачать XLS",
            viewData: 'Режим таблицы',
            hideData: "Скрыть таблицу"
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

    Highcharts.chart('containerScud', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            plotBorderColor: 'gray',
            type: 'xrange',
            marginLeft: 900,
            align: 'left',
        },
        title: {
            text: 'Рабочее время',
            style: {
                color: '#FFF'
            }
        },

        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    color: '#FFF'
                }
            },
        },
        yAxis: {
            title: {
                text: '',
            },
            categories: generalDiagramNames,
            reversed: true,
            labels: {
                useHTML: true,
                allowOverlap: true,
                // align: 'left',
                step: 1,
                style: {
                    color: '#f0f8ff',
                    fontWeight: 'bolder',
                    fontSize: '20px',
                    // wordBreak: 'break-word',
                    // align: 'left',
                    minWidth: '880px',
                    borderTop: '1px solid',
                    // borderBottom: '1px solid',
                    top: '53px',
                    paddingBottom: '9px',
                    paddingTop: '8.5px',
                }
            },
        },
        credits: {
            enabled: false
        },

        series: series,
        legend: {
            enabled: false
        },

    });
}

