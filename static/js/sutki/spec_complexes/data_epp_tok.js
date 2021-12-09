Highcharts.setOptions({
    time: {
        timezone: 'Europe/Moscow'
    }
});

Highcharts.getJSON(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
    function (data) {

        Highcharts.chart('container_epp_tok', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Хронология технологического процесса'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Амплитуда'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            credits: {
                enabled: false
            },

            series: [{
                type: 'area',
                name: 'Ток, А',
                data: data_tok
            },
                {
                    name: 'Температура, С',
                    data: data_temperatura
                }
            ]
        });
    }
);