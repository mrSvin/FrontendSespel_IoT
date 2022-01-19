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
        data: [press_avar_day[0], press_avar_day[1], press_avar_day[2],press_avar_day[3],press_avar_day[4],press_avar_day[5],press_avar_day[6],press_avar_day[7],press_avar_day[8],press_avar_day[9],press_avar_day[10],press_avar_day[11],
            press_avar_day[12],press_avar_day[13],press_avar_day[14],press_avar_day[15],press_avar_day[16],press_avar_day[17],press_avar_day[18],press_avar_day[19],press_avar_day[20],press_avar_day[21],press_avar_day[22],press_avar_day[23],
            press_avar_day[24],press_avar_day[25],press_avar_day[26],press_avar_day[27],press_avar_day[28],press_avar_day[29],press_avar_day[30]]
    }, {
        name: 'Выключен',
        data: [press_off_day[0], press_off_day[1], press_off_day[2],press_off_day[3],press_off_day[4],press_off_day[5],press_off_day[6],press_off_day[7],press_off_day[8],press_off_day[9],press_off_day[10],press_off_day[11],
            press_off_day[12],press_off_day[13],press_off_day[14],press_off_day[15],press_off_day[16],press_off_day[17],press_off_day[18],press_off_day[19],press_off_day[20],press_off_day[21],press_off_day[22],press_off_day[23],
            press_off_day[24],press_off_day[25],press_off_day[26],press_off_day[27],press_off_day[28],press_off_day[29],press_off_day[30]]
    }, {
        name: 'Ожидание',
        data: [press_pause_day[0], press_pause_day[1], press_pause_day[2],press_pause_day[3],press_pause_day[4],press_pause_day[5],press_pause_day[6],press_pause_day[7],press_pause_day[8],press_pause_day[9],press_pause_day[10],press_pause_day[11],
            press_pause_day[12],press_pause_day[13],press_pause_day[14],press_pause_day[15],press_pause_day[16],press_pause_day[17],press_pause_day[18],press_pause_day[19],press_pause_day[20],press_pause_day[21],press_pause_day[22],press_pause_day[23],
            press_pause_day[24],press_pause_day[25],press_pause_day[26],press_pause_day[27],press_pause_day[28],press_pause_day[29],press_pause_day[30]]
    }, {
        name: 'Нагрузка',
        data: [press_nagruzka_day[0], press_nagruzka_day[1], press_nagruzka_day[2],press_nagruzka_day[3],press_nagruzka_day[4],press_nagruzka_day[5],press_nagruzka_day[6],press_nagruzka_day[7],press_nagruzka_day[8],press_nagruzka_day[9],press_nagruzka_day[10],press_nagruzka_day[11],
            press_nagruzka_day[12],press_nagruzka_day[13],press_nagruzka_day[14],press_nagruzka_day[15],press_nagruzka_day[16],press_nagruzka_day[17],press_nagruzka_day[18],press_nagruzka_day[19],press_nagruzka_day[20],press_nagruzka_day[21],press_nagruzka_day[22],press_nagruzka_day[23],
            press_nagruzka_day[24],press_nagruzka_day[25],press_nagruzka_day[26],press_nagruzka_day[27],press_nagruzka_day[28],press_nagruzka_day[29],press_nagruzka_day[30]]
    }, {
        name: 'Работа',
        data: [press_rabota_day[0], press_rabota_day[1], press_rabota_day[2],press_rabota_day[3],press_rabota_day[4],press_rabota_day[5],press_rabota_day[6],press_rabota_day[7],press_rabota_day[8],press_rabota_day[9],press_rabota_day[10],press_rabota_day[11],
            press_rabota_day[12],press_rabota_day[13],press_rabota_day[14],press_rabota_day[15],press_rabota_day[16],press_rabota_day[17],press_rabota_day[18],press_rabota_day[19],press_rabota_day[20],press_rabota_day[21],press_rabota_day[22],press_rabota_day[23],
            press_rabota_day[24],press_rabota_day[25],press_rabota_day[26],press_rabota_day[27],press_rabota_day[28],press_rabota_day[29],press_rabota_day[30]]
    }]
});

var colors = ['#38e817', '#ffea32', '#000000', '#e81e1d','#207210'];

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
        data : [[ 'Работа', press_work ], [ 'Включен', press_pass ], [ 'Выключен', press_fail],  [ 'В аварии', press_avar ], [ 'Нагрузка', press_nagruzka ] ]
    }]
});