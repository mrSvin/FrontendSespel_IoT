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

Highcharts.chart('container_days5', {
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
        data: [apec_rabota_day[0], apec_rabota_day[1], apec_rabota_day[2],apec_rabota_day[3],apec_rabota_day[4],apec_rabota_day[5],apec_rabota_day[6],apec_rabota_day[7],apec_rabota_day[8],apec_rabota_day[9],apec_rabota_day[10],apec_rabota_day[11],
            apec_rabota_day[12],apec_rabota_day[13],apec_rabota_day[14],apec_rabota_day[15],apec_rabota_day[16],apec_rabota_day[17],apec_rabota_day[18],apec_rabota_day[19],apec_rabota_day[20],apec_rabota_day[21],apec_rabota_day[22],apec_rabota_day[23],
            apec_rabota_day[24],apec_rabota_day[25],apec_rabota_day[26],apec_rabota_day[27],apec_rabota_day[28],apec_rabota_day[29],apec_rabota_day[30]]
    }, {
        name: 'Под нагрузкой',
        data: [apec_nagruzka_day[0], apec_nagruzka_day[1], apec_nagruzka_day[2],apec_nagruzka_day[3],apec_nagruzka_day[4],apec_nagruzka_day[5],apec_nagruzka_day[6],apec_nagruzka_day[7],apec_nagruzka_day[8],apec_nagruzka_day[9],apec_nagruzka_day[10],apec_nagruzka_day[11],
            apec_nagruzka_day[12],apec_nagruzka_day[13],apec_nagruzka_day[14],apec_nagruzka_day[15],apec_nagruzka_day[16],apec_nagruzka_day[17],apec_nagruzka_day[18],apec_nagruzka_day[19],apec_nagruzka_day[20],apec_nagruzka_day[21],apec_nagruzka_day[22],apec_nagruzka_day[23],
            apec_nagruzka_day[24],apec_nagruzka_day[25],apec_nagruzka_day[26],apec_nagruzka_day[27],apec_nagruzka_day[28],apec_nagruzka_day[29],apec_nagruzka_day[30]]
    }, {
        name: 'Ожидание',
        data: [apec_pause_day[0], apec_pause_day[1], apec_pause_day[2],apec_pause_day[3],apec_pause_day[4],apec_pause_day[5],apec_pause_day[6],apec_pause_day[7],apec_pause_day[8],apec_pause_day[9],apec_pause_day[10],apec_pause_day[11],
            apec_pause_day[12],apec_pause_day[13],apec_pause_day[14],apec_pause_day[15],apec_pause_day[16],apec_pause_day[17],apec_pause_day[18],apec_pause_day[19],apec_pause_day[20],apec_pause_day[21],apec_pause_day[22],apec_pause_day[23],
            apec_pause_day[24],apec_pause_day[25],apec_pause_day[26],apec_pause_day[27],apec_pause_day[28],apec_pause_day[29],apec_pause_day[30]]
    }, {
        name: 'Авария',
        data: [apec_avar_day[0], apec_avar_day[1], apec_avar_day[2],apec_avar_day[3],apec_avar_day[4],apec_avar_day[5],apec_avar_day[6],apec_avar_day[7],apec_avar_day[8],apec_avar_day[9],apec_avar_day[10],apec_avar_day[11],
            apec_avar_day[12],apec_avar_day[13],apec_avar_day[14],apec_avar_day[15],apec_avar_day[16],apec_avar_day[17],apec_avar_day[18],apec_avar_day[19],apec_avar_day[20],apec_avar_day[21],apec_avar_day[22],apec_avar_day[23],
            apec_avar_day[24],apec_avar_day[25],apec_avar_day[26],apec_avar_day[27],apec_avar_day[28],apec_avar_day[29],apec_avar_day[30]]
    }, {
        name: 'Выключен',
        data: [apec_off_day[0], apec_off_day[1], apec_off_day[2],apec_off_day[3],apec_off_day[4],apec_off_day[5],apec_off_day[6],apec_off_day[7],apec_off_day[8],apec_off_day[9],apec_off_day[10],apec_off_day[11],
            apec_off_day[12],apec_off_day[13],apec_off_day[14],apec_off_day[15],apec_off_day[16],apec_off_day[17],apec_off_day[18],apec_off_day[19],apec_off_day[20],apec_off_day[21],apec_off_day[22],apec_off_day[23],
            apec_off_day[24],apec_off_day[25],apec_off_day[26],apec_off_day[27],apec_off_day[28],apec_off_day[29],apec_off_day[30]]
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

Highcharts.chart('container5', {
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
        data : [ [ 'По программе', apec_work ], [ 'Включен', apec_pass ], [ 'Выключен', apec_fail],  [ 'В аварии', apec_avar ], [ 'Под нагрузкой', apec_nagruzka ]  ]
    }]
});