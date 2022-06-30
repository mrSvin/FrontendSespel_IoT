//Сутки
function highChartSutkiLine(arrayWork, arrayPause, arrayOff, arrayAvar, arrayRuchnoi, idContainer) {
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
            categories: ['Работа', 'Ожидание', 'Выключен', 'В аварии', 'Ручной'],
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
                name: 'ручной',
                // borderColor: 'gray',
                pointWidth: 30,
                colorByPoint: false,
                color: '#5c7ed0',
                data: arrayRuchnoi,
                dataLabels: {
                    enabled: true
                }
            }
        ],
        legend: {
            itemStyle: {
                color: '#FFF'
            }
        }


    });
}

function highChartSutkiRound(work, pass, off, avar, nagruzka, nagruzkaName = 'Нагрузка', idContainer) {

    let colorNagruzka;
    if (nagruzkaName == 'Нагрузка') {
        colorNagruzka = '#207210'
    } else {
        colorNagruzka = '#5c7ed0'
    }

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
        colors: ['#38e817', '#ffea32', '#000000', '#e81e1d', colorNagruzka],
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
            name: 'Ручной',
            data: nagruzka,
            color: '#5c7ed0'
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

function highChartCountOperations(generalDiagramNames, countOperation, countLongOperation) {

    let mariginBottomX;
    if (generalDiagramNames.length>12) {
        mariginBottomX = 0;
    } else {
        mariginBottomX = 20;
    }

    Highcharts.chart('containerOperations', {
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

//Месячный
function highChartMonthLine(arrayWork, arrayPass, arrayFail,  arrayAvar, arrayNagruzka, idContainer) {
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
            name: 'Ручной',
            color: '#5c7ed0',
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
        colors: ['#38e817', '#ffea32', '#000000', '#e81e1d', '#5c7ed0'],
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
            name: 'Ручной',
            data: nagruzka,
            color: '#5c7ed0'
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
        colors: ['#38e817', '#ffea32', '#000000', '#e81e1d', '#5c7ed0'],
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

//Сервис
