<!--ar55 линейная диагрмма загрузки оборудования-->
var colors = ['#207210','#38e817', '#ffea32', '#000000', '#e81e1d'];
Highcharts.chart('container_work_9', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        plotBorderColor: 'gray',
        type: 'xrange'
    },
    title: {
        text: 'Работа оборудования'
    },
    colors:colors,


    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: ''
        },
        categories: ['Под нагрузкой', 'Работа', 'Ожидание', 'Выключен', 'В аварии'],
        reversed: true
    },
    credits: {
        enabled: false
    },

    series: [
        {
            name: 'Работа',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#38e817',
            tooltip: {
                pointFormat: '<b>Программа: {point.programname}</b>'
            },
            data: ar55_array_rabota,
        },
        {
            name: 'Ожидание',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#ffea32',
            tooltip: {
                pointFormat: ''
            },
            data: ar55_array_pause,
            dataLabels: {
                enabled: true
            }
        },
        {
            name: 'Выключен',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#000000',
            data: ar55_array_off,
            dataLabels: {
                enabled: true,
            }
        },
        {
            name: 'В аварии',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#e81e1d',
            data: ar55_array_avar,
            dataLabels: {
                enabled: true
            }
        },
        {
            name: 'Под нагрузкой',
            borderColor: 'gray',
            pointWidth: 30,
            colorByPoint: false,
            color: '#24621d',
            data: ar55_array_nagruzka,
            dataLabels: {
                enabled: true
            }
        }
    ]


});

<!--ar55 круговая диагрмма загрузки оборудования-->
var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210'];
Highcharts.chart('container_9', {
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
        data : [ [ 'По программе', ar55_work ], [ 'Включен', ar55_pass ],
            [ 'Выключен', ar55_fail ],  [ 'В аварии', ar55_avar],  [ 'Под нагрузкой', ar55_nagruzka]   ]
    }]
});