var colors = ['#38e817','#207210', '#ffea32', '#e81e1d', '#000000'];

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

Highcharts.chart('container_days2', {
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
        name: 'Работа',
        data: [progress_rabota_day[0], progress_rabota_day[1], progress_rabota_day[2],progress_rabota_day[3],progress_rabota_day[4],progress_rabota_day[5],progress_rabota_day[6],progress_rabota_day[7],progress_rabota_day[8],progress_rabota_day[9],progress_rabota_day[10],progress_rabota_day[11],
            progress_rabota_day[12],progress_rabota_day[13],progress_rabota_day[14],progress_rabota_day[15],progress_rabota_day[16],progress_rabota_day[17],progress_rabota_day[18],progress_rabota_day[19],progress_rabota_day[20],progress_rabota_day[21],progress_rabota_day[22],progress_rabota_day[23],
            progress_rabota_day[24],progress_rabota_day[25],progress_rabota_day[26],progress_rabota_day[27],progress_rabota_day[28],progress_rabota_day[29],progress_rabota_day[30]]
    }, {
        name: 'Под нагрузкой',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }, {
        name: 'Ожидание',
        data: [progress_pause_day[0], progress_pause_day[1], progress_pause_day[2],progress_pause_day[3],progress_pause_day[4],progress_pause_day[5],progress_pause_day[6],progress_pause_day[7],progress_pause_day[8],progress_pause_day[9],progress_pause_day[10],progress_pause_day[11],
            progress_pause_day[12],progress_pause_day[13],progress_pause_day[14],progress_pause_day[15],progress_pause_day[16],progress_pause_day[17],progress_pause_day[18],progress_pause_day[19],progress_pause_day[20],progress_pause_day[21],progress_pause_day[22],progress_pause_day[23],
            progress_pause_day[24],progress_pause_day[25],progress_pause_day[26],progress_pause_day[27],progress_pause_day[28],progress_pause_day[29],progress_pause_day[30]]
    }, {
        name: 'Авария',
        data: [0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }, {
        name: 'Выключен',
        data: [progress_off_day[0], progress_off_day[1], progress_off_day[2],progress_off_day[3],progress_off_day[4],progress_off_day[5],progress_off_day[6],progress_off_day[7],progress_off_day[8],progress_off_day[9],progress_off_day[10],progress_off_day[11],
            progress_off_day[12],progress_off_day[13],progress_off_day[14],progress_off_day[15],progress_off_day[16],progress_off_day[17],progress_off_day[18],progress_off_day[19],progress_off_day[20],progress_off_day[21],progress_off_day[22],progress_off_day[23],
            progress_off_day[24],progress_off_day[25],progress_off_day[26],progress_off_day[27],progress_off_day[28],progress_off_day[29],progress_off_day[30]]
    }]
});

var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d', '#207210'];

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

Highcharts.chart('container2', {
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
        data : [ [ 'По программе', progress_work ], [ 'Включен', progress_pass ], [ 'Выключен', progress_fail],  [ 'В аварии', progress_avar ], [ 'Под нагрузкой', 0 ]  ]
    }]
});