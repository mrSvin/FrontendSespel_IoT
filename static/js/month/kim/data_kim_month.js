var colors = ['#e81e1d','#000000', '#ffea32','#5c7ed0','#38e817'];

const timezone = new Date().getTimezoneOffset()

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
        timezoneOffset: timezone
    }
});

Highcharts.chart('container_days1', {
    chart: {
        type: 'column'
    },
    colors:colors,
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
        categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
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
        data: [kim_avar_day[0], kim_avar_day[1], kim_avar_day[2],kim_avar_day[3],kim_avar_day[4],kim_avar_day[5],kim_avar_day[6],kim_avar_day[7],kim_avar_day[8],kim_avar_day[9],kim_avar_day[10],kim_avar_day[11],
            kim_avar_day[12],kim_avar_day[13],kim_avar_day[14],kim_avar_day[15],kim_avar_day[16],kim_avar_day[17],kim_avar_day[18],kim_avar_day[19],kim_avar_day[20],kim_avar_day[21],kim_avar_day[22],kim_avar_day[23],
            kim_avar_day[24],kim_avar_day[25],kim_avar_day[26],kim_avar_day[27],kim_avar_day[28],kim_avar_day[29],kim_avar_day[30]]
    }, {
        name: 'Выключен',
        data: [kim_off_day[0], kim_off_day[1], kim_off_day[2],kim_off_day[3],kim_off_day[4],kim_off_day[5],kim_off_day[6],kim_off_day[7],kim_off_day[8],kim_off_day[9],kim_off_day[10],kim_off_day[11],
            kim_off_day[12],kim_off_day[13],kim_off_day[14],kim_off_day[15],kim_off_day[16],kim_off_day[17],kim_off_day[18],kim_off_day[19],kim_off_day[20],kim_off_day[21],kim_off_day[22],kim_off_day[23],
            kim_off_day[24],kim_off_day[25],kim_off_day[26],kim_off_day[27],kim_off_day[28],kim_off_day[29],kim_off_day[30]]
    }, {
        name: 'Ожидание',
        data: [kim_pause_day[0], kim_pause_day[1], kim_pause_day[2],kim_pause_day[3],kim_pause_day[4],kim_pause_day[5],kim_pause_day[6],kim_pause_day[7],kim_pause_day[8],kim_pause_day[9],kim_pause_day[10],kim_pause_day[11],
            kim_pause_day[12],kim_pause_day[13],kim_pause_day[14],kim_pause_day[15],kim_pause_day[16],kim_pause_day[17],kim_pause_day[18],kim_pause_day[19],kim_pause_day[20],kim_pause_day[21],kim_pause_day[22],kim_pause_day[23],
            kim_pause_day[24],kim_pause_day[25],kim_pause_day[26],kim_pause_day[27],kim_pause_day[28],kim_pause_day[29],kim_pause_day[30]]
    }, {
        name: 'Калибровка',
        data: [kim_kalibrovka_day[0], kim_kalibrovka_day[1], kim_kalibrovka_day[2],kim_kalibrovka_day[3],kim_kalibrovka_day[4],kim_kalibrovka_day[5],kim_kalibrovka_day[6],kim_kalibrovka_day[7],kim_kalibrovka_day[8],kim_kalibrovka_day[9],kim_kalibrovka_day[10],kim_kalibrovka_day[11],
            kim_kalibrovka_day[12],kim_kalibrovka_day[13],kim_kalibrovka_day[14],kim_kalibrovka_day[15],kim_kalibrovka_day[16],kim_kalibrovka_day[17],kim_kalibrovka_day[18],kim_kalibrovka_day[19],kim_kalibrovka_day[20],kim_kalibrovka_day[21],kim_kalibrovka_day[22],kim_kalibrovka_day[23],
            kim_kalibrovka_day[24],kim_kalibrovka_day[25],kim_kalibrovka_day[26],kim_kalibrovka_day[27],kim_kalibrovka_day[28],kim_kalibrovka_day[29],kim_kalibrovka_day[30]]
    }, {
        name: 'Работа',
        data: [kim_rabota_day[0], kim_rabota_day[1], kim_rabota_day[2],kim_rabota_day[3],kim_rabota_day[4],kim_rabota_day[5],kim_rabota_day[6],kim_rabota_day[7],kim_rabota_day[8],kim_rabota_day[9],kim_rabota_day[10],kim_rabota_day[11],
            kim_rabota_day[12],kim_rabota_day[13],kim_rabota_day[14],kim_rabota_day[15],kim_rabota_day[16],kim_rabota_day[17],kim_rabota_day[18],kim_rabota_day[19],kim_rabota_day[20],kim_rabota_day[21],kim_rabota_day[22],kim_rabota_day[23],
            kim_rabota_day[24],kim_rabota_day[25],kim_rabota_day[26],kim_rabota_day[27],kim_rabota_day[28],kim_rabota_day[29],kim_rabota_day[30]]
    }]
});

var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d', '#5c7ed0'];

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
    global: {
        timezoneOffset: new Date().getTimezoneOffset()
    }
});

Highcharts.chart('container', {
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
        data : [ [ 'Работа', kim_work ], [ 'Ожидание', kim_pass ], [ 'Выключен', kim_fail],  [ 'Авария', kim_avar ], [ 'Калибровка', kim_kalibrovka ]  ]
    }]
});