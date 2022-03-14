var colorsMonth = ['#e81e1d','#000000', '#ffea32','#207210','#38e817'];
function setDataLine(containerLine, arrayAvar, arrayFail, arrayPass, arrayNagruzka, arrayWork) {
    Highcharts.chart(containerLine, {
        chart: {
            type: 'column'
        },
        colors: colorsMonth,
        title: {
            text: 'Загрузка оборудования по дням'
        },
        xAxis: {
            title: {
                text: 'Дни месяца',
                align: 'high'
            },
            labels: {
                style: {
                    fontSize: '18px',
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
                text: '%'
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
            data: arrayAvar
        }, {
            name: 'Выключен',
            data: arrayFail
        }, {
            name: 'Ожидание',
            data: arrayPass
        }, {
            name: 'Под нагрузкой',
            data: arrayNagruzka
        }, {
            name: 'Работа',
            data: arrayWork
        }]
    });

}

function setDataRound(containerRound, avar, fail, pass, nagruzka, work) {
    Highcharts.chart(containerRound, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },

        title: {
            text: 'Загрузка оборудования'
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
        colors:colors,
        credits: {
            enabled: false
        },
        series : [ {
            type : 'pie',
            name : 'Показатель',
            data : [[ 'Работа', work ], [ 'Включен', pass ], [ 'Выключен', fail],  [ 'В аварии', avar ], [ 'Нагрузка', nagruzka ] ]
        }]
    });
}