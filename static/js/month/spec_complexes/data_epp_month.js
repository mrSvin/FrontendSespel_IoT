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

Highcharts.chart('container_days_epp', {
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
        data: [epp_rabota_day[0], epp_rabota_day[1], epp_rabota_day[2],epp_rabota_day[3],epp_rabota_day[4],epp_rabota_day[5],epp_rabota_day[6],epp_rabota_day[7],epp_rabota_day[8],epp_rabota_day[9],epp_rabota_day[10],epp_rabota_day[11],
            epp_rabota_day[12],epp_rabota_day[13],epp_rabota_day[14],epp_rabota_day[15],epp_rabota_day[16],epp_rabota_day[17],epp_rabota_day[18],epp_rabota_day[19],epp_rabota_day[20],epp_rabota_day[21],epp_rabota_day[22],epp_rabota_day[23],
            epp_rabota_day[24],epp_rabota_day[25],epp_rabota_day[26],epp_rabota_day[27],epp_rabota_day[28],epp_rabota_day[29],epp_rabota_day[30]]
    }, {
        name: 'Ожидание',
        data: [epp_pause_day[0], epp_pause_day[1], epp_pause_day[2],epp_pause_day[3],epp_pause_day[4],epp_pause_day[5],epp_pause_day[6],epp_pause_day[7],epp_pause_day[8],epp_pause_day[9],epp_pause_day[10],epp_pause_day[11],
            epp_pause_day[12],epp_pause_day[13],epp_pause_day[14],epp_pause_day[15],epp_pause_day[16],epp_pause_day[17],epp_pause_day[18],epp_pause_day[19],epp_pause_day[20],epp_pause_day[21],epp_pause_day[22],epp_pause_day[23],
            epp_pause_day[24],epp_pause_day[25],epp_pause_day[26],epp_pause_day[27],epp_pause_day[28],epp_pause_day[29],epp_pause_day[30]]
    }, {
        name: 'Выключен',
        data: [epp_off_day[0], epp_off_day[1], epp_off_day[2],epp_off_day[3],epp_off_day[4],epp_off_day[5],epp_off_day[6],epp_off_day[7],epp_off_day[8],epp_off_day[9],epp_off_day[10],epp_off_day[11],
            epp_off_day[12],epp_off_day[13],epp_off_day[14],epp_off_day[15],epp_off_day[16],epp_off_day[17],epp_off_day[18],epp_off_day[19],epp_off_day[20],epp_off_day[21],epp_off_day[22],epp_off_day[23],
            epp_off_day[24],epp_off_day[25],epp_off_day[26],epp_off_day[27],epp_off_day[28],epp_off_day[29],epp_off_day[30]]
    }, {
        name: 'Авария',
        data: [epp_avar_day[0], epp_avar_day[1], epp_avar_day[2],epp_avar_day[3],epp_avar_day[4],epp_avar_day[5],epp_avar_day[6],epp_avar_day[7],epp_avar_day[8],epp_avar_day[9],epp_avar_day[10],epp_avar_day[11],
            epp_avar_day[12],epp_avar_day[13],epp_avar_day[14],epp_avar_day[15],epp_avar_day[16],epp_avar_day[17],epp_avar_day[18],epp_avar_day[19],epp_avar_day[20],epp_avar_day[21],epp_avar_day[22],epp_avar_day[23],
            epp_avar_day[24],epp_avar_day[25],epp_avar_day[26],epp_avar_day[27],epp_avar_day[28],epp_avar_day[29],epp_avar_day[30]]
    }, {
        name: 'Нагрузка',
        data: [epp_nagruzka_day[0], epp_nagruzka_day[1], epp_nagruzka_day[2],epp_nagruzka_day[3],epp_nagruzka_day[4],epp_nagruzka_day[5],epp_nagruzka_day[6],epp_nagruzka_day[7],epp_nagruzka_day[8],epp_nagruzka_day[9],epp_nagruzka_day[10],epp_nagruzka_day[11],
            epp_nagruzka_day[12],epp_nagruzka_day[13],epp_nagruzka_day[14],epp_nagruzka_day[15],epp_nagruzka_day[16],epp_nagruzka_day[17],epp_nagruzka_day[18],epp_nagruzka_day[19],epp_nagruzka_day[20],epp_nagruzka_day[21],epp_nagruzka_day[22],epp_nagruzka_day[23],
            epp_nagruzka_day[24],epp_nagruzka_day[25],epp_nagruzka_day[26],epp_nagruzka_day[27],epp_nagruzka_day[28],epp_nagruzka_day[29],epp_nagruzka_day[30]]
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

Highcharts.chart('container_epp', {
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
        data : [[ 'Работа', epp_work ], [ 'Включен', epp_pass ], [ 'Выключен', epp_fail],  [ 'В аварии', epp_avar ], [ 'Нагрузка', epp_nagruzka ] ]
    }]
});