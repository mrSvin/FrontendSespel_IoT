var colors = ['#e81e1d','#000000', '#ffea32','#207210','#38e817'];

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
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }, {
        name: 'Выключен',
        data: [uf5220_off_day[0], uf5220_off_day[1], uf5220_off_day[2],uf5220_off_day[3],uf5220_off_day[4],uf5220_off_day[5],uf5220_off_day[6],uf5220_off_day[7],uf5220_off_day[8],uf5220_off_day[9],uf5220_off_day[10],uf5220_off_day[11],
            uf5220_off_day[12],uf5220_off_day[13],uf5220_off_day[14],uf5220_off_day[15],uf5220_off_day[16],uf5220_off_day[17],uf5220_off_day[18],uf5220_off_day[19],uf5220_off_day[20],uf5220_off_day[21],uf5220_off_day[22],uf5220_off_day[23],
            uf5220_off_day[24],uf5220_off_day[25],uf5220_off_day[26],uf5220_off_day[27],uf5220_off_day[28],uf5220_off_day[29],uf5220_off_day[30]]
    }, {
        name: 'Ожидание',
        data: [uf5220_pause_day[0], uf5220_pause_day[1], uf5220_pause_day[2],uf5220_pause_day[3],uf5220_pause_day[4],uf5220_pause_day[5],uf5220_pause_day[6],uf5220_pause_day[7],uf5220_pause_day[8],uf5220_pause_day[9],uf5220_pause_day[10],uf5220_pause_day[11],
            uf5220_pause_day[12],uf5220_pause_day[13],uf5220_pause_day[14],uf5220_pause_day[15],uf5220_pause_day[16],uf5220_pause_day[17],uf5220_pause_day[18],uf5220_pause_day[19],uf5220_pause_day[20],uf5220_pause_day[21],uf5220_pause_day[22],uf5220_pause_day[23],
            uf5220_pause_day[24],uf5220_pause_day[25],uf5220_pause_day[26],uf5220_pause_day[27],uf5220_pause_day[28],uf5220_pause_day[29],uf5220_pause_day[30]]
    }, {
        name: 'Под нагрузкой',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }, {
        name: 'Работа',
        data: [uf5220_rabota_day[0], uf5220_rabota_day[1], uf5220_rabota_day[2],uf5220_rabota_day[3],uf5220_rabota_day[4],uf5220_rabota_day[5],uf5220_rabota_day[6],uf5220_rabota_day[7],uf5220_rabota_day[8],uf5220_rabota_day[9],uf5220_rabota_day[10],uf5220_rabota_day[11],
            uf5220_rabota_day[12],uf5220_rabota_day[13],uf5220_rabota_day[14],uf5220_rabota_day[15],uf5220_rabota_day[16],uf5220_rabota_day[17],uf5220_rabota_day[18],uf5220_rabota_day[19],uf5220_rabota_day[20],uf5220_rabota_day[21],uf5220_rabota_day[22],uf5220_rabota_day[23],
            uf5220_rabota_day[24],uf5220_rabota_day[25],uf5220_rabota_day[26],uf5220_rabota_day[27],uf5220_rabota_day[28],uf5220_rabota_day[29],uf5220_rabota_day[30]]
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
        data : [ [ 'По программе', uf5220_work ], [ 'Включен', uf5220_pass ], [ 'Выключен', uf5220_fail],  [ 'В аварии', uf5220_avar ], [ 'Под нагрузкой', 0 ]  ]
    }]
});